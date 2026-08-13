import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authorized Distributor Policy',
  description:
    'Who qualifies as an authorized Kayora distributor, what they may and may not do with the brand, and how to identify unauthorized sellers of Kayora Premium Purified Water.',
  alternates: { canonical: 'https://www.kayorawater.com/distributor-policy' },
  robots: { index: true, follow: true },
};

const permitted = [
  'Resell genuine Kayora product purchased directly from Kaybi Beverage Industries Limited through authorized supply channels.',
  'Use the Kayora name and logo in sales and marketing materials, strictly as supplied or approved in writing by Kaybi — without modification to colour, proportions, or spelling.',
  'Reference authorized distributor status in communications to trade customers, using only the designation "Authorized Kayora Distributor".',
  'Accept and fulfill customer orders for Kayora product within the territory and channels defined in your distributor agreement.',
];

const prohibited = [
  'Purchasing Kayora product from any source other than Kaybi Beverage Industries Limited or an authorized wholesaler designated in writing by Kaybi.',
  'Refilling, adulterating, or tampering with any Kayora bottle, seal, or packaging in any way.',
  'Removing, replacing, obscuring, or altering the original Kayora label on any bottle or container.',
  'Reselling Kayora product outside the territory, channel, or price band defined in your distributor agreement without prior written approval.',
  'Representing your business as the manufacturer, sole agent, or exclusive national distributor of Kayora unless such status has been granted in writing by Kaybi.',
  'Using the Kayora name, logo, or trade dress on any signage, packaging, or material in a manner not approved in writing — including creating your own branded Kayora materials.',
  'Purchasing from, or supplying product to, any party you know or reasonably suspect to be selling counterfeit, refilled, or relabeled Kayora product.',
  'Continuing to sell Kayora product after the termination or expiry of your distributor agreement.',
];

const unauthorizedSigns = [
  'Prices significantly below the standard market range — genuine Kayora product has a cost of goods that sets a floor.',
  'No verifiable supply relationship with Kaybi Beverage Industries Limited (cannot produce an authorization letter or purchase invoice from Kaybi).',
  'Product with altered, missing, or smudged labels, batch codes, or tamper seals.',
  'Product claiming to be Kayora but bearing a NAFDAC number other than A1-111026.',
  'Sellers who cannot explain where they sourced the product.',
];

export default function DistributorPolicyPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Distributors</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-3">
            Authorized Distributor Policy
          </h1>
          <p className="text-kayora-graphite leading-relaxed max-w-[60ch]">
            This policy defines who qualifies as an authorized Kayora distributor, what they may and may not do with the brand, and how consumers and trade buyers can identify unauthorized sellers. It applies to all parties who resell or distribute Kayora Premium Purified Water.
          </p>
        </div>

        <div className="space-y-12">

          {/* Who is an authorized distributor */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Who Is an Authorized Distributor
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              An authorized Kayora distributor is a business or individual that has entered into a current, written distributor agreement with Kaybi Beverage Industries Limited and purchases genuine Kayora product directly through supply channels designated by Kaybi. Authorization is specific to a territory, channel, and term — it is not transferable and does not automatically renew. If you are unsure whether a supplier is authorized, contact us directly at{' '}
              <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a> or call our corporate line on <a href="tel:+23407070238028" className="text-kayora-blue-700 hover:underline">07070 238028</a> (distributor inquiries).
            </p>
          </section>

          {/* Permitted activities */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              What Authorized Distributors May Do
            </h2>
            <ul className="space-y-3 text-kayora-graphite">
              {permitted.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="flex-shrink-0 text-kayora-gold-500 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prohibited activities */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              What Authorized Distributors Must Not Do
            </h2>
            <p className="text-kayora-graphite leading-relaxed mb-4">
              The following are prohibited for all distributors — authorized or otherwise. Violation may result in immediate termination of the distributor agreement and referral to NAFDAC or law enforcement where applicable.
            </p>
            <ul className="space-y-3 text-kayora-graphite">
              {prohibited.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="flex-shrink-0 text-kayora-gold-500 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Brand assets */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Brand Asset Use
            </h2>
            <p className="text-kayora-graphite leading-relaxed mb-3">
              Authorized distributors are supplied with approved marketing materials — shelf-talkers, social assets, event banners, and point-of-sale displays — at no cost. These materials must be used as supplied. Distributors may not create their own Kayora-branded materials without prior written approval from Kaybi.
            </p>
            <p className="text-kayora-graphite leading-relaxed">
              The Kayora name, logo, and trade dress are protected under trademark application No. NG/TM/O/2025/377015 (Class 32). Any use that modifies, distorts, or reproduces the brand identity outside the terms of your distributor agreement is prohibited regardless of intent.
            </p>
          </section>

          {/* How to identify unauthorized sellers */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              How to Identify an Unauthorized Seller
            </h2>
            <p className="text-kayora-graphite leading-relaxed mb-4">
              Consumers and trade buyers should be alert to the following signs that a seller may not be authorized:
            </p>
            <ul className="space-y-3 text-kayora-graphite">
              {unauthorizedSigns.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="flex-shrink-0 text-kayora-blue-700 mt-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-kayora-graphite leading-relaxed mt-4">
              If you encounter a seller you suspect is unauthorized or selling counterfeit product, report it to us at{' '}
              <a
                href="mailto:info@kaybibeverage.com?subject=Unauthorized%20Seller%20Report%20%E2%80%94%20Kayora"
                className="text-kayora-blue-700 hover:underline"
              >
                info@kaybibeverage.com
              </a>
              {' '}with the location and as much detail as you can provide.
            </p>
          </section>

          {/* Become a distributor CTA */}
          <section className="bg-kayora-blue-900 rounded-2xl p-8">
            <h2 className="font-display text-xl font-semibold text-kayora-cream mb-3">
              Become an Authorized Distributor
            </h2>
            <p className="text-kayora-cream/70 leading-relaxed mb-6">
              We are actively expanding the Kayora distributor network across Akwa Ibom, Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia, Imo, and now Lagos and Kano. Submit your details through our distributor application and we will be in touch within one business day.
            </p>
            <Link
              href="/distribution#apply"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-kayora-gold-500 text-kayora-ink font-semibold rounded-lg hover:bg-kayora-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-gold-300"
            >
              Apply to Distribute Kayora &rarr;
            </Link>
          </section>

          {/* Related */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Related
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal" className="text-kayora-blue-700 hover:underline">IP &amp; Legal Notices &rarr;</Link></li>
              <li><Link href="/authentic" className="text-kayora-blue-700 hover:underline">Verify Authenticity &rarr;</Link></li>
              <li><Link href="/distribution" className="text-kayora-blue-700 hover:underline">Distribution Programme &rarr;</Link></li>
            </ul>
          </section>

        </div>

        <p className="mt-14 text-xs text-kayora-stone leading-relaxed border-t border-kayora-mist pt-6">
          This policy is provided for information and does not constitute a legal agreement. Authorized distributor status is governed by the written distributor agreement between you and Kaybi Beverage Industries Limited.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block text-sm text-kayora-blue-700 font-medium hover:text-kayora-blue-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
