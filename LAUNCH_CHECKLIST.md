# 🚀 Pre-Launch Checklist

Everything left before `buckleup4kayla.org` goes live. The code is done — these
are the content, configuration, and verification steps that are yours to own.

---

## 1. Content & photos
- [ ] Replace the placeholder gallery images (`public/kayla/gallery/`) with real
      photos of Kayla (see `components/PhotoGallery.tsx`).
- [ ] Swap the home hero placeholder for a favorite photo (`components/KaylaImage.tsx`).
- [ ] Review all copy for names, dates, and tone (`lib/site.ts`, `lib/tributes.ts`).
- [ ] Confirm the three tributes are worded the way the family wants
      (Kasidi Lee, Billy Morosco, Sydney Joiner).
- [ ] Set the real contact email in `lib/site.ts` (currently `info@buckleup4kayla.org`).
- [ ] Replace illustrative stats/testimonials with real ones when available
      (or leave the honest "growing community" framing for now).

## 2. Legal & trust
- [ ] Confirm 501(c)(3) status + EIN, and update the tax-deductibility wording
      in the footer and `/donate`.
- [ ] Have the Privacy Policy (`/privacy`) reviewed by counsel; set a real
      "Last updated" date.
- [ ] Decide on scholarship eligibility, award amount, and deadline; update
      `/scholarships`.

## 3. Supabase (database)
- [ ] Create a Supabase project.
- [ ] Run `supabase/schema.sql` in the SQL Editor (creates donors, donations,
      subscriptions, pledges, subscribers, memories).
- [ ] Copy the Project URL, `anon` key, and `service_role` key for env vars.

## 4. Stripe (donations)
- [ ] Create a Stripe account and complete business verification.
- [ ] Grab the **live** secret + publishable keys.
- [ ] Add a webhook endpoint → `https://buckleup4kayla.org/api/webhooks/stripe`
      with events: `checkout.session.completed`, `invoice.paid`,
      `customer.subscription.created/updated/deleted`.
- [ ] Copy the webhook signing secret.
- [ ] Do a real $1 test donation (one-time **and** monthly), then confirm rows
      appear in Supabase and refund them.

## 5. Environment variables (set in Vercel)
- [ ] `NEXT_PUBLIC_SITE_URL=https://buckleup4kayla.org`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (secret)
- [ ] `STRIPE_SECRET_KEY` (live, secret)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live)
- [ ] `STRIPE_WEBHOOK_SECRET` (secret)

## 6. Deploy (Vercel)
- [ ] Import the repo at vercel.com/new.
- [ ] Add all env vars (Production scope).
- [ ] Deploy and confirm the build succeeds.
- [ ] Add domains `buckleup4kayla.org` **and** `buckleup4kayla.com` and update DNS.
- [ ] Set one as primary and redirect the other to it.

## 7. Final verification (on the live site)
- [ ] Submit a pledge → confirm it saves and the count/wall update.
- [ ] Approve a test memory in Supabase → confirm it appears on `/memorial`.
- [ ] Subscribe to the newsletter → confirm the row in `subscribers`.
- [ ] Test a donation end-to-end (see step 4).
- [ ] Check every page on mobile + desktop; tap through the mobile menu.
- [ ] Paste a link into iMessage/Slack/Facebook → confirm the share card shows
      Kayla's photo.
- [ ] Run a quick Lighthouse pass (performance, SEO, accessibility).
- [ ] Confirm `/sitemap.xml` and `/robots.txt` load.

## 8. Nice-to-have before or just after launch
- [ ] Add privacy-friendly analytics (e.g. Vercel Analytics).
- [ ] Set up an inbox/forwarding for the contact email.
- [ ] Seed the pledge wall and memorial with a few real entries so they aren't empty.
- [ ] Announce it — share the link with family, friends, and partner schools.

---

_Tip: work top-to-bottom. Sections 3–6 unlock donations/pledges; section 7 is
your go/no-go gate._
