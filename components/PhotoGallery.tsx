import Image from 'next/image';

/**
 * PLACEHOLDER PHOTO GALLERY
 * ───────────────────────────────────────────────────────────────
 * These are stock placeholders so the memorial reads correctly before
 * real photos are added.
 *
 * TO ADD REAL PHOTOS OF KAYLA:
 *   1. Put photo files in `/public/kayla/gallery/` (e.g. gallery-1.jpg).
 *   2. Replace each `src` below with `/kayla/gallery/gallery-1.jpg`, etc.
 *   3. Write a real, descriptive `alt` for each photo.
 *   4. Add or remove entries to match how many photos you have.
 * ───────────────────────────────────────────────────────────────
 */

interface Photo {
  src: string;
  alt: string;
  /** `true` renders a taller tile for visual rhythm. */
  tall?: boolean;
}

const photos: Photo[] = [
  {
    src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — replace with a photo of Kayla',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — replace with a photo of Kayla with friends',
  },
  {
    src: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — replace with a family photo of Kayla',
  },
  {
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — replace with a candid photo of Kayla',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — replace with a photo of Kayla',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — replace with a portrait of Kayla',
  },
];

export default function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {photos.map((photo, i) => (
        <figure
          key={i}
          className={`group relative overflow-hidden rounded-2xl bg-teal-100 shadow-sm ring-1 ring-teal-900/10 ${
            photo.tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </figure>
      ))}
    </div>
  );
}
