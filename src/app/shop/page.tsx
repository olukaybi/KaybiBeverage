import type { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop Kayora Water — Order Online | Eket, Akwa Ibom',
  description:
    'Order Kayora Premium Purified Water online. 30cl, 50cl, 75cl cases and 18.9L dispenser bottles. Delivered to Eket, Uyo and wider Akwa Ibom.',
  alternates: { canonical: 'https://www.kayorawater.com/shop' },
  openGraph: {
    type: 'website',
    url: 'https://www.kayorawater.com/shop',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kayora Premium Purified Water — Wellness in every drop!',
        type: 'image/png',
      },
    ],
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
