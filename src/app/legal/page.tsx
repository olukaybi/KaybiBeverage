import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal & Intellectual Property Notices — Kayora',
  description:
    'Trademark, trade dress, copyright, anti-counterfeiting, and permitted-use notices for Kayora™ Premium Purified Water — a product of Kaybi Beverage Industries Limited, Eket, Akwa Ibom, Nigeria.',
  alternates: { canonical: 'https://www.kayorawater.com/legal' },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Legal</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-3">
            Intellectual Property &amp; Legal Notices
          </h1>
          <p className="text-kayora-graphite leading-relaxed max-w-[60ch]">
            This page sets out the ownership of the trademarks, trade dress, content, and materials on this website, and the prohibitions on counterfeiting, refilling, and relabeling. Kayora Premium Purified Water is a product of Kaybi Beverage Industries Limited, Eket, Akwa Ibom State, Nigeria.
          </p>
        </div>

        <div className="space-y-12">

          {/* Trademarks */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Trademarks
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              &ldquo;Kayora&#x2122;&rdquo;, the Kayora logo, &ldquo;Sharp-sharp&rdquo;, &ldquo;Original&rdquo;, &ldquo;Jara&rdquo;, &ldquo;Never Finish&rdquo;, and &ldquo;Purified to the Highest Standard. Safe for Every Table.&rdquo; are trademarks of Kaybi Beverage Industries Limited. The Kayora mark has been accepted for registration in Nigeria under application number NG/TM/O/2025/377015 (Class 32) and is pending issuance of the Certificate of Registration. Unauthorised use of these marks, or of any mark confusingly similar to them, in connection with any product or service is prohibited and may constitute trademark infringement and passing-off under Nigerian law.
            </p>
          </section>

          {/* Trade Dress */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Trade Dress &amp; Packaging Appearance
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              The distinctive visual appearance of Kayora products — including the bottle shape, label layout, colour scheme (aqua blue and white), typography, and overall presentation — constitutes protectable trade dress owned by Kaybi Beverage Industries Limited. This trade dress has been developed to distinguish genuine Kayora products in the marketplace. Any product, packaging, or labelling that imitates or is confusingly similar to the Kayora trade dress, regardless of the brand name used, is prohibited and may constitute passing-off and unfair competition under Nigerian law.
            </p>
          </section>

          {/* Copyright */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Copyright
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              All text, graphics, layout, design, photographs, illustrations, and code on this website are the property of Kaybi Beverage Industries Limited or its licensors and are protected by the Copyright Act of Nigeria and applicable international copyright law. No part of this website may be reproduced, republished, distributed, transmitted, or adapted without the prior written consent of Kaybi Beverage Industries Limited.
            </p>
          </section>

          {/* Permitted use */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Permitted Use
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              You may view, download, and print pages from this website for your own personal, non-commercial reference only. Any other use — including reproduction, modification, redistribution, framing, or commercial exploitation — requires our written permission.
            </p>
          </section>

          {/* Product imagery */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Product Imagery
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              Product images on this website are provided for general illustration. They may not be used by third parties for resale listings, advertising, or any commercial purpose without written authorisation. The depiction of the Kayora label, logo, and packaging in these images is protected by trademark.
            </p>
          </section>

          {/* Anti-counterfeiting */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Anti-Counterfeiting, Refilling &amp; Relabeling
            </h2>
            <p className="text-kayora-graphite leading-relaxed mb-4">
              The following acts are strictly prohibited and will be pursued under applicable Nigerian law, including the Trade Marks Act, the Federal Competition and Consumer Protection Act, and NAFDAC regulations:
            </p>
            <ul className="space-y-3 text-kayora-graphite">
              {[
                'Producing, distributing, or selling any product bearing the Kayora name, logo, or trade dress without authorisation from Kaybi Beverage Industries Limited.',
                'Refilling genuine Kayora bottles with any other liquid, whether water or otherwise, and presenting them for sale as genuine Kayora product.',
                'Removing, altering, or replacing the original Kayora label on any bottle — whether to substitute another brand or to reuse the container.',
                'Distributing or reselling Kayora product through any channel not authorised by Kaybi Beverage Industries Limited.',
                'Any act designed to deceive consumers into believing they are purchasing genuine Kayora product when they are not.',
              ].map((item) => (
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
            <p className="text-kayora-graphite leading-relaxed mt-4">
              Kaybi Beverage Industries Limited works with NAFDAC and other regulatory authorities to identify and act on suspected counterfeit product. We act on every credible report. If you suspect a counterfeit, see{' '}
              <Link href="/authentic" className="text-kayora-blue-700 hover:underline">Verify Authenticity</Link>.
            </p>
          </section>

          {/* Reporting misuse */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Reporting Misuse / Requesting Permission
            </h2>
            <p className="text-kayora-graphite leading-relaxed mb-5">
              To report suspected counterfeiting, trademark misuse, or unauthorised use of our content, or to request a licence to use our marks or materials, contact us at{' '}
              <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a>
              {' '}or{' '}
              <a href="tel:+2349040789918" className="text-kayora-blue-700 hover:underline">0904 078 9918</a>.
            </p>
          </section>

          {/* Reservation of rights */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Reservation of Rights
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              All rights not expressly granted on this page are reserved by Kaybi Beverage Industries Limited.
            </p>
          </section>

          {/* Related pages */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Related
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-kayora-blue-700 hover:underline">Terms of Use &rarr;</Link></li>
              <li><Link href="/privacy" className="text-kayora-blue-700 hover:underline">Privacy Policy &rarr;</Link></li>
              <li><Link href="/authentic" className="text-kayora-blue-700 hover:underline">Verify Authenticity &rarr;</Link></li>
              <li><Link href="/distributor-policy" className="text-kayora-blue-700 hover:underline">Authorized Distributor Policy &rarr;</Link></li>
            </ul>
          </section>

        </div>

        {/* Page footer note */}
        <p className="mt-14 text-xs text-kayora-stone leading-relaxed border-t border-kayora-mist pt-6">
          This page is provided for information and does not constitute legal advice.
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
