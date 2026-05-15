# Kayora Design System

**For:** Kayora Premium Purified Water website build
**Audience:** Claude Code (and any future developer)
**Goal:** A premium, distinctly Nigerian visual system. Refined enough to sit beside Voss or Acqua Panna; warm enough to feel rooted in Akwa Ibom rather than airlifted in from Switzerland.

---

## Brand foundations

**Tagline:** Purified to the Highest Standard. Safe for Every Table.

**Visual mood:** Deep water clarity meets warm earth. Calm, confident, uncluttered. Generous whitespace. Never tropical, never folkloric — modern Nigerian premium.

**What we avoid:**
- Stock "drop splash" water photography
- Heavy gradients, glassmorphism, neon
- Cheap blue gradient buttons
- Decorative tribal patterns used as ornament
- Sans-serif everything (the serif is part of the identity)

---

## 1. Color tokens

The palette is anchored by deep ocean blue (the water story) and warm clay (the Nigerian story). Gold and cream provide premium signals. Use sparingly — restraint is the whole point.

### Primary

| Token | Hex | Usage |
|---|---|---|
| `kayora-blue-900` | `#003B7A` | Primary brand color. Logos, primary buttons, headers on dark sections. |
| `kayora-blue-700` | `#1A5BA8` | Hover states, links, secondary emphasis. |
| `kayora-blue-500` | `#3E82CF` | Active states, subtle accents. |
| `kayora-blue-100` | `#E0EBF7` | Soft backgrounds, tag chips, hover tints. |

### Earth accents

| Token | Hex | Usage |
|---|---|---|
| `kayora-clay-700` | `#A04428` | Reserved — major callouts, distributor CTAs. Use rarely. |
| `kayora-clay-500` | `#C45A3E` | Primary clay accent. Section dividers, highlight type, cultural anchors. |
| `kayora-clay-300` | `#E1A48E` | Soft accent washes, illustration secondary color. |
| `kayora-gold-500` | `#C9A14A` | Premium signal. Award badges, certification marks, fine rules. |
| `kayora-gold-100` | `#F5EBD0` | Subtle background washes on premium content blocks. |

### Neutrals

| Token | Hex | Usage |
|---|---|---|
| `kayora-ink` | `#1A1A1A` | Primary text. |
| `kayora-graphite` | `#3D3D3D` | Secondary text. |
| `kayora-stone` | `#6B6B6B` | Captions, metadata, form helpers. |
| `kayora-mist` | `#E8E5DF` | Borders, dividers, input outlines. |
| `kayora-cream` | `#FAF8F4` | Default page background (NOT pure white). |
| `kayora-white` | `#FFFFFF` | Cards on cream background, modals. |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| `kayora-success` | `#2D7A4F` | Form success states. |
| `kayora-warning` | `#C49A28` | Form validation warnings. |
| `kayora-danger` | `#B83A2E` | Error states. |

### Tailwind config block

Drop this into `tailwind.config.ts` under `theme.extend.colors`:

```ts
colors: {
  'kayora-blue': {
    100: '#E0EBF7',
    500: '#3E82CF',
    700: '#1A5BA8',
    900: '#003B7A',
  },
  'kayora-clay': {
    300: '#E1A48E',
    500: '#C45A3E',
    700: '#A04428',
  },
  'kayora-gold': {
    100: '#F5EBD0',
    500: '#C9A14A',
  },
  'kayora-ink': '#1A1A1A',
  'kayora-graphite': '#3D3D3D',
  'kayora-stone': '#6B6B6B',
  'kayora-mist': '#E8E5DF',
  'kayora-cream': '#FAF8F4',
  'kayora-success': '#2D7A4F',
  'kayora-warning': '#C49A28',
  'kayora-danger': '#B83A2E',
}
```

---

## 2. Typography

A serif/sans pair. Serif carries the brand personality; sans does the working. Both variable fonts for performance.

### Font families

