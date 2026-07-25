import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

/**
 * POST /api/memories
 *
 * Stores a memorial guestbook entry. Entries are saved with approved=false and
 * only shown publicly after a human sets approved=true (in the Supabase Table
 * Editor). This keeps the memorial safe from spam and abuse.
 *
 * Body: { name, location?, message }
 */

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      location?: unknown;
      message?: unknown;
    };

    const name = String(body.name ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name) {
      return NextResponse.json(
        { ok: false, error: 'Please share your name.' },
        { status: 400 },
      );
    }
    if (message.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Please write a short memory or message.' },
        { status: 400 },
      );
    }

    const clip = (v: unknown, max: number) => {
      const s = v == null ? null : String(v).trim();
      return s ? s.slice(0, max) : null;
    };

    const record = {
      name: name.slice(0, 120),
      location: clip(body.location, 80),
      message: message.slice(0, 1500),
      approved: false, // Held for review.
    };

    const supabase = getServiceClient();
    const { error } = await supabase.from('memories').insert(record);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[memories] insert error:', error);
      return NextResponse.json(
        { ok: false, error: 'Could not save your memory. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[memories] error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
