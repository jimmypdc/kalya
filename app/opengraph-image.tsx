import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Dynamically-generated social share image (Open Graph).
 *
 * Next.js automatically wires this up as the site's `og:image` — so when
 * someone shares a link on Facebook, iMessage, LinkedIn, Slack, etc., they see
 * a branded 1200×630 card featuring Kayla's photo.
 *
 * The photo is read from `public/kayla/kayla-portrait.jpg` at build time and
 * embedded. If that file is ever missing, the card falls back to a clean
 * text-only design so the build never breaks.
 */

export const alt = 'Buckle Up for Kayla — Kayla Marie Joiner Foundation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Attempt to load Kayla's portrait as a data URI (build-time filesystem read).
async function loadPortrait(): Promise<string | null> {
  try {
    const data = await readFile(
      join(process.cwd(), 'public', 'kayla', 'kayla-portrait.jpg'),
    );
    return `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'linear-gradient(135deg, #042f2e 0%, #134e4a 55%, #0f766e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: text panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px',
            flex: portrait ? '1 1 0' : '1 1 100%',
          }}
        >
          {/* Top: heart mark + foundation name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.10)',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#fbbf24">
                <path d="M12 21s-6.716-4.35-9.428-8.06C.86 10.28 1.4 6.9 4.2 5.6c1.98-.92 4.26-.28 5.4 1.3L12 9l2.4-2.1c1.14-1.58 3.42-2.22 5.4-1.3 2.8 1.3 3.34 4.68 1.628 7.34C18.716 16.65 12 21 12 21z" />
              </svg>
            </div>
            <div
              style={{
                fontSize: '26px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#5eead4',
                fontWeight: 700,
              }}
            >
              Kayla Marie Joiner Foundation
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '92px', fontWeight: 800, lineHeight: 1.02 }}>
              Buckle Up.
            </div>
            <div
              style={{
                fontSize: '92px',
                fontWeight: 800,
                lineHeight: 1.02,
                color: '#fbbf24',
              }}
            >
              For Kayla.
            </div>
            <div
              style={{ marginTop: '22px', fontSize: '30px', color: '#ccfbf1' }}
            >
              Teen seatbelt safety · Pediatric nursing scholarships
            </div>
          </div>

          {/* Bottom: gold accent + dates */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '110px',
                height: '8px',
                borderRadius: '999px',
                background: '#fbbf24',
              }}
            />
            <div style={{ fontSize: '24px', color: '#99f6e4' }}>
              In loving memory · 1991 – 2007
            </div>
          </div>
        </div>

        {/* Right: Kayla's photo (only if available) */}
        {portrait && (
          <div
            style={{
              display: 'flex',
              width: '440px',
              height: '100%',
              position: 'relative',
              borderLeft: '8px solid #fbbf24',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt=""
              width={440}
              height={630}
              style={{ width: '440px', height: '630px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
