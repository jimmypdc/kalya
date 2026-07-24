'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';

interface DonateButtonProps {
  /** Amount in whole dollars (USD). */
  amount: number;
  /** One-time or recurring monthly gift. */
  mode?: 'payment' | 'subscription';
  /** Optional label override. */
  label?: string;
  className?: string;
  /** Visual variant. */
  variant?: 'accent' | 'primary' | 'outline';
}

/**
 * Kicks off a Stripe Checkout session for a donation, then redirects the
 * browser to Stripe's hosted checkout page. Works for both one-time
 * ("payment") and monthly ("subscription") gifts.
 */
export default function DonateButton({
  amount,
  mode = 'payment',
  label,
  className = '',
  variant = 'accent',
}: DonateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'outline'
        ? 'btn-outline'
        : 'btn-accent';

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, mode }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Unable to start checkout. Please try again.');
      }

      // Redirect to Stripe-hosted Checkout.
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${variantClass} w-full`}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Redirecting…
          </>
        ) : (
          <>
            <Heart className="h-4 w-4" aria-hidden />
            {label ??
              (mode === 'subscription'
                ? `Give $${amount}/mo`
                : `Donate $${amount}`)}
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
