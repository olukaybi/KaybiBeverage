import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#003B7A',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kayorawater.com'),
  title: {
    default: 'Kayora Premium Purified Water | NAFDAC Registered · Eket, Akwa Ibom',
    template: '%s | Kayora Water',
  },
  description:
    'Kayora Premium Purified Water — six-stage purified, NAFDAC Registered (A1-111026), SON MANCAP Registered, proudly produced in Eket, Akwa Ibom. Pure, crisp hydration for homes, offices, events and distribution.',
  keywords: [
    'Kayora water',
    'Kayora premium water Akwa Ibom',
    'buy purified water Eket',
    'NAFDAC certified water Eket',
    'wholesale water Akwa Ibom',
    'Kayora 18.9L',
    'table water Eket',
    'Kaybi Beverage Industries',
    'bottled water Akwa Ibom',
    'SON MANCAP water Nigeria',
  ],
  authors: [{ name: 'Kaybi Beverage Industries Limited' }],
  openGraph: {
    type: 'website',
    siteName: 'Kayora Premium Purified Water',
    title: 'Kayora Premium Purified Water — Purified to the Highest Standard. Safe for Every Table.',
    description:
      'Six-stage purified water crafted at our Eket, Akwa Ibom facility. NAFDAC Registered A1-111026. SON MANCAP Registered. 30cl · 50cl · 75cl · 18.9L.',
    url: 'https://www.kayorawater.com/',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KayoraWater',
    creator: '@KayoraWater',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://www.kayorawater.com/#organization',
      name: 'Kaybi Beverage Industries Limited',
      alternateName: 'Kayora Water',
      url: 'https://www.kayorawater.com',
      logo: 'https://www.kayorawater.com/images/logo/kayora-logo.png',
      description:
        'Manufacturer of Kayora Premium Purified Water, six-stage purified table water produced in Eket, Akwa Ibom State, Nigeria.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '173 Eket-Oron Road',
        addressLocality: 'Eket',
        addressRegion: 'Akwa Ibom State',
        postalCode: '524101',
        addressCountry: 'NG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 4.642,
        longitude: 7.9288,
      },
      telephone: '+2349040789918',
      email: 'info@kaybibeverage.com',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/KayoraWater',
        'https://www.facebook.com/KayoraWater',
        'https://www.tiktok.com/@KayoraWater',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.kayorawater.com/#website',
      url: 'https://www.kayorawater.com',
      name: 'Kayora Premium Purified Water',
      publisher: { '@id': 'https://www.kayorawater.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-kayora-cream text-kayora-ink font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
