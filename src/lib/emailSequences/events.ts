import type { SequenceEmail } from './types';

/** Triggered when LEAD_SEGMENTS.events lead is captured (leads/event-quote route). Concise and time-sensitive by design. */
export const EVENTS_SEQUENCE: SequenceEmail[] = [
  {
    emailNumber: 1,
    trigger: 'Immediate',
    subject: 'We’ve received your Kayora event quote request',
    previewText: 'Thank you — we’ll confirm your quote shortly.',
    body: `Hi {{firstName}},

Thank you for your event water enquiry for {{eventDate}}.

We've received your details and will confirm quantities, pricing and delivery timing within one business day.

If your event is coming up soon, message us on WhatsApp and we'll prioritise your quote.`,
    primaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    toneNote: 'Fast, reassuring — events are time-sensitive so this should land as "we\'ve got you."',
  },
  {
    emailNumber: 2,
    trigger: 'Day 1–2',
    subject: 'How much water does your event actually need?',
    previewText: 'A quick way to estimate quantity so we don’t over- or under-quote you.',
    body: `Hi {{firstName}},

A quick way to think through quantity for {{eventDate}}:

— As a rough guide, plan one 30cl bottle per guest for a half-day event, or two for a full-day event.
— For longer programmes or where guests want a fuller serving, mix in 50cl bottles.
— Cases: 30cl comes in cases of 24, 50cl in cases of 12 — useful for rounding your order to whole cases.

If you already have a headcount, reply with the number and we'll confirm an exact quantity and price. If you're unsure, tell us the event type and expected duration and we'll estimate for you.`,
    primaryCTA: { label: 'Reply With Your Guest Count', href: 'mailto:info@kaybibeverage.com?subject=Event%20water%20quantity' },
    toneNote: 'Genuinely useful planning help — this is the value-add email, not a sales push.',
  },
  {
    emailNumber: 3,
    trigger: 'Day 4',
    subject: 'Choosing between 30cl, 50cl and 75cl for your event',
    previewText: 'A quick guide to picking the right size.',
    body: `Hi {{firstName}},

If you're still deciding on size:

— 30cl Sharp-sharp — the standard for weddings, naming ceremonies, corporate functions and conferences. Easy to chill in volume, comfortable to hold during proceedings.
— 50cl Original — a good addition for longer events or where guests expect a fuller serving.
— 75cl Jara — for premium or hospitality-style events where presentation matters, such as a head table or VIP section.

Most event orders use 30cl as the primary size with a smaller run of 50cl or 75cl for specific tables or guests. Tell us your event type and we'll recommend a mix.`,
    primaryCTA: { label: 'Get a Size Recommendation', href: 'https://wa.me/2349040789918' },
    secondaryCTA: { label: 'See All Sizes', href: '/products' },
    toneNote: 'Practical decision support — positions the SKUs intelligently without pushing the most expensive option.',
  },
  {
    emailNumber: 4,
    trigger: 'Day 7',
    subject: 'Confirming your event water order before {{eventDate}}',
    previewText: 'Let’s lock this in — event dates fill up fast.',
    body: `Hi {{firstName}},

We haven't heard back on your event water quote, and with {{eventDate}} approaching, we wanted to check in before delivery slots for that date fill up.

If you'd like to proceed, reply to this email or message us on WhatsApp with your final quantity and we'll confirm delivery timing.

If your plans have changed, that's completely fine — just let us know.`,
    primaryCTA: { label: 'Confirm My Order', href: 'https://wa.me/2349040789918' },
    secondaryCTA: { label: 'Call 0904 078 9918', href: 'tel:+2349040789918' },
    toneNote: 'Time-sensitive but honest — urgency comes from the real event date, not manufactured scarcity.',
  },
];
