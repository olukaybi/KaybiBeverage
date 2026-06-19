import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import PillarGrid from '@/components/PillarGrid';
import DistributorForm from '@/components/DistributorForm';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kayorawater.com/' },
    { '@type': 'ListItem', position: 2, name: 'Distribution', item: 'https://www.kayorawater.com/distribution' },
  ],
};

export const metadata: Metadata = {
  title: 'Kayora Distributor Programme | South-South & East Nigeria',
  description:
    'Join the Kayora distributor network across Akwa Ibom, Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo. Attractive rebates and other incentives.',
  alternates: { canonical: 'https://www.kayorawater.com/distribution' },
  openGraph: { url: 'https://www.kayorawater.com/distribution' },
};

const pillars = [
  {
    title: 'Attractive Rebates and Incentives.',
    body: 'Distributor terms are structured to reward growth — meaningful rebates on volume, performance incentives, and a partnership model designed for serious operators.',
  },
  {
    title: 'Supply You Can Count On.',
    body: 'Our Eket plant runs daily production. You order on a Monday, the truck is on the road by Wednesday. No "stock-out" excuses.',
  },
  {
    title: 'Marketing You Can Use.',
    body: 'Branded shelf-talkers, social assets, event banners, point-of-sale displays — supplied at no cost to our active distributors. We help you sell.',
  },
  {
    title: 'A Brand That Pulls.',
    body: 'NAFDAC Registered, SON MANCAP Registered, and growing recognition across Akwa Ibom and the South-South and South-East. Customers ask for Kayora by name.',
  },
];

const channels = [
  {
    name: 'Retailers',
    desc: 'Supermarkets, convenience stores, kiosks, pharmacies, and any point-of-sale business that sells directly to consumers. Kayora is a high-turnover product that pairs well with FMCG retail. Our 30cl and 50cl are particularly strong retail movers.',
  },
  {
    name: 'Wholesalers',
    desc: 'Businesses that buy in volume and resell to retailers, market traders, or smaller distributors. Our volume pricing model rewards scale. We offer flexible case minimum requirements and scheduled delivery for high-volume accounts.',
  },
  {
    name: 'Event Suppliers',
    desc: 'If your business supplies water, ice, drinks or catering to events — weddings, conferences, corporate functions, church programmes — Kayora is the product your clients will thank you for. Our 30cl Sharp-sharp is built for this channel.',
  },
  {
    name: 'HoReCa',
    desc: 'Hotels, restaurants and catering operations. Kayora&rsquo;s regulatory credentials (NAFDAC, SON MANCAP Registered) are exactly what hospitality operators need when serving international guests or operating under hospitality compliance frameworks. Both 75cl and 18.9L are strong in this channel.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Apply',
    desc: 'Complete the distributor application form below. It takes about five minutes. We ask for basic business information and an estimate of your monthly volume.',
  },
  {
    number: '02',
    title: 'Verification',
    desc: 'Our team reviews your application within one business day. We may call to clarify details or discuss territory. We are not bureaucratic about this — if you are a legitimate business, we want to work with you.',
  },
  {
    number: '03',
    title: 'Onboarding',
    desc: 'We set up your account, confirm your pricing tier and delivery schedule, and provide your marketing kit (shelf-talkers, banners, social assets). The first order is typically delivered within the first week.',
  },
  {
    number: '04',
    title: 'Launch',
    desc: 'You start selling. We support you with ongoing restocking, responsive customer service, and marketing materials as your account grows. Active distributors get priority allocation during peak demand periods.',
  },
];

export default function DistributionPage() {
  return (
    <>
      <Hero
        eyebrow="Distribution Network"
        headline={'Carry the Standard.\nBuild a Business.'}
        subhead="Kayora is recruiting distributors across Akwa Ibom and our live South-South and South-East states — Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo. Attractive rebates and other incentives, dependable supply, real marketing support — and a brand customers already trust."
        primaryCTA={{ label: 'Apply to Distribute', href: '#apply' }}
        secondaryCTA={{ label: 'Talk to Our Team', href: '/contact' }}
        imageSrc="/images/factory/factory-03.jpg"
        imageAlt="Kaybi Beverage Industries — Kayora water production and distribution"
      />

      <PillarGrid
        eyebrow="Why Partner With Kayora"
        headline="What You Get When You Carry Kayora"
        pillars={pillars}
        className="bg-kayora-cream"
      />

      {/* Territories */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Delivery Areas
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink mb-4">
              Where We Operate
            </h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              We deliver directly across Akwa Ibom State. Beyond Akwa Ibom, Kayora is available today through our distributor network — live distribution, not a roadmap. If you can move volume in or beyond these areas, we want to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
            <div className="border border-kayora-mist rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-kayora-ink mb-4">Direct Delivery — Akwa Ibom</h3>
              <ul className="space-y-2 text-kayora-graphite text-sm">
                {['Eket (HQ)', 'Uyo', 'Ikot Ekpene', 'Oron', 'Abak', 'Itu', 'Wider Akwa Ibom State'].map((place) => (
                  <li key={place} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-kayora-gold-500 shrink-0" aria-hidden="true" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-kayora-mist rounded-xl p-6 bg-kayora-blue-100">
              <h3 className="font-display text-lg font-semibold text-kayora-ink mb-4">Via Distributor Network</h3>
              <ul className="space-y-2 text-kayora-graphite text-sm">
                {[
                  'Cross River State',
                  'Rivers State',
                  'Bayelsa State',
                  'Delta State',
                  'Edo State',
                  'Enugu State',
                  'Anambra State',
                  'Abia State',
                  'Imo State',
                ].map((place) => (
                  <li key={place} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-kayora-blue-500 shrink-0" aria-hidden="true" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Distribution Channels
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink">Who We&rsquo;re Looking For</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {channels.map((channel, i) => (
              <div key={channel.name} className="bg-white border border-kayora-mist rounded-xl p-6">
                <p className="font-display text-display-md text-kayora-gold-500 leading-none mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-xl font-semibold text-kayora-ink mb-3">{channel.name}</h3>
                <p
                  className="text-kayora-graphite text-sm leading-relaxed max-w-[55ch]"
                  dangerouslySetInnerHTML={{ __html: channel.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              The Process
            </p>
            <h2 className="font-display text-display-lg text-kayora-ink">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="font-display text-display-md text-kayora-gold-500 leading-none mb-3">
                  {step.number}
                </p>
                <h3 className="font-sans font-semibold text-kayora-ink text-lg mb-2">{step.title}</h3>
                <p className="text-kayora-graphite text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-kayora-cream py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
              Apply Now
            </p>
            <h2 className="font-display text-display-md text-kayora-ink mb-4">
              Distributor Application
            </h2>
            <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">
              Fill in the form below and our team will follow up within one business day. All applications are reviewed personally.
            </p>
          </div>
          <DistributorForm />

          <div className="mt-12 pt-10 border-t border-kayora-mist">
            <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">Prefer to call?</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-xs text-kayora-stone uppercase tracking-widest mb-1">Corporate / distributor inquiries</p>
                <a href="tel:+23407070238028" className="text-kayora-ink font-semibold hover:text-kayora-blue-700 transition-colors">
                  07070 238028
                </a>
              </div>
              <div>
                <p className="text-xs text-kayora-stone uppercase tracking-widest mb-1">General / customer line</p>
                <a href="tel:+2349040789918" className="text-kayora-ink font-semibold hover:text-kayora-blue-700 transition-colors">
                  0904 078 9918
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
