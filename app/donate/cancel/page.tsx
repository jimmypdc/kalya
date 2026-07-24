import type { Metadata } from 'next';
import Link from 'next/link';
import { HeartHandshake, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donation Canceled',
  description: 'Your donation was canceled. You can try again anytime.',
  robots: { index: false, follow: false },
};

/** Shown when a donor cancels or backs out of Stripe Checkout. */
export default function DonateCancelPage() {
  return (
    <section className="section">
      <div className="container-content flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
          <HeartHandshake className="h-11 w-11 text-teal-700" aria-hidden />
        </div>

        <h1 className="mt-6 font-serif text-4xl font-bold text-teal-900">
          No worries at all
        </h1>
        <p className="mt-4 max-w-xl text-lg text-teal-700">
          Your donation wasn&apos;t completed and you haven&apos;t been charged.
          If something went wrong or you changed your mind, you&apos;re always
          welcome to try again — every gift makes a difference.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/donate" className="btn-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Return to donate
          </Link>
          <Link href="/get-involved" className="btn-outline">
            Explore other ways to help
          </Link>
        </div>

        <p className="mt-8 max-w-md text-sm text-teal-600">
          Prefer not to give today? Taking the{' '}
          <Link
            href="/pledge"
            className="font-semibold text-teal-800 underline underline-offset-4"
          >
            Buckle Up Pledge
          </Link>{' '}
          is a powerful, free way to honor Kayla.
        </p>
      </div>
    </section>
  );
}
