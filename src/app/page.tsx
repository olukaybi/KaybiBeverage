import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import SKUCard from '@/components/SKUCard';
import ProcessSteps from '@/components/ProcessSteps';

export const metadata: Metadata = {
  title: 'Kayora Premium Purified Water | NAFDAC Registered, Eket',
  description:
    'Premium eight-stage purified water from Eket, Akwa Ibom. NAFDAC Registered (A1-111026). Direct delivery across Akwa Ibom; distributors across the South-South and South-East.',
  alternates: { canonical: 'https://www.kayorawater.com/' },
};

const skus = [
  {
    size: '30cl',
    name: 'Sharp-sharp',
    nickname: 'The Event Bottle',
    description:
      'Built for events. Compact, easy to chill, easy to share. The Kayora you reach for at weddings, naming ceremonies and corporate functions.',
    useCase: 'Perfect for events, celebrations and anywhere water is served to guests.',
    imageSrc: '/images/products/kayora-30cl-hero-blue.png',
    imageAlt: 'Kayora 30cl Sharp-sharp — small event bottle',
  },
  {
    size: '50cl',
    name: 'Original',
    nickname: 'The Everyday Bottle',
    description:
      'Everyday hydration, perfected. The bottle that started it all — sized right for school bags, dashboards and desks across Akwa Ibom.',
    useCase: 'Ideal for homes, offices, schools and on-the-go hydration.',
    imageSrc: '/images/products/kayora-50cl-hero-blue.png',
    imageAlt: 'Kayora 50cl Original — everyday bottle',
  },
  {
    size: '75cl',
    name: 'Jara',
    nickname: 'The Extra Bottle',
    description:
      'A little extra, the way only Nigerians know how. Generous volume for long days, the gym, the road, and anyone who hydrates seriously.',
    useCase: 'Great for fitness, travel and long working days.',
    imageSrc: '/images/products/kayora-75cl-hero-blue.png',
    imageAlt: 'Kayora 75cl Jara — extra bottle',
  },
  {
    size: '18.9L',
    name: 'Never Finish',
    nickname: 'The Dispenser Standard',
    description:
      'The dispenser standard. One bottle keeps a household, office or hotel running for days. Clean. Sealed. Tracked from borehole to delivery.',
    useCase: 'The go-to choice for offices, hotels, schools and large households.',
    imageSrc: '/images/products/kayora-18l-hero-blue.png',
    imageAlt: 'Kayora 18.9L Never Finish — dispenser bottle',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Hero
        leadBrand
        eyebrow="Premium Purified Water · NAFDAC Reg. A1-111026"
        headline={'Purified to the Highest Standard.\nSafe for Every Table.'}
        subhead="Eight-stage purified water from the heart of Akwa Ibom — for the homes, offices, hotels and celebrations that won't settle for less."
        primaryCTA={{ label: 'Order Kayora', href: '/contact' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        productImageSrc="/images/products/kayora-75cl-hero-blue.png"
        imageAlt="Kayora 75cl Jara — Premium Purified Water, front and back"
      />

      {/* Section 2 — The Range */}
      <section className="bg-kayora-cream py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xl italic text-kayora-blue-700 mb-16 text-center lg:text-left">
            Four sizes. One standard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skus.map((sku) => (
              <SKUCard key={sku.size} {...sku} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Eight-Stage Process */}
      <ProcessSteps />

      {/* Section 4 — The Standard */}
      <section className="bg-white py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Why Kayora</p>
            <h2 className="font-display text-display-lg text-kayora-ink">
              The Standard Akwa Ibom Deserves.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Why Kayora pillars */}
            <div className="space-y-10">
              {[
                {
                  title: 'Certified, Not Just Claimed.',
                  body: 'NAFDAC has inspected our facility, our process and our records. Our registration number is printed on every label — and you can verify it.',
                },
                {
                  title: 'Local Manufacturing. Real Accountability.',
                  body: 'We are not a distant brand. We are at 173 Eket Oron Road. Walk in. Meet our team. See the line.',
                },
                {
                  title: 'Built for Nigerian Life.',
                  body: 'From the 30cl that pairs with jollof to the 18.9L that anchors an office, every SKU is designed for the way Nigerians actually drink, host and work.',
                },
              ].map((pillar) => (
                <div key={pillar.title}>
                  <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">{pillar.title}</h3>
                  <p className="text-kayora-graphite leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
            {/* Right: Trust signals */}
            <div className="space-y-6">
              {[
                {
                  label: 'NAFDAC Registered',
                  detail: 'Reg. No. A1-111026',
                  sub: 'All four pack sizes — 30cl, 50cl, 75cl, 18.9L',
                },
                {
                  label: 'SON MANCAP Registered',
                  detail: 'FT-29179 · FT-29180',
                  sub: 'PET bottles and 18.9L polycarbonate dispenser',
                },
                {
                  label: 'Eight-Stage Purification',
                  detail: 'Borehole → Sediment → Carbon → Ion Exchange → Precision → RO → UV → Ozonation',
                  sub: 'Every batch. Every bottle. No exceptions.',
                },
                {
                  label: 'Made in Eket, Akwa Ibom State',
                  detail: '173 Eket Oron Road',
                  sub: 'Nigerian-owned, Nigerian-operated',
                },
              ].map((signal) => (
                <div key={signal.label} className="border border-kayora-mist rounded-xl p-6">
                  <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">{signal.label}</p>
                  <p className="font-display text-lg font-semibold text-kayora-ink">{signal.detail}</p>
                  <p className="text-sm text-kayora-stone mt-1">{signal.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — For Distributors */}
      <section className="bg-kayora-blue-900 py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
              For Distributors
            </p>
            <h2 className="font-display text-display-md text-kayora-cream mb-6">
              Carry the Standard.<br />Build a Business.
            </h2>
            <p className="text-kayora-cream/80 leading-relaxed mb-4 max-w-[65ch]">
              Kayora is actively recruiting distributors across Akwa Ibom and our live South-South and South-East states — Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo. Attractive rebates and other incentives. Reliable supply. Marketing support. And a brand customers already trust.
            </p>
            <p className="text-sm text-kayora-cream/60 mb-10">
              Direct delivery across Akwa Ibom State · Distributor network in Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo{' — '}
              <Link href="/distribution" className="text-kayora-cream/80 hover:text-kayora-cream underline underline-offset-2 transition-colors">
                See full delivery details →
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/distribution"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900"
              >
                Become a Distributor
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
