import Image from 'next/image';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * MEMORIAL PHOTO GALLERY (auto-discovering)
 * ───────────────────────────────────────────────────────────────
 * This reads every image file in `public/kayla/` and displays it — so to add
 * photos of Kayla, you just drop image files into that folder and redeploy.
 * No code changes needed.
 *
 *   - Supported types: .jpg .jpeg .png .webp .avif .gif
 *   - Photos are shown in alphabetical order by filename. To control the
 *     order, prefix names with numbers, e.g. 01-portrait.jpg, 02-beach.jpg.
 *
 * If the folder has no images yet, a set of labeled placeholders is shown so
 * the design still reads correctly.
 * ───────────────────────────────────────────────────────────────
 */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

interface Photo {
  src: string;
  alt: string;
  tall?: boolean;
}

// Fallback placeholders (used only when no real photos exist yet).
const placeholders: Photo[] = [
  {
    src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — add photos to public/kayla/ to replace this',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — add photos to public/kayla/ to replace this',
  },
  {
    src: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — add photos to public/kayla/ to replace this',
  },
  {
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — add photos to public/kayla/ to replace this',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — add photos to public/kayla/ to replace this',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    alt: 'Placeholder — add photos to public/kayla/ to replace this',
  },
];

/** Read the real photos from public/kayla (build-time / server-side). */
async function loadPhotos(): Promise<Photo[]> {
  try {
    const dir = join(process.cwd(), 'public', 'kayla');
    const files = (await readdir(dir))
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b));

    return files.map((file, i) => ({
      src: `/kayla/${file}`,
      alt: 'A cherished photo of Kayla Marie Joiner',
      // Give a couple of tiles extra height for visual rhythm.
      tall: i % 5 === 0,
    }));
  } catch {
    return [];
  }
}

export default async function PhotoGallery() {
  const real = await loadPhotos();
  const photos = real.length > 0 ? real : placeholders;
  const usingPlaceholders = real.length === 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
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
              // Real photos live under /public and don't need optimization config;
              // priority the first image for a fast first paint.
              priority={i === 0}
            />
          </figure>
        ))}
      </div>

      {usingPlaceholders && (
        <p className="mt-4 text-center text-xs text-teal-500">
          These are placeholder images. Add photos of Kayla to{' '}
          <code className="rounded bg-teal-50 px-1">public/kayla/</code> and they
          will appear here automatically.
        </p>
      )}
    </div>
  );
}
