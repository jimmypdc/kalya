# Buckle Up for Kayla — Kayla Marie Joiner Foundation

A modern, emotional, production-ready website for the **Kayla Marie Joiner Foundation** (`buckleup4kayla.org` / `buckleup4kayla.com`).

The site honors Kayla Marie Joiner (May 29, 1991 – October 22, 2007), promotes teen seatbelt safety through the **Buckle Up for Kayla** campaign, and supports scholarships for students pursuing pediatric nursing.

---

## ✨ Tech Stack

| Concern        | Choice |
| -------------- | ------ |
| Framework      | [Next.js 15](https://nextjs.org) (App Router) |
| Language       | TypeScript |
| Styling        | Tailwind CSS |
| Icons          | lucide-react |
| Database       | Supabase (Postgres) |
| Payments       | Stripe Checkout (one-time + recurring) + webhooks |
| Fonts          | Inter (sans) + Playfair Display (serif), via `next/font` |
| Hosting        | Vercel |

**Brand colors:** deep teal `#134e4a` (primary) + warm amber/gold `#fbbf24` (accent).

---

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx                 # Root layout, fonts, SEO, Navbar/Footer
│   ├── page.tsx                   # Home
│   ├── globals.css                # Tailwind + design tokens & components
│   ├── not-found.tsx              # 404
│   ├── sitemap.ts                 # /sitemap.xml
│   ├── robots.ts                  # /robots.txt
│   ├── story/page.tsx             # Kayla's Story + tributes
│   ├── buckle-up/page.tsx         # Safety message + statistics
│   ├── scholarships/page.tsx      # Scholarship program + how to apply
│   ├── impact/page.tsx            # Impact numbers + testimonials
│   ├── pledge/page.tsx            # Dedicated pledge page
│   ├── donate/
│   │   ├── page.tsx               # Donation page (one-time + monthly)
│   │   ├── success/page.tsx       # Post-checkout thank-you
│   │   └── cancel/page.tsx        # Checkout canceled
│   ├── get-involved/page.tsx      # Ways to help
│   └── api/
│       ├── create-checkout-session/route.ts  # Starts Stripe Checkout
│       ├── webhooks/stripe/route.ts          # Saves donors/donations/subs
│       └── pledge/route.ts                    # Saves pledges to Supabase
├── components/
│   ├── Navbar.tsx                 # Sticky nav + mobile hamburger
│   ├── Footer.tsx
│   ├── PledgeForm.tsx             # Interactive pledge form + success state
│   ├── DonateButton.tsx           # One-click donate button
│   ├── DonationWidget.tsx         # Amount selector (one-time/monthly)
│   ├── KaylaImage.tsx             # PLACEHOLDER images (swap in real photos)
│   ├── PageHeader.tsx             # Reusable interior-page hero
│   ├── SectionHeading.tsx
│   ├── StatGrid.tsx
│   └── TributeCard.tsx
├── lib/
│   ├── supabase.ts                # Supabase clients (anon + service role)
│   ├── stripe.ts                  # Server-side Stripe client
│   ├── site.ts                    # Site config, nav, stats, content
│   └── tributes.ts                # Original tributes (poem/message/essay)
├── supabase/
│   └── schema.sql                 # Database schema (run in Supabase)
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
#    then fill in your Supabase + Stripe values (see below)

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The site renders fully without any keys configured — donations and pledge
> storage simply won't work until Supabase and Stripe are set up.

---

## 1️⃣ Create the Supabase Tables

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor → New query**.
3. Paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it.

This creates four tables:

| Table           | Purpose |
| --------------- | ------- |
| `donors`        | One row per donor (deduped by email). |
| `donations`     | One-time gifts and each recurring charge. Amounts in **cents**. |
| `subscriptions` | Recurring monthly gifts + their status. |
| `pledges`       | Buckle Up Pledge form submissions. |
| `subscribers`   | Newsletter email signups (deduped by email). |
| `memories`      | Memorial guestbook entries (shown only after approval). |

Row Level Security is **enabled with no public policies**, so the browser
(anon key) can't read or write these tables. All writes happen server-side
using the **service-role key**.

Grab your keys from **Project Settings → API**:
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**server only — keep secret!**)

---

## 2️⃣ Required Environment Variables

Copy `.env.example` → `.env.local` and fill in:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000     # your production URL in prod

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...               # SERVER ONLY

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

| Variable | Where it's used | Public? |
| -------- | --------------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | Stripe redirects, SEO metadata | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase client | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Webhook + pledge writes | ❌ **secret** |
| `STRIPE_SECRET_KEY` | Checkout + webhook verification | ❌ **secret** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | (reserved for client Stripe.js) | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification | ❌ **secret** |

---

## 3️⃣ Set Up Stripe Webhooks

The webhook at `/api/webhooks/stripe` records donors, donations, and
subscriptions into Supabase. It handles:

- `checkout.session.completed` — records the donor + donation
- `invoice.paid` — records each recurring monthly charge
- `customer.subscription.created` / `.updated` — upserts the subscription
- `customer.subscription.deleted` — marks the subscription canceled

### Local testing with the Stripe CLI

