# Claude Code Brief: Kayora Premium Purified Water

**Paste this into Claude Code as your opening message, alongside the two reference documents (`kayora-website-copy.md` and `kayora-design-system.md`).**

---

You are building a new marketing website for **Kayora Premium Purified Water**, the flagship product of **Kaybi Beverage Industries Limited**, a Nigerian beverage company based in Eket, Akwa Ibom State. A previous version of the site exists at kayorawater.com (React/Vite on Replit). This build replaces it.

The bar is genuinely world-class. The site should sit comfortably beside Acqua Panna, Voss, and Evian on visual quality — while being distinctly and confidently Nigerian. Refined, restrained, premium without being precious.

I have prepared two reference documents you should treat as canonical:

- **`kayora-website-copy.md`** — finalised copy for Home, About, Distribution, and Contact pages. Use the headlines, body text, CTAs, and form field lists verbatim. The voice is deliberate.
- **`kayora-design-system.md`** — color tokens, typography scale, motion patterns, component specs. Implement the Tailwind config and component rules exactly as written.

If anything in those documents conflicts with what follows, the documents win.

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS, configured per `kayora-design-system.md`
- **UI primitives:** shadcn/ui where useful (forms, dialogs, dropdowns)
- **Fonts:** Fraunces + Inter via `next/font/google`
- **Images:** `next/image` exclusively; Unsplash placeholders flagged in comments where real photography is pending
- **Motion:** Framer Motion, used sparingly per the design system motion rules
- **Forms:** react-hook-form + zod validation. For now, submissions log to console and show success state — we'll wire up email/Resend later.
- **Deployment target:** Vercel
- **SEO:** Full metadata, Open Graph, Twitter cards, JSON-LD structured data, sitemap.xml, robots.txt
- **PWA:** manifest.webmanifest, icon set (32, 192, 512, apple-touch-icon 180), theme color `#003B7A`

## Brand facts (treat as source of truth)

**Company:** Kaybi Beverage Industries Limited
**Brand:** Kayora
**Address:** 173 Eket-Oron Road, Eket, Akwa Ibom State, Nigeria (Postal 524101)
**Geo coordinates:** 4.6420° N, 7.9288° E
**Phone:** +234 904 078 9918 (display as `0904 078 9918` to the local audience; use `+2349040789918` in `tel:` links)
**Email:** info@kaybibeverage.com
**Hours:** Monday–Saturday, 8:00am–6:00pm WAT
**Languages:** English, Ibibio
**Socials:** @KayoraWater on Instagram, Facebook, TikTok

### Regulatory (display accurately, do not embellish)

- **NAFDAC Registration Number:** A1-111026 — covers all four pack sizes (30cl, 50cl, 75cl, 18.9L). Original approval 28 April 2026; packsize extension approved 4 May 2026. Valid through 27 April 2031.
- **SON MANCAP Fast Track:** FT-29179 for PET bottles (30cl, 50cl, 75cl); FT-29180 for the 18.9L polycarbonate dispenser. Issued 27 April 2026. Display the wording as **"SON MANCAP Registered"** — NOT "SON Certified." Full MANCAP certification is in progress.

### Product SKUs

1. **30cl "Sharp-sharp"** — events, weddings, celebrations
2. **50cl "Original"** — flagship, everyday hydration
3. **75cl "Jara"** — extra volume, active lifestyle
4. **18.9L "Never Finish"** — dispenser for homes, offices, hotels

### Six-stage purification process

Deep Borehole Source → Sediment Filtration → Activated Carbon Filtration → Reverse Osmosis → UV Sterilisation → Ozonisation.

### Tagline

> Purified to the Highest Standard. Safe for Every Table.

## Pages to build

1. **Home** (`/`) — hero, trust strip, four-SKU showcase, six-stage process, why Kayora pillars, service area, distributor CTA, closing CTA.
2. **About** (`/about`) — origin story, Eket roots, "Safe for Every Table" definition, regulatory section, people, community.
3. **Our Water** (`/our-water`) — purification deep dive, full SKU detail cards with material and registration numbers, packaging quality story, mineral profile section (lab values pending — display "CoA available on request" until provided).
4. **Distribution** (`/distribution`) — territories, why partner, how it works, distributor application form.
5. **Contact** (`/contact`) — full address, phone, email, hours, embedded Google Map, general contact form.

## Reusable components to build

