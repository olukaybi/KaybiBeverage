/**
 * Generates the static Open Graph image at public/og-image.png (1200×630).
 *
 * Facebook's crawler fails to render the dynamic /opengraph-image route in
 * link previews, so the committed static PNG is the primary og:image and
 * this script keeps it reproducible. Re-run after design changes:
 *
 *   node scripts/generate-og-image.mjs
 */
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const bottle = readFileSync(join(root, 'public/04_kayora_50cl_single.png'));
const bottleSrc = `data:image/png;base64,${bottle.toString('base64')}`;

const NAVY = '#0a1c36';
const CREAM = '#FAF8F4';
const GOLD = '#C9A14A';

// Plain element trees (no JSX — this runs as a standalone node script)
const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

const image = new ImageResponse(
  h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      background: NAVY,
      fontFamily: 'sans-serif',
    },
    // Left: brand + tagline
    h(
      'div',
      {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 24px 56px 72px',
      },
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h(
          'div',
          { display: 'flex', alignItems: 'flex-end' },
          h('div', { fontSize: 84, fontWeight: 700, color: CREAM, lineHeight: 1, letterSpacing: '-0.02em' }, 'Kayora'),
          h('div', { fontSize: 26, color: GOLD, marginBottom: 44, marginLeft: 4 }, '™')
        ),
        h(
          'div',
          { fontSize: 17, color: GOLD, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 10 },
          'Premium Purified Water'
        )
      ),
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h(
          'div',
          { fontSize: 47, fontWeight: 600, color: CREAM, lineHeight: 1.18, letterSpacing: '-0.01em' },
          'Purified to the Highest Standard. Safe for Every Table.'
        ),
        h(
          'div',
          { fontSize: 26, color: 'rgba(250, 248, 244, 0.6)', marginTop: 18, fontStyle: 'italic' },
          'Wellness in every drop!'
        )
      ),
      h(
        'div',
        { display: 'flex', alignItems: 'center' },
        h(
          'div',
          {
            background: 'rgba(201, 161, 74, 0.12)',
            border: '1px solid rgba(201, 161, 74, 0.4)',
            borderRadius: 8,
            padding: '10px 18px',
            color: GOLD,
            fontSize: 15,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'flex',
          },
          'NAFDAC Reg. A1-111026'
        ),
        h(
          'div',
          { color: 'rgba(250, 248, 244, 0.45)', fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase', marginLeft: 20 },
          'Made in Eket, Akwa Ibom'
        )
      )
    ),
    // Right: bottle in a light rounded panel
    h(
      'div',
      { width: 400, display: 'flex', padding: '44px 48px 44px 0' },
      h(
        'div',
        {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #eef5fb 0%, #dceaf6 100%)',
          borderRadius: 28,
          overflow: 'hidden',
        },
        {
          type: 'img',
          props: {
            src: bottleSrc,
            width: 340,
            height: 455,
            style: { objectFit: 'contain' },
          },
        }
      )
    )
  ),
  { width: 1200, height: 630 }
);

const buffer = Buffer.from(await image.arrayBuffer());
writeFileSync(join(root, 'public/og-image.png'), buffer);
console.log(`public/og-image.png written (${(buffer.length / 1024).toFixed(0)} KB)`);
