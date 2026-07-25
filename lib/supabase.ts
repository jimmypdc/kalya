import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase clients for the Kayla Marie Joiner Foundation.
 *
 * We expose two factories:
 *   - `supabase`        → browser/anon client (respects Row Level Security)
 *   - `getServiceClient` → server-only client using the service-role key,
 *                          used by the Stripe webhook to write donor records.
 *
 * The service client is created lazily so that importing this module in the
 * browser bundle never touches (or requires) the secret service-role key.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Surface misconfiguration early during development.
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env.local and fill in your project values.',
  );
}

/**
 * Public, anon-key client. Safe for client components.
 *
 * Created lazily (on first property access) so that merely importing this
 * module during the build — before env vars are available — never triggers
 * `createClient('')`, which would throw "supabaseUrl is required".
 */
let _browserClient: SupabaseClient | null = null;

function getBrowserClient(): SupabaseClient {
  if (!_browserClient) {
    _browserClient = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
      auth: { persistSession: false },
    });
  }
  return _browserClient;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getBrowserClient(), prop, receiver);
  },
});

/**
 * Server-only client with the service-role key. NEVER import this into a
 * client component — it bypasses RLS. Throws if the secret is missing so a
 * misconfigured webhook fails loudly rather than silently dropping donations.
 */
export function getServiceClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error(
      '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — ' +
        'required for server-side writes (Stripe webhook, pledge storage).',
    );
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ── Row shapes (mirror the SQL in README / supabase/schema.sql) ──────────────

export interface Donor {
  id: string;
  email: string;
  name: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  amount: number; // in cents
  currency: string;
  status: string;
  is_recurring: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  donor_id: string | null;
  stripe_subscription_id: string;
  status: string;
  amount: number; // in cents
  currency: string;
  interval: string; // e.g. "month"
  created_at: string;
  canceled_at: string | null;
}

export interface Pledge {
  id: string;
  name: string;
  email: string | null;
  city: string | null;
  state: string | null;
  message: string | null;
  show_on_wall: boolean;
  created_at: string;
}
