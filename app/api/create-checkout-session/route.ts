import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { siteConfig } from '@/lib/site';

/**
 * POST /api/create-checkout-session
 *
 * Creates a Stripe Checkout Session for a donation and returns its URL.
 * Supports both one-time ("payment") and recurring monthly ("subscription")
 * gifts using inline price_data, so no pre-created Stripe Products are needed.
 *
 * Body: { amount: number (USD dollars), mode: 'payment' | 'subscription' }
 */

export const runtime = 'nodejs';

const MIN_USD = 1;
const MAX_USD = 50_000;

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payments are not configured yet. Please try again later.' },
        { status: 503 },
      );
    }

    const body = (await request.json()) as {
      amount?: unknown;
      mode?: unknown;
    };

    const amount = Number(body.amount);
    const mode = body.mode === 'subscription' ? 'subscription' : 'payment';

    // Validate the amount.
    if (!Number.isFinite(amount) || amount < MIN_USD || amount > MAX_USD) {
      return NextResponse.json(
        { error: `Please choose an amount between $${MIN_USD} and $${MAX_USD}.` },
        { status: 400 },
      );
    }

    const unitAmount = Math.round(amount * 100); // dollars → cents
    const baseUrl = siteConfig.url.replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      mode,
      // Collect email so we can create/lookup a donor record in the webhook.
      customer_creation: mode === 'payment' ? 'always' : undefined,
      billing_address_collection: 'auto',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
              name:
                mode === 'subscription'
                  ? 'Monthly Donation — Kayla Marie Joiner Foundation'
                  : 'Donation — Kayla Marie Joiner Foundation',
              description:
                'Supporting teen seatbelt safety and pediatric nursing scholarships.',
            },
            ...(mode === 'subscription'
              ? { recurring: { interval: 'month' as const } }
              : {}),
          },
        },
      ],
      // Tag the session so the webhook can label the donation correctly.
      metadata: {
        cause: 'buckle-up-for-kayla',
        gift_type: mode === 'subscription' ? 'monthly' : 'one-time',
      },
      success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[create-checkout-session] error:', err);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 },
    );
  }
}
