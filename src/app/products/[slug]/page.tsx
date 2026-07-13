import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTASection from '@/components/CTASection';

const skuData = {
  '30cl': {
    size: '30cl',
    name: 'Sharp-sharp',
    tagline: 'The Event Bottle',
    headline: 'Kayora 30cl\nSharp-sharp',
    subhead: 'The event standard. Compact, easy to chill in volume, and purpose-built for any occasion where water is served to guests.',
    description: [
      'The 30cl Sharp-sharp was designed for occasions where water is served, not just consumed. Weddings, naming ceremonies, corporate functions, conferences, church events — these are the settings where a bottle that is small enough to handle comfortably but substantial enough to be satisfying matters most.',
      'Produced at our Eket facility under the same eight-stage purification process as every other Kayora size, the 30cl is sold in cases of 24. It chills quickly, is easy to transport in large quantities, and the tamper-evident cap gives your guests confidence that what they are drinking is sealed, safe and traceable.',
      'For events and caterers who need a reliable, premium water with visible certification, the Sharp-sharp is the specification.',
    ],
    useCases: [
      { title: 'Weddings & Naming Ceremonies', body: 'The right size for service at tables and for guests to hold during proceedings.' },
      { title: 'Corporate Events & Conferences', body: 'Professional presentation, easy logistics, and a brand that signals quality.' },
      { title: 'Catering & Food Service', body: 'Standard pack size for catering packs, event coolers and bulk chill.' },
      { title: 'Church Events & Programmes', body: 'Compact, affordable per-unit cost for large congregations.' },
    ],
    specs: {
      volume: '30cl (300ml)',
      material: 'PET — food-grade, BPA-free',
      caseCount: '24 bottles per case',
      nafdac: 'A1-111026',
      son: 'FT-29179',
      cap: 'Steam-cleaned, ozone-sterilised, tamper-evident',
    },
    imageSrc: '/05_kayora_30cl_single.png',
    imageAlt: 'Kayora 30cl Sharp-sharp — premium purified water event bottle',
    related: [
      { slug: '50cl', size: '50cl', name: 'Original' },
      { slug: '75cl', size: '75cl', name: 'Jara' },
      { slug: '18-9l', size: '18.9L', name: 'Never Finish' },
    ],
  },
  '50cl': {
    size: '50cl',
    name: 'Original',
    tagline: 'The Everyday Bottle',
    headline: 'Kayora 50cl\nOriginal',
    subhead: 'The backbone of the range. For homes, offices, schools and anywhere clean water is an everyday requirement.',
    description: [
      'The 50cl Original is the Kayora bottle most Nigerians encounter first — on office desks, in school bags, on restaurant tables and in supermarket fridges across Akwa Ibom. It is sized to be consumed in a single sitting, carry well without bulk, and fit standard fridge doors and bag pockets.',
      'Cases of 12 make it straightforward for household orders, office deliveries and retail stocking. The same eight-stage purified water, the same NAFDAC-registered process, the same tamper-evident seal as every other size in the range.',
      'For retail and distribution partners, the 50cl is the highest-velocity SKU in the range — the size customers reach for by default and return to consistently.',
    ],
    useCases: [
      { title: 'Home & Daily Hydration', body: 'The right size for the fridge, the dining table and daily family use.' },
      { title: 'Offices & Co-working Spaces', body: 'Clean, safe hydration for staff — no dispenser required.' },
      { title: 'Schools & Education', body: 'Compact enough for school bags, trusted enough for parents.' },
      { title: 'Retail, Kiosks & Supermarkets', body: 'The highest-velocity SKU for retailers; customers ask for it by name.' },
    ],
    specs: {
      volume: '50cl (500ml)',
      material: 'PET — food-grade, BPA-free',
      caseCount: '12 bottles per case',
      nafdac: 'A1-111026',
      son: 'FT-29179',
      cap: 'Steam-cleaned, ozone-sterilised, tamper-evident',
    },
    imageSrc: '/04_kayora_50cl_single.png',
    imageAlt: 'Kayora 50cl Original — everyday premium purified water bottle',
    related: [
      { slug: '30cl', size: '30cl', name: 'Sharp-sharp' },
      { slug: '75cl', size: '75cl', name: 'Jara' },
      { slug: '18-9l', size: '18.9L', name: 'Never Finish' },
    ],
  },
  '75cl': {
    size: '75cl',
    name: 'Jara',
    tagline: 'The Premium Bottle',
    headline: 'Kayora 75cl\nJara',
    subhead: 'A little extra, the way only Nigerians know how. For serious hydrators, premium dining, and hospitality that demands more.',
    description: [
      'The 75cl Jara was created for two categories of use that share a common need: people who hydrate seriously, and establishments where presentation matters. Gym-goers, long-haul travellers, fieldworkers and professionals with demanding schedules reach for the Jara because 50cl simply runs out too quickly. Hotels and restaurants use it as a premium table water option for diners who want more than the standard serve.',
      'At 75cl, the bottle is generous without being impractical. It is weighted for one-handed drinking, sized to stay cold for a meal, and visually distinct enough to communicate quality on a table setting without explanation.',
      'For hospitality buyers, the Jara is the correct specification. NAFDAC Registered, SON MANCAP Certified, and available in cases of 12.',
    ],
    useCases: [
      { title: 'Hotels & Fine Dining', body: 'Premium table water that communicates quality through size and presentation.' },
      { title: 'Gyms & Active Lifestyle', body: 'Generous volume for sessions that demand real hydration.' },
      { title: 'Travel & Extended Work', body: 'One bottle lasts a long journey or a demanding day in the field.' },
      { title: 'Premium Gifting & Events', body: 'A step above the standard bottle for occasions that call for it.' },
    ],
    specs: {
      volume: '75cl (750ml)',
      material: 'PET — food-grade, BPA-free',
      caseCount: '12 bottles per case',
      nafdac: 'A1-111026',
      son: 'FT-29179',
      cap: 'Steam-cleaned, ozone-sterilised, tamper-evident',
    },
    imageSrc: '/03_kayora_75cl_single.png',
    imageAlt: 'Kayora 75cl Jara — premium purified water for hospitality and active use',
    related: [
      { slug: '30cl', size: '30cl', name: 'Sharp-sharp' },
      { slug: '50cl', size: '50cl', name: 'Original' },
      { slug: '18-9l', size: '18.9L', name: 'Never Finish' },
    ],
  },
  '18-9l': {
    size: '18.9L',
    name: 'Never Finish',
    tagline: 'The Dispenser Standard',
    headline: 'Kayora 18.9L\nNever Finish',
    subhead: 'The dispenser standard for homes, offices, schools and institutions. One bottle runs your household or workspace for days.',
    description: [
      'The 18.9L Never Finish is built for volume users who need reliable, clean water available continuously without the cost and waste of single-serve bottles. A single unit serves a household of four for several days, or a small office for a full working week. It fits all standard floor-standing and countertop water dispensers available in Nigeria.',
      'The bottle is polycarbonate — a harder, more durable material than PET that is suited to the weight and handling demands of dispenser use. It is BPA-free. The seal is triple-locked at our facility, and the return cycle involves full inspection and sanitisation before any bottle is refilled.',
      'For offices, hotels, schools, clinics and large households, the Never Finish is the most cost-efficient way to provide consistent, premium purified water to a group. Scheduled delivery and bottle-return service is available within Akwa Ibom.',
    ],
    useCases: [
      { title: 'Homes & Family Households', body: 'Continuous clean water for the whole family without daily purchases.' },
      { title: 'Offices & Institutions', body: 'Serves an entire floor or department; scheduled delivery available.' },
      { title: 'Hotels & Guesthouses', body: 'Back-of-house and guest-area water supply in one managed unit.' },
      { title: 'Schools & Clinics', body: 'Institutional volumes with full NAFDAC traceability on every delivery.' },
    ],
    specs: {
      volume: '18.9L',
      material: 'Polycarbonate — food-grade, BPA-free',
      caseCount: 'Sold per unit; return/replacement service available',
      nafdac: 'A1-111026',
      son: 'FT-29180',
      cap: 'Triple-locked at fill; tamper-evident',
    },
    imageSrc: '/07_kayora_18_9l_single_corrected.png',
    imageAlt: 'Kayora 18.9L Never Finish — dispenser water for homes and offices',
    related: [
      { slug: '30cl', size: '30cl', name: 'Sharp-sharp' },
      { slug: '50cl', size: '50cl', name: 'Original' },
      { slug: '75cl', size: '75cl', name: 'Jara' },
    ],
  },
} as const;

