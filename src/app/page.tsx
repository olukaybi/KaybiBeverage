import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import SKUCard from '@/components/SKUCard';
import ProcessSteps from '@/components/ProcessSteps';
import PillarGrid from '@/components/PillarGrid';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Kayora Premium Purified Water | NAFDAC Registered · Eket, Akwa Ibom',
  description:
    'Kayora — six-stage purified, NAFDAC Registered (A1-111026), SON MANCAP Registered, proudly produced in Eket, Akwa Ibom. Pure, crisp hydration for homes, offices, events and distribution.',
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
    imageSrc: '/images/products/kayora-30cl.png',
    imageAlt: 'Kayora 30cl Sharp-sharp — small event bottle',
  },
  {
    size: '50cl',
    name: 'Original',
    nickname: 'The Everyday Bottle',
    description:
      'Everyday hydration, perfected. The bottle that started it all — sized right for school bags, dashboards and desks across Akwa Ibom.',
    useCase: 'Ideal for homes, offices, schools and on-the-go hydration.',
    imageSrc: '/images/products/kayora-50cl.png',
    imageAlt: 'Kayora 50cl Original — everyday bottle',
  },
  {
    size: '75cl',
    name: 'Jara',
    nickname: 'The Extra Bottle',
    description:
      'A little extra, the way only Nigerians know how. Generous volume for long days, the gym, the road, and anyone who hydrates seriously.',
    useCase: 'Great for fitness, travel and long working days.',
    imageSrc: '/images/products/kayora-75cl.png',
    imageAlt: 'Kayora 75cl Jara — extra bottle',
  },
  {
    size: '18.9L',
    name: 'Never Finish',
    nickname: 'The Dispenser Standard',
    description:
      'The dispenser standard. One bottle keeps a household, office or hotel running for days. Clean. Sealed. Tracked from borehole to delivery.',
    useCase: 'The go-to choice for offices, hotels, schools and large households.',
    imageSrc: '/images/products/kayora-18-9l.png',
    imageAlt: 'Kayora 18.9L Never Finish — dispenser bottle',
  },
];

const pillars = [
  {
    title: 'Certified, Not Just Claimed.',
    body: 'NAFDAC has inspected our facility, our process and our records. Our registration number is printed on every label — and you can verify it.',
  },
  {
    title: 'Local Manufacturing. Real Accountability.',
    body: 'We are not a distant brand. We are at 173 Eket-Oron Road. Walk in. Meet our team. See the line.',
  },
  {
    title: 'Built for Nigerian Life.',
    body: 'From the 30cl that pairs with jollof to the 18.9L that anchors an office, every SKU is designed for the way Nigerians actually drink, host and work.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        leadBrand
        eyebrow="Premium Purified Water · NAFDAC Reg. A1-111026"
        headline={'Purified to the Highest Standard.\nSafe for Every Table.'}
        subhead="Six-stage purified water from the heart of Akwa Ibom — for the homes, offices, hotels and celebrations that won't settle for less."
        primaryCTA={{ label: 'Order Kayora', href: '/contact' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        imageSrc="/images/lifestyle/kayora-beach-party.png"
        imageAlt="Young Nigerians celebrating with Kayora Premium Purified Water"
      />

      <TrustStrip />

      {/* SKU Showcase */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Range
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink mb-4">
              Four Sizes. One Standard.
            </h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              From wedding tables to office floors, there&rsquo;s a Kayora for every moment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skus.map((sku) => (
              <SKUCard key={sku.size} {...sku} />
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps
        eyebrow="Six-Stage Purification"
        headline='What "Premium" Really Means'
        intro="We don't bottle ordinary water and call it premium. Every drop of Kayora moves through six engineered stages before it reaches you."
      />

      <PillarGrid
        eyebrow="Why Kayora"
        headline="The Standard Akwa Ibom Deserves"
        pillars={pillars}
        className="bg-white"
      />

      {/* Service Area */}
      <section className="bg-kayora-blue-100 py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-display-md text-kayora-ink mb-4">
              Where We Deliver — Across Akwa Ibom
            </h2>
            <p className="text-kayora-graphite leading-relaxed mb-8 max-w-[65ch] mx-auto">
              We currently supply homes, offices, hotels, restaurants, schools and event organisers across Eket, Uyo and the wider Akwa Ibom State. Outside our usual routes? Call us — we often find a way.
            </p>
            <Link
              href="/distribution"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-kayora-blue-900 text-kayora-blue-900 font-semibold rounded-lg hover:bg-kayora-blue-900 hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
            >
              See Delivery Areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        variant="blue"
        headline="For Distributors — Carry the Standard"
        body="Kayora is actively recruiting distributors across Akwa Ibom and neighbouring states. Strong margins. Reliable supply. Marketing support. And a brand customers already trust."
        primaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
      />

      {/* Closing CTA */}
      <section className="bg-kayora-cream py-[clamp(3rem,6vw,6rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-md text-kayora-ink mb-4">Ready to order?</h2>
          <p className="text-kayora-graphite leading-relaxed mb-8 max-w-[65ch] mx-auto">
            Call us on{' '}
            <a href="tel:+2349040789918" className="font-semibold text-kayora-blue-700 hover:underline">
              0904 078 9918
            </a>{' '}
            or email{' '}
            <a href="mailto:info@kaybibeverage.com" className="font-semibold text-kayora-blue-700 hover:underline">
              info@kaybibeverage.com
            </a>
            . We respond within hours and deliver within days.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
