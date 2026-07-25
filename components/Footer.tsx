import Link from 'next/link';
import { Heart, Mail, Shield } from 'lucide-react';
import { navLinks, siteConfig, kayla } from '@/lib/site';

/**
 * Site footer: mission reminder, navigation, contact, and legal note.
 */
export default function Footer() {
  const year = 2025; // Static to keep server/client render deterministic; bump as needed.

  return (
    <footer className="mt-auto border-t border-teal-900/10 bg-teal-950 text-teal-100">
      <div className="container-content grid gap-10 py-14 md:grid-cols-4">
        {/* Brand + mission */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-serif text-xl font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 text-white">
              <Heart className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden />
            </span>
            {siteConfig.name}
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-teal-200">
            In loving memory of {kayla.fullName} ({kayla.born} –{' '}
            {kayla.passed}). We champion teen seatbelt safety and fund
            scholarships for future pediatric nurses — so Kayla&apos;s light keeps
            saving lives.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pledge" className="btn-accent">
              Take the Pledge
            </Link>
            <Link href="/donate" className="btn-outline border-teal-700 bg-transparent text-white hover:bg-teal-900">
              Donate
            </Link>
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-teal-200 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/donate"
                className="text-teal-200 transition-colors hover:text-white"
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            Connect
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-teal-200 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {siteConfig.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2 text-teal-300">
              <Shield className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>
                A nonprofit foundation. Donations may be tax-deductible as
                allowed by law.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-teal-900">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-teal-300 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-teal-300 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <p className="flex items-center gap-1.5">
              Made with{' '}
              <Heart
                className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                aria-hidden
              />{' '}
              in Kayla&apos;s memory.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
