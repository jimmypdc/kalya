import { ImageResponse } from 'next/og';

/**
 * Dynamically-generated social share image (Open Graph).
 *
 * Next.js automatically wires this up as the site's `og:image` — so when
 * someone shares a link on Facebook, iMessage, LinkedIn, Slack, etc., they see
 * a branded 1200×630 card instead of a blank preview.
 *
 * It's rendered from code (brand colors + text), so there's no image file to
 * manage. To use a real photo of Kayla instead, you can replace this with a
 * static image: delete this file and add `app/opengraph-image.jpg` (1200×630).
 */

export const alt = 'Buckle Up for Kayla — Kayla Marie Joiner Foundation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          // Deep teal brand gradient.
          background:
            'linear-gradient(135deg, #042f2e 0%, #134e4a 55%, #0f766e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row: heart mark + foundation name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '72px',
              height: '72px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.10)',
            }}
          >
            {/* Gold heart */}
            <svg width="38" height="38" viewBox="0 0 24 24" fill="#fbbf24">
              <path d="M12 21s-6.716-4.35-9.428-8.06C.86 10.28 1.4 6.9 4.2 5.6c1.98-.92 4.26-.28 5.4 1.3L12 9l2.4-2.1c1.14-1.58 3.42-2.22 5.4-1.3 2.8 1.3 3.34 4.68 1.628 7.34C18.716 16.65 12 21 12 21z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: '30px',
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
          <div
            style={{
              fontSize: '104px',
              fontWeight: 800,
              lineHeight: 1.02,
            }}
          >
            Buckle Up.
          </div>
          <div
            style={{
              fontSize: '104px',
              fontWeight: 800,
              lineHeight: 1.02,
              color: '#fbbf24',
            }}
          >
            For Kayla.
          </div>
          <div
            style={{
              marginTop: '26px',
              fontSize: '34px',
              color: '#ccfbf1',
              maxWidth: '900px',
            }}
          >
            Teen seatbelt safety · Pediatric nursing scholarships
          </div>
        </div>

        {/* Bottom row: gold accent bar + dates */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '120px',
              height: '8px',
              borderRadius: '999px',
              background: '#fbbf24',
            }}
          />
          <div style={{ fontSize: '26px', color: '#99f6e4' }}>
            In loving memory · May 29, 1991 – October 22, 2007
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
