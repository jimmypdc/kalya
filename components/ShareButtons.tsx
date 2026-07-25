'use client';

import { useEffect, useState } from 'react';
import { Facebook, Twitter, Mail, Link2, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  /** Absolute URL to share. Defaults to the current page at click time. */
  url?: string;
  /** Short title/subject for the share. */
  title?: string;
  /** Longer share text (used for X, email, and native share). */
  text?: string;
  className?: string;
}

/**
 * Social share buttons: Facebook, X, email, copy-link, and the native mobile
 * share sheet when available. Encourages visitors to spread Kayla's story.
 */
export default function ShareButtons({
  url,
  title = 'Buckle Up for Kayla',
  text = "Join me in honoring Kayla Marie Joiner — take the Buckle Up pledge and help keep teens safe.",
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  // Only enable the native share sheet AFTER mount. `navigator.share` is
  // undefined during server render, so deciding at render time would produce a
  // server/client HTML mismatch (hydration error). Gating on `mounted` keeps
  // the first client render identical to the server, then reveals it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Resolve the URL at click time so it works regardless of where it's used.
  const getUrl = () =>
    url ?? (typeof window !== 'undefined' ? window.location.href : '');

  function openPopup(shareUrl: string) {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=560');
  }

  function shareFacebook() {
    openPopup(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
    );
  }

  function shareX() {
    openPopup(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        getUrl(),
      )}&text=${encodeURIComponent(text)}`,
    );
  }

  function shareEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      title,
    )}&body=${encodeURIComponent(`${text}\n\n${getUrl()}`)}`;
  }

  async function nativeShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: getUrl() });
      } catch {
        // User dismissed the share sheet — nothing to do.
      }
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — fall back to the native sheet if possible.
      void nativeShare();
    }
  }

  const canNativeShare =
    mounted && typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <ShareBtn label="Share on Facebook" onClick={shareFacebook}>
        <Facebook className="h-4 w-4" aria-hidden />
      </ShareBtn>
      <ShareBtn label="Share on X" onClick={shareX}>
        <Twitter className="h-4 w-4" aria-hidden />
      </ShareBtn>
      <ShareBtn label="Share by email" onClick={shareEmail}>
        <Mail className="h-4 w-4" aria-hidden />
      </ShareBtn>
      <ShareBtn label={copied ? 'Link copied' : 'Copy link'} onClick={copyLink}>
        {copied ? (
          <Check className="h-4 w-4 text-teal-700" aria-hidden />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden />
        )}
      </ShareBtn>
      {canNativeShare && (
        <ShareBtn label="Share…" onClick={nativeShare}>
          <Share2 className="h-4 w-4" aria-hidden />
        </ShareBtn>
      )}
      {copied && (
        <span className="text-sm font-medium text-teal-700" role="status">
          Link copied!
        </span>
      )}
    </div>
  );
}

function ShareBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal-900/15 bg-white text-teal-800 transition-colors hover:border-teal-500 hover:bg-teal-50 hover:text-teal-900 focus-visible:ring-2 focus-visible:ring-gold-400"
    >
      {children}
    </button>
  );
}
