import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | Kayora Water',
  description:
    'Terms governing use of kayorawater.com, operated by Kaybi Beverage Industries Limited, Eket, Akwa Ibom, Nigeria.',
  alternates: { canonical: 'https://www.kayorawater.com/terms' },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Attorney-review gate */}
        <div className="bg-kayora-gold-100 border border-kayora-gold-500 rounded-xl p-5 mb-12 flex gap-4">
          <svg className="w-5 h-5 text-kayora-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <p className="font-semibold text-kayora-ink text-sm mb-1">Under Legal Review</p>
            <p className="text-kayora-graphite text-sm leading-relaxed">
              This document is in draft, published for transparency. It is currently under review by a Nigerian commercial attorney and should not be relied upon until this notice is removed. Last updated: May 2026.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Legal</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-3">Terms of Use</h1>
          <p className="text-sm text-kayora-stone">Kaybi Beverage Industries Limited · Eket, Akwa Ibom, Nigeria 524101</p>
        </div>

        <div className="space-y-10 text-kayora-graphite leading-relaxed">

          <p>
            These terms govern use of kayorawater.com, operated by Kaybi Beverage Industries Limited (&ldquo;Kaybi&rdquo;, &ldquo;we&rdquo;), Eket, Akwa Ibom State, Nigeria. By using this website you accept these terms.
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Use of the Site</h2>
            <p>
              You may use this site for lawful purposes and for genuine interest in Kayora products and distribution. You may not misuse the site, attempt to gain unauthorised access, scrape or harvest content or images by automated means, or use the site to infringe our or others&rsquo; rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Intellectual Property</h2>
            <p>
              All trademarks, content, and materials on this site are owned by or licensed to Kaybi and are protected by Nigerian and international law. See our{' '}
              <Link href="/legal" className="text-kayora-blue-700 hover:underline">Legal &amp; Intellectual Property Notices</Link>.
              {' '}No licence is granted except the limited right to view pages for personal, non-commercial reference.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">No Reliance / Accuracy</h2>
            <p>
              Product, pricing, certification, and availability information is provided in good faith and may change without notice. Prices shown are recommended retail prices. Nothing on the site is a binding offer; orders are confirmed by us directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Third-Party Links</h2>
            <p>We are not responsible for external sites we link to.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Liability</h2>
            <p>
              To the maximum extent permitted by law, Kaybi is not liable for indirect or consequential loss arising from use of the site. Nothing limits liability that cannot lawfully be limited (including for death or personal injury caused by negligence, or fraud).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Governing Law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria; disputes are subject to the jurisdiction of the Nigerian courts.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Changes</h2>
            <p>We may update these terms; continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Contact</h2>
            <address className="not-italic space-y-1 text-sm">
              <p><a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a></p>
              <p><a href="tel:+2349040789918" className="text-kayora-blue-700 hover:underline">0904 078 9918</a></p>
              <p>173 Eket-Oron Road, Eket, Akwa Ibom State, Nigeria 524101</p>
            </address>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-kayora-mist flex flex-wrap gap-6 text-sm">
          <Link href="/privacy" className="text-kayora-blue-700 hover:underline">Privacy Policy &rarr;</Link>
          <Link href="/legal" className="text-kayora-blue-700 hover:underline">IP &amp; Legal Notices &rarr;</Link>
          <Link href="/" className="text-kayora-blue-700 hover:underline">&larr; Home</Link>
        </div>
      </div>
    </div>
  );
}