type Slug = keyof typeof skuData;

export function generateStaticParams() {
  return Object.keys(skuData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sku = skuData[params.slug as Slug];
  if (!sku) return {};
  return {
    title: `Kayora ${sku.size} ${sku.name} | ${sku.tagline} — Premium Purified Water`,
    description: `Kayora ${sku.size} ${sku.name}: ${sku.subhead} NAFDAC Registered A1-111026. Produced by Kaybi Beverage Industries Limited, Eket, Akwa Ibom.`,
    alternates: { canonical: `https://www.kayorawater.com/products/${params.slug}` },
    openGraph: {
      type: 'website',
      url: `https://www.kayorawater.com/products/${params.slug}`,
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
}

export default function SKUPage({ params }: { params: { slug: string } }) {
  const sku = skuData[params.slug as Slug];
  if (!sku) notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Kayora ${sku.size} ${sku.name}`,
    description: sku.subhead,
    image: `https://www.kayorawater.com${sku.imageSrc}`,
    brand: { '@type': 'Brand', name: 'Kayora' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Kaybi Beverage Industries Limited',
      address: { '@type': 'PostalAddress', streetAddress: '173 Eket Oron Road', addressLocality: 'Eket', addressRegion: 'Akwa Ibom State', addressCountry: 'NG' },
    },
    offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited' } },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.kayorawater.com/products' },
      { '@type': 'ListItem', position: 3, name: `${sku.size} ${sku.name}`, item: `https://www.kayorawater.com/products/${params.slug}` },
    ],
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-kayora-blue-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-kayora-cream/60 hover:text-kayora-cream text-sm mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
              >
                ← All Products
              </Link>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
                {sku.tagline}
              </p>
              <h1 className="font-display text-display-lg text-white mb-6 whitespace-pre-line">
                {sku.headline}
              </h1>
              <p className="text-lg leading-relaxed text-white/75 mb-8 max-w-[52ch]">
                {sku.subhead}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-gold-500 text-white font-semibold rounded-lg hover:bg-kayora-gold-500/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-500"
                >
                  Order Kayora
                </Link>
                <Link
                  href="/distribution"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Bulk / Distributor Enquiry
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full h-[320px] lg:h-[440px]">
                <Image
                  src={sku.imageSrc}
                  alt={sku.imageAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              About This Product
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              The {sku.name} — In Detail
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              {sku.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Best Used For
            </p>
            <h2 className="font-display text-display-md text-kayora-ink">
              Who Reaches for the {sku.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sku.useCases.map((uc) => (
              <div key={uc.title} className="bg-kayora-cream border border-kayora-mist rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-kayora-ink mb-2">{uc.title}</h3>
                <p className="text-kayora-graphite text-sm leading-relaxed">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs + Certifications */}
      <section className="bg-kayora-blue-900 py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Specs */}
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-5">
                Product Specifications
              </p>
              <dl className="space-y-4">
                {[
                  { label: 'Volume', value: sku.specs.volume },
                  { label: 'Material', value: sku.specs.material },
                  { label: 'Packaging', value: sku.specs.caseCount },
                  { label: 'Cap', value: sku.specs.cap },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-white/10 pb-4">
                    <dt className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-1">{label}</dt>
                    <dd className="text-kayora-cream font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Certifications */}
            <div>
              <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-5">
                Regulatory Status
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-1">NAFDAC Registration</p>
                  <p className="text-kayora-cream font-display text-2xl font-semibold">{sku.specs.nafdac}</p>
                  <p className="text-kayora-cream/60 text-sm mt-1">National Agency for Food and Drug Administration and Control</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-1">SON MANCAP Certification</p>
                  <p className="text-kayora-cream font-display text-2xl font-semibold">{sku.specs.son}</p>
                  <p className="text-kayora-cream/60 text-sm mt-1">Standards Organisation of Nigeria</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-1">Manufactured By</p>
                  <p className="text-kayora-cream font-semibold">Kaybi Beverage Industries Limited</p>
                  <p className="text-kayora-cream/60 text-sm mt-1">173 Eket Oron Road, Eket, Akwa Ibom State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline={`Order the Kayora ${sku.size} ${sku.name}`}
        body="Direct delivery across Akwa Ibom State. Distributor network across the South-South and South-East. Call, email or message us and we will respond within hours."
        primaryCTA={{ label: 'Order Kayora', href: '/cart' }}
        secondaryCTA={{ label: 'Distributor Enquiry', href: '/distribution' }}
        variant="cream"
      />

      {/* Related Products */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Also Available
          </p>
          <h2 className="font-display text-display-sm text-kayora-ink mb-10">
            The Rest of the Kayora Range
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sku.related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/products/${rel.slug}`}
                className="group flex items-center gap-4 bg-white border border-kayora-mist rounded-xl p-5 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
              >
                <div className="w-16 h-16 rounded-lg bg-kayora-blue-900/5 flex items-center justify-center shrink-0">
                  <span className="font-display text-sm font-bold text-kayora-blue-900">{rel.size}</span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-kayora-ink group-hover:text-kayora-blue-700 transition-colors">{rel.name}</p>
                  <p className="text-sm text-kayora-stone">Kayora {rel.size}</p>
                </div>
                <span className="ml-auto text-kayora-stone group-hover:text-kayora-blue-700 transition-colors" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
