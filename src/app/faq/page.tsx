import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'FAQ — Kayora Premium Purified Water | Common Questions Answered',
  description:
    'Frequently asked questions about Kayora Premium Purified Water: NAFDAC registration, purification process, sizes, ordering, delivery, and distribution. NAFDAC Reg. A1-111026.',
  alternates: { canonical: 'https://www.kayorawater.com/faq' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/faq',
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

const faqs = [
  {
    category: 'About Kayora',
    questions: [
      {
        q: 'What is Kayora Water?',
        a: 'Kayora is a premium purified water brand produced by Kaybi Beverage Industries Limited at 173 Eket Oron Road, Eket, Akwa Ibom State, Nigeria. Every bottle of Kayora water goes through an eight-stage purification process — from borehole source through sediment filtration, activated carbon, ion exchange, precision filtration, reverse osmosis, UV treatment and ozonation — before it is sealed and dispatched.',
      },
      {
        q: 'Is Kayora NAFDAC registered?',
        a: 'Yes. Kayora is NAFDAC Registered under number A1-111026. This registration covers all four pack sizes — 30cl, 50cl, 75cl and 18.9L. Our registration number appears on every label and can be verified through the NAFDAC database.',
      },
      {
        q: 'Is Kayora SON MANCAP certified?',
        a: 'Yes. Kayora holds SON MANCAP certification FT-29179 for our PET bottle sizes (30cl, 50cl and 75cl) and FT-29180 for our 18.9L polycarbonate dispenser bottle. SON MANCAP is the Standards Organisation of Nigeria\'s mandatory conformity assessment programme.',
      },
      {
        q: 'Where is Kayora made?',
        a: 'Kayora is produced entirely in Nigeria at our facility at 173 Eket Oron Road, Eket, Akwa Ibom State. Our borehole, production line, quality laboratory and warehousing are all on the same site. We are a Nigerian-owned and Nigerian-operated company.',
      },
    ],
  },
  {
    category: 'Products & Sizes',
    questions: [
      {
        q: 'What sizes does Kayora come in?',
        a: 'Kayora is available in four sizes: 30cl Sharp-sharp (cases of 24, designed for events), 50cl Original (cases of 12, everyday hydration), 75cl Jara (cases of 12, premium and hospitality use), and 18.9L Never Finish (sold per unit, for homes and offices with dispensers).',
      },
      {
        q: 'What is the 30cl Sharp-sharp best for?',
        a: 'The 30cl Sharp-sharp is built for events — weddings, naming ceremonies, corporate functions, conferences and any occasion where water is served to guests. It chills quickly in volume, is easy to handle and the tamper-evident cap signals safety to guests.',
      },
      {
        q: 'What is the 18.9L Never Finish bottle?',
        a: 'The 18.9L Never Finish is a polycarbonate dispenser bottle that fits all standard floor-standing and countertop dispensers available in Nigeria. One unit serves a household of four for several days or a small office for a full working week. Scheduled delivery and bottle-return service is available within Akwa Ibom.',
      },
      {
        q: 'Are all Kayora sizes the same water?',
        a: 'Yes. Every size — 30cl, 50cl, 75cl and 18.9L — contains exactly the same eight-stage purified water produced at our Eket facility. The only difference is the pack format and intended use case.',
      },
    ],
  },
  {
    category: 'Ordering & Delivery',
    questions: [
      {
        q: 'How do I order Kayora?',
        a: 'You can place orders by calling us on 0904 078 9918, emailing info@kaybibeverage.com, or filling in the order form on our Contact page. We handle direct orders for homes, offices, events and institutions across Akwa Ibom State.',
      },
      {
        q: 'Where does Kayora deliver?',
        a: 'We offer direct delivery across Akwa Ibom State, typically within 24–48 hours. Outside Akwa Ibom, we supply through our distributor network covering Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo States — now expanding to Lagos and Kano States. See our Delivery Areas page for full coverage details.',
      },
      {
        q: 'What is the minimum order for delivery?',
        a: 'Minimum order quantities vary by size and location. Contact us directly on 0904 078 9918 or via our Contact page and our team will confirm the minimums and pricing for your specific requirement.',
      },
      {
        q: 'How long does delivery take?',
        a: 'For orders within Akwa Ibom State, we aim to deliver within 24–48 hours of order confirmation. Delivery to distributor partners in other states is handled on agreed schedules. Contact us for specific timelines.',
      },
    ],
  },
  {
    category: 'Distribution',
    questions: [
      {
        q: 'How do I become a Kayora distributor?',
        a: 'We are actively recruiting distributors across Akwa Ibom and in Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo States, now expanding to Lagos and Kano States. Visit our Distribution page or contact us directly at 0904 078 9918 or info@kaybibeverage.com to discuss the terms.',
      },
      {
        q: 'What support do distributors receive?',
        a: 'Kayora distributors receive attractive rebates and volume incentives, reliable supply from our Eket facility, marketing support and materials, and a brand that customers in their territory can already trust. We work with each distributor to establish the right commercial terms for their market.',
      },
    ],
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((cat) =>
    cat.questions.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    }))
  ),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.kayorawater.com/faq' },
  ],
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-kayora-blue-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
            Common Questions
          </p>
          <h1 className="font-display text-display-lg text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg leading-relaxed text-white/75 max-w-[55ch]">
            Everything you need to know about Kayora Premium Purified Water — our products, certifications, ordering and distribution.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-kayora-cream py-[clamp(5rem,9vw,9rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-16">
            {faqs.map((cat) => (
              <div key={cat.category}>
                <h2 className="font-display text-display-sm text-kayora-ink mb-8 pb-4 border-b border-kayora-mist">
                  {cat.category}
                </h2>
                <div className="space-y-8">
                  {cat.questions.map((faq) => (
                    <div key={faq.q}>
                      <h3 className="font-display text-lg font-semibold text-kayora-ink mb-3">{faq.q}</h3>
                      <p className="text-kayora-graphite leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mt-16 pt-12 border-t border-kayora-mist">
            <p className="text-kayora-graphite mb-4">
              Can&#39;t find what you&#39;re looking for? Our team is available Monday–Saturday, 8:00am–6:00pm WAT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                Contact Us
              </Link>
              <a
                href="tel:+2349040789918"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-kayora-mist text-kayora-ink font-semibold rounded-lg hover:bg-kayora-blue-900/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                Call 0904 078 9918
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Order?"
        body="Direct delivery across Akwa Ibom State. Reach us and we will have water to you within 24–48 hours."
        primaryCTA={{ label: 'Order Kayora', href: '/shop' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        variant="blue"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
