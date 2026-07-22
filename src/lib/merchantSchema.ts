/**
 * Shared Merchant Listings structured-data fragments for Product JSON-LD.
 * Single source of truth so the return policy and shipping terms stay
 * identical across /products, /products/[slug] and /products/18-9l-refill.
 */

// Return policy reflects Kaybi's actual Delivery, Quality Guarantee &
// Return Policy (effective July 2026): doorstep inspection + 24-hour
// post-delivery defect claim window, resolved by replacement
// (refund/store credit if replacement not feasible). This is a
// defect/damage warranty, not a general change-of-mind return policy —
// schema.org's return vocabulary is a close but imperfect fit; update
// this block if Kaybi's terms are revised.
export const MERCHANT_RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'NG',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 1,
  returnMethod: 'https://schema.org/ReturnAtKiosk',
  returnFees: 'https://schema.org/FreeReturn',
  refundType: 'https://schema.org/ExchangeRefund',
  returnPolicyCountry: 'NG',
} as const;

// ₦500 Eket-city baseline delivery rate (see src/lib/products.ts
// DELIVERY_ZONES.eket_city). Uyo (₦2,000) and wider Akwa Ibom (₦3,500)
// cost more — this field represents the minimum/baseline rate, per the
// Merchant Listings shippingDetails convention of one representative
// rate; see /delivery-areas for the full zone breakdown.
export const MERCHANT_SHIPPING_DETAILS = {
  '@type': 'OfferShippingDetails',
  shippingRate: {
    '@type': 'MonetaryAmount',
    value: '500',
    currency: 'NGN',
  },
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'NG',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
    transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
  },
} as const;
