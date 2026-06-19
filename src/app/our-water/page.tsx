import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kayora Eight-Stage Purification Process | Premium Purified Water',
  description:
    "Kayora's eight-stage purification: deep borehole, sediment, activated carbon, ion exchange, precision filtration, reverse osmosis, UV, ozonation. NAFDAC Registered.",
  alternates: { canonical: 'https://www.kayorawater.com/our-water' },
};

const stages = [
  {
    number: '01',
    title: 'Deep Borehole Source',
    body: 'Raw water is drawn from a dedicated borehole on our Eket site into stainless steel holding tanks. The borehole is sealed, maintained and tested on every production day before water enters the line. Starting clean is non-negotiable.',
  },
  {
    number: '02',
    title: 'Sediment Filtration',
    body: 'A multi-grade sediment filter removes suspended particles — sand, silt, rust, anything mechanical the pipeline might carry. By the time water leaves this stage it is visually crystal clear. This stage also protects every piece of equipment downstream from premature wear.',
  },
  {
    number: '03',
    title: 'Activated Carbon Filtration',
    body: 'Activated carbon adsorbs chlorine, residual organic compounds, taste and odour molecules. This is the stage that makes the difference between water that is technically safe and water that is genuinely pleasant to drink — cool, neutral, faintly sweet.',
  },
  {
    number: '04',
    title: 'Ion Exchange Resin',
    body: 'The water passes through an ion exchange resin bed that removes dissolved hardness ions and other charged contaminants. This conditions the water, improves the final taste profile, and protects the reverse osmosis membrane downstream from scaling and premature failure.',
  },
  {
    number: '05',
    title: 'Precision Filtration (5µm → 1µm)',
    body: 'A cascade of cartridge filters takes the water down progressively — five microns, then one micron — capturing the finest remaining particulates. This is the last mechanical barrier before the membrane, and it is what keeps the reverse osmosis stage performing at specification.',
  },
  {
    number: '06',
    title: 'Reverse Osmosis',
    body: 'The water is pushed through a semi-permeable membrane at high pressure. The pores are measured in fractions of a nanometre — fine enough to reject dissolved salts, heavy metals, microbial contaminants and trace organic compounds. The reject stream is flushed. Only the permeate continues.',
  },
  {
    number: '07',
    title: 'UV Sterilisation',
    body: 'The water is exposed to high-intensity ultraviolet light at 254 nanometres — the wavelength that disrupts the DNA of bacteria, viruses and protozoa, rendering them incapable of reproducing. No chemicals are added. No taste is altered. The process is purely physical.',
  },
  {
    number: '08',
    title: 'Ozonation',
    body: 'A final dose of dissolved ozone is introduced before bottling. Ozone is a powerful oxidiser that neutralises anything that may have slipped through earlier stages — and, critically, it persists briefly inside the sealed bottle, providing residual protection until the seal is broken.',
  },
];

const skuDetails = [
  {
    size: '30cl',
    name: 'Sharp-sharp',
    material: 'PET (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29179',
    desc: 'The event standard. Compact, portable, easy to chill en masse. Our 30cl is produced in volume for weddings, naming ceremonies, corporate functions, conferences and any event where water is served to guests. The small footprint makes it easy to package, transport and distribute. The seal is tamper-evident.',
    caseInfo: 'Standard case: 24 bottles. Custom case counts available for large event orders.',
  },
  {
    size: '50cl',
    name: 'Original',
    material: 'PET (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29179',
    desc: 'The everyday bottle. The 50cl Original is the backbone of our range — the size that goes into school bags, sits on office desks, is sold in supermarkets and kiosks, and is consumed in restaurants and fast-food outlets across Akwa Ibom. It is sized for one glass, chilled well and consumed easily.',
    caseInfo: 'Standard case: 12 bottles.',
  },
  {
    size: '75cl',
    name: 'Jara',
    material: 'PET (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29179',
    desc: 'A little extra, the way Nigerians know how. The 75cl Jara is for people who hydrate seriously — gym-goers, travellers, fieldworkers, anyone whose day runs long. It is generously sized without being impractical. Hotels and restaurants use it as a table water option for diners who prefer a larger serve.',
    caseInfo: 'Standard case: 12 bottles.',
  },
  {
    size: '18.9L',
    name: 'Never Finish',
    material: 'Polycarbonate (Food-grade, BPA-free)',
    nafdac: 'A1-111026',
    son: 'FT-29180',
    desc: 'The dispenser standard. A single 18.9L bottle serves a household for multiple days or a small office for a week. The polycarbonate bottle is durable, reusable (for its return cycle), and fits all standard floor-standing and countertop water dispensers available in Nigeria. The seal is triple-locked at our facility.',
    caseInfo: 'Sold per unit. Scheduled delivery and return/replacement service available.',
  },
];

