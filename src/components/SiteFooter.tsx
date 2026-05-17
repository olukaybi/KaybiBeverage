'use client';

import Link from 'next/link';
import KayoraWordmark from '@/components/KayoraWordmark';

const socialLinks = [
  {
    href: 'https://www.instagram.com/KayoraWater',
    label: 'Instagram (@KayoraWater)',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/KayoraWater',
    label: 'Facebook (@KayoraWater)',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@KayoraWater',
    label: 'TikTok (@KayoraWater)',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const productLinks = [
  { label: '30cl — Sharp-sharp', href: '/our-water' },
  { label: '50cl — Original', href: '/our-water' },
  { label: '75cl — Jara', href: '/our-water' },
  { label: '18.9L — Never Finish', href: '/our-water' },
];

const orderLinks = [
  { label: 'Order Kayora', href: '/shop' },
  { label: 'Bulk / event orders', href: '/contact' },
  { label: 'Become a distributor', href: '/distribution' },
];

const toolLinks = [
  { label: 'Hydration Calculator', href: '/tools/hydration' },
  { label: 'Event Water Estimator', href: '/tools/event-water' },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-kayora-blue-900 text-kayora-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Company */}
          <div>
            <KayoraWordmark variant="light" className="text-[2.5rem] block mb-1" />
            <p className="text-sm text-kayora-cream/70 mb-5 leading-relaxed max-w-[28ch]">
              Purified to the Highest Standard.<br />Safe for Every Table.
            </p>
            <p className="text-xs text-kayora-cream/40 mb-6 leading-relaxed max-w-[28ch]">
              A product of Kaybi Beverage Industries Limited<br />
              Eket, Akwa Ibom State, Nigeria
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h2 className="text-eyebrow uppercase tracking-widest text-kayora-cream/50 mb-4">Products</h2>
            <ul className="space-y-2 mb-6">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-kayora-cream/80 hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="text-eyebrow uppercase tracking-widest text-kayora-cream/50 mb-4">Order</h2>
            <ul className="space-y-2 mb-6">
              {orderLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-kayora-cream/80 hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="text-eyebrow uppercase tracking-widest text-kayora-cream/50 mb-4">Tools</h2>
            <ul className="space-y-2">
              {toolLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-kayora-cream/80 hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div>
            <h2 className="text-eyebrow uppercase tracking-widest text-kayora-cream/50 mb-4">Get in Touch</h2>
            <ul className="space-y-3 text-sm text-kayora-cream/80">
              <li>
                <a
                  href="tel:+2349040789918"
                  className="hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                >
                  0904 078 9918
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kaybibeverage.com"
                  className="hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                >
                  info@kaybibeverage.com
                </a>
              </li>
              <li className="leading-relaxed">
                173 Eket-Oron Road, Eket,<br />
                Akwa Ibom State, Nigeria 524101
              </li>
              <li className="text-kayora-cream/60">
                Mon–Sat, 8:00am–6:00pm WAT
              </li>
            </ul>
          </div>

          {/* Column 4: Certifications + Legal */}
          <div>
            <h2 className="text-eyebrow uppercase tracking-widest text-kayora-cream/50 mb-4">Certifications</h2>
            <ul className="space-y-3 text-sm text-kayora-cream/80 mb-8">
              <li>
                <span className="font-semibold text-kayora-cream">NAFDAC Reg.</span>{' '}
                A1-111026
              </li>
              <li>
                <span className="font-semibold text-kayora-cream">SON MANCAP Registered</span>
                <br />
                <span className="text-kayora-cream/60 text-xs">FT-29179 (30cl / 50cl / 75cl)</span>
                <br />
                <span className="text-kayora-cream/60 text-xs">FT-29180 (18.9L)</span>
              </li>
              <li>
                <Link
                  href="/authentic"
                  className="text-sm text-kayora-cream/70 hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                >
                  Verify Authenticity
                </Link>
              </li>
            </ul>
            <h2 className="text-eyebrow uppercase tracking-widest text-kayora-cream/50 mb-4">Legal</h2>
            <ul className="space-y-2">
              {[
                { label: 'IP & Legal Notices', href: '/legal' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-kayora-cream/70 hover:text-kayora-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-3 text-xs text-kayora-cream/50">
          <p className="leading-relaxed">
            Kayora&reg; and the Kayora logo are registered trademarks of Kaybi Beverage Industries Limited.
            &copy; {year} Kaybi Beverage Industries Limited. All rights reserved.
            All content and imagery on this website is proprietary and may not be reproduced, distributed, or used without written permission.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/legal" className="hover:text-kayora-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-kayora-blue-500 rounded-sm">
              IP &amp; Legal Notices
            </Link>
            <Link href="/terms" className="hover:text-kayora-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-kayora-blue-500 rounded-sm">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-kayora-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-kayora-blue-500 rounded-sm">
              Privacy Policy
            </Link>
            <Link href="/authentic" className="hover:text-kayora-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-kayora-blue-500 rounded-sm">
              Verify Authenticity
            </Link>
            <span>NAFDAC Reg. A1-111026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
