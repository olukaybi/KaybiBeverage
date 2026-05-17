import type { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop Kayora Water — Order Online | Eket, Akwa Ibom',
  description:
    'Order Kayora Premium Purified Water online. 30cl, 50cl, 75cl cases and 18.9L dispenser bottles. Delivered to Eket, Uyo and wider Akwa Ibom.',
};

export default function ShopPage() {
  return <ShopClient />;
}
