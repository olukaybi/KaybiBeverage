import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kayora Premium Purified Water | NAFDAC Certified · Eket, Akwa Ibom',
  description:
    'Kayora® — six-stage purified, NAFDAC & SON certified water produced in Eket, Akwa Ibom. 30cl · 50cl · 75cl · 18.9L. Fast delivery across Akwa Ibom State.',
  alternates: { canonical: 'https://www.kayorawater.com/' },
};

const products = [
  {
    name: 'Sharp-sharp',
    size: '30cl',
    tag: 'Events & Celebrations',
    desc: 'The perfect companion for weddings, corporate events, and every celebration across Akwa Ibom. Crisp, refreshing, and purpose-made for sharing.',
    color: 'from-azure-50 to-azure-100',
    badge: 'Most popular for events',
  },
  {
    name: 'Original',
    size: '50cl',
    tag: 'Everyday Hydration',
    desc: 'Your go-to daily hydration companion. Trusted by Nigerian families and professionals for clean, safe water at any time of day.',
    color: 'from-sky-50 to-sky-100',
    badge: 'Everyday essential',
  },
  {
    name: 'Jara',
    size: '75cl',
    tag: 'Active Lifestyle',
    desc: 'More water, more life. Ideal for fitness, travel, and long days when you need generous hydration without the extra stops.',
    color: 'from-cyan-50 to-cyan-100',
    badge: 'Great for fitness & travel',
  },
  {
    name: 'Never Finish',
    size: '18.9L',
    tag: 'Offices & Homes',
    desc: 'The preferred dispenser bottle for offices, hotels, schools, and homes. Always ready, always pure. The water that never runs out.',
    color: 'from-blue-50 to-blue-100',
    badge: 'Best for offices & hotels',
  },
];

const stages = [
  { step: '01', title: 'Deep Borehole', desc: 'Water is drawn from a protected deep borehole, far from surface contamination.' },
  { step: '02', title: 'Sediment Filtration', desc: 'Multi-layer sediment filters remove suspended particles and fine debris.' },
  { step: '03', title: 'Activated Carbon', desc: 'Activated carbon adsorption eliminates chlorine, odours, and organic compounds.' },
  { step: '04', title: 'Reverse Osmosis', desc: 'High-pressure RO membranes remove dissolved solids, heavy metals, and bacteria.' },
  { step: '05', title: 'UV Sterilisation', desc: 'Ultraviolet light destroys any remaining microbial life, ensuring 99.9% purity.' },
  { step: '06', title: 'Ozonisation', desc: 'Ozone treatment preserves freshness and extends shelf-life without chemicals.' },
];

