import 'server-only';
import { getServiceClient } from '@/lib/supabase';

/**
 * Server-only helpers for reading pledge data.
 *
 * These use the service-role client (RLS stays locked; nothing is exposed to
 * the browser) and are intentionally FAIL-SOFT: if Supabase isn't configured
 * yet, or a query fails, they return safe fallbacks (null / []) so the site
 * renders perfectly before any database is wired up.
 */

/** A single pledge, reduced to the only fields safe to show publicly. */
export interface PublicPledge {
  firstName: string;
  location: string | null;
  message: string | null;
}

/**
 * Total number of pledges. Returns `null` if the database isn't available yet
 * (so callers can fall back to a warm "join us" message instead of showing 0).
 */
export async function getPledgeCount(): Promise<number | null> {
  try {
    const supabase = getServiceClient();
    const { count, error } = await supabase
      .from('pledges')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count ?? 0;
  } catch {
    // No env / network / table not created yet — degrade gracefully.
    return null;
  }
}

/**
 * The most recent pledges that opted in to the public wall, reduced to
 * first name + location + message. Never returns emails or full names.
 */
export async function getRecentPledges(limit = 30): Promise<PublicPledge[]> {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('pledges')
      .select('name, city, state, message, created_at')
      .eq('show_on_wall', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;

    return (data ?? []).map((row) => {
      const firstName = String(row.name ?? '').trim().split(/\s+/)[0] || 'Friend';
      const city = (row.city ?? '').toString().trim();
      const state = (row.state ?? '').toString().trim();
      const location = [city, state].filter(Boolean).join(', ') || null;
      const message = (row.message ?? '').toString().trim() || null;
      return { firstName, location, message };
    });
  } catch {
    return [];
  }
}
