import type { SequenceEmail } from './types';

/** Triggered when LEAD_SEGMENTS['18_9l_supply'] lead is captured (leads/18-9l-supply route). Covers homes, offices, schools, clinics, churches and institutions. */
export const OFFICE_18L_SEQUENCE: SequenceEmail[] = [
  {
    emailNumber: 1,
    trigger: 'Immediate',
    subject: 'We’ve received your Kayora supply enquiry',
    previewText: 'Thank you — here’s what happens next.',
    body: `Hi {{firstName}},

Thank you for your enquiry about 18.9L Kayora supply for {{organization}}.

Our team reviews supply enquiries within one business day and will confirm pricing, delivery schedule and next steps directly with you.

In the meantime, here's the short version: the 18.9L Never Finish fits every standard dispenser sold in Nigeria, and scheduled delivery means you don't have to think about reordering once it's set up.

If your need is urgent, message us on WhatsApp and we'll prioritise your enquiry.`,
    primaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    toneNote: 'Warm, quick, confirms a human will follow up — sets expectations without overselling.',
  },
  {
    emailNumber: 2,
    trigger: 'Day 2',
    subject: 'What reliable water supply actually means',
    previewText: 'Eight-stage purification, NAFDAC Registered, delivered on schedule.',
    body: `Hi {{firstName}},

While we confirm your supply details, here's what "reliable" means for Kayora 18.9L customers:

— Every bottle goes through the same eight-stage purification process — borehole, sediment filtration, activated carbon, ion exchange, precision filtration, reverse osmosis, UV treatment and ozonation. No stage is skipped.
— NAFDAC Registered (A1-111026) and SON MANCAP Certified (FT-29180 for the 18.9L bottle) — the credentials your staff, visitors or family can verify.
— Produced daily at our Eket facility, so supply doesn't depend on a single unpredictable batch.
— Scheduled delivery and bottle return, so your team isn't tracking stock manually.

This is water supply set up to be forgotten about — in the good sense.`,
    primaryCTA: { label: 'See the 18.9L Never Finish', href: '/products/18-9l' },
    toneNote: 'Trust-building, factual — no fluff about "premium lifestyle," just what reliability concretely means.',
  },
  {
    emailNumber: 3,
    trigger: 'Day 5',
    subject: 'A quick question about your supply schedule',
    previewText: 'Weekly, fortnightly, or as-needed — let’s confirm what fits.',
    body: `Hi {{firstName}},

To finalise your Kayora supply setup, it helps to confirm:

— How many bottles you'd need per delivery
— How often — weekly, fortnightly, or on request
— Whether you already have a dispenser or need one sourced

If you're not sure yet, that's fine — reply to this email with your best estimate (staff count, household size, or usual usage) and we'll recommend a schedule.

Prefer to talk it through? Message us on WhatsApp and we'll walk through it together.`,
    primaryCTA: { label: 'Reply With Your Schedule', href: 'mailto:info@kaybibeverage.com?subject=18.9L%20supply%20schedule' },
    secondaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    toneNote: 'Helpful, consultative — genuinely useful for the lead to think through, not just a nudge to reply.',
  },
  {
    emailNumber: 4,
    trigger: 'Day 9',
    subject: 'Ready to set your first delivery date?',
    previewText: 'Let’s lock in pricing and your first delivery.',
    body: `Hi {{firstName}},

If you're ready to move forward, we can confirm pricing and set your first delivery date this week.

Direct delivery is available across Akwa Ibom State, typically within 24–48 hours of confirmation. Reply to this email or message us on WhatsApp with your preferred date and we'll take it from there.

If you still have questions about pricing, minimum order or the return/refill process for the 18.9L bottle, ask — we'd rather clarify now than after delivery.`,
    primaryCTA: { label: 'Confirm My Delivery', href: 'https://wa.me/2349040789918' },
    secondaryCTA: { label: 'Call 0904 078 9918', href: 'tel:+2349040789918' },
    toneNote: 'Direct call to action — this is the "let\'s close it" email, still low-pressure.',
  },
  {
    emailNumber: 5,
    trigger: 'Day 16',
    subject: 'Still looking for a water supply solution?',
    previewText: 'Checking in before we close out your enquiry.',
    body: `Hi {{firstName}},

We haven't heard back since your supply enquiry, so we wanted to check in.

If timing wasn't right, no problem — reply whenever you're ready and we'll pick this back up, no need to start over.

If you'd still like to move forward now, message us on WhatsApp and we'll confirm pricing and delivery the same day.`,
    primaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    secondaryCTA: { label: 'Reply — Still Interested', href: 'mailto:info@kaybibeverage.com?subject=18.9L%20supply%20-%20still%20interested' },
    toneNote: 'Respectful reactivation, easy re-entry point.',
  },
];
