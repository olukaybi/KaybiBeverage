import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Kaybi Beverage Industries Limited',
  description:
    'Learn about Kaybi Beverage Industries Limited — the company behind Kayora Premium Purified Water. Proudly located at 173, Eket-Oron Road, Eket, Akwa Ibom State, Nigeria.',
  alternates: { canonical: 'https://www.kayorawater.com/about' },
};

const values = [
  {
    title: 'Purity',
    desc: 'Every bottle leaves our facility having passed six rigorous purification stages. We never compromise on what goes into Kayora water.',
    icon: '💧',
  },
  {
    title: 'Safety',
    desc: 'NAFDAC and SON certification is not a checkbox — it is the foundation of our promise to every Nigerian family and business that trusts us.',
    icon: '🛡️',
  },
  {
    title: 'Community',
    desc: 'We are an Akwa Ibom business, employing Akwa Ibom people, serving Akwa Ibom homes. Local pride drives everything we do.',
    icon: '🤝',
  },
  {
    title: 'Consistency',
    desc: 'Whether you buy one bottle or one truckload, the water inside is held to exactly the same standard. That is our commitment.',
    icon: '⚖️',
  },
];

const certifications = [
  {
    name: 'NAFDAC',
    full: 'National Agency for Food and Drug Administration and Control',
    desc: 'Kayora is registered and certified by NAFDAC — Nigeria\'s foremost food and drug regulatory authority.',
  },
  {
    name: 'SON',
    full: 'Standards Organisation of Nigeria',
    desc: 'Our products meet the Standards Organisation of Nigeria requirements for purified drinking water.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-azure-600 to-sky-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-azure-200 text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 mb-4 text-balance">
              Kaybi Beverage Industries Limited
            </h1>
            <p className="text-azure-100 text-lg leading-relaxed">
              Producing Kayora Premium Purified Water in the heart of Eket, Akwa Ibom — for homes, offices, events, and communities across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl font-extrabold mt-2 mb-6">Built on a Simple Mission</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kaybi Beverage Industries Limited was founded with a clear purpose: to give the people of Akwa Ibom State access to consistently safe, clean, and affordable purified water — water they can trust for their families, their businesses, and their guests.
                </p>
                <p>
                  Operating from our facility at <strong>173, Eket-Oron Road, Eket</strong>, we invested in a complete six-stage purification system — from deep borehole extraction through reverse osmosis and ozonisation — so that every bottle of Kayora water meets and exceeds Nigeria's regulatory standards.
                </p>
                <p>
                  Our brand, <strong>Kayora Premium Purified Water</strong>, comes in four sizes designed for every use: 30cl for events, 50cl for everyday hydration, 75cl for active lifestyles, and 18.9L for offices and homes. Each size carries the same promise: <em>Purified to the Highest Standard. Safe for Every Table.</em>
                </p>
                <p>
                  We are proud to be a Nigerian business, employing local people and serving local communities. As we grow, we continue to expand our distribution across Akwa Ibom State and beyond, partnering with distributors who share our commitment to quality.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-azure-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-2">Our Facility</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  173, Eket-Oron Road, Eket, Akwa Ibom State, Nigeria (524101)
                </p>
                <a
                  href="https://maps.google.com/?q=173+Eket-Oron+Road+Eket+Akwa+Ibom+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-azure-600 font-medium hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  View on Google Maps
                </a>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">Business Hours</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex justify-between"><span>Monday – Friday</span><span className="font-medium">8:00 am – 6:00 pm</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span className="font-medium">8:00 am – 6:00 pm</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="font-medium text-red-500">Closed</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">Get in Touch</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <a href="tel:+2349040789918" className="flex items-center gap-2 hover:text-azure-600 transition-colors">
                    <svg className="w-4 h-4 text-azure-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    09040789918
                  </a>
                  <a href="mailto:info@kaybibeverage.com" className="flex items-center gap-2 hover:text-azure-600 transition-colors">
                    <svg className="w-4 h-4 text-azure-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    info@kaybibeverage.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-extrabold mt-2">What Guides Everything We Do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, desc, icon }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Certifications</span>
            <h2 className="text-3xl font-extrabold mt-2">Certified. Compliant. Trusted.</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Kayora Premium Purified Water meets the highest regulatory standards set by Nigeria's food and beverage authorities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {certifications.map(({ name, full, desc }) => (
              <div key={name} className="flex gap-4 bg-azure-50 rounded-2xl p-6 border border-azure-100">
                <div className="w-12 h-12 rounded-full bg-azure-500 text-white font-extrabold text-lg flex items-center justify-center shrink-0">
                  {name[0]}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{name}</div>
                  <div className="text-xs text-azure-600 font-medium mb-2">{full}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-azure-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Experience Kayora?</h2>
          <p className="text-azure-100 mb-8">Place an order or contact us for bulk and wholesale enquiries.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-azure-600 font-bold px-8 py-3.5 rounded-full hover:bg-azure-50 transition-colors">
              Order Now
            </Link>
            <Link href="/wholesale" className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-all">
              Wholesale Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
