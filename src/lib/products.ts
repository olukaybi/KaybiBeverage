import type { Product, DeliveryZone } from './types';

export const PRODUCTS: Product[] = [
  {
    sku: '30cl',
    display_name: '30cl',
    nickname: 'Sharp-sharp',
    unit_of_sale: 'case',
    bottles_per_unit: 24,
    price_naira: 2100,
    min_order_quantity: 10,
    category: 'pet',
    in_stock: true,
    active: true,
    display_order: 1,
  },
  {
    sku: '50cl',
    display_name: '50cl',
    nickname: 'Original',
    unit_of_sale: 'case',
    bottles_per_unit: 12,
    price_naira: 1600,
    min_order_quantity: 10,
    category: 'pet',
    in_stock: true,
    active: true,
    display_order: 2,
  },
  {
    sku: '75cl',
    display_name: '75cl',
    nickname: 'Jara',
    unit_of_sale: 'case',
    bottles_per_unit: 12,
    price_naira: 1900,
    min_order_quantity: 10,
    category: 'pet',
    in_stock: true,
    active: true,
    display_order: 3,
  },
  {
    sku: '18.9L',
    display_name: '18.9L',
    nickname: 'Never Finish',
    unit_of_sale: 'bottle',
    bottles_per_unit: 1,
    price_naira: 8000,
    min_order_quantity: 5,
    category: 'pc',
    in_stock: true,
    active: true,
    display_order: 4,
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'eket_city', display_name: 'Eket City', fee_naira: 500, active: true },
  { id: 'uyo', display_name: 'Uyo', fee_naira: 2000, active: true },
  { id: 'wider_akwa_ibom', display_name: 'Wider Akwa Ibom (Oron, Ikot Ekpene, Abak, Itu…)', fee_naira: 3500, active: true },
];

export const PRODUCT_IMAGES: Record<string, string> = {
  '30cl': '/images/products/kayora-30cl.png',
  '50cl': '/images/products/kayora-50cl.png',
  '75cl': '/images/products/kayora-75cl.png',
  '18.9L': '/images/products/kayora-18-9l.png',
};

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

export function minDeliveryDate(): Date {
  return addBusinessDays(new Date(), 2);
}
