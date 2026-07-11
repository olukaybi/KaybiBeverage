import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Kayora 18.9L Refill Service — Never Finish Refill | ₦1,000 per Refill',
  description:
    'Refill your genuine Kayora-branded 18.9L bottle at ₦1,000. Same eight-stage purified water, new tamper-evident cap, bottle verification at point of refill. Minimum ₦15,000 for home delivery.',
  alternates: { canonical: 'https://www.kayorawater.com/products/18-9l-refill' },
  openGraph: {
    url: 'https://www.kayorawater.com/products/18-9l-refill',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kayora Premium Purified Water — Wellness in every drop!',
        type: 'image/png',
      },
    ],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.kayorawater.com/products' },
    { '@type': 'ListItem', position: 3, name: 'Never Finish Refill', item: 'https://www.kayorawater.com/products/18-9l-refill' },
  ],
};

const steps = [
  {
    number: '01',
    title: 'You need a genuine Kayora-branded bottle',
    body: 'The refill service is only available for genuine Kayora-branded 18.9L polycarbonate bottles. Our team verifies the bottle at the point of refill. We do not refill third-party or unbranded bottles — this is for the safety of the water and the traceability of every unit we produce.',
  },
  {
    number: '02',
    title: 'Place your refill order',
    body: 'For home delivery, the minimum order is ₦15,000 — that is 15 refills. For smaller quantities, bring your empty bottle directly to our factory at 173 Eket Oron Road, Eket, or to any authorised Kayora dealer, for direct exchange.',
  },
  {
    number: '03',
    title: 'Your bottle is refilled and sealed',
    body: 'Each refill uses the same eight-stage purification process as a new bottle — borehole source, sediment filtration, activated carbon, reverse osmosis, remineralisation, UV sterilisation, and ozonation. A new steam-cleaned, ozone-sterilised, tamper-evident cap is applied at the point of fill.',
  },
  {
    number: '04',
    title: 'Delivered or collected',
    body: 'For delivery orders, we deliver directly across Akwa Ibom State on the same schedule as our standard bottle orders. For walk-in or direct exchange at the factory, bring your empty and collect your full bottle same-day during business hours.',
  },
];

