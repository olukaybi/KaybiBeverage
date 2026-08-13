import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';
import { hashEmail, watTimestamp, esc, htmlRow, EMAIL_STYLES, storeLeadBestEffort } from '@/lib/leadEmail';
import { LEAD_SEGMENTS } from '@/lib/leadSegments';

const schema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  phone: z.string().min(7).max(30).trim(),
  email: z.string().email().max(200).trim(),
  eventDate: z.string().min(1).max(30).trim(),
  eventLocation: z.string().min(2).max(150).trim(),
  guestCount: z.string().min(1).max(100).trim(),
  preferredSku: z.enum(['30cl — Sharp-sharp', '50cl — Original', '75cl — Jara', 'Undecided']),
  eventType: z.string().max(150).optional(),
  deliveryTiming: z.string().max(150).optional(),
  needsHelp: z.string().max(20).optional(),
  message: z.string().min(5).max(2000).trim(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content: z.string().max(100).optional(),
  utm_term: z.string().max(100).optional(),
  source_page: z.string().max(100).optional(),
  _hp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed.', issues: result.error.issues }, { status: 422 });
  }

  const d = result.data;
  if (d._hp) return NextResponse.json({ success: true });

  const segmentConfig = LEAD_SEGMENTS.events;
  const ts = watTimestamp();
  const campaignLabel = [d.utm_source, d.utm_medium, d.utm_campaign].filter(Boolean).join(' / ');

  await storeLeadBestEffort({
    segment: 'events',
    source_page: d.source_page ?? 'unknown',
    email: d.email,
    full_name: d.fullName,
    phone: d.phone,
    location: d.eventLocation,
    preferred_sku: d.preferredSku,
    enquiry_type: d.eventType,
    lifecycle_stage: segmentConfig.lifecycleStage,
    utm_source: d.utm_source,
    utm_medium: d.utm_medium,
    utm_campaign: d.utm_campaign,
    utm_content: d.utm_content,
    utm_term: d.utm_term,
    payload: d,
  });

  const htmlBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${EMAIL_STYLES}</style></head><body>
<h2>Event supply quote request — kayorawater.com</h2>
<p class="meta">Received: ${ts} · Segment: events · Lifecycle: ${segmentConfig.lifecycleStage}</p>
<table>
  <tr><td class="section" colspan="2">Contact</td></tr>
  ${htmlRow('Name', esc(d.fullName))}
  ${htmlRow('Email', `<a href="mailto:${esc(d.email)}">${esc(d.email)}</a>`)}
  ${htmlRow('Phone', esc(d.phone))}
  <tr><td class="section" colspan="2">Event</td></tr>
  ${htmlRow('Event Date', esc(d.eventDate))}
  ${htmlRow('Event Location', esc(d.eventLocation))}
  ${htmlRow('Guest Count / Quantity', esc(d.guestCount))}
  ${htmlRow('Preferred Size', esc(d.preferredSku))}
  ${d.eventType ? htmlRow('Event Type', esc(d.eventType)) : ''}
  ${d.deliveryTiming ? htmlRow('Delivery Timing', esc(d.deliveryTiming)) : ''}
  ${d.needsHelp ? htmlRow('Needs Size Help?', esc(d.needsHelp)) : ''}
  ${campaignLabel ? htmlRow('Campaign', esc(campaignLabel)) : ''}
  ${d.source_page ? htmlRow('Source Page', esc(d.source_page)) : ''}
  <tr><td class="section" colspan="2">Message</td></tr>
  <tr><td colspan="2" class="val msg">${esc(d.message)}</td></tr>
</table>
</body></html>`;

  const textBody = `Event supply quote request — kayorawater.com
Received: ${ts}

NAME:         ${d.fullName}
EMAIL:        ${d.email}
PHONE:        ${d.phone}
EVENT DATE:   ${d.eventDate}
LOCATION:     ${d.eventLocation}
GUESTS/QTY:   ${d.guestCount}
SIZE:         ${d.preferredSku}
${campaignLabel ? `CAMPAIGN:     ${campaignLabel}\n` : ''}
MESSAGE:
${d.message}`;

  const { error: sendError } = await resend.emails.send({
    from: 'Kayora Water <noreply@kayorawater.com>',
    to: segmentConfig.notifyEmail,
    replyTo: d.email,
    subject: `[Kayora] Event quote request — ${d.eventDate}, ${d.guestCount}`,
    html: htmlBody,
    text: textBody,
  });

  if (sendError) {
    console.error(`[leads/event-quote] send failed email=${hashEmail(d.email)}`, sendError);
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
