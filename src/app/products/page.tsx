import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Products | Kayora 30cl, 50cl, 75cl & 18.9L',
  description:
    'Explore the full Kayora range — 30cl Sharp-sharp, 50cl Original, 75cl Jara, and 18.9L Never Finish. NAFDAC & SON certified purified water produced in Eket, Akwa Ibom.',
  alternates: { canonical: 'https://www.kayorawater.com/products' },
};

const products = [
  {
    name: 'Sharp-sharp',
    size: '30cl',
    tag: 'Events & Celebrations',
    color: 'bg-azure-500',
    lightColor: 'bg-azure-50',
    borderColor: 'border-azure-100',
    tagColor: 'text-azure-600',
    desc: 'The Kayora 30cl Sharp-sharp is the go-to choice for events, weddings, corporate functions, and celebrations across Akwa Ibom State. Its compact size makes it easy to distribute and enjoy, and its crisp, purified taste always impresses guests.',
    useCases: ['Weddings & traditional ceremonies', 'Corporate events & conferences', 'School gatherings', 'Community events', 'Religious celebrations'],
    detail: 'Available for bulk order with advance notice. Contact us for event pricing.',
  },
  {
    name: 'Original',
    size: '50cl',
    tag: 'Everyday Hydration',
    color: 'bg-sky-500',
    lightColor: 'bg-sky-50',
    borderColor: 'border-sky-100',
    tagColor: 'text-sky-600',
    desc: 'The Kayora 50cl Original is the everyday hydration companion for Nigerian families and professionals. Sized just right for a full glass of refreshing, purified water at home, the office, or on the move.',
    useCases: ['Home daily use', 'Office hydration', 'School & campus', 'Travel & commuting', 'Restaurants & canteens'],
    detail: 'Our most versatile size — suitable for virtually every setting.',
  },
  {
    name: 'Jara',
    size: '75cl',
    tag: 'Active Lifestyle',
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    borderColor: 'border-cyan-100',
    tagColor: 'text-cyan-600',
    desc: 'The Kayora 75cl Jara gives you more of what you need. Ideal for active days, fitness routines, long commutes, and any time extra hydration matters. More water, the same uncompromising purity.',
    useCases: ['Gym & fitness', 'Long journeys', 'Sports & recreation', 'Healthcare settings', 'Hospitality & hotels'],
    detail: 'The "Jara" in the name says it all — a little extra, always worth it.',
  },
  {
    name: 'Never Finish',
    size: '18.9L',
    tag: 'Offices & Homes',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    tagColor: 'text-blue-600',
    desc: 'The Kayora 18.9L Never Finish is the standard dispenser bottle for offices, hotels, banks, schools, and homes that need a reliable, long-lasting supply of purified water. Set it, forget it, and trust it.',
    useCases: ['Corporate offices & banks', 'Hotels & guesthouses', 'Schools & universities', 'Hospitals & clinics', 'Large households'],
    detail: 'Fits all standard water dispensers. Available for scheduled delivery.',
  },
];

const stages = [
  { step: '01', title: 'Deep Borehole', desc: 'Water sourced from a protected deep borehole.' },
  { step: '02', title: 'Sediment Filtration', desc: 'Multi-layer filters remove suspended particles.' },
  { step: '03', title: 'Activated Carbon', desc: 'Eliminates chlorine, odours, and organics.' },
  { step: '04', title: 'Reverse Osmosis', desc: 'Removes dissolved solids and heavy metals.' },
  { step: '05', title: 'UV Sterilisation', desc: 'Destroys 99.9% of microbial life.' },
  { step: '06', title: 'Ozonisation', desc: 'Preserves freshness without chemicals.' },
];

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-azure-600 to-sky-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-azure-200 text-sm font-semibold uppercase tracking-wider">Our Products</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 mb-4 text-balance">
              The Right Size for Every Occasion
            </h1>
            <p className="text-azure-100 text-lg leading-relaxed">
              Four sizes. One standard. NAFDAC & SON certified purified water produced at our Eket, Akwa Ibom facility.
            </p>
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {products.map((p, i) => (
            <div
              key={p.size}
              className={`grid lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Visual card */}
              <div className={`rounded-3xl ${p.lightColor} p-10 flex flex-col items-center justify-center text-center min-h-64 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className={`w-20 h-20 rounded-full ${p.color} flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg`}>
                  {p.size}
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wider ${p.tagColor} mb-2`}>{p.tag}</div>
                <div className="text-3xl font-extrabold text-gray-800 font-serif italic">{p.name}</div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="inline-flex items-center gap-1 text-xs bg-white rounded-full px-3 py-1 shadow-sm text-gray-600 font-medium">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    NAFDAC Certified
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-white rounded-full px-3 py-1 shadow-sm text-gray-600 font-medium">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    SON Certified
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <span className={`text-sm font-semibold uppercase tracking-wider ${p.tagColor}`}>{p.tag}</span>
                <h2 className="text-3xl font-extrabold mt-1 mb-2">
                  Kayora {p.size} — <span className="font-serif italic font-normal text-gray-500">{p.name}</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">{p.desc}</p>
                <h3 className="font-semibold text-gray-800 mb-3">Ideal for:</h3>
                <ul className="space-y-2 mb-6">
                  {p.useCases.map(u => (
                    <li key={u} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-azure-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      {u}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic mb-6">{p.detail}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-azure-500 hover:bg-azure-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
                >
                  Order {p.size}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Purification ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">How It's Made</span>
            <h2 className="text-3xl font-extrabold mt-2">Six Stages. One Standard.</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Every Kayora product — regardless of size — passes through the same rigorous purification process.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stages.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-4 text-center border border-gray-100 hover:border-azure-200 hover:shadow-sm transition-all">
                <div className="text-2xl font-extrabold text-azure-200 mb-2">{s.step}</div>
                <div className="font-semibold text-sm text-gray-800 mb-1">{s.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-azure-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Place an Order Today</h2>
          <p className="text-azure-100 mb-8">Delivered to homes, offices, and events across Eket and Akwa Ibom State.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+2349040789918" className="inline-flex items-center justify-center gap-2 bg-white text-azure-600 font-bold px-8 py-3.5 rounded-full hover:bg-azure-50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call 09040789918
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-all">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