export default function RefillPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-kayora-blue-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-kayora-cream/60 hover:text-kayora-cream text-sm mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
              >
                ← All Products
              </Link>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
                Refill Service
              </p>
              <h1 className="font-display text-display-lg text-white mb-6 whitespace-pre-line">
                {'Never Finish\nRefill'}
              </h1>
              <p className="text-lg leading-relaxed text-white/75 mb-3 max-w-[52ch]">
                Refill service for Kayora-branded 18.9L bottles. ₦1,000 per refill, inclusive of new tamper-evident cap.
              </p>
              <p className="text-base leading-relaxed text-white/60 mb-8 max-w-[52ch]">
                Bring your empty Kayora bottle. Get the same eight-stage purified water back — freshly filled, freshly sealed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500"
                >
                  Order refill
                </Link>
                <Link
                  href="/products/18-9l"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Buy a new bottle
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full h-[320px] lg:h-[440px]">
                <Image
                  src="/07_kayora_18_9l_single_corrected.png"
                  alt="Kayora 18.9L Never Finish — refill service for Kayora-branded bottles"
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="bg-kayora-gold-500 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-display text-2xl font-semibold text-white">
              ₦1,000 per refill
            </p>
            <p className="text-white/90 text-sm text-center sm:text-right max-w-[55ch]">
              Minimum ₦15,000 (15 refills) for home delivery. Smaller quantities available for direct walk-in at 173 Eket Oron Road, Eket.
            </p>
          </div>
        </div>
      </section>

      {/* What the refill includes */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              What You Get
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              The Same Water. A New Seal.
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                Every Kayora refill contains the same water as a new bottle — produced at our Eket facility through eight stages of purification: borehole source, sediment filtration, activated carbon treatment, reverse osmosis, remineralisation, UV sterilisation, and ozone treatment. There is no &ldquo;refill grade.&rdquo; There is only Kayora grade.
              </p>
              <p>
                Each refill also includes a new steam-cleaned, ozone-sterilised, tamper-evident cap applied at the point of fill. You will know if the seal has been broken before the bottle reaches you.
              </p>
              <p>
                Bottle verification is required at the point of refill. We refill only genuine Kayora-branded 18.9L polycarbonate bottles. This is not a formality — it protects the integrity of the water and ensures every bottle in circulation is traceable to our facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Process
            </p>
            <h2 className="font-display text-display-md text-kayora-ink">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="font-display text-display-md text-kayora-gold-500 leading-none mb-3">
                  {step.number}
                </p>
                <h3 className="font-sans font-semibold text-kayora-ink text-lg mb-2">{step.title}</h3>
                <p className="text-kayora-graphite text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery minimum callout */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
                Delivery vs Direct Exchange
              </p>
              <h2 className="font-display text-display-sm text-kayora-ink mb-6">
                Two ways to refill.
              </h2>
              <div className="space-y-4 text-kayora-graphite leading-relaxed max-w-[55ch]">
                <p>
                  For home or office delivery, the minimum refill order is ₦15,000 — that is 15 refills at ₦1,000 each. We deliver directly across Akwa Ibom State, on the same schedule as our standard 18.9L bottle orders.
                </p>
                <p>
                  For smaller quantities — one, two, or a handful of bottles — the most practical option is direct exchange at our factory at 173 Eket Oron Road, Eket, during business hours (Monday–Saturday, 8am–6pm WAT). Bring your empty bottle, collect your refilled bottle, pay at the counter.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-kayora-mist rounded-xl p-6">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-2">Home / Office Delivery</p>
                <p className="font-display text-2xl font-semibold text-kayora-ink mb-1">₦15,000 minimum</p>
                <p className="text-sm text-kayora-graphite">15 refills at ₦1,000 each. Delivery across Akwa Ibom State.</p>
              </div>
              <div className="bg-white border border-kayora-mist rounded-xl p-6">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-2">Direct Exchange — Eket Factory</p>
                <p className="font-display text-2xl font-semibold text-kayora-ink mb-1">₦1,000 per bottle</p>
                <p className="text-sm text-kayora-graphite">
                  Walk in with your empty. Walk out with your full. No minimum. Mon–Sat 8am–6pm.{' '}
                  <a
                    href="https://maps.google.com/?q=4.6420,7.9288"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kayora-blue-700 hover:underline"
                  >
                    173 Eket Oron Road →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Order Your Refill."
        body="Call or message us to place a refill delivery order across Akwa Ibom. For direct exchange, visit the factory at 173 Eket Oron Road, Eket — any weekday or Saturday."
        primaryCTA={{ label: 'Contact us to order', href: '/contact' }}
        secondaryCTA={{ label: 'Buy the 18.9L bottle', href: '/products/18-9l' }}
        variant="blue"
      />

      {/* Related Products */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Also Available
          </p>
          <h2 className="font-display text-display-sm text-kayora-ink mb-10">
            The Rest of the Kayora Range
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: '18-9l', size: '18.9L', name: 'Never Finish' },
              { slug: '50cl', size: '50cl', name: 'Original' },
              { slug: '75cl', size: '75cl', name: 'Jara' },
            ].map((rel) => (
              <Link
                key={rel.slug}
                href={`/products/${rel.slug}`}
                className="group flex items-center gap-4 bg-white border border-kayora-mist rounded-xl p-5 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                <div className="w-16 h-16 rounded-lg bg-kayora-blue-900/5 flex items-center justify-center shrink-0">
                  <span className="font-display text-sm font-bold text-kayora-blue-900">{rel.size}</span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-kayora-ink group-hover:text-kayora-blue-700 transition-colors">{rel.name}</p>
                  <p className="text-sm text-kayora-stone">Kayora {rel.size}</p>
                </div>
                <span className="ml-auto text-kayora-stone group-hover:text-kayora-blue-700 transition-colors" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
