import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { imageSize } from 'image-size';
import LightboxGrid, { type LightboxPhoto } from '@/components/LightboxGrid';

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

type Photo = LightboxPhoto;

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
    // The campaign poster is shown in full on /buckle-up, not in this grid.
    const EXCLUDE = new Set(['buckle-up-poster.jpg']);
    const files = (await readdir(dir))
      .filter((f) => IMAGE_EXT.test(f) && !EXCLUDE.has(f.toLowerCase()))
      // Keep the portrait first (it's also the Story/share image); the rest
      // follow in alphabetical order — prefix names with numbers to arrange.
      .sort((a, b) => {
        if (a === 'kayla-portrait.jpg') return -1;
        if (b === 'kayla-portrait.jpg') return 1;
        return a.localeCompare(b);
      });

    // Read each photo's intrinsic dimensions so the masonry layout can
    // preserve its natural aspect ratio (no cropped faces).
    return Promise.all(
      files.map(async (file, i): Promise<Photo> => {
        let width: number | undefined;
        let height: number | undefined;
        try {
          const dims = imageSize(await readFile(join(dir, file)));
          width = dims.width;
          height = dims.height;
        } catch {
          // Unreadable dimensions — the layout falls back to a 4:3 box.
        }
        return {
          src: `/kayla/${file}`,
          alt: 'A cherished photo of Kayla Marie Joiner',
          width,
          height,
          priority: i === 0,
        };
      }),
    );
  } catch {
    return [];
  }
}

export default async function PhotoGallery() {
  const real = await loadPhotos();
  const usingPlaceholders = real.length === 0;
  const photos: LightboxPhoto[] = usingPlaceholders ? placeholders : real;

  return (
    <div>
      {/* Real photos: masonry preserves each photo's own shape. Placeholders
          (remote stock, unknown dimensions) fall back to the uniform grid. */}
      <LightboxGrid
        photos={photos}
        sizes="(min-width: 640px) 30vw, 45vw"
        layout={usingPlaceholders ? 'grid' : 'masonry'}
      />

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
