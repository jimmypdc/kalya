'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

interface PledgeFormProps {
  /** Compact layout (used inside the home hero) vs. full page card. */
  compact?: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * The "Buckle Up Pledge" form. Collects a name (required) plus optional
 * contact/location and a short message, POSTs to /api/pledge (which stores it
 * in Supabase), and shows a warm success state on completion.
 */
export default function PledgeForm({ compact = false }: PledgeFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [pledgerName, setPledgerName] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim() || null,
      city: String(data.get('city') ?? '').trim() || null,
      state: String(data.get('state') ?? '').trim() || null,
      message: String(data.get('message') ?? '').trim() || null,
      // Checkbox is opt-out: present (checked) unless the user unticks it.
      showOnWall: data.get('showOnWall') !== null,
    };

    if (!payload.name) {
      setStatus('error');
      setError('Please enter your name to take the pledge.');
      return;
    }

    try {
      const res = await fetch('/api/pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !result.ok) {
        throw new Error(result.error ?? 'Could not submit your pledge.');
      }
      setPledgerName(payload.name.split(' ')[0]);
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    }
  }

  // ── Success state ──────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-center rounded-2xl border border-teal-900/10 bg-teal-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-14 w-14 text-teal-700" aria-hidden />
        <h3 className="mt-4 font-serif text-2xl font-bold text-teal-900">
          Thank you, {pledgerName}. 💛
        </h3>
        <p className="mt-2 max-w-md text-teal-800">
          You&apos;ve joined thousands of others who promise to always buckle up —
          for yourself, for the people who love you, and in memory of Kayla.
        </p>
        {/* Challenge friends — sharing multiplies the impact. */}
        <div className="mt-6 w-full border-t border-teal-900/10 pt-6">
          <p className="text-sm font-semibold text-teal-900">
            Challenge 3 friends to pledge too:
          </p>
          <div className="mt-3 flex justify-center">
            <ShareButtons
              title="I took the Buckle Up for Kayla pledge"
              text="I just pledged to always buckle up, in memory of Kayla Marie Joiner. Will you take the pledge too?"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/story" className="btn-outline">
            Read Kayla&apos;s Story
          </a>
          <a href="/get-involved" className="btn-accent">
            Do More to Help
          </a>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-teal-700 underline underline-offset-4 hover:text-teal-900"
        >
          Pledge for someone else
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm sm:p-8 ${
        compact ? '' : 'mx-auto max-w-xl'
      }`}
      noValidate
    >
      <div className="mb-5">
        <h3 className="font-serif text-2xl font-bold text-teal-900">
          Take the Buckle Up Pledge
        </h3>
        <p className="mt-1 text-sm text-teal-700">
          A three-second habit that saves lives. Add your name below.
        </p>
      </div>

      <div className="grid gap-4">
        <Field
          id="name"
          name="name"
          label="Your name"
          required
          autoComplete="name"
          placeholder="Jordan Smith"
        />

        <Field
          id="email"
          name="email"
          type="email"
          label="Email (optional)"
          autoComplete="email"
          placeholder="you@example.com"
          hint="We'll only use this to share safety updates. No spam, ever."
        />

        {!compact && (
          <div className="grid grid-cols-2 gap-4">
            <Field
              id="city"
              name="city"
              label="City (optional)"
              autoComplete="address-level2"
              placeholder="Austin"
            />
            <Field
              id="state"
              name="state"
              label="State (optional)"
              autoComplete="address-level1"
              placeholder="TX"
            />
          </div>
        )}

        {!compact && (
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-teal-900"
            >
              Why you&apos;re buckling up (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="For my family. For my friends. For Kayla."
              className="w-full rounded-xl border border-teal-900/15 bg-white px-4 py-2.5 text-teal-950 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        )}
      </div>

      {/* Public wall consent (opt-out). Only the first name is ever shown. */}
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-teal-700">
        <input
          type="checkbox"
          name="showOnWall"
          defaultChecked
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-teal-900/30 text-teal-800 focus:ring-teal-500"
        />
        <span>
          Add my <strong>first name</strong> to the public Pledge Wall. (We only
          ever show your first name — never your email.)
        </span>
      </label>

      {status === 'error' && error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-accent mt-6 w-full"
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          'I Pledge to Buckle Up'
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-teal-600">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        Your information is kept private and never sold.
      </p>
    </form>
  );
}

/** Small labeled input helper to keep the form markup tidy. */
function Field({
  id,
  name,
  label,
  hint,
  type = 'text',
  required = false,
  autoComplete,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-teal-900"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-teal-900/15 bg-white px-4 py-2.5 text-teal-950 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      />
      {hint && <p className="mt-1 text-xs text-teal-600">{hint}</p>}
    </div>
  );
}