```bash
# Install: https://stripe.com/docs/stripe-cli
stripe login

# Forward events to your local webhook
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI prints a signing secret like `whsec_...` — copy it into
`STRIPE_WEBHOOK_SECRET` in `.env.local` and restart `npm run dev`.

Trigger a test donation from `/donate` (use test card `4242 4242 4242 4242`,
any future expiry, any CVC), then confirm rows appear in your Supabase tables.

### Production webhook

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://YOUR_DOMAIN/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the endpoint's **Signing secret** into your production
   `STRIPE_WEBHOOK_SECRET` env var.

---

## 4️⃣ Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in
   **Project Settings → Environment Variables**
   (set `NEXT_PUBLIC_SITE_URL` to your real domain, e.g.
   `https://buckleup4kayla.org`).
4. Deploy. Vercel auto-detects Next.js — no extra config needed.
5. After deploying, create the **production Stripe webhook** (step 3) pointing
   at your live `/api/webhooks/stripe` URL, and add its signing secret to Vercel.
6. Add your custom domains (`buckleup4kayla.org` and `.com`) in
   **Project Settings → Domains**.

> Switch Stripe from **test** keys to **live** keys (and create a live-mode
> webhook) when you're ready to accept real donations.

---

## 🖼️ Swapping in Real Photos of Kayla

All imagery currently uses clearly-labeled **placeholder** stock photos via
[`components/KaylaImage.tsx`](./components/KaylaImage.tsx).

To use real photos:

1. Add photo files to `public/kayla/` (e.g. `public/kayla/kayla-hero.jpg`).
2. In `KaylaImage.tsx`, replace each placeholder `src` with your local path
   (e.g. `/kayla/kayla-hero.jpg`) and update the `alt` text.
3. Optionally remove the Unsplash `remotePatterns` entries in `next.config.mjs`.

---

## ✏️ Editing Content

Most copy lives in easy-to-edit data files so you rarely touch JSX:

- **`lib/site.ts`** — foundation name, contact email, navigation, headline
  stats, safety statistics, donation preset amounts.
- **`lib/tributes.ts`** — the tributes from Kasidi Lee (poem), Billy Morosco
  (message), and Sydney Joiner (essay).

The original tributes have been preserved with their heart intact and only
lightly polished for the web. Update authorship and wording here anytime.

### Pledge Wall & live pledge count

The `/pledge` page shows a **Pledge Wall** of recent pledges, and the headline
stat tile on the Home and Impact pages shows a **live pledge count**.

- Both read from Supabase server-side (`lib/pledges.ts`) and **fail soft**: with
  no database configured, the tile shows a warm "Join a growing community"
  message and the wall shows an inviting empty state — no errors.
- Once pledges start coming in, the tile automatically flips to the real count
  and the wall fills with first names. Pages revalidate every few minutes so the
  numbers stay current.
- **Privacy:** the wall only ever shows a pledger's **first name** (plus optional
  city/state and their short message) — never full names or emails — and only
  for people who left the "Add my first name to the public Pledge Wall" checkbox
  ticked. That consent is stored in the `pledges.show_on_wall` column.

> If you created the `pledges` table before the wall existed, run the
> `ALTER TABLE ... add column show_on_wall` statement noted in
> `supabase/schema.sql`.

### Newsletter signup

A newsletter form in the footer (every page) collects emails into the
`subscribers` table via `/api/newsletter`. It's idempotent (re-subscribing the
same email won't error) and, like everything else, fails soft before Supabase
is configured. To send newsletters, export the `subscribers` table or connect
it to an email tool (e.g. Mailchimp, Resend, Buttondown).

### Share buttons

`components/ShareButtons.tsx` adds Facebook, X, email, and copy-link sharing
(plus the native mobile share sheet where supported). They appear on the Story
page and in the pledge success state ("Challenge 3 friends"). Shared links use
the branded Open Graph image automatically.

### Memorial page & guestbook (`/memorial`)

A photo gallery plus a "leave a memory" guestbook.

- **Photos:** `components/PhotoGallery.tsx` uses labeled placeholder images.
  Add real photos to `public/kayla/gallery/` and update the `src`/`alt` entries
  (instructions are in the file).
- **Guestbook:** visitors submit memories via `/api/memories` into the
  `memories` table. **Entries are held for review** (`approved = false`) and only
  appear on the wall once approved — this keeps the memorial safe from spam.
- **To approve a memory:** open the Supabase **Table Editor → `memories`**, find
  the row, and set its `approved` column to `true`. It appears within a couple of
  minutes (the page revalidates). You can also delete inappropriate entries here.

---

## ♿ Accessibility & SEO

- Semantic landmarks, skip-to-content link, and keyboard-visible focus rings.
- `aria-*` states on the nav, forms, tabs, and async buttons.
- Respects `prefers-reduced-motion`.
- Per-page `<title>` / meta descriptions, Open Graph + Twitter cards,
  `sitemap.xml`, and `robots.txt`.

---

## 📜 Scripts

```bash
npm run dev     # Start local dev server
npm run build   # Production build
npm run start   # Run the production build
npm run lint    # Lint
```

---

## 💛 In Memory of Kayla

> "Buckling up isn't just about safety. For us, it's a small daily act of love —
> a way of saying: I want to come home. I want you to come home, too."
> — Sydney Joiner, Kayla's sister
