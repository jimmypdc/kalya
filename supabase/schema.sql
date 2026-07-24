-- ============================================================================
-- Kayla Marie Joiner Foundation — Supabase schema
-- ----------------------------------------------------------------------------
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query) to create
-- the tables used by the site: donors, donations, subscriptions, and pledges.
--
-- Writes happen server-side using the SERVICE ROLE key (Stripe webhook &
-- /api/pledge), which bypasses Row Level Security. We still enable RLS and add
-- NO public policies, so the anon key cannot read or write these tables.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ── donors ──────────────────────────────────────────────────────────────────
create table if not exists public.donors (
  id                 uuid primary key default gen_random_uuid(),
  email              text unique not null,
  name               text,
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);

create index if not exists donors_stripe_customer_id_idx
  on public.donors (stripe_customer_id);

-- ── donations (one-time gifts + recurring invoice charges) ───────────────────
create table if not exists public.donations (
  id                          uuid primary key default gen_random_uuid(),
  donor_id                    uuid references public.donors (id) on delete set null,
  stripe_checkout_session_id  text unique,
  stripe_payment_intent_id    text unique,
  amount                      integer not null,          -- in cents
  currency                    text    not null default 'usd',
  status                      text    not null default 'paid',
  is_recurring                boolean not null default false,
  created_at                  timestamptz not null default now()
);

create index if not exists donations_donor_id_idx
  on public.donations (donor_id);

-- ── subscriptions (recurring monthly gifts) ──────────────────────────────────
create table if not exists public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  donor_id               uuid references public.donors (id) on delete set null,
  stripe_subscription_id text unique not null,
  status                 text not null,
  amount                 integer not null,               -- in cents
  currency               text not null default 'usd',
  interval               text not null default 'month',
  created_at             timestamptz not null default now(),
  canceled_at            timestamptz
);

create index if not exists subscriptions_donor_id_idx
  on public.subscriptions (donor_id);

-- ── pledges (Buckle Up Pledge form submissions) ──────────────────────────────
create table if not exists public.pledges (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,
  city       text,
  state      text,
  message    text,
  created_at timestamptz not null default now()
);

create index if not exists pledges_created_at_idx
  on public.pledges (created_at desc);

-- ── Row Level Security ───────────────────────────────────────────────────────
-- Enable RLS with no policies: the anon/public key gets no access. The
-- service-role key (used only on the server) bypasses RLS entirely.
alter table public.donors        enable row level security;
alter table public.donations     enable row level security;
alter table public.subscriptions enable row level security;
alter table public.pledges       enable row level security;

-- OPTIONAL: if you ever want to show a public, anonymized "pledge wall"
-- (e.g. first names only) using the anon key, you could add a SELECT policy.
-- Left commented out by default for privacy.
--
-- create policy "public can read pledge names"
--   on public.pledges for select
--   to anon
--   using (true);
