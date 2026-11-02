/**
 * Single dispatch point for commercial-intent events. Pushes to GA4 (via
 * gtag/dataLayer, loaded by CookieConsent once analytics consent is
 * granted), mirrors to the Meta Pixel as a custom event when the pixel is
 * loaded, and mirrors to Vercel Analytics as a custom event. GA4/Meta
 * loaders are consent-gated in CookieConsent.tsx — track() itself does not
 * bypass consent, it just no-ops if neither is present. Vercel Analytics
 * has no consent gate here since it carries no PII and the <Analytics />
 * component (src/app/layout.tsx) is the only thing that actually ships
 * the event.
 *
 * Event names follow `<group>_<action>[_<context>]`, e.g.
 * `whatsapp_click_homepage`, `cta_click_order_kayora`, `product_view_18_9l`.
 * Every call here also reaches Vercel Analytics under that same name, and
 * the funnel-level helpers below additionally fire a second, canonical
 * event (`whatsapp_click`, `phone_click`, `form_submit`, `add_to_cart`,
 * `begin_checkout`, `purchase`) so those can be reported on without
 * aggregating every per-page variant name.
 */
import { track as vercelTrack } from '@vercel/analytics';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWindow = any;

export type EventParams = Record<string, string | number | boolean | undefined>;

export function track(eventName: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  const win = window as AnyWindow;

  // GA4 — dataLayer.push is safe to call even before gtag.js has loaded;
  // events queue and flush once the library initialises.
  if (win.dataLayer) {
    win.dataLayer.push({ event: eventName, ...params });
  }

  // Meta Pixel — only fires once fbq is actually present (pixel load is
  // consent-gated and env-gated; see CookieConsent.tsx).
  if (typeof win.fbq === 'function') {
    win.fbq('trackCustom', eventName, params);
  }

  // Vercel Analytics — every event that reaches this dispatch point
  // (every existing tracked-link/CTA/form component already calls
  // track()) is mirrored here, so no per-component changes were needed.
  vercelTrack(eventName, params);
}

/** Convenience wrapper for outbound WhatsApp CTAs — see src/lib/whatsapp.ts. */
export function trackWhatsAppClick(context: {
  page_type: string;
  page_name: string;
  sku?: string;
  audience_type?: string;
  cta_location?: string;
}): void {
  const suffix = context.page_name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
  track(`whatsapp_click_${suffix}`, context);
  track('whatsapp_click', context);
}

/** Canonical phone-click event, fired alongside any page-specific `phone_click_*` event. */
export function trackPhoneClick(context: EventParams): void {
  track('phone_click', context);
}

/** Canonical form-submission event — always carries the form's name. */
export function trackFormSubmit(formName: string, extra: EventParams = {}): void {
  track('form_submit', { form_name: formName, ...extra });
}

/** Fired whenever an item is added to the cart (product pages and /shop). */
export function trackAddToCart(item: { sku: string; display_name: string; price_naira: number }, quantity: number): void {
  track('add_to_cart', {
    sku: item.sku,
    item_name: item.display_name,
    quantity,
    value: item.price_naira * quantity,
    currency: 'NGN',
  });
}

/** Fired when the customer leaves the cart for checkout. */
export function trackBeginCheckout(data: { value: number; item_count: number }): void {
  track('begin_checkout', { value: data.value, item_count: data.item_count, currency: 'NGN' });
}

/** Fired once an order is confirmed — by card payment or pay-on-delivery. */
export function trackPurchase(data: { order_number: string; value: number; payment_method: 'card' | 'pay_on_delivery' }): void {
  track('purchase', {
    order_number: data.order_number,
    value: data.value,
    payment_method: data.payment_method,
    currency: 'NGN',
  });
}
