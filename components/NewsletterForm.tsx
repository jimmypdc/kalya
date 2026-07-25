'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface NewsletterFormProps {
  /** Style for dark backgrounds (e.g. the footer) vs. light sections. */
  variant?: 'light' | 'dark';
}

/**
 * Email newsletter signup. POSTs to /api/newsletter (stored in Supabase).
 * Shows an inline success confirmation on completion.
 */
export default function NewsletterForm({ variant = 'light' }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === 'dark';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !result.ok) {
        throw new Error(result.error ?? 'Could not subscribe you.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <p
        className={`flex items-center gap-2 text-sm font-medium ${
          isDark ? 'text-gold-300' : 'text-teal-800'
        }`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-5 w-5" aria-hidden />
        You&apos;re on the list — thank you for keeping Kayla&apos;s mission close.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              isDark ? 'text-teal-300' : 'text-teal-500'
            }`}
            aria-hidden
          />
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`w-full rounded-full py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 ${
              isDark
                ? 'border border-teal-700 bg-teal-900/60 text-white placeholder:text-teal-400 focus:ring-gold-400'
                : 'border border-teal-900/15 bg-white text-teal-950 placeholder:text-teal-400 focus:ring-teal-500/40'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-accent shrink-0"
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Joining…
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {status === 'error' && error && (
        <p role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
