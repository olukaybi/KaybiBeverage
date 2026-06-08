import type { Metadata } from 'next';
import Link from 'next/link';
import ManageCookiePreferences from '@/components/ManageCookiePreferences';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for kayorawater.com — how Kaybi Beverage Industries Limited collects, uses, and protects your personal data under the Nigeria Data Protection Act 2023.',
  alternates: { canonical: 'https://www.kayorawater.com/privacy' },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="bg-kayora-cream min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">Legal</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-3">Privacy Policy</h1>
          <p className="text-sm text-kayora-stone">
            Nigeria Data Protection Act 2023 (NDPA) · General Application and Implementation Directive (GAID) 2025
          </p>
        </div>

        <div className="space-y-10 text-kayora-graphite leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Who We Are</h2>
            <p>
              Kaybi Beverage Industries Limited (&ldquo;Kaybi&rdquo;, &ldquo;we&rdquo;), 173 Eket Oron Road, Eket, Akwa Ibom State, Nigeria 524101, is the data controller for personal data collected through kayorawater.com. Contact for data matters:{' '}
              <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">What We Collect</h2>
            <p>
              Information you provide through our contact form, distributor enquiry form, and (where applicable) orders: name, email address, phone number, business or organisation details, delivery address, and the content of your message or order. Basic technical data (for example, device type, browser, pages visited) may be collected for site operation and security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Cookies and Analytics</h2>
            <p className="mb-3">
              We use cookies and similar technologies to understand how visitors use this site. Specifically, we use Google Analytics 4 to collect anonymised usage data — pages visited, session duration, and general device/browser type. No personally identifiable data is sent to Google Analytics.
            </p>
            <p className="mb-3">
              We do not load analytics until you actively accept cookies via the banner shown on your first visit. If you decline, no analytics cookies are set and Google Analytics is not loaded. If your browser or device sends a Do Not Track (DNT) or Global Privacy Control (GPC) signal, we treat that as a decline automatically.
            </p>
            <p className="mb-3">
              Your choice is stored in your browser&rsquo;s local storage under the key <code className="text-sm bg-kayora-mist px-1 rounded">kayora-consent-v1</code>. You can withdraw consent or change your choice at any time:
            </p>
            <p>
              <ManageCookiePreferences />
            </p>
            <p className="mt-3 text-sm text-kayora-stone">
              Withdrawing consent re-shows the cookie banner. If you had previously accepted, reloading after withdrawal stops further GA4 data collection for that browser session (data already collected cannot be retroactively deleted from Google&rsquo;s servers).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Why We Use It, and Our Lawful Basis</h2>
            <ul className="space-y-3 mt-3">
              {[
                'To respond to enquiries and provide requested information — consent or steps prior to a contract.',
                'To process and deliver orders and manage distributor relationships — performance of a contract.',
                'To operate, secure, and improve the site — legitimate interests.',
                'To meet legal obligations where required.',
              ].map((item) => (
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
            <p className="mt-4">We do not sell your personal data.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Who We Share It With</h2>
            <p>
              Service providers that process data on our behalf under appropriate agreements: email delivery (Resend), site and database hosting (Vercel, Supabase), and for orders, payment processing (Paystack). They process data only on our instructions. These processors may store data outside Nigeria; cross-border transfers are subject to the NDPA.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">How Long We Keep It</h2>
            <p>
              Only as long as necessary for the purposes above or as required by law. Specific retention periods are being confirmed with our attorney and will be added here when finalised.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Your Rights</h2>
            <p>
              Under the Nigeria Data Protection Act 2023 you may request access to, correction of, or deletion of your personal data; object to or restrict certain processing; and withdraw consent. To exercise these rights, contact{' '}
              <a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a>.
              {' '}You may also lodge a complaint with the{' '}
              <span className="font-medium text-kayora-ink">Nigeria Data Protection Commission (NDPC)</span>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Security</h2>
            <p>
              We apply reasonable technical and organisational measures to protect personal data and have a process to respond to data breaches in line with legal requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Children</h2>
            <p>
              The site and products are intended for a general audience. We do not knowingly collect personal data from children through this site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Changes</h2>
            <p>We may update this policy; the effective date will be shown above when updated.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">Contact</h2>
            <address className="not-italic space-y-1 text-sm">
              <p><a href="mailto:info@kaybibeverage.com" className="text-kayora-blue-700 hover:underline">info@kaybibeverage.com</a></p>
              <p><a href="tel:+2349040789918" className="text-kayora-blue-700 hover:underline">0904 078 9918</a></p>
            </address>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-kayora-mist flex flex-wrap gap-6 text-sm">
          <Link href="/terms" className="text-kayora-blue-700 hover:underline">Terms of Use &rarr;</Link>
          <Link href="/legal" className="text-kayora-blue-700 hover:underline">IP &amp; Legal Notices &rarr;</Link>
          <Link href="/" className="text-kayora-blue-700 hover:underline">&larr; Home</Link>
        </div>
      </div>
    </div>
  );
}
