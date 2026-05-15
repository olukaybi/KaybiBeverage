import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kayora Premium Purified Water — Purified to the Highest Standard. Safe for Every Table.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#003B7A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Decorative circle — top right */}
        <div
          style={{
            position: 'absolute',
            right: '-60px',
            top: '-60px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'rgba(62, 130, 207, 0.18)',
            display: 'flex',
          }}
        />
        {/* Decorative circle — bottom left */}
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            bottom: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'rgba(201, 161, 74, 0.08)',
            display: 'flex',
          }}
        />

        {/* Top: brand name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '88px',
              fontWeight: 700,
              color: '#FAF8F4',
              letterSpacing: '-0.025em',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'flex-end',
              gap: '6px',
            }}
          >
            Kayora
            <span style={{ color: '#C9A14A', fontSize: '28px', marginBottom: '12px' }}>•</span>
          </div>
          <div
            style={{
              fontSize: '15px',
              color: '#C9A14A',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}
          >
            PREMIUM PURIFIED WATER
          </div>
        </div>

        {/* Middle: taglines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 700,
              color: '#FAF8F4',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            Purified to the Highest Standard.
          </div>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(250, 248, 244, 0.65)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Safe for Every Table.
          </div>
        </div>

        {/* Bottom: cert badge + origin */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              background: 'rgba(201, 161, 74, 0.12)',
              border: '1px solid rgba(201, 161, 74, 0.35)',
              borderRadius: '8px',
              padding: '10px 20px',
              color: '#C9A14A',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            NAFDAC Reg. A1-111026 · SON MANCAP Registered
          </div>
          <div
            style={{
              color: 'rgba(250, 248, 244, 0.35)',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Made in Eket, Akwa Ibom · Nigeria
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
