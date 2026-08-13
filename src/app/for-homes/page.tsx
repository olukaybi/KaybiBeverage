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
  title: 'Kayora for Homes | Everyday Premium Water Supply, Eket & Akwa Ibom',
  description:
    'Kayora Premium Purified Water for the household — the 18.9L Never Finish for the dispenser, 50cl Original for the fridge and school bags. NAFDAC Registered, delivered across Akwa Ibom.',
  alternates: { canonical: 'https://www.kayorawater.com/for-homes' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/for-homes',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Kayora Premium Purified Water — Wellness in every drop!', type: 'image/png' },
    ],
  },
};

const pillars = [
  {
    title: 'The Dispenser That Never Runs Dry',
    body: 'The 18.9L Never Finish fits every standard floor and countertop dispenser sold in Nigeria. One bottle keeps a family of four supplied for several days — no daily bottle runs, no rationing.',
  },
  {
    title: 'The Fridge and School-Bag Size',
    body: 'The 50cl Original is the size most households reach for between deliveries — sized for the fridge door, the dining table and the school bag, at the price point families order weekly.',
  },
  {
    title: 'Delivered, Not Just Sold',
    body: 'Order once and we schedule your next 18.9L delivery and bottle return before you run out. Direct delivery across Akwa Ibom State, typically within 24–48 hours.',
  },
];

const faqs = [
  {
    q: 'What size should I buy for my home?',
    a: 'Most households use the 18.9L Never Finish for their main dispenser and keep 50cl Original bottles on hand for the fridge and school bags. A family of four typically goes through one 18.9L bottle every few days.',
  },
  {
    q: 'Can I set up regular home deliveries?',
    a: 'Yes. Contact our team to set up a recurring delivery schedule for your household, including bottle collection and return for the 18.9L Never Finish.',
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
  serviceType: 'Household purified water supply',
  provider: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited', url: 'https://www.kayorawater.com' },
  areaServed: { '@type': 'State', name: 'Akwa Ibom State' },
  audience: { '@type': 'Audience', audienceType: 'Households' },
  url: 'https://www.kayorawater.com/for-homes',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'For Homes', item: 'https://www.kayorawater.com/for-homes' },
  ],
};

export default function ForHomesPage() {
  return (
    <>
      <PageViewTracker event="page_view_for_homes" params={{ page_name: 'for-homes', page_type: 'growth', audience_type: 'home' }} />

      <Hero
        eyebrow="For Homes"
        headline="Premium Water for Your Home, Every Day"
        subhead="Kayora Premium Purified Water is produced by Kaybi Beverage Industries Limited in Eket, Akwa Ibom State — eight-stage purified, NAFDAC Registered A1-111026, and delivered to households across the state."
        primaryCTA={{ label: 'Order Kayora', href: '/shop', event: 'cta_click_order_kayora', eventParams: { page_name: 'for-homes', audience_type: 'home' } }}
        secondaryCTA={{ label: 'Talk to Our Team', href: '/contact', event: 'cta_click_talk_to_team', eventParams: { page_name: 'for-homes', audience_type: 'home' } }}
        productImageSrc="/images/products/kayora-18l-hero-blue.png"
        imageAlt="Kayora 18.9L Never Finish dispenser bottle for homes"
      />

      <PillarGrid
        eyebrow="Built for Household Use"
        headline="Why Families Choose Kayora"
        pillars={pillars}
        className="bg-kayora-cream"
      />

      {/* SKU spotlight */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Recommended for Your Home</p>
            <h2 className="font-display text-display-md text-kayora-ink">Two Sizes Cover Most Households</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <TrackedLink href="/products/18-9l" event="product_card_click" eventParams={{ page_name: 'for-homes', sku: '18.9L' }} className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">18.9L</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Never Finish</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">The main dispenser bottle for daily household supply.</p>
            </TrackedLink>
            <TrackedLink href="/products/50cl" event="product_card_click" eventParams={{ page_name: 'for-homes', sku: '50cl' }} className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">50cl</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Original</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">The everyday bottle for the fridge, school bags and single servings.</p>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Common Questions</p>
            <h2 className="font-display text-display-md text-kayora-ink">Ordering for Your Home</h2>
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
        headline="Ready to Stock Your Home?"
        body="Order online, call us, or set up a recurring 18.9L delivery for your household. Direct delivery across Akwa Ibom State within 24–48 hours."
        primaryCTA={{ label: 'Order Kayora', href: '/shop', event: 'cta_click_order_kayora', eventParams: { page_name: 'for-homes', audience_type: 'home' } }}
        secondaryCTA={{ label: 'Check Delivery Areas', href: '/delivery-areas', event: 'cta_click_delivery_areas', eventParams: { page_name: 'for-homes', audience_type: 'home' } }}
        variant="blue"
      />

      <div className="bg-kayora-blue-900 pb-16 text-center">
        <WhatsAppButton
          message={WHATSAPP_INTENTS.homeOrder}
          pageType="growth"
          pageName="for-homes"
          audienceType="home"
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
