import type { SequenceEmail } from './types';

/** Triggered when LEAD_SEGMENTS.general_interest lead is captured (leads/general-updates route). Lightest-touch sequence — no hard sell. */
export const GENERAL_SEQUENCE: SequenceEmail[] = [
  {
    emailNumber: 1,
    trigger: 'Immediate',
    subject: 'Welcome — here’s what Kayora is about',
    previewText: 'Premium purified water, made in Eket, Akwa Ibom.',
    body: `Hi {{firstName}},

Thanks for your interest in Kayora Premium Purified Water.

Kayora is produced by Kaybi Beverage Industries Limited at our facility in Eket, Akwa Ibom State — eight-stage purified, NAFDAC Registered (A1-111026), SON MANCAP Certified. We deliver directly across Akwa Ibom and through our distributor network across the South-South and South-East.

We'll send occasional updates on products, delivery areas and availability — nothing more.`,
    primaryCTA: { label: 'Explore the Range', href: '/products' },
    toneNote: 'Simple welcome, states the facts once, sets expectations for a light-touch relationship.',
  },
  {
    emailNumber: 2,
    trigger: 'Day 3–4',
    subject: 'Four sizes, one standard',
    previewText: 'Which Kayora size fits your day-to-day?',
    body: `Hi {{firstName}},

Kayora comes in four sizes, each built for a specific way people actually use water:

— 30cl Sharp-sharp — events, ceremonies, quick-serve occasions
— 50cl Original — everyday hydration, homes, offices, schools
— 75cl Jara — hospitality, travel, premium refreshment
— 18.9L Never Finish — homes, offices and institutions with recurring supply needs

Every size goes through the same eight-stage purification process — the only difference is the pack format.`,
    primaryCTA: { label: 'See the Full Range', href: '/products' },
    toneNote: 'Product education, light and scannable — no pressure to buy.',
  },
  {
    emailNumber: 3,
    trigger: 'Day 8–10',
    subject: 'What "eight-stage purified" actually means',
    previewText: 'Borehole to bottle — the process behind every Kayora.',
    body: `Hi {{firstName}},

Every bottle of Kayora goes through eight stages before it's sealed: deep borehole sourcing, sediment filtration, activated carbon filtration, ion exchange, precision filtration, reverse osmosis, UV sterilisation and ozonation.

We're NAFDAC Registered (A1-111026) and SON MANCAP Certified (FT-29179 for PET bottles, FT-29180 for the 18.9L). Both are printed on every label and verifiable.

We're also not a distant brand — our facility is at 173 Eket Oron Road, Eket, and it's open to visit by appointment.`,
    primaryCTA: { label: 'Read the Full Quality Story', href: '/quality-and-certifications' },
    toneNote: 'Trust-building, factual — this is the credibility email, keep claims verifiable.',
  },
  {
    emailNumber: 4,
    trigger: 'Day 14–16',
    subject: 'How to order Kayora, wherever you are',
    previewText: 'Direct delivery, distributors, or a quick enquiry.',
    body: `Hi {{firstName}},

If you're ready to order or just want to check availability in your area:

— Direct delivery across Akwa Ibom State, typically within 24–48 hours
— Distributor network across Cross River, Rivers, Bayelsa, Delta, Edo, Enugu, Anambra, Abia and Imo
— For offices, events or bulk needs, our team can put together a quote directly

Message us on WhatsApp or visit our Contact page any time — we typically respond within hours during business days.`,
    primaryCTA: { label: 'Check Delivery Areas', href: '/delivery-areas' },
    secondaryCTA: { label: 'Contact Us', href: '/contact' },
    toneNote: 'Clear, practical close — tells the reader exactly how to act without pushing.',
  },
];
