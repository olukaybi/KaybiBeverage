import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Verify Authenticity | Kayora Water',
  description:
    'How to verify that your Kayora water is genuine — NAFDAC registration number A1-111026, SON MANCAP numbers, and what authentic Kayora packaging looks like.',
  alternates: { canonical: 'https://www.kayorawater.com/authentic' },
};

export default function AuthenticPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Authenticity
          </p>
          <h1 className="font-display text-display-md text-kayora-ink mb-6">
            How to Verify Your Kayora Water
          </h1>
          <p className="text-lg text-kayora-graphite leading-relaxed max-w-[60ch]">
            Kayora is NAFDAC Registered. Our registration number is printed on every label and can be independently verified. Here is exactly how to check.
          </p>
        </div>

        {/* Registration numbers */}
        <div className="bg-kayora-blue-900 rounded-2xl p-8 mb-10">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-6">
            Our Registration Numbers
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-1">NAFDAC Registration</p>
              <p className="font-display text-3xl font-bold text-kayora-cream tracking-tight">A1-111026</p>
              <p className="text-kayora-cream/60 text-sm mt-1">
                Valid through April 2031. Covers all four pack sizes — 30cl, 50cl, 75cl, 18.9L.
              </p>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-widest text-kayora-cream/50 mb-2">SON MANCAP Registration</p>
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-semibold text-kayora-cream">FT-29179</span>
                  <span className="text-sm text-kayora-cream/70">PET bottles — 30cl, 50cl, 75cl</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-semibold text-kayora-cream">FT-29180</span>
                  <span className="text-sm text-kayora-cream/70">18.9L polycarbonate dispenser bottle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to verify */}
        <div className="mb-10">
          <h2 className="font-display text-display-sm text-kayora-ink mb-6">How to Verify on the NAFDAC Portal</h2>
          <ol className="space-y-5">
            {[
              {
                step: '1',
                text: 'Visit the NAFDAC product registration portal at nafdac.gov.ng or the NAFDAC e-portal.',
              },
              {
                step: '2',
                text: 'Select "Product Search" or "Verify Registration."',
              },
              {
                step: '3',
                text: 'Enter the registration number A1-111026 and search.',
              },
              {
                step: '4',
                text: 'The result will show Kaybi Beverage Industries Limited as the registrant, the product category, and the registration validity period.',
              },
            ].map(({ step, text }) => (
              <li key={step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-kayora-blue-900 text-kayora-cream font-display font-semibold text-sm flex items-center justify-center">
                  {step}
                </span>
                <p className="text-kayora-graphite leading-relaxed pt-1">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* What authentic Kayora looks like */}
        <div className="bg-white border border-kayora-mist rounded-2xl p-8 mb-10">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-5">What Genuine Kayora Packaging Looks Like</h2>
          <ul className="space-y-3 text-kayora-graphite">
            {[
              'The NAFDAC registration number A1-111026 is printed on every label — on the bottle, not just the cap.',
              'The tamper-evident seal on the cap is intact and has not been punctured or re-sealed.',
              'The label shows "Kayora" prominently with the Kaybi Beverage Industries name and our Eket address.',
              'On the 18.9L dispenser, the neck seal is intact and the cap is clearly marked.',
              'The water is colourless, odourless and tastes clean — no plastic, no chemical aftertaste.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="flex-shrink-0 text-kayora-gold-500 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Report concern */}
        <div className="bg-kayora-cream border border-kayora-mist rounded-2xl p-8 mb-10">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">
            Found a Suspect Product?
          </h2>
          <p className="text-kayora-graphite leading-relaxed mb-5">
            If you have purchased a bottle claiming to be Kayora that does not match the above — missing registration number, broken seal, questionable taste — please contact us immediately. We take counterfeiting seriously and will work with NAFDAC where necessary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
          >
            Contact Our Team &rarr;
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-kayora-blue-700 font-medium hover:text-kayora-blue-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
