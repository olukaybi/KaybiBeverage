import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Quality & Certifications — Kayora Premium Purified Water | NAFDAC A1-111026',
  description:
    'Kayora\'s full quality and certification profile: NAFDAC Reg. A1-111026, SON MANCAP FT-29179 and FT-29180, eight-stage purification, and manufacturing standards at our Eket facility.',
  alternates: { canonical: 'https://www.kayorawater.com/quality-and-certifications' },
  openGraph: { url: 'https://www.kayorawater.com/quality-and-certifications' },
};

const certifications = [
  {
    body: 'NAFDAC',
    fullName: 'National Agency for Food and Drug Administration and Control',
    number: 'A1-111026',
    scope: 'All four pack sizes — 30cl, 50cl, 75cl and 18.9L',
    detail: 'NAFDAC registration confirms that Kayora\'s facility, production process, raw materials, finished product and labelling have been inspected and approved by Nigeria\'s food and drug regulatory authority. Our NAFDAC number is printed on every label and can be verified through the NAFDAC database.',
  },
  {
    body: 'SON MANCAP',
    fullName: 'Standards Organisation of Nigeria — Mandatory Conformity Assessment Programme',
    number: 'FT-29179 (30cl / 50cl / 75cl) · FT-29180 (18.9L)',
    scope: 'PET bottle sizes and 18.9L polycarbonate dispenser',
    detail: 'SON MANCAP registration verifies that Kayora\'s bottles and production processes conform to the relevant Nigerian Industrial Standards (NIS). FT-29179 covers our PET bottle range and FT-29180 covers the 18.9L polycarbonate dispenser bottle.',
  },
];

const processStages = [
  { number: '01', name: 'Deep Borehole Source', summary: 'Raw water drawn from a sealed, maintained borehole on our Eket site — tested daily before production.' },
  { number: '02', name: 'Sediment Filtration', summary: 'Coarse particles, sand and suspended solids are removed through multi-stage sediment filters.' },
  { number: '03', name: 'Activated Carbon', summary: 'Chlorine, organic compounds and odour-causing substances are adsorbed and removed.' },
  { number: '04', name: 'Ion Exchange', summary: 'Dissolved mineral imbalances and hardness ions are corrected for consistent water quality.' },
  { number: '05', name: 'Precision Filtration', summary: 'Sub-micron filtration captures any remaining fine particulates before the main purification stages.' },
  { number: '06', name: 'Reverse Osmosis', summary: 'The most demanding stage: membranes remove dissolved salts, heavy metals and micro-contaminants at molecular level.' },
  { number: '07', name: 'UV Treatment', summary: 'Ultraviolet light inactivates any remaining microbial content — bacteria, viruses and cysts.' },
  { number: '08', name: 'Ozonation', summary: 'Ozone is introduced as a final sterilisation step before bottling, maintaining purity through seal.' },
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kaybi Beverage Industries Limited',
  brand: { '@type': 'Brand', name: 'Kayora' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '173 Eket Oron Road',
    addressLocality: 'Eket',
    addressRegion: 'Akwa Ibom State',
    postalCode: '524101',
    addressCountry: 'NG',
  },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'NAFDAC Registration', identifier: 'A1-111026' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'SON MANCAP Registration', identifier: 'FT-29179' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'SON MANCAP Registration', identifier: 'FT-29180' },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Quality & Certifications', item: 'https://www.kayorawater.com/quality-and-certifications' },
  ],
};

export default function QualityAndCertificationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-kayora-blue-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
              Certified Quality
            </p>
            <h1 className="font-display text-display-lg text-white mb-6">
              Quality &amp;<br />Certifications
            </h1>
            <p className="text-lg leading-relaxed text-white/75 max-w-[55ch]">
              Every bottle of Kayora is the product of a regulated, documented, inspected process. Here is the full record.
            </p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-kayora-blue-900/90 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-kayora-cream/60 uppercase tracking-widest font-sans">
            <span>NAFDAC Reg. A1-111026</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>SON MANCAP FT-29179 · FT-29180</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>Eight-Stage Purification</span>
            <span className="text-kayora-gold-500" aria-hidden="true">·</span>
            <span>Made in Eket, Akwa Ibom</span>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-kayora-cream py-[clamp(5rem,9vw,9rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Regulatory Registrations
            </p>
            <h2 className="font-display text-display-md text-kayora-ink">
              Registered, Not Just Claimed.
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl">
            {certifications.map((cert) => (
              <div key={cert.body} className="bg-white border border-kayora-mist rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="sm:w-48 shrink-0">
                    <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-1">{cert.body}</p>
                    <p className="font-display text-2xl font-bold text-kayora-ink">{cert.number}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-kayora-stone uppercase tracking-widest mb-2">{cert.fullName}</p>
                    <p className="text-sm font-medium text-kayora-blue-700 mb-3">{cert.scope}</p>
                    <p className="text-kayora-graphite text-sm leading-relaxed">{cert.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eight-Stage Process */}
      <section className="bg-white py-[clamp(5rem,9vw,9rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Process
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-4">
              Eight Stages. Every Batch.
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              Kayora water goes through eight distinct purification stages before it reaches the bottle. No stage is skipped. No batch leaves the facility without completing the full sequence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processStages.map((stage) => (
              <div key={stage.number} className="bg-kayora-cream border border-kayora-mist rounded-xl p-6">
                <p className="font-display text-3xl font-bold text-kayora-blue-900/20 mb-3">{stage.number}</p>
                <h3 className="font-display text-base font-semibold text-kayora-ink mb-2">{stage.name}</h3>
                <p className="text-sm text-kayora-graphite leading-relaxed">{stage.summary}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/our-water"
              className="text-sm font-semibold text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors"
            >
              Read the full process detail on Our Water page →
            </Link>
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="bg-kayora-blue-900 py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
              Manufacturing
            </p>
            <h2 className="font-display text-display-md text-kayora-cream mb-6">
              Made at Our Eket Facility
            </h2>
            <p className="text-kayora-cream/80 leading-relaxed mb-6 max-w-[65ch]">
              Kayora is produced entirely at our facility at 173 Eket Oron Road, Eket, Akwa Ibom State, Nigeria. Our borehole, production line, laboratory and warehousing are all on-site. We are Nigerian-owned and Nigerian-operated, and our address is on every label.
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Manufacturer', value: 'Kaybi Beverage Industries Limited' },
                { label: 'Address', value: '173 Eket Oron Road, Eket, Akwa Ibom State' },
                { label: 'Postal Code', value: '524101' },
                { label: 'Country', value: 'Nigeria' },
              ].map(({ label, value }) => (
                <div key={label} className="border-b border-white/10 pb-4">
                  <dt className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-1">{label}</dt>
                  <dd className="text-kayora-cream font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTASection
        headline="Questions About Quality?"
        body="Our team can answer specific questions about our process, certifications or specifications. Call us, email us or visit the FAQ page."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ label: 'Read the FAQ', href: '/faq' }}
        variant="cream"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
