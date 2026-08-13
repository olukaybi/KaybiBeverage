import type { SequenceEmail } from './types';

/** Triggered when LEAD_SEGMENTS.distributor lead is captured (distributor-application route). */
export const DISTRIBUTOR_SEQUENCE: SequenceEmail[] = [
  {
    emailNumber: 1,
    trigger: 'Immediate',
    subject: 'We’ve received your Kayora distributor application',
    previewText: 'Thank you for applying — here’s what happens next.',
    body: `Hi {{firstName}},

Thank you for applying to distribute Kayora Premium Purified Water in {{state}}.

Your application has been received by our distribution team. Here is what happens next:

1. We review your business details — typically within one business day.
2. If your footprint and volume fit an open territory, we call or WhatsApp you to discuss terms.
3. Once terms are agreed, we set up your account and confirm your first delivery.

We are not a distant brand running a form-fill exercise. Every application is reviewed personally by our team in Eket.

If anything changes on your end — a different contact person, an updated volume estimate — just reply to this email.`,
    primaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    toneNote: 'Professional, warm, no hard sell. This email exists to confirm the process is real and human.',
  },
  {
    emailNumber: 2,
    trigger: 'Day 2',
    subject: 'Why FMCG distributors are adding Kayora to their line',
    previewText: 'NAFDAC Registered, SON MANCAP Certified, and made close to your market.',
    body: `Hi {{firstName}},

While we review your application, here is the commercial case for Kayora in a distributor's portfolio:

— NAFDAC Registered (A1-111026) and SON MANCAP Certified (FT-29179 / FT-29180) — no compliance questions from retailers or regulators.
— Produced at our own facility in Eket, Akwa Ibom — daily production means we rarely run short, and lead times stay predictable.
— Four SKUs that cover four distinct buying occasions: 30cl for events, 50cl for everyday retail, 75cl for hospitality, 18.9L for offices and institutions. One supplier line, four shelf categories.
— A brand customers in Akwa Ibom already recognise, which shortens the sell-in conversation with your retail accounts.

Distributors carrying Kayora are not betting on an unknown label — they're adding a registered, locally-produced product with existing demand.

We'll follow up in a few days once your application review is further along.`,
    primaryCTA: { label: 'See the Full Distributor Programme', href: '/distribution' },
    toneNote: 'Factual, commercially framed — this is the "why us" email, not a hype pitch.',
  },
  {
    emailNumber: 3,
    trigger: 'Day 5',
    subject: 'A few details to speed up your Kayora application',
    previewText: 'Confirming your footprint and storage capacity helps us match you to the right terms.',
    body: `Hi {{firstName}},

To move your application to the next stage, it helps us to confirm a few details — if you already included these, no action needed:

— Your current retail or distribution footprint (how many outlets or accounts you serve today)
— Your storage and logistics capability (warehouse size, delivery vehicles)
— Your target territory, if you have a preference beyond your current base

These details let us match you to the right pricing tier and delivery schedule rather than a one-size-fits-all offer.

If it's easier to talk this through directly, reply to this email or message us on WhatsApp and we'll set up a short call.`,
    primaryCTA: { label: 'Reply With Your Details', href: 'mailto:info@kaybibeverage.com?subject=Distributor%20application%20follow-up' },
    secondaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    toneNote: 'Practical, qualification-focused. Should feel like progress, not a form resubmission.',
  },
  {
    emailNumber: 4,
    trigger: 'Day 8',
    subject: 'Let’s talk territory and volume',
    previewText: 'A short call is usually the fastest way to finalise terms.',
    body: `Hi {{firstName}},

At this stage, most applications move faster with a direct conversation than back-and-forth email — territory boundaries, volume tiers and delivery schedules are easier to agree on a call.

If you're still interested in carrying Kayora, reply with a few times that work for a 15-minute call, or message our distribution line directly on WhatsApp and we'll set it up.

We're currently confirming territory allocations in {{state}} and nearby LGAs, so a timely conversation helps us hold your preferred area while we finalise.`,
    primaryCTA: { label: 'Call Our Distribution Line: 07070 238028', href: 'tel:+23407070238028' },
    secondaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    toneNote: 'Direct, time-sensitive without manufacturing false urgency — territory scarcity is a real, factual reason to act.',
  },
  {
    emailNumber: 5,
    trigger: 'Day 14',
    subject: 'Still interested in distributing Kayora?',
    previewText: 'Checking in before we close out your application.',
    body: `Hi {{firstName}},

We haven't heard back since your Kayora distributor application, so we wanted to check in directly.

If you're still interested, reply to this email or message us on WhatsApp and we'll pick the conversation back up from where it left off — no need to reapply.

If timing isn't right at the moment, that's completely fine. Let us know and we'll close this out for now; you're welcome to apply again whenever it suits your business.`,
    primaryCTA: { label: 'Message Us on WhatsApp', href: 'https://wa.me/2349040789918' },
    secondaryCTA: { label: 'Reply — Still Interested', href: 'mailto:info@kaybibeverage.com?subject=Distributor%20application%20-%20still%20interested' },
    toneNote: 'Low-pressure reactivation. Gives a clean, respectful exit if the lead has gone cold.',
  },
];
