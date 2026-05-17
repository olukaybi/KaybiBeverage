import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy & Terms | Kayora Water',
  description:
    'Privacy policy and terms of sale for Kayora Premium Purified Water — a product of Kaybi Beverage Industries Limited, Eket, Akwa Ibom, Nigeria.',
  alternates: { canonical: 'https://www.kayorawater.com/legal' },
  robots: { index: false, follow: false },
};

export default function LegalPage() {
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
              These documents are in draft. They are published for transparency but are currently undergoing review by a Nigerian IP and commercial attorney. They should not be relied upon until this notice is removed. Last updated: May 2026.
            </p>
          </div>
        </div>

        {/* Page header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Legal</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-2">Privacy &amp; Terms</h1>
          <p className="text-sm text-kayora-stone">Kaybi Beverage Industries Limited · Eket, Akwa Ibom, Nigeria</p>
        </div>

        {/* Table of contents */}
        <nav className="bg-white border border-kayora-mist rounded-xl p-6 mb-14" aria-label="Page sections">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-stone font-sans mb-3">On this page</p>
          <ol className="space-y-1 text-sm text-kayora-blue-700">
            <li><a href="#privacy" className="hover:underline">1. Privacy Policy</a></li>
            <li><a href="#terms" className="hover:underline">2. Terms of Sale</a></li>
            <li><a href="#ip" className="hover:underline">3. Intellectual Property</a></li>
            <li><a href="#contact" className="hover:underline">4. Legal Contact</a></li>
          </ol>
        </nav>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-display-sm text-kayora-ink mb-6 pb-3 border-b border-kayora-mist">
            1. Privacy Policy
          </h2>
          <div className="space-y-6 text-kayora-graphite leading-relaxed">
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">What we collect</h3>
              <p>
                When you contact us through our website forms, we collect the information you submit — name, email address, phone number, and message content. If you submit a distributor application, we also collect your business name and service area. We do not collect any payment information through the website; payments (where applicable) are processed by third-party providers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">How we use it</h3>
              <p>
                We use your contact details to respond to your enquiry or application. We do not sell, rent or share your personal information with third parties for marketing purposes. We may share information with service providers who assist us in operating the website or communicating with you (such as our email delivery provider), under confidentiality agreements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Retention</h3>
              <p>
                We retain contact form submissions for as long as reasonably necessary to respond and follow up. If you wish us to delete your information, contact us at the email below.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Cookies and analytics</h3>
              <p>
                This website may use basic analytics to understand traffic patterns. We do not use advertising cookies or track individual users across other websites.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Your rights</h3>
              <p>
                You may request access to, correction of, or deletion of your personal data by contacting us at info@kaybibeverage.com. We will respond within a reasonable time.
              </p>
            </div>
          </div>
        </section>

        {/* Terms of Sale */}
        <section id="terms" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-display-sm text-kayora-ink mb-6 pb-3 border-b border-kayora-mist">
            2. Terms of Sale
          </h2>
          <div className="space-y-6 text-kayora-graphite leading-relaxed">
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Products and pricing</h3>
              <p>
                All prices are in Nigerian Naira (₦) and are subject to change without notice. Prices shown are exclusive of delivery unless stated. We reserve the right to decline any order.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Delivery</h3>
              <p>
                We deliver within our service area: Eket, Uyo, Ikot Ekpene, Oron and the wider Akwa Ibom State. Delivery fees vary by location and order size. Estimated delivery times are provided at point of order and are not guaranteed. We will contact you if an order cannot be fulfilled within the stated window.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Returns and quality</h3>
              <p>
                We stand behind the quality of our water. If you receive a product that is visibly damaged, has a broken seal, or does not meet our stated standards, please contact us within 24 hours of delivery. We will arrange a replacement or credit at our discretion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">18.9L dispenser bottles</h3>
              <p>
                The 18.9L polycarbonate bottles are returnable. A deposit may apply. Bottles must be returned clean and undamaged. We reserve the right to charge for bottles not returned within a reasonable period or returned in an unacceptable condition.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Limitation of liability</h3>
              <p>
                To the extent permitted by Nigerian law, our liability for any claim arising from the purchase of our products is limited to the value of the goods supplied. We are not liable for indirect losses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-kayora-ink mb-2">Governing law</h3>
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute shall be subject to the jurisdiction of the courts of Akwa Ibom State.
              </p>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section id="ip" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-display-sm text-kayora-ink mb-6 pb-3 border-b border-kayora-mist">
            3. Intellectual Property
          </h2>
          <div className="space-y-6 text-kayora-graphite leading-relaxed">
            <p>
              The Kayora name, packaging designs, and all content on this website are the property of Kaybi Beverage Industries Limited. Trademark registration is in progress. Unauthorised use of the Kayora name, logo or product imagery is prohibited.
            </p>
            <p>
              All product imagery on this site is used for marketing purposes. Label content shown in product renders is illustrative — refer to physical packaging for regulatory information. The NAFDAC registration number A1-111026 is accurate and verifiable.
            </p>
          </div>
        </section>

        {/* Legal Contact */}
        <section id="contact" className="mb-14 scroll-mt-24">
          <h2 className="font-display text-display-sm text-kayora-ink mb-6 pb-3 border-b border-kayora-mist">
            4. Legal Contact
          </h2>
          <div className="text-kayora-graphite leading-relaxed">
            <p className="mb-4">
              For legal notices, privacy requests, or IP concerns, contact us in writing:
            </p>
            <address className="not-italic bg-white border border-kayora-mist rounded-xl p-6 space-y-1 text-sm">
              <p className="font-semibold text-kayora-ink">Kaybi Beverage Industries Limited</p>
              <p>173 Eket-Oron Road</p>
              <p>Eket, Akwa Ibom State, Nigeria 524101</p>
              <p className="pt-2">
                <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">
                  info@kaybibeverage.com
                </a>
              </p>
              <p>
                <a href="tel:+2349040789918" className="text-kayora-blue-700 hover:underline">
                  0904 078 9918
                </a>
              </p>
            </address>
          </div>
        </section>

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
