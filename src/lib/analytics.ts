/**
 * Single dispatch point for commercial-intent events. Pushes to GA4 (via
 * gtag/dataLayer, loaded by CookieConsent once analytics consent is
 * granted) and mirrors to the Meta Pixel as a custom event when the pixel
 * is loaded. Both loaders are consent-gated in CookieConsent.tsx — track()
 * itself does not bypass consent, it just no-ops if neither is present.
 *
 * Event names follow `<group>_<action>[_<context>]`, e.g.
 * `whatsapp_click_homepage`, `cta_click_order_kayora`, `product_view_18_9l`.
 */

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
}
