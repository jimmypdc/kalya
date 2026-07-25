import 'server-only';
import { getServiceClient } from '@/lib/supabase';

/**
 * Server-only helpers for the memorial guestbook.
 * Fail-soft: returns [] when the database isn't configured yet.
 */

export interface PublicMemory {
  name: string;
  location: string | null;
  message: string;
  /** Pre-formatted, locale-stable date (e.g. "March 2025"). */
  date: string;
}

/** Approved memories only, newest first. */
export async function getApprovedMemories(limit = 60): Promise<PublicMemory[]> {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('memories')
      .select('name, location, message, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;

    return (data ?? []).map((row) => ({
      name: String(row.name ?? 'Friend').trim(),
      location: (row.location ?? '').toString().trim() || null,
      message: String(row.message ?? '').trim(),
      date: formatDate(row.created_at),
    }));
  } catch {
    return [];
  }
}

/** Deterministic "Month YYYY" formatting (server-only, en-US). */
function formatDate(value: unknown): string {
  try {
    const d = new Date(String(value));
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}
