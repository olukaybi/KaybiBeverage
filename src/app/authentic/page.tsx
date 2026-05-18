import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Verify Genuine Kayora — Authenticity Check',
  description:
    'How to confirm that the Kayora® bottle in your hand is genuine — tamper seal, NAFDAC registration A1-111026, batch code, label, and barcode checks.',
  alternates: { canonical: 'https://www.kayorawater.com/authentic' },
};

const checklist = [
  {
    title: 'The tamper-evident seal.',
    body: 'Every genuine Kayora bottle is sealed at the plant. If the cap band has separated, the seal is broken, or the cap turns freely without resistance, do not consume it.',
  },
  {
    title: 'The NAFDAC registration number.',
    body: 'Genuine Kayora carries NAFDAC Registration Number A1-111026. If the number is missing, different, or illegible, treat the product as suspect.',
  },
  {
    title: 'The batch and production code.',
    body: 'Every batch is coded. A genuine bottle has a clear production date and batch code on the shoulder of the bottle — not smudged, not absent.',
  },
  {
    title: 'The label.',
    body: 'The Kayora label is crisp, correctly spelled, with the registered logo, "Premium Purified Water", and the correct size (30cl, 50cl, 75cl, or 18.9L). Blurry printing, misspellings, or colour that looks off are warning signs.',
  },
  {
    title: 'The barcode and QR code.',
    body: 'Genuine Kayora bottles carry a barcode and QR code. A missing or non-functioning code is a red flag.',
  },
];

export default function AuthenticPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Authenticity
          </p>
          <h1 className="font-display text-display-md text-kayora-ink mb-6">
            How to Know You Have Genuine Kayora
          </h1>
          <p className="text-lg text-kayora-graphite leading-relaxed max-w-[60ch]">
            The Nigerian packaged-water market has a counterfeiting problem. Kayora is built to be verifiable. Here is exactly how to confirm that the bottle in your hand is genuine Kayora, produced at our Eket facility.
          </p>
        </div>

        {/* Five-point checklist */}
        <div className="mb-12">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-6">Five Things to Check</h2>
          <ol className="space-y-5">
            {checklist.map(({ title, body }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-kayora-blue-900 text-kayora-cream font-display font-semibold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-kayora-ink mb-1">{title}</p>
                  <p className="text-kayora-graphite leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* NAFDAC registration callout */}
        <div className="bg-kayora-blue-900 rounded-2xl p-8 mb-10">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-4">
            NAFDAC Registration
          </p>
          <p className="font-display text-3xl font-bold text-kayora-cream tracking-tight mb-2">A1-111026</p>
          <p className="text-kayora-cream/60 text-sm">
            Valid through April 2031. Covers all four pack sizes — 30cl, 50cl, 75cl, 18.9L.
          </p>
        </div>

        {/* If you suspect a counterfeit */}
        <div className="bg-white border border-kayora-mist rounded-2xl p-8 mb-10">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4">
            If You Suspect a Counterfeit
          </h2>
          <p className="text-kayora-graphite leading-relaxed mb-6">
            If a product claims to be Kayora but fails any of these checks, please do not consume it, and report it to us at{' '}
            <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a>
            {' '}or{' '}
            <a href="tel:+2349040789918" className="text-kayora-blue-700 hover:underline">0904 078 9918</a>
            {' '}with the place of purchase if possible. Counterfeiting endangers consumers and we act on every credible report, including with NAFDAC where appropriate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-kayora-blue-900 text-kayora-cream font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
            >
              Order Genuine Kayora &rarr;
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 border border-kayora-blue-900 text-kayora-blue-900 font-semibold rounded-lg hover:bg-kayora-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
            >
              Report a Concern
            </Link>
          </div>
        </div>

        {/* Our commitment */}
        <div className="mb-14">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4">Our Commitment</h2>
          <p className="text-kayora-graphite leading-relaxed">
            Every genuine Kayora bottle is traceable from our Eket borehole through eight stages of purification to the sealed bottle you hold. That traceability is the point. When you buy Kayora, you are buying something you can verify — that is the standard.
          </p>
        </div>

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
