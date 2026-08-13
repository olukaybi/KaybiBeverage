import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PillarGrid from '@/components/PillarGrid';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Kayora for Events | Water for Weddings, Ceremonies & Corporate Functions',
  description:
    'Kayora 30cl Sharp-sharp and 50cl Original — built for weddings, naming ceremonies, corporate functions and conferences across Akwa Ibom. NAFDAC Registered A1-111026, bulk event orders welcome.',
  alternates: { canonical: 'https://www.kayorawater.com/for-events' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/for-events',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Kayora Premium Purified Water — Wellness in every drop!', type: 'image/png' },
    ],
  },
};

const pillars = [
  {
    title: 'Sized to Serve, Not Overwhelm',
    body: 'The 30cl Sharp-sharp chills quickly in volume and is comfortable for guests to hold at tables, during proceedings, or standing at a reception.',
  },
  {
    title: 'Tamper-Evident, Guest-Ready',
    body: 'Every cap is steam-cleaned, ozone-sterilised and tamper-evident — guests can see the seal is intact before they drink, no explanation needed.',
  },
  {
    title: 'Bulk Orders, Handled Directly',
    body: 'Cases of 24 (30cl) and 12 (50cl), with delivery timed to your event schedule. Tell us your headcount and date and we will confirm quantities and cost.',
  },
];

const faqs = [
  {
    q: 'What size of Kayora is best for events?',
    a: 'The 30cl Sharp-sharp is purpose-built for events — weddings, naming ceremonies, corporate functions and conferences. For longer events or where guests want more per serving, the 50cl Original is a common addition.',
  },
  {
    q: 'How do I place a bulk order for an event?',
    a: 'Use the bulk/event order option on our Contact page, or call us directly, with your event date, headcount and preferred size. We will confirm quantities, pricing and delivery timing.',
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
  serviceType: 'Event and bulk purified water supply',
  provider: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited', url: 'https://www.kayorawater.com' },
  areaServed: { '@type': 'State', name: 'Akwa Ibom State' },
  audience: { '@type': 'Audience', audienceType: 'Event planners and hosts' },
  url: 'https://www.kayorawater.com/for-events',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'For Events', item: 'https://www.kayorawater.com/for-events' },
  ],
};

export default function ForEventsPage() {
  return (
    <>
      <Hero
        eyebrow="For Events"
        headline={'Water That Shows Up\nRight for Your Event'}
        subhead="Weddings, naming ceremonies, corporate functions, conferences and church programmes — the 30cl Sharp-sharp and 50cl Original, delivered on schedule and ready to serve."
        primaryCTA={{ label: 'Request a Bulk Quote', href: '/contact' }}
        secondaryCTA={{ label: 'Order Kayora', href: '/shop' }}
        productImageSrc="/images/products/kayora-30cl-hero-blue.png"
        imageAlt="Kayora 30cl Sharp-sharp — the event bottle"
      />

      <PillarGrid
        eyebrow="Built for Events"
        headline="Why Hosts Choose Kayora"
        pillars={pillars}
        className="bg-kayora-cream"
      />

      {/* SKU spotlight */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Recommended for Your Event</p>
            <h2 className="font-display text-display-md text-kayora-ink">Two Sizes for Every Occasion</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <Link href="/products/30cl" className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">30cl</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Sharp-sharp</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">Cases of 24. The event standard — weddings, ceremonies and conferences.</p>
            </Link>
            <Link href="/products/50cl" className="group bg-kayora-cream border border-kayora-mist rounded-xl p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500">
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">50cl</p>
              <h3 className="font-display text-xl font-semibold text-kayora-ink mb-2 group-hover:text-kayora-blue-700 transition-colors">Original</h3>
              <p className="text-sm text-kayora-graphite leading-relaxed">Cases of 12. For longer events and guests who want a fuller serving.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Common Questions</p>
            <h2 className="font-display text-display-md text-kayora-ink">Planning Your Order</h2>
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
        headline="Planning an Event?"
        body="Tell us your date, headcount and preferred size and we will confirm your quote within one business day."
        primaryCTA={{ label: 'Request a Bulk Quote', href: '/contact' }}
        secondaryCTA={{ label: 'View All Products', href: '/products' }}
        variant="blue"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
