# 🚀 Pre-Launch Checklist

Everything left before `buckleup4kayla.org` goes live. The code and content are
in great shape — what remains is mostly setup (Stripe, deploy) and a few
content/legal confirmations.

**✅ Done so far:** real photo gallery (auto-discovers `public/kayla/`), Kayla's
portrait on the Story page + share card, the Seat Belts Save Lives poster on the
Buckle Up page, the tabbed Memorial page (Photos + Recent Events with photos),
the pledge wall + live count, newsletter, share buttons, privacy policy, and a
working Supabase database (pledges, memories, and newsletter all saving).

---

## 1. Content & photos
- [x] Real photos in the memorial gallery (`public/kayla/`).
- [x] Kayla's portrait on the Story page and the social share card.
- [x] Seat Belts Save Lives poster on the Buckle Up page.
- [x] Recent Events populated with photos (car wash, scholarships, plaque,
      launch, Jersey Shore, AHA Walk).
- [ ] **Hero image:** save your chosen photo as `public/hero.jpg` (code is ready
      — it swaps in automatically once the file exists).
- [ ] Set the real contact email in `lib/site.ts` (currently `info@buckleup4kayla.org`).
- [ ] Review copy for names, dates, and tone (`lib/site.ts`, `lib/tributes.ts`).
- [ ] Confirm the three tributes read the way the family wants
      (Kasidi Lee, Billy Morosco, Sydney Joiner).
- [ ] Refine the two newer event descriptions/dates in `lib/events.ts`
      (Jersey Shore, AHA Walk) if you have the details.
- [ ] Replace illustrative stats with real ones when available (or keep the
      honest "growing community" framing).

## 2. Legal & trust
- [ ] Confirm 501(c)(3) status + EIN, and update the tax-deductibility wording
      in the footer and `/donate`.
- [ ] Have the Privacy Policy (`/privacy`) reviewed by counsel; set a real
      "Last updated" date.
- [ ] Decide scholarship eligibility, award amount, and deadline; update
      `/scholarships`.

## 3. Supabase (database)
- [x] Create a Supabase project.
- [x] Run `supabase/schema.sql` (donors, donations, subscriptions, pledges,
      subscribers, memories).
- [x] Local `.env.local` connected — pledges/memories/newsletter save.
- [ ] Have the same keys ready to paste into Vercel (step 5).

## 4. Stripe (donations)  ← main remaining piece
- [ ] Create a Stripe account and complete business verification.
- [ ] Grab the **live** secret + publishable keys.
- [ ] Add a webhook endpoint → `https://buckleup4kayla.org/api/webhooks/stripe`
      with events: `checkout.session.completed`, `invoice.paid`,
      `customer.subscription.created/updated/deleted`.
- [ ] Copy the webhook signing secret.
- [ ] Do a real $1 test donation (one-time **and** monthly), confirm rows appear
      in Supabase, then refund them.

## 5. Environment variables (set in Vercel)
- [ ] `NEXT_PUBLIC_SITE_URL=https://buckleup4kayla.org`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the value can be your Supabase anon key
      **or** the newer "publishable" key; the variable name must be this.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (secret — powers all saving)
- [ ] `STRIPE_SECRET_KEY` (live, secret)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live)
- [ ] `STRIPE_WEBHOOK_SECRET` (secret)

## 6. Deploy (Vercel)
- [ ] Import the repo at vercel.com/new.
- [ ] Add all env vars (Production scope).
- [ ] Deploy and confirm the build succeeds.
- [ ] Add domains `buckleup4kayla.org` **and** `buckleup4kayla.com`; update DNS.
- [ ] Set one as primary and redirect the other to it.

## 7. Final verification (on the live site)  ← go/no-go gate
- [ ] Submit a pledge → confirm it saves and the count/wall update.
- [ ] Approve a test memory in Supabase → confirm it appears on `/memorial`.
- [ ] Subscribe to the newsletter → confirm the row in `subscribers`.
- [ ] Test a donation end-to-end (see step 4).
- [ ] Check every page on mobile + desktop; tap through the mobile menu and the
      Memorial tabs.
- [ ] Paste a link into iMessage/Slack/Facebook → confirm the share card shows
      Kayla's photo.
- [ ] Run a quick Lighthouse pass (performance, SEO, accessibility).
- [ ] Confirm `/sitemap.xml` and `/robots.txt` load.

## 8. Nice-to-have (before or just after launch)
- [ ] Privacy-friendly analytics (e.g. Vercel Analytics).
- [ ] Inbox/forwarding for the contact email.
- [ ] Seed the pledge wall and memory wall with a few real entries.
- [ ] Announce it — share the link with family, friends, and partner schools.

---

_Tip: **Stripe (4) + Deploy (5–6)** are the main things between you and launch;
section 7 is your final go/no-go check._
