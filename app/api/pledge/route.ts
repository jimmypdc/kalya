import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

/**
 * POST /api/pledge
 *
 * Stores a "Buckle Up" pledge in the Supabase `pledges` table.
 * Uses the server-side service client so pledges can be written even with
 * strict Row Level Security on the table.
 *
 * Body: { name, email?, city?, state?, message? }
 */

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      city?: unknown;
      state?: unknown;
      message?: unknown;
    };

    const name = String(body.name ?? '').trim();
    if (!name) {
      return NextResponse.json(
        { ok: false, error: 'Name is required.' },
        { status: 400 },
      );
    }

    // Light length guards to keep records sane.
    const clip = (v: unknown, max: number) => {
      const s = v == null ? null : String(v).trim();
      return s ? s.slice(0, max) : null;
    };

    const record = {
      name: name.slice(0, 120),
      email: clip(body.email, 200),
      city: clip(body.city, 80),
      state: clip(body.state, 80),
      message: clip(body.message, 500),
    };

    const supabase = getServiceClient();
    const { error } = await supabase.from('pledges').insert(record);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[pledge] insert error:', error);
      return NextResponse.json(
        { ok: false, error: 'Could not save your pledge. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[pledge] error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
