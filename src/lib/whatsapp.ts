/**
 * WhatsApp ordering number for the CRO sprint's new "Order via WhatsApp"
 * CTAs (shop cards, floating button, calculators, bulk quote form).
 *
 * NOTE: this differs from the +2349040789918 number used everywhere else
 * on the site (footer WhatsApp icon, tel: click-to-call links, JSON-LD
 * business telephone, order/contact confirmation emails) — those were
 * left untouched since they're outside this sprint's scope and the two
 * numbers may not be interchangeable. Confirm with Kay whether 918 and
 * 925 are both live, and if the rest of the site should be reconciled
 * onto one number in a follow-up.
 */
export const WHATSAPP_NUMBER = '2349040789925';

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
