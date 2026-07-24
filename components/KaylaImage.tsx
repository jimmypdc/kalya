import Image from 'next/image';

/**
 * PLACEHOLDER IMAGE COMPONENT
 * ───────────────────────────────────────────────────────────────
 * These are stock placeholder images so the design reads correctly
 * before real photos are added.
 *
 * TO SWAP IN REAL PHOTOS OF KAYLA:
 *   1. Add the photo files to `/public/kayla/` (e.g. kayla-hero.jpg).
 *   2. Replace the `src` below with `/kayla/kayla-hero.jpg`, etc.
 *   3. Update each `alt` text to describe the actual photo.
 *   4. You can then remove the Unsplash entries from
 *      next.config.mjs `images.remotePatterns`.
 * ───────────────────────────────────────────────────────────────
 */

type Variant = 'hero' | 'portrait' | 'candid' | 'scholarship' | 'safety';

const PLACEHOLDERS: Record<Variant, { src: string; alt: string }> = {
  // TODO: replace with a favorite portrait of Kayla.
  hero: {
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80',
    alt: 'Placeholder — replace with a photo of Kayla Marie Joiner',
  },
  portrait: {
    src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',
    alt: 'Placeholder portrait — replace with a photo of Kayla',
  },
  candid: {
    src: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1000&q=80',
    alt: 'Placeholder — replace with a candid photo of Kayla with friends or family',
  },
  scholarship: {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    alt: 'Placeholder — a nursing student, reflecting Kayla’s dream of pediatric nursing',
  },
  safety: {
    src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Placeholder — a fastened seatbelt, representing the Buckle Up message',
  },
};

interface KaylaImageProps {
  variant: Variant;
  className?: string;
  priority?: boolean;
  /** Override alt text when you know the real photo's content. */
  alt?: string;
  sizes?: string;
}

export default function KaylaImage({
  variant,
  className = '',
  priority = false,
  alt,
  sizes = '(min-width: 1024px) 40vw, 100vw',
}: KaylaImageProps) {
  const { src, alt: defaultAlt } = PLACEHOLDERS[variant];
  return (
    <Image
      src={src}
      alt={alt ?? defaultAlt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
