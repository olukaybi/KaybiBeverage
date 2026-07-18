import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Kayora Products — 30cl, 50cl, 75cl & 18.9L | Premium Purified Water',
  description:
    'Kayora Premium Purified Water in four sizes: 30cl Sharp-sharp (events), 50cl Original (everyday), 75cl Jara (premium dining), 18.9L Never Finish (homes & offices). Plus an 18.9L refill service at ₦1,000. NAFDAC Registered A1-111026.',
  alternates: { canonical: 'https://www.kayorawater.com/products' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/products',
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

const skus = [
  {
    slug: '30cl',
    size: '30cl',
    name: 'Sharp-sharp',
    tagline: 'The Event Bottle',
    description:
      'Compact, easy to chill in volume, and purpose-built for weddings, naming ceremonies, corporate functions and conferences. Cases of 24.',
    useCases: ['Weddings & naming ceremonies', 'Corporate events & conferences', 'Catering & hospitality', 'Quick-serve occasions'],
    imageSrc: '/05_kayora_30cl_single.webp',
    imageAlt: 'Kayora 30cl Sharp-sharp — event bottle',
  },
  {
    slug: '50cl',
    size: '50cl',
    name: 'Original',
    tagline: 'The Everyday Bottle',
    description:
      'The backbone of the range. Goes into school bags, sits on office desks, lines supermarket shelves and is served in restaurants across Akwa Ibom. Cases of 12.',
    useCases: ['Home & daily hydration', 'Offices & co-working spaces', 'Schools & education', 'Retail & kiosks'],
    imageSrc: '/04_kayora_50cl_single.webp',
    imageAlt: 'Kayora 50cl Original — everyday bottle',
  },
  {
    slug: '75cl',
    size: '75cl',
    name: 'Jara',
    tagline: 'The Premium Bottle',
    description:
      'A little extra, the way only Nigerians know how. For gym-goers, travellers, hotels and restaurants that want a premium table water. Cases of 12.',
    useCases: ['Hotels & fine dining', 'Gyms & fitness', 'Travel & fieldwork', 'Premium gifting & events'],
    imageSrc: '/03_kayora_75cl_single.webp',
    imageAlt: 'Kayora 75cl Jara — premium bottle',
  },
  {
    slug: '18-9l',
    size: '18.9L',
    name: 'Never Finish',
    tagline: 'The Dispenser Standard',
    description:
      'One bottle serves a household for days or a small office for a week. Fits all standard floor-standing and countertop dispensers available in Nigeria.',
    useCases: ['Homes & family households', 'Offices & institutions', 'Hotels & guesthouses', 'Schools & clinics'],
    imageSrc: '/07_kayora_18_9l_single_corrected.webp',
    imageAlt: 'Kayora 18.9L Never Finish — dispenser bottle',
  },
];

const productListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Kayora Premium Purified Water — Product Range',
  itemListElement: skus.map((sku, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `Kayora ${sku.size} ${sku.name}`,
      description: sku.description,
      url: `https://www.kayorawater.com/products/${sku.slug}`,
      brand: { '@type': 'Brand', name: 'Kayora' },
      manufacturer: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited' },
      offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock' },
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.kayorawater.com/products' },
  ],
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-kayora-blue-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
                The Range
              </p>
              <h1 className="font-display text-display-lg text-white mb-6">
                Four Sizes.<br />One Standard.
              </h1>
              <p className="text-lg leading-relaxed text-white/75 mb-8 max-w-[55ch]">
                From the 30cl you reach for at a naming ceremony to the 18.9L that anchors your office — every bottle is the same eight-stage purified water, sealed at our Eket facility under NAFDAC Reg. A1-111026.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500"
                >
                  Order Kayora
                </Link>
                <Link
                  href="/our-water"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Our Purification Process
                </Link>
              </div>
            </div>
            <div className="relative h-[320px] lg:h-[400px]">
              <Image
                src="/10_kayora_full_family_lineup.webp"
                alt="Kayora Premium Purified Water — full product range: 30cl, 50cl, 75cl and 18.9L"
                fill
                priority
                className="object-contain"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-kayora-blue-900/90 py-4 border-b border-white/10">
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

      {/* SKU Grid */}
      <section className="bg-kayora-cream py-[clamp(5rem,9vw,9rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Choose Your Size
            </p>
            <h2 className="font-display text-display-md text-kayora-ink">
              The Complete Kayora Range
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skus.map((sku) => (
              <div key={sku.slug} className="flex flex-col bg-white border border-kayora-mist rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-60 bg-kayora-blue-900/5">
                  <Image
                    src={sku.imageSrc}
                    alt={sku.imageAlt}
                    fill
                    className="object-contain p-6"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">{sku.size}</p>
                  <h3 className="font-display text-2xl font-semibold text-kayora-ink mb-1">{sku.name}</h3>
                  <p className="text-sm text-kayora-stone mb-4">{sku.tagline}</p>
                  <p className="text-sm text-kayora-graphite leading-relaxed mb-5">{sku.description}</p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {sku.useCases.map((uc) => (
                      <li key={uc} className="flex items-center gap-2 text-sm text-kayora-graphite">
                        <span className="w-1.5 h-1.5 rounded-full bg-kayora-gold-500 shrink-0" aria-hidden="true" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products/${sku.slug}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
                  >
                    See Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refill Service */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Refill Service
            </p>
            <h2 className="font-display text-display-sm text-kayora-ink">
              Already Have a Kayora Bottle?
            </h2>
          </div>
          <div className="max-w-sm">
            <div className="flex flex-col bg-kayora-cream border border-kayora-mist rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-60 bg-kayora-blue-900/5">
                <Image
                  src="/07_kayora_18_9l_single_corrected.webp"
                  alt="Kayora 18.9L Never Finish — refill service for Kayora-branded bottles"
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 640px) 384px, 100vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">Refill Service</p>
                <h3 className="font-display text-2xl font-semibold text-kayora-ink mb-1">Never Finish Refill</h3>
                <p className="text-sm text-kayora-stone mb-4">Bring your empty Kayora bottle. Get clean water back.</p>
                <p className="font-semibold text-kayora-ink mb-1">₦1,000 per refill</p>
                <p className="text-sm text-kayora-graphite leading-relaxed mb-6">
                  For customers with a Kayora-branded empty 18.9L bottle.
                </p>
                <Link
                  href="/products/18-9l-refill"
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
                >
                  Order refill →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Verified Quality
            </p>
            <h2 className="font-display text-display-md text-kayora-ink">
              Every Bottle Is Regulated, Inspected and Documented.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'NAFDAC Registered', detail: 'A1-111026', sub: 'All four pack sizes' },
              { label: 'SON MANCAP Certified', detail: 'FT-29179 · FT-29180', sub: 'PET bottles and 18.9L' },
              { label: 'Eight-Stage Purification', detail: 'Borehole to bottle', sub: 'Every batch, every unit' },
              { label: 'Made in Nigeria', detail: '173 Eket Oron Road', sub: 'Eket, Akwa Ibom State' },
            ].map((item) => (
              <div key={item.label} className="bg-kayora-cream rounded-xl p-6 border border-kayora-mist">
                <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-2">{item.label}</p>
                <p className="font-display text-lg font-semibold text-kayora-ink mb-1">{item.detail}</p>
                <p className="text-sm text-kayora-stone">{item.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/quality-and-certifications"
              className="text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors"
            >
              Full quality and certification details →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Order?"
        body="Direct delivery across Akwa Ibom State. Distributor network across the South-South and South-East. Reach us and we will have water to you within 24–48 hours."
        primaryCTA={{ label: 'Order Kayora', href: '/cart' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        variant="blue"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
