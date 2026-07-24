import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getServiceClient } from '@/lib/supabase';

/**
 * POST /api/webhooks/stripe
 *
 * Receives Stripe webhook events, verifies the signature, and persists
 * donors / donations / subscriptions into Supabase.
 *
 * Events handled:
 *   - checkout.session.completed        → record donor + donation (and sub id)
 *   - invoice.paid                      → record each recurring charge
 *   - customer.subscription.created     → upsert subscription
 *   - customer.subscription.updated     → keep status/amount in sync
 *   - customer.subscription.deleted     → mark subscription canceled
 *
 * IMPORTANT: This route must receive the RAW request body for signature
 * verification, so we read `request.text()` and never parse JSON first.
 */

export const runtime = 'nodejs';
// Never cache webhook responses.
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    // eslint-disable-next-line no-console
    console.error('[stripe webhook] Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[stripe webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await upsertSubscription(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await cancelSubscription(event.data.object as Stripe.Subscription);
        break;
      default:
        // Unhandled events are acknowledged so Stripe stops retrying them.
        break;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[stripe webhook] Error handling ${event.type}:`, err);
    // Return 500 so Stripe retries — the DB write may be transient.
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ── Handlers ─────────────────────────────────────────────────────────────

/**
 * Upsert a donor by email and return their internal id. Also stores the
 * Stripe customer id when we have one.
 */
async function upsertDonor(params: {
  email: string | null;
  name: string | null;
  stripeCustomerId: string | null;
}): Promise<string | null> {
  const { email, name, stripeCustomerId } = params;
  if (!email) return null;

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('donors')
    .upsert(
      {
        email: email.toLowerCase(),
        name: name ?? null,
        stripe_customer_id: stripeCustomerId ?? null,
      },
      { onConflict: 'email' },
    )
    .select('id')
    .single();

  if (error) throw error;
  return data?.id ?? null;
}

/** Look up an existing donor id from a Stripe customer id. */
async function findDonorByCustomer(
  customerId: string | null,
): Promise<string | null> {
  if (!customerId) return null;
  const supabase = getServiceClient();
  const { data } = await supabase
    .from('donors')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();
  return data?.id ?? null;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const isRecurring = session.mode === 'subscription';
  const email =
    session.customer_details?.email ?? session.customer_email ?? null;
  const name = session.customer_details?.name ?? null;
  const customerId =
    typeof session.customer === 'string'
      ? session.customer
      : (session.customer?.id ?? null);

  const donorId = await upsertDonor({ email, name, stripeCustomerId: customerId });

  const supabase = getServiceClient();

  // Record the donation. `amount_total` is in cents.
  const { error } = await supabase.from('donations').upsert(
    {
      donor_id: donorId,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : (session.payment_intent?.id ?? null),
      amount: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
      status: session.payment_status ?? 'paid',
      is_recurring: isRecurring,
    },
    { onConflict: 'stripe_checkout_session_id' },
  );
  if (error) throw error;
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Only record subscription (recurring) invoices here; one-time gifts are
  // captured via checkout.session.completed.
  const subscriptionId =
    typeof invoice.subscription === 'string'
      ? invoice.subscription
      : (invoice.subscription?.id ?? null);
  if (!subscriptionId) return;

  const customerId =
    typeof invoice.customer === 'string'
      ? invoice.customer
      : (invoice.customer?.id ?? null);

  let donorId = await findDonorByCustomer(customerId);
  if (!donorId) {
    donorId = await upsertDonor({
      email: invoice.customer_email ?? null,
      name: invoice.customer_name ?? null,
      stripeCustomerId: customerId,
    });
  }

  const supabase = getServiceClient();
  const { error } = await supabase.from('donations').upsert(
    {
      donor_id: donorId,
      stripe_payment_intent_id:
        typeof invoice.payment_intent === 'string'
          ? invoice.payment_intent
          : (invoice.payment_intent?.id ?? null),
      amount: invoice.amount_paid ?? 0,
      currency: invoice.currency ?? 'usd',
      status: 'paid',
      is_recurring: true,
    },
    { onConflict: 'stripe_payment_intent_id' },
  );
  if (error) throw error;
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const customerId =
    typeof sub.customer === 'string' ? sub.customer : (sub.customer?.id ?? null);
  const donorId = await findDonorByCustomer(customerId);

  const item = sub.items.data[0];
  const amount = item?.price.unit_amount ?? 0;
  const interval = item?.price.recurring?.interval ?? 'month';

  const supabase = getServiceClient();
  const { error } = await supabase.from('subscriptions').upsert(
    {
      donor_id: donorId,
      stripe_subscription_id: sub.id,
      status: sub.status,
      amount,
      currency: sub.currency ?? 'usd',
      interval,
      canceled_at: sub.canceled_at
        ? new Date(sub.canceled_at * 1000).toISOString()
        : null,
    },
    { onConflict: 'stripe_subscription_id' },
  );
  if (error) throw error;
}

async function cancelSubscription(sub: Stripe.Subscription) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', sub.id);
  if (error) throw error;
}
