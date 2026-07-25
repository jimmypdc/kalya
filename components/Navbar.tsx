'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';

/**
 * Sticky, responsive navigation bar with a mobile hamburger menu.
 * Highlights the active route and adds a subtle shadow once scrolled.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add elevation after a small scroll for a polished sticky effect.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled
          ? 'border-teal-900/10 bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-white/80 backdrop-blur'
      }`}
    >
      <nav
        className="container-content flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-bold text-teal-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-900 text-white">
            <Heart className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden />
          </span>
          <span className="leading-tight">
            Buckle Up
            <span className="block text-xs font-medium uppercase tracking-widest text-gold-500">
              for Kayla
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-teal-50 text-teal-900'
                    : 'text-teal-800 hover:bg-teal-50 hover:text-teal-900'
                }`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 xl:flex">
          <Link href="/pledge" className="btn-outline">
            Take the Pledge
          </Link>
          <Link href="/donate" className="btn-accent">
            Donate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost -mr-2 p-2 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-teal-900/10 bg-white xl:hidden"
        >
          <ul className="container-content flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(link.href)
                      ? 'bg-teal-50 text-teal-900'
                      : 'text-teal-800 hover:bg-teal-50'
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2 border-t border-teal-900/10 pt-4">
              <Link href="/pledge" className="btn-outline w-full">
                Take the Pledge
              </Link>
              <Link href="/donate" className="btn-accent w-full">
                Donate
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Screen-reader-only foundation name for context */}
      <span className="sr-only">{siteConfig.name}</span>
    </header>
  );
}
