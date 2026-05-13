import type { Metadata } from 'next';
import Link from 'next/link';
import DistributorForm from '@/components/DistributorForm';

export const metadata: Metadata = {
  title: 'Wholesale & Distribution | Become a Kayora Distributor',
  description:
    'Join the Kayora distribution network. Wholesale pricing on Kayora 30cl, 50cl, 75cl, and 18.9L for distributors, retailers, and corporate clients across Akwa Ibom State.',
  alternates: { canonical: 'https://www.kayorawater.com/wholesale' },
};

const tiers = [
  {
    name: 'Retailer',
    desc: 'Supermarkets, kiosks, pharmacies, and small shops looking to stock Kayora for direct sale.',
    benefits: ['Competitive wholesale pricing', 'Minimum order flexibility', 'Regular delivery schedule', 'Marketing support'],
  },
  {
    name: 'Distributor',
    desc: 'Businesses that purchase in volume and resell to retailers or supply specific territories.',
    benefits: ['Best-in-class volume pricing', 'Exclusive territory options', 'Priority stock allocation', 'Dedicated account support'],
    highlight: true,
  },
  {
    name: 'Corporate',
    desc: 'Offices, hotels, hospitals, schools, and institutions requiring regular, high-volume supply.',
    benefits: ['Scheduled delivery service', '18.9L dispenser bottle priority', 'Custom delivery frequency', 'Invoice-based accounts'],
  },
];

export default function WholesalePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-azure-600 to-sky-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-azure-200 text-sm font-semibold uppercase tracking-wider">Wholesale & Distribution</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 mb-4 text-balance">
              Grow With Kayora
            </h1>
            <p className="text-azure-100 text-lg leading-relaxed">
              Partner with Kaybi Beverage Industries to distribute Akwa Ibom's most trusted purified water brand. Competitive pricing, reliable supply, and full support.
            </p>
            <div className="mt-6">
              <a href="#register" className="inline-flex items-center gap-2 bg-white text-azure-600 font-bold px-8 py-3.5 rounded-full hover:bg-azure-50 transition-colors shadow-lg">
                Apply to Become a Distributor
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Partner ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Why Partner With Us</span>
            <h2 className="text-3xl font-extrabold mt-2">A Brand People Already Trust</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Kayora is NAFDAC & SON certified — two credentials that sell themselves to every Nigerian consumer.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏅', title: 'Certified Brand', desc: 'NAFDAC & SON certifications mean instant consumer confidence anywhere in Nigeria.' },
              { icon: '🏭', title: 'Local Production', desc: 'Produced at our Eket facility — no long supply chains, fresher stock, faster restocking.' },
              { icon: '📦', title: '4 Product SKUs', desc: 'From 30cl to 18.9L — you can serve every market segment with one brand.' },
              { icon: '🤝', title: 'Partner Support', desc: 'We back our distributors with marketing materials, territory support, and responsive service.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Tiers ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Partnership Types</span>
            <h2 className="text-3xl font-extrabold mt-2">A Structure That Fits Your Business</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map(({ name, desc, benefits, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 border-2 transition-shadow ${
                  highlight
                    ? 'bg-azure-600 border-azure-500 text-white shadow-xl shadow-azure-200'
                    : 'bg-white border-gray-100 hover:shadow-md'
                }`}
              >
                {highlight && (
                  <div className="inline-block bg-white text-azure-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-extrabold mb-2 ${highlight ? 'text-white' : 'text-gray-800'}`}>{name}</h3>
                <p className={`text-sm leading-relaxed mb-5 ${highlight ? 'text-azure-100' : 'text-gray-500'}`}>{desc}</p>
                <ul className="space-y-2">
                  {benefits.map(b => (
                    <li key={b} className={`flex items-start gap-2 text-sm ${highlight ? 'text-azure-100' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${highlight ? 'text-white' : 'text-azure-400'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration Form ────────────────────────────────────────────── */}
      <section id="register" className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-azure-500 text-sm font-semibold uppercase tracking-wider">Apply Now</span>
            <h2 className="text-3xl font-extrabold mt-2">Distributor Registration</h2>
            <p className="text-gray-500 mt-3">Fill in the form below and our team will follow up within two business days.</p>
          </div>
          <DistributorForm />
        </div>
      </section>

      {/* ── Contact nudge ────────────────────────────────────────────────── */}
      <section className="bg-azure-50 border-t border-azure-100 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-2 font-medium">Prefer to speak with us directly?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a href="tel:+2349040789918" className="inline-flex items-center justify-center gap-2 bg-azure-500 hover:bg-azure-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              09040789918
            </a>
            <a href="mailto:info@kaybibeverage.com" className="inline-flex items-center justify-center gap-2 border-2 border-azure-500 text-azure-600 font-bold px-6 py-3 rounded-full hover:bg-azure-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              info@kaybibeverage.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
