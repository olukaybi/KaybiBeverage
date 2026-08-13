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
  title: 'Kayora for Hotels & Restaurants | Premium Table Water, Hospitality Supply',
  description:
    'Kayora 75cl Jara — premium table water for hotels, restaurants and hospitality. NAFDAC Registered A1-111026, SON MANCAP Certified, supplied direct or through authorised distributors.',
  alternates: { canonical: 'https://www.kayorawater.com/for-hotels-restaurants' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/for-hotels-restaurants',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Kayora Premium Purified Water — Wellness in every drop!', type: 'image/png' },
    ],
  },
};

const pillars = [
  {
    title: 'A Table Water That Presents Well',
    body: 'The 75cl Jara is weighted for one-handed pouring and visually distinct enough to communicate quality on a table setting without explanation.',
  },
  {
    title: 'Credentials Guests Recognise',
    body: 'NAFDAC Registered and SON MANCAP Certified — the regulatory standard international and domestic guests expect, printed on every label.',
  },
  {
    title: 'Back-of-House Covered Too',
    body: 'The 18.9L Never Finish handles kitchen, staff and guest-area dispenser needs, so front-of-house presentation and back-of-house supply are both accounted for.',
  },
];

const faqs = [
  {
    q: 'What size does Kayora recommend for hotels and restaurants?',
    a: 'The 75cl Jara is our recommended table water for guest-facing service. For kitchens, staff areas and dispenser points, the 18.9L Never Finish covers back-of-house supply.',
  },
  {
    q: 'Can our hotel or restaurant order in bulk or become a distributor?',
    a: 'Yes. Hospitality accounts can order directly for consistent supply, or apply through our Distribution page for volume pricing and dedicated account terms.',
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
  serviceType: 'Hospitality purified water supply',
  provider: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited', url: 'https://www.kayorawater.com' },
  areaServed: [
    { '@type': 'State', name: 'Akwa Ibom State' },
    { '@type': 'State', name: 'Cross River State' },
    { '@type': 'State', name: 'Rivers State' },
    { '@type': 'State', name: 'Lagos State' },
    { '@type': 'State', name: 'Kano State' },
  ],
  audience: { '@type': 'Audience', audienceType: 'Hotels and restaurants' },
  url: 'https://www.kayorawater.com/for-hotels-restaurants',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'For Hotels & Restaurants', item: 'https://www.kayorawater.com/for-hotels-restaurants' },
  ],
};

export default function ForHotelsRestaurantsPage() {
  return (
    <>
      <PageViewTracker event="page_view_for_hotels_restaurants" params={{ page_name: 'for-hotels-restaurants', page_type: 'growth', audience_type: 'hospitality' }} />

      <Hero
        eyebrow="For Hotels & Restaurants"
        headline={'The Water Standard\nfor Hospitality'}
        subhead="A premium table water your guests notice, backed by the regulatory credentials your operation needs. NAFDAC Registered A1-111026, SON MANCAP Certified."
        primaryCTA={{ label: 'Become a Distributor', href: '/distribution', event: 'cta_click_become_distributor', eventParams: { page_name: 'for-hotels-restaurants', audience_type: 'hospitality' } }}
        secondaryCTA={{ label: 'Talk to Our Team', href: '/contact', event: 'cta_click_talk_to_team', eventParams: { page_name: 'for-hotels-restaurants', audience_type: 'hospitality' } }}
        productImageSrc="/images/products/kayora-75cl-hero-blue.png"
        imageAlt="Kayora 75cl Jara — premium table water for hospitality"
      />

      <PillarGrid
        eyebrow="Built for Hospitality"
        headline="Why Hotels & Restaurants Choose Kayora"
        pillars={pillars}
        className="bg-kayora-cream"
      />

      {/* SKU spotlight */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Recommended for Your Operation</p>
            <h2 className="font-display text-display-md text-kayora-ink">Front of House, Back of House</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <TrackedLink href="/products/75cl" event="product_card_click" eventParams={{ page_name: 'for-hotels-restaurants', sku: '75cl' }} className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">75cl</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Jara</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">Premium table water for guest-facing dining and service.</p>
            </TrackedLink>
            <TrackedLink href="/products/18-9l" event="product_card_click" eventParams={{ page_name: 'for-hotels-restaurants', sku: '18.9L' }} className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">18.9L</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Never Finish</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">Back-of-house and guest-area dispenser supply.</p>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Common Questions</p>
            <h2 className="font-display text-display-md text-kayora-ink">Supplying Your Business</h2>
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
        headline="Supply Your Property"
        body="Whether you need a direct account or want to become an authorised distributor for your region, our team will confirm terms within one business day."
        primaryCTA={{ label: 'Become a Distributor', href: '/distribution', event: 'cta_click_become_distributor', eventParams: { page_name: 'for-hotels-restaurants', audience_type: 'hospitality' } }}
        secondaryCTA={{ label: 'Talk to Our Team', href: '/contact', event: 'cta_click_talk_to_team', eventParams: { page_name: 'for-hotels-restaurants', audience_type: 'hospitality' } }}
        variant="cream"
      />

      <div className="bg-white pb-16 text-center">
        <WhatsAppButton
          message={WHATSAPP_INTENTS.hospitality}
          pageType="growth"
          pageName="for-hotels-restaurants"
          audienceType="hospitality"
          ctaLocation="bottom"
          label="Message on WhatsApp"
          className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-kayora-blue-700 font-semibold underline underline-offset-2 hover:text-kayora-blue-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-lg"
        />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