const faqItems = [
  {
    id: 'faq-nafdac',
    question: 'Is Kayora water NAFDAC approved?',
    answer:
      'Yes. Kayora is NAFDAC Registered under number A1-111026, covering all four pack sizes (30cl, 50cl, 75cl, and 18.9L). It also carries SON MANCAP registration — FT-29179 for the PET bottles and FT-29180 for the 18.9L dispenser. The NAFDAC number is printed on every label.',
  },
  {
    id: 'faq-process',
    question: 'What is the eight-stage purification process?',
    answer:
      'Every bottle of Kayora passes through eight engineered stages: a deep borehole source, sediment filtration, activated carbon filtration, ion exchange resin, precision filtration (5 µm down to 1 µm), reverse osmosis, UV sterilisation, and a final ozonation polish that leaves residual protection inside the sealed bottle until you open it.',
  },
  {
    id: 'faq-location',
    question: 'Where is Kayora water manufactured?',
    answer:
      'Kayora is produced at our dedicated facility at 173 Eket Oron Road, Eket, Akwa Ibom State, Nigeria. The plant is owned and operated by Kaybi Beverage Industries Limited. Water is drawn from a deep on-site borehole and bottled within the same facility — short, traceable, and entirely local to Akwa Ibom.',
  },
  {
    id: 'faq-sizes',
    question: 'What pack sizes does Kayora come in?',
    answer:
      'Kayora is available in four sizes: 30cl ("Sharp-sharp," cases of 24), 50cl ("Original," cases of 12), 75cl ("Jara," cases of 12), and the 18.9L dispenser bottle ("Never Finish"). The same water, the same eight-stage process, the same standard — regardless of which size you choose.',
  },
  {
    id: 'faq-outside-akwa-ibom',
    question: 'Where can I buy Kayora outside Akwa Ibom?',
    answer:
      'Kayora is served through our distributor network across the South-South and South-East — Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia, and Imo States. Contact us and we\'ll connect you with your local distributor. Within Akwa Ibom we also deliver directly to homes, offices, and events.',
  },
  {
    id: 'faq-verify',
    question: 'How do I verify a genuine Kayora bottle?',
    answer:
      'Check five things: the steam-sterilised, tamper-evident cap (the band should not have separated); the NAFDAC Registration Number A1-111026 on the label; the clear batch and production code on the shoulder; the crisp Kayora label with the correct size and food-safe printing; and the working barcode and QR code.',
  },
  {
    id: 'faq-distributor',
    question: 'How do I become a Kayora distributor?',
    answer:
      'We are actively recruiting distributors across Akwa Ibom, the South-South, and the South-East. Distributors receive attractive rebates and other incentives, dependable supply, marketing materials, and a brand customers ask for by name. Visit our Distribution page or contact us at info@kaybibeverage.com to start the conversation.',
  },
  {
    id: 'faq-delivery',
    question: 'Does Kayora deliver to my office or event?',
    answer:
      'Yes — within Akwa Ibom (Eket, Uyo, Ikot Ekpene, Oron, Abak, Itu, and the wider state), we deliver directly to homes, offices, hotels, restaurants, schools, and events. Outside Akwa Ibom, your local distributor handles fulfillment. Reach us at info@kaybibeverage.com or 0904 078 9918 to plan a delivery.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Kayora Premium Purified Water — Product Range',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'Kayora 30cl Sharp-sharp',
        brand: { '@type': 'Brand', name: 'Kayora' },
        manufacturer: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited' },
        description: 'Compact 30cl purified water bottle — the event SKU. Cases of 24.',
        image: 'https://www.kayorawater.com/images/products/kayora-30cl-hero-blue.png',
        offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'Kayora 50cl Original',
        brand: { '@type': 'Brand', name: 'Kayora' },
        manufacturer: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited' },
        description: 'Flagship 50cl purified water bottle — everyday hydration. Cases of 12.',
        image: 'https://www.kayorawater.com/images/products/kayora-50cl-hero-blue.png',
        offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock' },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Product',
        name: 'Kayora 75cl Jara',
        brand: { '@type': 'Brand', name: 'Kayora' },
        manufacturer: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited' },
        description: 'Generous 75cl purified water bottle — for long days and serious hydrators. Cases of 12.',
        image: 'https://www.kayorawater.com/images/products/kayora-75cl-hero-blue.png',
        offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock' },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Product',
        name: 'Kayora 18.9L Never Finish',
        brand: { '@type': 'Brand', name: 'Kayora' },
        manufacturer: { '@type': 'Organization', name: 'Kaybi Beverage Industries Limited' },
        description: '18.9L polycarbonate dispenser bottle — the standard for homes, offices and hotels.',
        image: 'https://www.kayorawater.com/images/products/kayora-18l-hero-blue.png',
        offers: { '@type': 'Offer', priceCurrency: 'NGN', availability: 'https://schema.org/InStock' },
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Our Water', item: 'https://www.kayorawater.com/our-water' },
  ],
};