- **Display & headings:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — variable, optical sizing enabled, soft modulation set to "soft." Use weights 400 (subheads), 500 (eyebrow), 600 (most headlines), 700 (hero).
- **Body & UI:** [Inter](https://fonts.google.com/specimen/Inter) — variable. Weights 400 (body), 500 (UI labels), 600 (buttons, emphasis), 700 (rarely).

Load both via `next/font/google` with `display: 'swap'` and CSS variables.

### Type scale

Fluid, clamp-based. Heading sizes scale with viewport.

| Token | Size (clamp) | Usage |
|---|---|---|
| `display-xl` | `clamp(3rem, 6vw, 5.5rem)` | Hero headlines only. |
| `display-lg` | `clamp(2.5rem, 4.5vw, 4rem)` | Page hero headlines (About, Distribution, Contact). |
| `display-md` | `clamp(2rem, 3.5vw, 3rem)` | Major section headlines. |
| `h1` | `clamp(1.75rem, 2.5vw, 2.25rem)` | Subsection headlines. |
| `h2` | `clamp(1.5rem, 2vw, 1.75rem)` | Card titles. |
| `h3` | `1.25rem` | Component titles. |
| `body-lg` | `1.125rem / 1.7` | Lead paragraphs, hero subheads. |
| `body` | `1rem / 1.65` | Default body. |
| `body-sm` | `0.875rem / 1.6` | Form helpers, captions. |
| `caption` | `0.75rem / 1.5` | Metadata, footnotes. |
| `eyebrow` | `0.75rem / 1.4, tracking 0.12em, uppercase` | Section eyebrows above headlines. |

### Type rules

- **Display tracking:** tight, around `-0.02em`.
- **Body tracking:** default.
- **Maximum line length:** body text capped at `65ch`.
- **Headings:** never `text-align: justify`. Avoid widows on display headlines — manual `<br />` where needed.
- **Italics:** Fraunces italic is beautiful — use sparingly for emphasis in body and for one-word display flourishes.

### Tailwind extension

```ts
fontFamily: {
  display: ['var(--font-fraunces)', 'Georgia', 'serif'],
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
},
fontSize: {
  'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  'display-lg': ['clamp(2.5rem, 4.5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
  'display-md': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
  'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
},
```

---

## 3. Spacing & layout

### Container

- Max width: `1280px`
- Horizontal padding: `clamp(1rem, 4vw, 2.5rem)`
- Center-aligned

### Section rhythm

- Vertical section padding: `clamp(4rem, 8vw, 8rem)` top and bottom
- Inner content stack: `space-y` of `2rem` between blocks, `3rem` between subsections

### Grid

- Default content grid: 12 columns, gap `clamp(1rem, 2vw, 2rem)`
- Cards: prefer CSS grid `repeat(auto-fit, minmax(280px, 1fr))` for SKU and pillar grids

### Breakpoints (Tailwind defaults are fine)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Mobile reference: design and test at **375px** first.

---

## 4. Components

### Buttons

Three variants. All have a `min-h-12` (48px touch target).

**Primary**
- Background: `kayora-blue-900`
- Text: `kayora-cream`
- Hover: background shifts to `kayora-blue-700`
- Used for: primary page CTAs (Order, Apply, Submit)

**Secondary**
- Background: transparent
- Border: 1.5px `kayora-blue-900`
- Text: `kayora-blue-900`
- Hover: background `kayora-blue-100`
- Used for: secondary CTAs (Become a Distributor, Learn More)

**Accent (use rarely)**
- Background: `kayora-clay-500`
- Text: `kayora-cream`
- Hover: background `kayora-clay-700`
- Used for: featured distributor CTAs and high-energy moments

Padding: `px-6 py-3`. Border radius: `rounded-md` (6px). Font: Inter 600. No drop shadows.

### Cards

- Background: `kayora-white`
- Border: 1px `kayora-mist`
- Border radius: `rounded-xl` (12px)
- Padding: `p-6 md:p-8`
- Shadow: subtle, only on hover (`shadow-sm` → `shadow-md`)

### Form inputs

- Height: `h-12`
- Border: 1.5px `kayora-mist`
- Border radius: `rounded-md`
- Focus: ring 2px `kayora-blue-500`, no outline
- Padding: `px-4`
- Label: `eyebrow` style above input
- Error: border becomes `kayora-danger`, helper text appears in `kayora-danger`

### Site header

- Sticky, `top-0`
- Transparent over the hero (white logo + nav text)
- Solid `kayora-cream` with subtle bottom border after scroll past hero
- Mobile: hamburger drawer from the right
- Includes a prominent "Order" button on desktop

### Site footer

- Background: `kayora-blue-900`
- Text: `kayora-cream`
- Four columns on desktop, stacked on mobile
- Columns: Company / Products / Get in Touch / Legal
- Includes NAFDAC and MANCAP numbers prominently
- Bottom strip: copyright + small social icons

### Trust strip

- Slim horizontal bar of four certification/quality marks
- Sits directly under hero on Home
- Subtle separator dots between items, all small caps `eyebrow` style
- Background: `kayora-cream`, top/bottom 1px `kayora-mist` border

### SKU card

- Square-ish aspect (e.g. `aspect-[4/5]`)
- Top half: product photography on `kayora-blue-100` background
- Bottom half: SKU name + nickname + one-line use case + small "Learn more" arrow link
- Hover: very subtle lift, image zooms 1.03x with `ease-out` over 400ms

### Process steps (Six-stage)

- Numbered 01–06 in Fraunces `display-md`, color `kayora-gold-500`
- Step title in Inter 600, body below
- Desktop: 3-column grid, 2 rows
- Mobile: vertical stack with left-aligned numbers
- Optional: thin connector line between numbered circles on desktop

### Pillar grid (Why Kayora)

- Three columns desktop, single column mobile
- Each pillar: short headline (Fraunces, h2) + 2-3 sentence body
- Small icon or numeral above each — keep monoline, not illustrative

---

## 5. Motion

### Principles

- **Restrained.** No bouncing, no spring physics, no decorative animation.
- **Purposeful.** Motion clarifies hierarchy or reveals content — never decorates.
- **Respectful.** All motion respects `prefers-reduced-motion`.

### Standard timings

| Token | Duration | Ease | Used for |
|---|---|---|---|
| `motion-fast` | 200ms | `ease-out` | Hover, focus, small UI state changes |
| `motion-base` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Image zooms, card lifts |
| `motion-reveal` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll-triggered section reveals |

### Patterns

**Scroll reveal (default):** opacity `0 → 1`, transform `translateY(20px) → translateY(0)`, threshold 0.15, runs once per element. Use Framer Motion `whileInView` with `viewport={{ once: true, amount: 0.15 }}`.

**Hero parallax:** very gentle. The background image shifts `translateY(0)` to `translateY(-40px)` across the hero's height. Don't exceed 50px of travel.

**Image hover (SKU cards):** scale `1` to `1.03`, 400ms, ease-out. No rotation, no tilt.

**Page transitions:** none. Standard router behaviour. The site should feel solid, not animated.

### Reduced motion

Always wrap motion-bearing components with `motion-safe:` Tailwind variants, OR check `useReducedMotion()` from Framer Motion and disable transforms accordingly.

---

## 6. Imagery direction

### Hero photography

**Concept:** Kayora bottles photographed in real Nigerian environments. Not on white backgrounds. Not on tropical beaches. Real settings.

**Examples to brief a photographer (or substitute with Unsplash placeholders for now):**
- 50cl bottle on a polished wooden table in an Eket office, late afternoon light through louvre windows
- 30cl bottle in an ice bucket at a wedding reception, soft-focus dancing crowd behind
- 18.9L dispenser in a corporate reception area, sharp geometric lines
- 75cl bottle in the hand of a runner on a Uyo road, motion blur background

**Placeholder strategy until real photography arrives:** use Unsplash sourced via `next/image` from `images.unsplash.com`. Tag each placeholder with an HTML comment indicating what real photography should replace it.

### Illustration

For the Six-Stage Process: clean monoline illustrations. Single weight, single color (`kayora-blue-900` on `kayora-cream`). No drop shadows, no gradients. Stripped-down and technical. Reference: pharmaceutical or scientific instrument diagrams, not whimsical infographics.

### Patterns

A single decorative pattern is permitted: a subtle water ripple SVG, used sparingly as a section divider or background flourish at very low opacity (≤8%). Color: `kayora-blue-900`. Never as a full-bleed background.

---

## 7. Voice in UI microcopy

The brand voice extends into UI labels and microcopy. Avoid generic SaaS phrasing.

| Standard | Kayora |
|---|---|
| "Submit" | "Send Message" / "Apply" / "Place Order" |
| "Loading..." | "One moment..." |
| "Error: Please try again." | "Something went wrong on our end. Try again in a moment." |
| "Thank you for your submission!" | "Thank you. We've received your message and will respond within one business day." |
| "Subscribe to newsletter" | "Hear from us, occasionally." |
| "404: Page not found" | "We can't find that page. Let's get you back to clean water." |

---

## 8. Accessibility checklist

- All color combinations meet WCAG AA contrast (4.5:1 for body, 3:1 for large text).
- All interactive elements have visible focus rings (`ring-2 ring-kayora-blue-500`).
- All images have meaningful `alt` text. Decorative images use `alt=""`.
- All form inputs have labels (visible, not just placeholders).
- All icons used alone have `aria-label`.
- Page heading hierarchy is correct: one `h1` per page, no skipped levels.
- Keyboard navigation tested on every interactive element.
- Site tested with `prefers-reduced-motion: reduce` set.
