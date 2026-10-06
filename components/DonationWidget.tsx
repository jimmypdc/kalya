'use client';

import { useState } from 'react';
import { Heart, Loader2, Repeat, Gift, AlertCircle } from 'lucide-react';
import { donationPresets } from '@/lib/site';
import ButterflyDecoration from './ButterflyDecoration';

type Mode = 'payment' | 'subscription';

/**
 * Interactive donation panel: choose one-time vs. monthly, pick a preset or
 * enter a custom amount, then launch Stripe Checkout.
 */
export default function DonationWidget() {
  const [mode, setMode] = useState<Mode>('payment');
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = custom ? Number(custom) : amount;

  async function donate() {
    setError(null);
    const value = Number(effectiveAmount);
    
    // Enhanced validation
    if (!Number.isFinite(value) || value < 1) {
      setError('Please enter an amount of at least $1.');
      return;
    }
    if (value > 50000) {
      setError('For donations over $50,000, please contact us directly.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value, mode }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Unable to start checkout.');
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="group relative rounded-3xl border border-teal-900/10 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl sm:p-8">
      {/* Subtle decorative butterfly in corner */}
      <ButterflyDecoration
        size={40}
        className="absolute right-4 top-4 text-teal-900/5 transition-opacity group-hover:opacity-100"
      />
      
      {/* Mode toggle */}
      <div
        className="relative z-10 grid grid-cols-2 gap-1 rounded-full bg-teal-50 p-1"
        role="tablist"
        aria-label="Donation frequency"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'payment'}
          onClick={() => {
            setMode('payment');
            setError(null);
          }}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
            mode === 'payment'
              ? 'bg-teal-900 text-white shadow-sm'
              : 'text-teal-800 hover:bg-teal-100'
          }`}
        >
          <Gift className="h-4 w-4" aria-hidden />
          One-time
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'subscription'}
          onClick={() => {
            setMode('subscription');
            setError(null);
          }}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
            mode === 'subscription'
              ? 'bg-teal-900 text-white shadow-sm'
              : 'text-teal-800 hover:bg-teal-100'
          }`}
        >
          <Repeat className="h-4 w-4" aria-hidden />
          Monthly
        </button>
      </div>

      {/* Preset amounts */}
      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-teal-900">
          Choose an amount
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {donationPresets.map((preset) => {
            const selected = !custom && amount === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustom('');
                }}
                aria-pressed={selected}
                className={`rounded-xl border px-4 py-3 text-center font-semibold transition-colors ${
                  selected
                    ? 'border-teal-900 bg-teal-900 text-white'
                    : 'border-teal-900/15 bg-white text-teal-900 hover:border-teal-500'
                }`}
              >
                ${preset}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Custom amount */}
      <div className="mt-4">
        <label
          htmlFor="custom-amount"
          className="mb-1.5 block text-sm font-medium text-teal-900"
        >
          Or enter a custom amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-teal-500">
            $
          </span>
          <input
            id="custom-amount"
            type="number"
            min={1}
            step={1}
            inputMode="decimal"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Other amount"
            className="w-full rounded-xl border border-teal-900/15 bg-white py-3 pl-8 pr-4 font-semibold text-teal-950 placeholder:font-normal placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={donate}
        disabled={loading || !effectiveAmount}
        className="btn-accent mt-6 w-full text-base shadow-md hover:shadow-lg"
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Redirecting to secure checkout…
          </>
        ) : (
          <>
            <Heart className="h-5 w-5 fill-current" aria-hidden />
            {mode === 'subscription'
              ? `Give $${effectiveAmount || 0}/month`
              : `Donate $${effectiveAmount || 0}`}
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-teal-600">
        Secure payments powered by Stripe. {mode === 'subscription' ? 'You can cancel a monthly gift at any time.' : 'All donations are processed securely.'}
      </p>
    </div>
  );
}
