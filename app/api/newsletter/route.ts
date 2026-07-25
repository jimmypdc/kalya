import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

/**
 * POST /api/newsletter
 *
 * Adds an email to the Supabase `subscribers` table. Uses the server-side
 * service client (RLS stays locked). Idempotent: re-subscribing the same email
 * succeeds quietly rather than erroring.
 *
 * Body: { email }
 */

export const runtime = 'nodejs';

// Simple, permissive email sanity check (real validation happens on send).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();

    if (!email || !EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const supabase = getServiceClient();
    // Upsert so a repeat signup doesn't throw a unique-constraint error.
    const { error } = await supabase
      .from('subscribers')
      .upsert({ email }, { onConflict: 'email' });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[newsletter] insert error:', error);
      return NextResponse.json(
        { ok: false, error: 'Could not subscribe you right now. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[newsletter] error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
