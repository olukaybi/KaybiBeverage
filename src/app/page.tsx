import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import SKUCard from '@/components/SKUCard';
import ProcessSteps from '@/components/ProcessSteps';
import TrackedLink from '@/components/TrackedLink';
import WhatsAppButton from '@/components/WhatsAppButton';
import TestimonialSection from '@/components/TestimonialSection';
import { WHATSAPP_INTENTS } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Kayora Premium Purified Water | NAFDAC Registered, Eket',
  description:
    'Wellness in every drop! Premium eight-stage purified water from Eket, Akwa Ibom. NAFDAC Registered (A1-111026). Direct delivery across Akwa Ibom; distributors across the South-South and South-East.',
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
      {/* Section 1 — Hero Slider */}
      <HeroSlider />

      {/* Trust Strip */}
      <section className="bg-kayora-blue-900 py-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-kayora-cream/60 uppercase tracking-widest font-sans">
            <span>NAFDAC Reg. A1-111026</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>SON MANCAP Certified</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>Eight-Stage Purification</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>Made in Eket, Akwa Ibom</span>
          </div>
        </div>
      </section>

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

      {/* Section 2b — Use-Case Shortcuts */}
      <section className="bg-white py-[clamp(4rem,7vw,7rem)] border-t border-kayora-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Who It&rsquo;s For</p>
            <h2 className="font-display text-display-md text-kayora-ink">Find the Right Fit for You</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'For Homes', href: '/for-homes', sub: 'Everyday household supply' },
              { label: 'For Offices', href: '/for-offices', sub: 'Scheduled office delivery' },
              { label: 'For Events', href: '/for-events', sub: 'Weddings & ceremonies' },
              { label: 'For Distributors', href: '/distribution', sub: 'Build a business' },
            ].map((uc) => (
              <TrackedLink
                key={uc.href}
                href={uc.href}
                event="cta_click_usecase"
                eventParams={{ page_name: 'homepage', cta_label: uc.label, destination: uc.href }}
                className="group flex flex-col justify-between bg-kayora-cream border border-kayora-mist rounded-xl p-5 hover:shadow-md hover:border-kayora-blue-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-kayora-ink group-hover:text-kayora-blue-700 transition-colors">{uc.label}</p>
                  <p className="text-xs text-kayora-stone mt-1">{uc.sub}</p>
                </div>
                <span className="text-kayora-gold-500 mt-4 text-sm font-semibold" aria-hidden="true">→</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Eight-Stage Process */}
      <ProcessSteps />

      {/* Section 3b — Social Proof */}
      <section className="bg-kayora-cream py-[clamp(4rem,7vw,7rem)] border-t border-kayora-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stat: '4', label: 'Pack sizes', sub: '30cl · 50cl · 75cl · 18.9L' },
              { stat: '8', label: 'Purification stages', sub: 'Borehole to bottle' },
              { stat: '2', label: 'Regulatory bodies', sub: 'NAFDAC + SON MANCAP' },
              { stat: '9+', label: 'States covered', sub: 'Akwa Ibom & beyond' },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="text-center">
                <p className="font-display text-5xl font-bold text-kayora-blue-900 mb-1">{stat}</p>
                <p className="font-semibold text-kayora-ink text-sm mb-1">{label}</p>
                <p className="text-xs text-kayora-stone">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  label: 'SON MANCAP Certified',
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

      {/* Section 4b — Delivery Areas Preview */}
      <section className="bg-kayora-cream py-[clamp(4rem,7vw,7rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Where We Deliver</p>
              <h2 className="font-display text-display-md text-kayora-ink mb-4">
                Direct Delivery Across Akwa Ibom. Distributors Beyond.
              </h2>
              <p className="text-kayora-graphite leading-relaxed max-w-[60ch]">
                We run our own delivery fleet across Akwa Ibom State — typically 24–48 hours from order. Outside the state, Kayora is available through our authorised distributor network in Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo — now expanding to Lagos and Kano States.
              </p>
            </div>
            <div>
              <TrackedLink
                href="/delivery-areas"
                event="cta_click_delivery_areas"
                eventParams={{ page_name: 'homepage' }}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                Check Delivery Areas
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4c — FAQ Preview */}
      <section className="bg-white py-[clamp(4rem,7vw,7rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Common Questions</p>
            <h2 className="font-display text-display-md text-kayora-ink">Before You Ask</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { q: 'Is Kayora NAFDAC registered?', a: 'Yes — NAFDAC Reg. A1-111026, covering all four pack sizes.' },
              { q: 'What sizes does Kayora offer?', a: '30cl Sharp-sharp, 50cl Original, 75cl Jara and 18.9L Never Finish.' },
              { q: 'Do you deliver in Akwa Ibom?', a: 'Yes — direct delivery statewide, typically within 24–48 hours.' },
            ].map((f) => (
              <div key={f.q}>
                <h3 className="font-display text-lg font-semibold text-kayora-ink mb-2">{f.q}</h3>
                <p className="text-kayora-graphite text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="inline-block mt-10 text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors">
            See all frequently asked questions →
          </Link>
        </div>
      </section>

      {/* Section 4d — Trust / Social Proof */}
      <TestimonialSection className="bg-kayora-cream" />

      {/* Section 5 — For Distributors */}
      <section className="bg-kayora-blue-900 py-[clamp(6rem,10vw,10rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
              For Distributors · Now in Lagos &amp; Kano
            </p>
            <h2 className="font-display text-display-md text-kayora-cream mb-6">
              Carry the Standard.<br />Build a Business.
            </h2>
            <p className="text-kayora-cream/80 leading-relaxed mb-4 max-w-[65ch]">
              Kayora is actively recruiting distributors across Akwa Ibom, our live South-South and South-East states — Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo — and now expanding into Lagos and Kano States. Attractive rebates and other incentives. Reliable supply. Marketing support. And a brand customers already trust.
            </p>
            <p className="text-sm text-kayora-cream/60 mb-10">
              Direct delivery across Akwa Ibom State · Distributor network in Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia, Imo, Lagos and Kano{' — '}
              <Link href="/distribution" className="text-kayora-cream/80 hover:text-kayora-cream underline underline-offset-2 transition-colors">
                See full delivery details →
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TrackedLink
                href="/distribution"
                event="cta_click_become_distributor"
                eventParams={{ page_name: 'homepage' }}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900"
              >
                Become a Distributor
              </TrackedLink>
              <TrackedLink
                href="/contact"
                event="cta_click_talk_to_team"
                eventParams={{ page_name: 'homepage' }}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-kayora-blue-900"
              >
                Talk to Our Team
              </TrackedLink>
              <WhatsAppButton
                message={WHATSAPP_INTENTS.general}
                pageType="homepage"
                pageName="homepage"
                ctaLocation="distributor_section"
                label="Chat on WhatsApp"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-kayora-gold-500 font-semibold hover:text-kayora-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
