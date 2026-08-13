/**
 * Shared WhatsApp link builder. One customer-facing number (already used
 * sitewide for tel: links and the footer social icon) — kept as a single
 * source of truth so intent messages and the number stay in sync.
 */
export const WHATSAPP_NUMBER = '2349040789918';

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Pre-composed, page-context intent messages — keeps prefills consistent and commercially useful. */
export const WHATSAPP_INTENTS = {
  general: 'Hi Kayora, I have a question about your premium purified water.',
  homeOrder: 'Hi Kayora, I would like to order water for my home.',
  officeSupply: 'Hi Kayora, I would like to set up water supply for my office.',
  eventOrder: 'Hi Kayora, I would like to order water for an upcoming event.',
  hospitality: 'Hi Kayora, I would like to discuss water supply for my hotel/restaurant.',
  distributor: 'Hi Kayora, I am interested in becoming a distributor.',
  product: (skuLabel: string) => `Hi Kayora, I would like to order the ${skuLabel}.`,
} as const;
