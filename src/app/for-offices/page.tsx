import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PillarGrid from '@/components/PillarGrid';
import CTASection from '@/components/CTASection';
import TrackedLink from '@/components/TrackedLink';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageViewTracker from '@/components/PageViewTracker';
import { WHATSAPP_INTENTS } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Kayora for Offices | Recurring Office Water Supply, Akwa Ibom',
  description:
    'Reliable office water supply from Kayora Premium Purified Water — 18.9L Never Finish for dispensers, scheduled delivery, NAFDAC Registered A1-111026. Serving offices across Akwa Ibom State.',
  alternates: { canonical: 'https://www.kayorawater.com/for-offices' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/for-offices',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Kayora Premium Purified Water — Wellness in every drop!', type: 'image/png' },
    ],
  },
};

const pillars = [
  {
    title: 'Scheduled Supply, Not Emergency Runs',
    body: 'Set a delivery schedule once and your office never runs short. We track your consumption pattern and confirm the next delivery before your last bottle empties.',
  },
  {
    title: 'One Bottle, One Department',
    body: 'The 18.9L Never Finish comfortably serves a small office for a full working week, or a single floor between deliveries — clean water for every staff member without daily purchases.',
  },
  {
    title: 'A Brand Your Team Already Trusts',
    body: 'NAFDAC Registered A1-111026 and SON MANCAP Certified. Visitors and staff alike recognise the standard — no explaining required.',
  },
];

const faqs = [
  {
    q: 'Can Kayora supply water on a recurring schedule for our office?',
    a: 'Yes. Contact our team to set up scheduled delivery for your office — weekly, fortnightly or monthly — with bottle collection and return handled on each visit.',
  },
  {
    q: 'What size is best for an office?',
    a: 'The 18.9L Never Finish is the standard choice for office dispensers. For desk-side use or meeting rooms, the 50cl Original is a common addition alongside the main dispenser bottle.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Office purified water supply',
  provider: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited', url: 'https://www.kayorawater.com' },
  areaServed: { '@type': 'State', name: 'Akwa Ibom State' },
  audience: { '@type': 'Audience', audienceType: 'Businesses and offices' },
  url: 'https://www.kayorawater.com/for-offices',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'For Offices', item: 'https://www.kayorawater.com/for-offices' },
  ],
};

export default function ForOfficesPage() {
  return (
    <>
      <PageViewTracker event="page_view_for_offices" params={{ page_name: 'for-offices', page_type: 'growth', audience_type: 'office' }} />

      <Hero
        eyebrow="For Offices"
        headline={'Reliable Water Supply\nfor Your Office'}
        subhead="Scheduled 18.9L delivery for offices and institutions across Akwa Ibom State — the same eight-stage purified water, NAFDAC Registered A1-111026, without the daily bottle runs."
        primaryCTA={{ label: 'Talk to Our Team', href: '/contact', event: 'cta_click_talk_to_team', eventParams: { page_name: 'for-offices', audience_type: 'office' } }}
        secondaryCTA={{ label: 'Order Kayora', href: '/shop', event: 'cta_click_order_kayora', eventParams: { page_name: 'for-offices', audience_type: 'office' } }}
        backgroundImage="/09_kayora_warehouse_banner.webp"
        backgroundPosition="center center"
        imageAlt="Kayora water cases palletised at the Eket warehouse, ready for office supply"
      />

      <PillarGrid
        eyebrow="Built for Business Supply"
        headline="Why Offices Choose Kayora"
        pillars={pillars}
        className="bg-kayora-cream"
      />

      {/* SKU spotlight */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Recommended for Your Office</p>
            <h2 className="font-display text-display-md text-kayora-ink">The Office Standard</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <TrackedLink href="/products/18-9l" event="product_card_click" eventParams={{ page_name: 'for-offices', sku: '18.9L' }} className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">18.9L</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Never Finish</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">The dispenser standard for offices, institutions and floors of staff.</p>
            </TrackedLink>
            <TrackedLink href="/products/50cl" event="product_card_click" eventParams={{ page_name: 'for-offices', sku: '50cl' }} className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">50cl</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Original</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">For desks, meeting rooms and visitor hospitality.</p>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Common Questions</p>
            <h2 className="font-display text-display-md text-kayora-ink">Ordering for Your Office</h2>
          </div>
          <div className="space-y-8 max-w-3xl">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-display text-lg font-semibold text-kayora-ink mb-2">{f.q}</h3>
                <p className="text-kayora-graphite leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="inline-block mt-8 text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors">
            See all frequently asked questions →
          </Link>
        </div>
      </section>

      <CTASection
        headline="Set Up Office Supply"
        body="Tell us your office size and preferred schedule and we will confirm pricing and delivery within one business day."
        primaryCTA={{ label: 'Talk to Our Team', href: '/contact', event: 'cta_click_talk_to_team', eventParams: { page_name: 'for-offices', audience_type: 'office' } }}
        secondaryCTA={{ label: 'View All Products', href: '/products', event: 'cta_click_view_products', eventParams: { page_name: 'for-offices', audience_type: 'office' } }}
        variant="blue"
      />

      <div className="bg-kayora-blue-900 pb-16 text-center">
        <WhatsAppButton
          message={WHATSAPP_INTENTS.officeSupply}
          pageType="growth"
          pageName="for-offices"
          audienceType="office"
          ctaLocation="bottom"
          className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-kayora-cream font-semibold underline underline-offset-2 hover:text-kayora-gold-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500 rounded-lg"
        />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
