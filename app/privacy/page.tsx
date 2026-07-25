import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How the Kayla Marie Joiner Foundation collects, uses, and protects your personal information.',
};

/*
 * ─────────────────────────────────────────────────────────────────────────
 * MAINTAINER NOTE
 * This is a solid, plain-language starting policy tailored to what the site
 * actually collects (pledge form + Stripe donations via Supabase). Before
 * launch, have it reviewed by legal counsel and update the "Last updated"
 * date, the mailing address (if you add one), and any state-specific rights.
 * ─────────────────────────────────────────────────────────────────────────
 */

const LAST_UPDATED = 'January 2025';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Your privacy matters to us"
        description="We collect only what we need to honor Kayla's mission — and we treat it with the care you'd expect. Here's exactly what that means."
      />

      <section className="section">
        <div className="container-content max-w-3xl">
          <p className="text-sm text-teal-600">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-10">
            <Policy title="Who we are">
              <p>
                The {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;the Foundation&rdquo;) operates the websites at{' '}
                {siteConfig.domains.join(' and ')}. This policy explains how we
                handle personal information collected through our site.
              </p>
            </Policy>

            <Policy title="Information we collect">
              <p>We only collect information you choose to give us:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Buckle Up Pledge form:</strong> your name, and
                  optionally your email address, city, state, and a short
                  message.
                </li>
                <li>
                  <strong>Donations:</strong> when you donate, your payment is
                  processed securely by <strong>Stripe</strong>. Stripe collects
                  your name, email, and payment details. We receive a
                  confirmation with your name, email, and donation amount — but
                  we <strong>never see or store your full card number</strong>.
                </li>
                <li>
                  <strong>Emails you send us:</strong> if you contact us (for
                  example, about scholarships or volunteering), we keep your
                  message and email address to respond.
                </li>
              </ul>
            </Policy>

            <Policy title="How we use your information">
              <ul className="list-disc space-y-2 pl-6">
                <li>To record and recognize your pledge.</li>
                <li>To process donations and send you a receipt.</li>
                <li>
                  To send occasional updates about safety campaigns, scholarships,
                  and events — <em>only</em> if you shared your email, and you can
                  opt out anytime.
                </li>
                <li>To respond to your questions and requests.</li>
                <li>
                  To understand, in aggregate, how our mission is growing so we
                  can improve our programs.
                </li>
              </ul>
            </Policy>

            <Policy title="How your information is stored & shared">
              <p>
                We <strong>do not sell, rent, or trade</strong> your personal
                information — ever. We share it only with the trusted service
                providers that make this site work:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Stripe</strong> — secure payment processing.
                </li>
                <li>
                  <strong>Supabase</strong> — the database that stores pledges
                  and donation records.
                </li>
                <li>
                  <strong>Vercel</strong> — website hosting.
                </li>
              </ul>
              <p className="mt-3">
                Each of these providers maintains its own security and privacy
                practices. We may also disclose information if required by law.
              </p>
            </Policy>

            <Policy title="Cookies & tracking">
              <p>
                Our site uses only the essential cookies needed to function.
                Payment pages are hosted by Stripe, which may use cookies to
                process your transaction securely. We do not use invasive
                advertising trackers.
              </p>
            </Policy>

            <Policy title="Children's privacy">
              <p>
                We care deeply about young people — it&apos;s the heart of our
                mission. We do not knowingly collect personal information from
                children under 13. If you believe a child under 13 has given us
                information, please contact us and we will promptly delete it.
                Teens are welcome to take the pledge; we encourage those under 18
                to do so with a parent or guardian&apos;s awareness.
              </p>
            </Policy>

            <Policy title="Your choices & rights">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Access or deletion:</strong> you can ask us what
                  information we hold about you, or ask us to delete it.
                </li>
                <li>
                  <strong>Unsubscribe:</strong> you can opt out of emails at any
                  time.
                </li>
                <li>
                  <strong>Manage donations:</strong> monthly donors can update or
                  cancel a recurring gift at any time via the link in their
                  Stripe receipt, or by contacting us.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these, just email us at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-teal-800 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </Policy>

            <Policy title="Data security">
              <p>
                We take reasonable measures to protect your information,
                including working with providers who encrypt data in transit and
                at rest. No method of transmission over the internet is 100%
                secure, but we work to safeguard your information and limit access
                to it.
              </p>
            </Policy>

            <Policy title="Changes to this policy">
              <p>
                We may update this policy from time to time. When we do, we&apos;ll
                revise the &ldquo;Last updated&rdquo; date above. Significant
                changes will be highlighted on this page.
              </p>
            </Policy>

            <Policy title="Contact us">
              <p>
                Questions about your privacy or this policy? We&apos;re glad to
                help. Reach us at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-teal-800 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </Policy>
          </div>

          <div className="mt-12 rounded-2xl bg-teal-50 p-6 text-center">
            <p className="text-teal-800">
              Ready to make Kayla&apos;s mission your own?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/pledge" className="btn-accent">
                Take the Pledge
              </Link>
              <Link href="/donate" className="btn-outline">
                Donate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Policy({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-teal-900">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-teal-800">
        {children}
      </div>
    </div>
  );
}