export default function OurWaterPage() {
  return (
    <>
      <Hero
        eyebrow="Our Water"
        headline={"What's Actually\nin the Bottle."}
        subhead="The long version of the story we tell on the label — without the marketing softness."
        primaryCTA={{ label: 'Order Kayora', href: '/contact' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        imageSrc="/images/products/kayora-front-view.jpeg"
        imageAlt="Kayora Premium Purified Water — four pack sizes on display"
      />

      {/* It Starts Underground */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Source
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">It Starts Underground</h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                The water in every Kayora bottle originates from a protected deep borehole at our Eket facility. We did not choose a surface water source. We did not connect to a municipal supply of uncertain provenance. We drilled deep, to water that has been naturally filtered through geological strata over decades.
              </p>
              <p>
                That geological filtration does not make the water safe to drink on its own — it simply means we start with water that is far less contaminated than surface alternatives. What happens next is what makes Kayora what it is.
              </p>
              <p>
                The borehole is sealed against surface intrusion, monitored regularly, and the water is tested before it enters our production line. Source integrity is the first quality checkpoint. We take it seriously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six Engineered Stages */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Process
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink mb-4">
              Eight Engineered Stages
            </h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              These stages are not marketing bullet points. They are sequential, interdependent steps that each address a specific category of contamination. Skipping or underinvesting in any one of them produces an inferior product. We have not skipped any.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {stages.map((stage) => (
              <div key={stage.number} className="grid sm:grid-cols-[100px_1fr] gap-6 items-start border-b border-kayora-mist pb-10 last:border-0 last:pb-0">
                <p className="font-display text-display-md text-kayora-gold-500 leading-none">{stage.number}</p>
                <div>
                  <h3 className="font-sans font-semibold text-xl text-kayora-ink mb-3">{stage.title}</h3>
                  <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sealed at the Source */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Bottling & Sealing
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">Sealed at the Source</h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                After ozonation, the water moves directly to filling under controlled conditions. The interval between the final treatment step and bottle sealing is measured in seconds, not minutes. Bottles are filled, capped and sealed without manual handling in the fill zone.
              </p>
              <p>
                Caps are steam-sterilised before capping and are tamper-evident by design. Cap integrity is tested on samples from every batch. Labels are applied immediately after sealing, carrying the batch number, production date and NAFDAC registration. Every bottle that leaves our facility is a traceable unit.
              </p>
              <p>
                We do not produce water that sits in open tanks. We do not refill bottles that have been returned without sanitisation. Every bottle of Kayora that you open has been sealed since it left our plant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Range In Detail */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Product Range
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink mb-4">The Range — In Detail</h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              Four sizes. The same water. The same eight-stage process. Every unit carries a valid NAFDAC registration number and SON MANCAP registration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skuDetails.map((sku) => (
              <div key={sku.size} className="border border-kayora-mist rounded-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 mb-1">{sku.size}</p>
                    <h3 className="font-display text-2xl font-semibold text-kayora-ink">{sku.name}</h3>
                  </div>
                </div>
                <p className="text-kayora-graphite text-sm leading-relaxed mb-6 max-w-[55ch]">{sku.desc}</p>
                <dl className="space-y-2 text-sm border-t border-kayora-mist pt-5">
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">Material</dt>
                    <dd className="text-kayora-graphite">{sku.material}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">NAFDAC Reg.</dt>
                    <dd className="text-kayora-graphite font-semibold">{sku.nafdac}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">SON MANCAP</dt>
                    <dd className="text-kayora-graphite font-semibold">{sku.son}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="text-kayora-stone w-32 shrink-0">Packaging</dt>
                    <dd className="text-kayora-graphite">{sku.caseInfo}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why the Bottle Itself Matters */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Packaging
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">
              Why the Bottle Itself Matters
            </h2>
            <div className="space-y-5 text-kayora-graphite leading-relaxed max-w-[65ch]">
              <p>
                The purification process means nothing if the vessel it goes into is compromised. All Kayora PET bottles (30cl, 50cl, 75cl) are food-grade, BPA-free, and manufactured to NAFDAC-compliant specifications. They are sourced from qualified suppliers and inspected before use.
              </p>
              <p>
                Our 18.9L bottles are polycarbonate — a harder, more durable material suited to dispenser use. They are also BPA-free. The 18.9L bottle is part of a managed return cycle: bottles returned by customers are inspected, sanitised under hot water and chemical treatment, inspected again, and returned to fill only after passing both inspections.
              </p>
              <p>
                We do not use second-hand bottles from unverified sources. We do not refill bottles that cannot pass our sanitisation inspection. The bottle is part of the product. We treat it accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mineral Profile / CoA */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Water Quality
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-8">Mineral Profile</h2>
            <div className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-8">
              <p className="text-kayora-graphite leading-relaxed mb-4">
                A batch-specific certificate of analysis is available on request. Please call{' '}
                <a href="tel:+2349040789918" className="font-semibold text-kayora-blue-700 hover:underline">
                  0904 078 9918
                </a>{' '}
                or email{' '}
                <a href="mailto:info@kaybibeverage.com" className="font-semibold text-kayora-blue-700 hover:underline">
                  info@kaybibeverage.com
                </a>{' '}
                and we will send the current batch CoA.
              </p>
              <p className="text-kayora-stone text-sm">
                Parameters tested include: pH, total dissolved solids (TDS), turbidity, coliform bacteria, E. coli, nitrates, nitrites, fluoride, lead, arsenic, and other parameters specified under NAFDAC guidelines for purified drinking water.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Now You Know What's in the Bottle."
        body="You can order Kayora for your home, office, event or business directly. We deliver directly across Akwa Ibom State. Beyond Akwa Ibom, Kayora is available through our distributor network in Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo. We respond to enquiries within hours."
        primaryCTA={{ label: 'Order Kayora', href: '/contact' }}
        secondaryCTA={{ label: 'Become a Distributor', href: '/distribution' }}
        variant="blue"
      />

      {/* FAQ */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              FAQ
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[60ch]">
              The questions customers and distributors ask us most.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
          <div className="mt-8 pt-6 border-t border-kayora-mist text-sm text-kayora-stone">
            More questions?{' '}
            <Link href="/contact" className="text-kayora-blue-700 font-medium hover:underline">
              Contact our team →
            </Link>
          </div>
        </div>
      </section>

      {/* Page-level JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