- `<SiteHeader />` — sticky, transparent over hero, solid after scroll. Logo + nav + "Order" button. Mobile drawer from right.
- `<SiteFooter />` — `kayora-blue-900` background, four columns desktop, NAFDAC + MANCAP numbers prominent.
- `<Hero />` — supports hero image with gentle parallax, eyebrow, headline, subhead, dual CTA.
- `<TrustStrip />` — four certification/quality marks in a slim band.
- `<SKUCard />` — used in the four-SKU showcase and elsewhere.
- `<ProcessSteps />` — the six-stage purification block.
- `<PillarGrid />` — three-pillar "Why Kayora" pattern, reusable.
- `<CTASection />` — large headline + body + button, used at section breaks.
- `<DistributorForm />`, `<ContactForm />` — with react-hook-form + zod.
- `<MapEmbed />` — Google Maps embed pinned to the Eket coordinates.

## SEO / structured data

Implement JSON-LD with `@graph` for: Organization, LocalBusiness (with `geo`, `openingHoursSpecification`, `address`), ItemList of all four Products (with `brand`, `manufacturer`, `offers`), WebSite, and a FAQPage on Home with at least the seven FAQs already drafted on the existing site (NAFDAC certification, location, sizes, purification, ordering, delivery, distributor application). The previous kayorawater.com `index.html` head is a strong reference — preserve the schema patterns from there but update facts where this brief differs.

Generate a complete `app/sitemap.ts` and `app/robots.ts` covering all five pages.

## Quality bar

- **Lighthouse targets:** 95+ on Performance, Accessibility, Best Practices, SEO. Verify on the deployed Vercel preview, not just locally.
- **Mobile first.** Design and verify at 375px before scaling up.
- **Semantic HTML.** Proper landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`).
- **Keyboard accessibility.** Every interactive element reachable and operable via keyboard, with visible focus rings.
- **Reduced motion.** All animations gated behind `motion-safe:` or `useReducedMotion()`.
- **No console errors or warnings in production build.**

## Build process

Work through this sequentially. Pause for review at each numbered step.

1. **Scaffold.** Create the Next.js project. Show me the directory structure and `package.json` before running install. Confirm Node version target (20+).
2. **Design tokens.** Implement `tailwind.config.ts` per `kayora-design-system.md`. Set up fonts via `next/font`. Create `/styleguide` page rendering all primitives (colors, type scale, buttons, form fields, cards) — I want to review this before any marketing page is built.
3. **Layout shell.** Build `<SiteHeader />`, `<SiteFooter />`, root layout, fonts loaded, metadata defaults, theme color, manifest.
4. **Page builds, in order:**
   - Home → review
   - About → review
   - Our Water → review
   - Distribution → review
   - Contact → review
5. **SEO & structured data.** JSON-LD per `@graph` pattern above, sitemap, robots, Open Graph image (`/opengraph.jpg`, 1200×630).
6. **Forms.** Wire up react-hook-form + zod for both forms. Log payload to console with a TODO comment for the email integration.
7. **Vercel deployment.** Walk me through environment setup, preview deployment, then production cutover.

Do not skip ahead. Each step should be reviewable on its own.

## Important compliance notes

1. **NAFDAC advert approval — verified.** The client has confirmed regulatory clearance for the website content under NAFDAC Term #4 (advert approval). You may deploy to production (kayorawater.com) once each page is approved. Keep the NAFDAC registration number visible across the site as a standing compliance reference. If you propose any new copy not present in `kayora-website-copy.md`, flag it for client review before adding — new advertising content may require fresh approval.
2. **MANCAP scope language.** Use "SON MANCAP Registered" consistently. Never write "SON Certified," "MANCAP Certified," or anything implying the full certification is complete. The Fast Track approval is valid for six months from 27 April 2026.
3. **Health claims.** Do not write any copy implying medical benefit ("hydration improves cognition," "boosts immunity," etc.). Stick to the supplied copy. If you propose any new wording, flag it for my review before adding.
4. **NAFDAC and MANCAP numbers on every page.** Include both in the site footer at minimum.

## What I'll provide as we go

- Real product photography (currently using Unsplash placeholders)
- The Kaybi/Kayora logo files (currently using a wordmark fallback)
- Batch mineral profile / Certificate of Analysis values for the Our Water page
- Any updates to copy as we iterate

Start with step 1. Show me the scaffold structure and `package.json` before installing dependencies.