const faqs = [
  { q: 'Is Kayora water NAFDAC certified?', a: 'Yes. Kayora Premium Purified Water is produced by Kaybi Beverage Industries Limited and is certified by NAFDAC, Nigeria\'s food and beverage regulatory authority. Every batch meets Nigeria\'s highest safety standards.' },
  { q: 'What sizes does Kayora come in?', a: 'Kayora is available in four sizes: 30cl Sharp-sharp for events, 50cl Original for everyday hydration, 75cl Jara for extra volume, and 18.9L Never Finish for homes, offices and businesses.' },
  { q: 'How is Kayora water purified?', a: 'Every drop undergoes six stages: deep borehole extraction, sediment filtration, activated carbon filtration, reverse osmosis, UV sterilisation, and ozonisation.' },
  { q: 'How can I order Kayora water?', a: 'Call 09040789918 or email info@kaybibeverage.com. We deliver to homes, offices, hotels and events across Eket and Akwa Ibom State.' },
  { q: 'Does Kayora deliver to my area?', a: 'We currently serve Eket and the wider Akwa Ibom State, including Uyo. Contact us if you are outside this area and we will do our best to accommodate you.' },
  { q: 'How can I become a Kayora distributor?', a: 'Visit the Wholesale page and complete the Distributor Registration Form. Our team reviews all applications and will follow up within two business days.' },
  { q: 'Is Kayora suitable for large events?', a: 'Yes. The 30cl Sharp-sharp is designed for events — weddings, corporate functions, celebrations. We can supply in volume with advance notice. Contact us for bulk pricing.' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-azure-600 via-azure-500 to-sky-400 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              NAFDAC &amp; SON Certified · Made in Eket, Akwa Ibom
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance">
              Purified to the<br />
              <span className="text-azure-100">Highest Standard.</span><br />
              Safe for Every Table.
            </h1>
            <p className="text-xl text-azure-100 mb-8 max-w-xl leading-relaxed">
              Six-stage purified water crafted at our Eket facility. Trusted by homes, offices, hotels, and events across Akwa Ibom State.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-azure-600 font-bold px-8 py-3.5 rounded-full hover:bg-azure-50 transition-colors text-base shadow-lg"
              >
                Order Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-all text-base"
              >
                See Products
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm">
              {['30cl Sharp-sharp', '50cl Original', '75cl Jara', '18.9L Never Finish'].map(s => (
                <span key={s} className="flex items-center gap-1.5 text-azure-100">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'NAFDAC Certified', icon: '🏅' },
              { label: 'SON Certified', icon: '✅' },
              { label: '6-Stage Purification', icon: '💧' },
              { label: 'Proudly Nigerian', icon: '🇳🇬' },
            ].map(({ label, icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Our Range</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">The Right Size for Every Moment</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Four carefully sized products — each purified to the same exacting standard.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.size} className={`relative rounded-2xl bg-gradient-to-b ${p.color} p-6 flex flex-col hover:shadow-lg transition-shadow`}>
                <div className="text-xs font-semibold uppercase tracking-wider text-azure-500 mb-1">{p.tag}</div>
                <div className="text-4xl font-extrabold text-azure-700 mb-1">{p.size}</div>
                <div className="text-xl font-bold text-gray-800 mb-3 font-serif italic">{p.name}</div>
                <p className="text-sm text-gray-600 flex-1 leading-relaxed">{p.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-azure-600 bg-white rounded-full px-3 py-1 self-start shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  {p.badge}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 text-azure-600 font-semibold hover:text-azure-700 transition-colors">
              Learn more about all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Purification Process ─────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">How We Purify</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">Six Stages to Perfection</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every drop of Kayora water passes through a rigorous six-stage purification process before it reaches your table.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((s) => (
              <div key={s.step} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-azure-200 hover:shadow-md transition-all">
                <div className="text-3xl font-extrabold text-azure-200 leading-none shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Kayora ───────────────────────────────────────────────────── */}
      <section className="bg-azure-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-azure-200 text-sm font-semibold uppercase tracking-wider">Why Kayora</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-6 text-balance">
                Akwa Ibom's Trusted Source of Clean Water
              </h2>
              <p className="text-azure-100 leading-relaxed mb-6">
                Kaybi Beverage Industries Limited was established with one mission: to provide the people of Akwa Ibom State with consistently safe, clean, and affordable purified water. From our facility at 173, Eket-Oron Road, every bottle of Kayora leaves our plant meeting NAFDAC and SON standards.
              </p>
              <p className="text-azure-100 leading-relaxed">
                Whether you're stocking up for your home, supplying your office, catering a wedding, or building a distribution business — Kayora is the water you can trust.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 bg-white text-azure-600 font-bold px-6 py-3 rounded-full hover:bg-azure-50 transition-colors"
              >
                Our Story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '6-Stage', label: 'Purification Process' },
                { stat: 'NAFDAC', label: '& SON Certified' },
                { stat: '4 Sizes', label: '30cl to 18.9L' },
                { stat: 'Eket', label: 'Proudly Made Locally' },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-white mb-1">{stat}</div>
                  <div className="text-sm text-azure-200">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-gray-100 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-gray-800 hover:text-azure-600 list-none">
                  <span>{q}</span>
                  <svg className="w-5 h-5 text-azure-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Order?</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Call us, send an email, or fill out our order form. We deliver across Eket and Akwa Ibom State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2349040789918"
              className="inline-flex items-center justify-center gap-2 bg-azure-500 hover:bg-azure-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors text-base shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call 09040789918
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-azure-500 text-azure-600 font-bold px-8 py-3.5 rounded-full hover:bg-azure-50 transition-colors text-base"
            >
              Send a Message
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Interested in wholesale or distribution? <Link href="/wholesale" className="text-azure-500 hover:underline">Visit our Wholesale page →</Link>
          </p>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />
    </>
  );
}
