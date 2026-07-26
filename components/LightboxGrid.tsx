'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxPhoto {
  src: string;
  alt: string;
  /** Renders a taller tile for masonry rhythm (gallery). */
  tall?: boolean;
  priority?: boolean;
}

/**
 * A responsive photo grid where clicking any photo opens it full-size in a
 * lightbox overlay, with keyboard (Esc / ← / →) and swipe-free arrow controls.
 * Used by both the memorial gallery and the Recent Events photos.
 */
export default function LightboxGrid({
  photos,
  sizes = '(min-width: 640px) 30vw, 45vw',
}: {
  photos: LightboxPhoto[];
  sizes?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;
  const current = index !== null ? photos[index] : null;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, i) => (
          <button
            type="button"
            key={photo.src}
            onClick={() => setIndex(i)}
            aria-label="Open photo full size"
            className={`group relative overflow-hidden rounded-2xl bg-teal-100 shadow-sm ring-1 ring-teal-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
              photo.tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              priority={photo.priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fade-in"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            autoFocus
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
              >
                <ChevronLeft className="h-7 w-7" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next photo"
                className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
              >
                <ChevronRight className="h-7 w-7" aria-hidden />
              </button>
            </>
          )}

          {/* Full-size view. Plain img keeps object-contain simple at any aspect. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />

          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {index + 1} / {photos.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
