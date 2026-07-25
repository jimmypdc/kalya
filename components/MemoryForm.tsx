'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Heart } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * "Leave a Memory" form for the memorial guestbook. Submissions are held for
 * review (approved server-side) before they appear on the wall, so the success
 * message sets that expectation warmly.
 */
export default function MemoryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      location: String(data.get('location') ?? '').trim() || null,
      message: String(data.get('message') ?? '').trim(),
    };

    if (!payload.name || payload.message.length < 2) {
      setStatus('error');
      setError('Please share your name and a short memory.');
      return;
    }

    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !result.ok) {
        throw new Error(result.error ?? 'Could not submit your memory.');
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
      <div
        className="flex flex-col items-center rounded-2xl border border-teal-900/10 bg-teal-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-12 w-12 text-teal-700" aria-hidden />
        <h3 className="mt-4 font-serif text-xl font-bold text-teal-900">
          Thank you for sharing. 💛
        </h3>
        <p className="mt-2 max-w-sm text-teal-800">
          Your memory means the world to us. It will appear on the wall once
          we&apos;ve had a chance to review it.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-medium text-teal-700 underline underline-offset-4 hover:text-teal-900"
        >
          Share another memory
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <h3 className="font-serif text-2xl font-bold text-teal-900">
        Leave a memory
      </h3>
      <p className="mt-1 text-sm text-teal-700">
        Share a story, a moment, or a message in Kayla&apos;s honor.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <label
            htmlFor="memory-name"
            className="mb-1.5 block text-sm font-medium text-teal-900"
          >
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="memory-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jordan Smith"
            className="w-full rounded-xl border border-teal-900/15 bg-white px-4 py-2.5 text-teal-950 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>

        <div>
          <label
            htmlFor="memory-location"
            className="mb-1.5 block text-sm font-medium text-teal-900"
          >
            Where you&apos;re from (optional)
          </label>
          <input
            id="memory-location"
            name="location"
            autoComplete="address-level2"
            placeholder="Austin, TX"
            className="w-full rounded-xl border border-teal-900/15 bg-white px-4 py-2.5 text-teal-950 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>

        <div>
          <label
            htmlFor="memory-message"
            className="mb-1.5 block text-sm font-medium text-teal-900"
          >
            Your memory or message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="memory-message"
            name="message"
            required
            rows={4}
            maxLength={1500}
            placeholder="A favorite memory, something Kayla taught you, or a message for her family…"
            className="w-full rounded-xl border border-teal-900/15 bg-white px-4 py-2.5 text-teal-950 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

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
            Sharing…
          </>
        ) : (
          <>
            <Heart className="h-4 w-4" aria-hidden />
            Share this memory
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-teal-600">
        Memories are gently reviewed before they appear, to keep this space
        loving and safe.
      </p>
    </form>
  );
}
