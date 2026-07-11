import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Delivery Areas — Kayora Premium Purified Water | Akwa Ibom & South-South',
  description:
    'Kayora delivers directly across Akwa Ibom State within 24–48 hours. Distributor network covers Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo States.',
  alternates: { canonical: 'https://www.kayorawater.com/delivery-areas' },
  openGraph: {
    url: 'https://www.kayorawater.com/delivery-areas',
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

const directAreas = [
  { name: 'Eket', note: 'Same-day for large orders' },
  { name: 'Uyo', note: 'Next-day delivery' },
  { name: 'Ikot Ekpene', note: 'Next-day delivery' },
  { name: 'Abak', note: 'Next-day delivery' },
  { name: 'Etinan', note: 'Next-day delivery' },
  { name: 'Oron', note: 'Next-day delivery' },
  { name: 'Itu', note: 'Next-day delivery' },
  { name: 'Ibeno', note: 'Scheduled delivery' },
  { name: 'Mkpat Enin', note: 'Scheduled delivery' },
  { name: 'Eastern Obolo', note: 'Scheduled delivery' },
];

const distributorStates = [
  { state: 'Cross River', cities: 'Calabar, Ogoja, Ikom' },
  { state: 'Rivers', cities: 'Port Harcourt, Obio-Akpor, Eleme' },
  { state: 'Bayelsa', cities: 'Yenagoa, Sagbama, Ogbia' },
  { state: 'Delta', cities: 'Asaba, Warri, Ughelli' },
  { state: 'Edo', cities: 'Benin City, Ekpoma, Auchi' },
  { state: 'Enugu', cities: 'Enugu, Nsukka, Awgu' },
  { state: 'Anambra', cities: 'Awka, Onitsha, Nnewi' },
  { state: 'Abia', cities: 'Umuahia, Aba, Ohafia' },
  { state: 'Imo', cities: 'Owerri, Orlu, Okigwe' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Delivery Areas', item: 'https://www.kayorawater.com/delivery-areas' },
  ],
};

export default function DeliveryAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-kayora-blue-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
              Where We Deliver
            </p>
            <h1 className="font-display text-display-lg text-white mb-6">
              Delivery Areas
            </h1>
            <p className="text-lg leading-relaxed text-white/75 max-w-[55ch]">
              We deliver directly across Akwa Ibom State. For the South-South and South-East, our distributor network has you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Delivery — Akwa Ibom */}
      <section className="bg-kayora-cream py-[clamp(5rem,9vw,9rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Direct Delivery
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-4">
              Akwa Ibom State
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              Kayora operates its own delivery fleet out of our Eket facility. Orders placed before midday are typically delivered the same or next working day across Akwa Ibom. Large event and institutional orders may qualify for same-day delivery in Eket and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {directAreas.map((area) => (
              <div key={area.name} className="bg-white border border-kayora-mist rounded-xl p-5 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-kayora-gold-500 mt-1.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-kayora-ink">{area.name}</p>
                  <p className="text-sm text-kayora-stone mt-0.5">{area.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-kayora-blue-900/5 border border-kayora-mist rounded-xl p-6 max-w-2xl">
            <p className="text-sm text-kayora-graphite leading-relaxed">
              <strong className="text-kayora-ink">Don&#39;t see your area listed?</strong> Contact us — if you are within Akwa Ibom State, we can almost certainly reach you. Call <a href="tel:+2349040789918" className="text-kayora-blue-700 hover:underline">0904 078 9918</a> or email <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a> to confirm.
            </p>
          </div>
        </div>
      </section>

      {/* Distributor Network */}
      <section className="bg-white py-[clamp(5rem,9vw,9rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Distributor Network
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-4">
              South-South & South-East Coverage
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              Outside Akwa Ibom, Kayora is available through our authorised distributor network. Distributors stock all four sizes and operate their own local delivery in these states. Contact us for current distributor contact details in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {distributorStates.map((entry) => (
              <div key={entry.state} className="bg-kayora-cream border border-kayora-mist rounded-xl p-6">
                <p className="font-display text-lg font-semibold text-kayora-ink mb-2">{entry.state} State</p>
                <p className="text-sm text-kayora-stone">{entry.cities}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <p className="text-kayora-graphite text-sm leading-relaxed mb-6">
              Distributor coverage is expanding. If you are a business in these or adjacent states interested in stocking or distributing Kayora, we want to hear from you.
            </p>
            <Link
              href="/distribution"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
            >
              Become a Distributor
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Order?"
        body="Place your order today and we will confirm delivery details and timing within hours. Call, email or fill in the form on our Contact page."
        primaryCTA={{ label: 'Order Kayora', href: '/products' }}
        secondaryCTA={{ label: 'Find a Distributor', href: '/distribution' }}
        variant="blue"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
