import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#007FFF',
};

export const metadata: Metadata = {
  title: {
    default: 'Kayora Premium Purified Water | NAFDAC Certified · Eket, Akwa Ibom',
    template: '%s | Kayora Water',
  },
  description:
    'Discover Kayora® Premium Purified Water — six-stage purified, NAFDAC & SON certified, proudly produced in Eket, Akwa Ibom. Pure, crisp hydration for homes, offices, events & wholesale.',
  keywords: [
    'Kayora water', 'Kayora premium water Akwa Ibom', 'buy purified water Eket',
    'NAFDAC certified water Eket', 'wholesale water Akwa Ibom', 'Kayora 18.9L',
    'table water Eket', 'Kaybi Beverage Industries', 'bottled water Akwa Ibom',
  ],
  authors: [{ name: 'Kaybi Beverage Industries Limited' }],
  metadataBase: new URL('https://www.kayorawater.com'),
  openGraph: {
    type: 'website',
    siteName: 'Kayora Premium Purified Water',
    title: 'Kayora Premium Purified Water — Purified to the Highest Standard. Safe for Every Table.',
    description: 'Six-stage purified water crafted at our Eket, Akwa Ibom facility. NAFDAC & SON certified. 30cl · 50cl · 75cl · 18.9L.',
    url: 'https://www.kayorawater.com/',
    images: [{ url: '/opengraph.jpg', width: 1200, height: 630 }],
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KayoraWater',
    creator: '@KayoraWater',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
