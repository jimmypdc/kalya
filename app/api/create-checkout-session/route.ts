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
    // Check Stripe configuration first
    if (!process.env.STRIPE_SECRET_KEY) {
      // eslint-disable-next-line no-console
      console.error('[create-checkout-session] Missing STRIPE_SECRET_KEY');
      return NextResponse.json(
        { error: 'Payments are not configured yet. Please try again later.' },
        { status: 503 },
      );
    }

    // Parse and validate request body
    let body: { amount?: unknown; mode?: unknown };
    try {
      body = (await request.json()) as { amount?: unknown; mode?: unknown };
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 },
      );
    }

    const amount = Number(body.amount);
    const mode = body.mode === 'subscription' ? 'subscription' : 'payment';

    // Validate the amount with detailed error messages
    if (!Number.isFinite(amount)) {
      return NextResponse.json(
        { error: 'Please enter a valid donation amount.' },
        { status: 400 },
      );
    }
    
    if (amount < MIN_USD) {
      return NextResponse.json(
        { error: `The minimum donation amount is $${MIN_USD}.` },
        { status: 400 },
      );
    }
    
    if (amount > MAX_USD) {
      return NextResponse.json(
        { error: `For donations over $${MAX_USD}, please contact us directly.` },
        { status: 400 },
      );
    }

    const unitAmount = Math.round(amount * 100); // dollars → cents
    const baseUrl = siteConfig.url.replace(/\/$/, '');

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode,
      // Collect email so we can create/lookup a donor record in the webhook.
      customer_creation: mode === 'payment' ? 'always' : undefined,
      billing_address_collection: 'auto',
      payment_method_types: ['card'],
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
      // Allow promotion codes for discounts/matching campaigns
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error('Stripe session created but no URL returned.');
    }

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
