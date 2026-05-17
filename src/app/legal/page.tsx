import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal & Intellectual Property Notices — Kayora',
  description:
    'Trademark, copyright, and permitted-use notices for Kayora® Premium Purified Water — a product of Kaybi Beverage Industries Limited, Eket, Akwa Ibom, Nigeria.',
  alternates: { canonical: 'https://www.kayorawater.com/legal' },
  robots: { index: true, follow: true },
};

const reviewGate = (
  <div className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-5 mb-12 flex gap-4">
    <svg className="w-5 h-5 text-kayora-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
    <div>
      <p className="font-semibold text-kayora-ink text-sm mb-1">Under Legal Review</p>
      <p className="text-kayora-graphite text-sm leading-relaxed">
        This page is published for transparency and is undergoing review by a qualified Nigerian intellectual-property attorney. It should not be relied upon until this notice is removed. Last updated: May 2026.
      </p>
    </div>
  </div>
);

export default function LegalPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {reviewGate}

        {/* Header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Legal</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-3">
            Intellectual Property &amp; Legal Notices
          </h1>
          <p className="text-kayora-graphite leading-relaxed max-w-[60ch]">
            This page sets out the ownership of the trademarks, content, and materials on this website. Kayora Premium Purified Water is a product of Kaybi Beverage Industries Limited, Eket, Akwa Ibom State, Nigeria.
          </p>
        </div>

        <div className="space-y-12">

          {/* Trademarks */}
          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-4 pb-3 border-b border-kayora-mist">
              Trademarks
            </h2>
            <p className="text-kayora-graphite leading-relaxed">
              &ldquo;Kayora&reg;&rdquo;, the Kayora logo, &ldquo;Sharp-sharp&rdquo;, &ldquo;Original&rdquo;, &ldquo;Jara&rdquo;, &ldquo;Never Finish&rdquo;, and &ldquo;Purified to the Highest Standard. Safe for Every Table.&rdquo; are registered trademarks of Kaybi Beverage Industries Limited. Unauthorised use of these marks, or of any mark confusingly similar to them, in connection with any product or service is prohibited and may constitute trademark infringement and passing-off under Nigerian law.
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
            </ul>
          </section>

        </div>

        {/* Page footer note */}
        <p className="mt-14 text-xs text-kayora-stone leading-relaxed border-t border-kayora-mist pt-6">
          This page is provided for information and does not constitute legal advice. It should be reviewed and finalised by a qualified Nigerian intellectual-property attorney before reliance.
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
