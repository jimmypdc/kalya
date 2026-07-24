import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Heart, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your generous donation to the Kayla Marie Joiner Foundation.',
  robots: { index: false, follow: false },
};

/**
 * Donation success page. Stripe redirects here after a completed checkout,
 * appending `?session_id=...`. The donation itself is recorded server-side by
 * the Stripe webhook — this page is purely a warm confirmation for the donor.
 */
export default function DonateSuccessPage() {
  return (
    <section className="section">
      <div className="container-content flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
          <CheckCircle2 className="h-11 w-11 text-teal-700" aria-hidden />
        </div>

        <h1 className="mt-6 font-serif text-4xl font-bold text-teal-900">
          Thank you for your gift. 💛
        </h1>
        <p className="mt-4 max-w-xl text-lg text-teal-700">
          Your generosity directly funds scholarships for future pediatric
          nurses and safety campaigns that keep teens buckled up. You&apos;ve
          just helped carry Kayla&apos;s light forward — and we&apos;re so
          grateful.
        </p>

        <p className="mt-4 max-w-xl text-sm text-teal-600">
          A receipt has been sent to your email by Stripe. If you set up a
          monthly gift, you can manage or cancel it anytime via the link in your
          confirmation email.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Heart className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
          <Link href="/get-involved" className="btn-outline">
            <Share2 className="h-4 w-4" aria-hidden />
            Help spread the word
          </Link>
        </div>

        <div className="mt-12 max-w-md rounded-2xl border border-teal-900/10 bg-teal-50 p-6">
          <p className="font-serif text-lg italic text-teal-900">
            &ldquo;We promise, Kayla, we&apos;ll be safe — because your love is
            everywhere.&rdquo;
          </p>
          <p className="mt-2 text-sm text-teal-600">— from a tribute by Kasidi Lee</p>
        </div>
      </div>
    </section>
  );
}
