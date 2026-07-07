import { PRODUCTS, DELIVERY_ZONES } from './products';
import type { DeliveryZone } from './types';

/**
 * Server-side order pricing. The client sends only SKUs, quantities and
 * a delivery zone id — every naira amount is recomputed here from the
 * canonical catalogue so a tampered request body can never change what
 * gets stored or charged.
 */

export interface PricedItem {
  product_sku: string;
  product_name: string;
  quantity: number;
  unit_price_naira: number;
  line_total_naira: number;
}

export interface PricedOrder {
  items: PricedItem[];
  subtotal_naira: number;
  delivery_fee_naira: number;
  total_naira: number;
  zone: DeliveryZone;
}

export interface PricingRejection {
  error: string;
  status: number;
}

export const MIN_ORDER_SUBTOTAL_NAIRA = 15000;

export function priceOrder(
  rawItems: Array<{ product_sku: string; quantity: number }>,
  zoneId: string
): PricedOrder | PricingRejection {
  const zone = DELIVERY_ZONES.find((z) => z.id === zoneId && z.active);
  if (!zone) {
    return { error: 'Invalid delivery zone.', status: 400 };
  }

  const items: PricedItem[] = [];
  for (const raw of rawItems) {
    const product = PRODUCTS.find(
      (p) => p.sku === raw.product_sku && p.active && p.in_stock
    );
    if (!product) {
      return { error: 'Unknown product.', status: 400 };
    }
    items.push({
      product_sku: product.sku,
      product_name: product.display_name,
      quantity: raw.quantity,
      unit_price_naira: product.price_naira,
      line_total_naira: product.price_naira * raw.quantity,
    });
  }

  const subtotal_naira = items.reduce((sum, i) => sum + i.line_total_naira, 0);
  const delivery_fee_naira = zone.fee_naira;

  return {
    items,
    subtotal_naira,
    delivery_fee_naira,
    total_naira: subtotal_naira + delivery_fee_naira,
    zone,
  };
}

/**
 * Minimum-order check on the server-computed subtotal, with the
 * refill-aware message from the Sprint 5.0 routing rules.
 * Returns null when the order clears the minimum.
 */
export function checkMinimumOrder(priced: PricedOrder): PricingRejection | null {
  if (priced.subtotal_naira >= MIN_ORDER_SUBTOTAL_NAIRA) return null;
  const refillOnly = priced.items.every((item) => item.product_sku === '18.9L-refill');
  const error = refillOnly
    ? 'Refill orders under ₦15,000 are not available for home delivery. Bring your empty Kayora bottle to our Eket factory at 173 Eket Oron Road, or to any authorised dealer, for direct exchange. For delivery, your refill order must total ₦15,000 or more.'
    : 'Minimum order subtotal is ₦15,000.';
  return { error, status: 422 };
}

/**
 * Per-SKU minimum-quantity check. Every line must meet that product's
 * min_order_quantity (e.g. 10 cases for the 30cl / 50cl / 75cl PET range).
 * The cart UI enforces this too, but this guarantees the rule for any
 * request that reaches the API directly. Returns null when all lines clear.
 */
export function checkItemMinimums(priced: PricedOrder): PricingRejection | null {
  for (const item of priced.items) {
    const product = PRODUCTS.find((p) => p.sku === item.product_sku);
    if (product && item.quantity < product.min_order_quantity) {
      const unit =
        product.unit_of_sale === 'case'
          ? 'cases'
          : product.unit_of_sale === 'refill'
            ? 'refills'
            : 'bottles';
      return {
        error: `Minimum order for ${product.display_name} is ${product.min_order_quantity} ${unit}.`,
        status: 422,
      };
    }
  }
  return null;
}

export function isPricingRejection(
  result: PricedOrder | PricingRejection
): result is PricingRejection {
  return 'error' in result;
}
