import Stripe from 'stripe';

/**
 * Server-side Stripe client. Import ONLY in route handlers / server code.
 * The secret key must never reach the browser bundle.
 *
 * Constructed lazily (on first property access) so that importing this module
 * during the build — before env vars exist — never triggers `new Stripe('')`,
 * which throws "Neither apiKey nor config.authenticator provided".
 */

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      // eslint-disable-next-line no-console
      console.warn(
        '[stripe] Missing STRIPE_SECRET_KEY. Donations will fail until it is set.',
      );
    }
    _stripe = new Stripe(secretKey ?? '', {
      // Pin an API version for predictable behavior across deploys.
      // Matches the installed stripe SDK's pinned version.
      apiVersion: '2025-02-24.acacia',
      appInfo: {
        name: 'Kayla Marie Joiner Foundation',
      },
    });
  }
  return _stripe;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver);
  },
});
