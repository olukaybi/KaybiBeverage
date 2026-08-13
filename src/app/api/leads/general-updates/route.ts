import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';
import { hashEmail, watTimestamp, esc, htmlRow, EMAIL_STYLES, storeLeadBestEffort } from '@/lib/leadEmail';
import { LEAD_SEGMENTS } from '@/lib/leadSegments';

const schema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim(),
  phone: z.string().max(30).optional(),
  location: z.string().max(100).optional(),
  interestArea: z.string().max(50).optional(),
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

  const segmentConfig = LEAD_SEGMENTS.general_interest;
  const ts = watTimestamp();
  const campaignLabel = [d.utm_source, d.utm_medium, d.utm_campaign].filter(Boolean).join(' / ');

  await storeLeadBestEffort({
    segment: 'general_interest',
    source_page: d.source_page ?? 'unknown',
    email: d.email,
    full_name: d.fullName,
    phone: d.phone,
    location: d.location,
    enquiry_type: d.interestArea,
    lifecycle_stage: segmentConfig.lifecycleStage,
    utm_source: d.utm_source,
    utm_medium: d.utm_medium,
    utm_campaign: d.utm_campaign,
    utm_content: d.utm_content,
    utm_term: d.utm_term,
    payload: d,
  });

  const htmlBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${EMAIL_STYLES}</style></head><body>
<h2>Product & availability updates signup — kayorawater.com</h2>
<p class="meta">Received: ${ts} · Segment: general_interest · Lifecycle: ${segmentConfig.lifecycleStage}</p>
<table>
  ${htmlRow('Name', esc(d.fullName))}
  ${htmlRow('Email', `<a href="mailto:${esc(d.email)}">${esc(d.email)}</a>`)}
  ${d.phone ? htmlRow('Phone', esc(d.phone)) : ''}
  ${d.location ? htmlRow('Location', esc(d.location)) : ''}
  ${d.interestArea ? htmlRow('Interest Area', esc(d.interestArea)) : ''}
  ${campaignLabel ? htmlRow('Campaign', esc(campaignLabel)) : ''}
  ${d.source_page ? htmlRow('Source Page', esc(d.source_page)) : ''}
</table>
</body></html>`;

  const textBody = `Product & availability updates signup — kayorawater.com
Received: ${ts}

NAME:  ${d.fullName}
EMAIL: ${d.email}
${d.phone ? `PHONE: ${d.phone}\n` : ''}${d.location ? `LOCATION: ${d.location}\n` : ''}${d.interestArea ? `INTEREST: ${d.interestArea}\n` : ''}${campaignLabel ? `CAMPAIGN: ${campaignLabel}\n` : ''}`;

  const { error: sendError } = await resend.emails.send({
    from: 'Kayora Water <noreply@kayorawater.com>',
    to: segmentConfig.notifyEmail,
    replyTo: d.email,
    subject: `[Kayora] Product & availability updates signup — ${d.fullName}`,
    html: htmlBody,
    text: textBody,
  });

  if (sendError) {
    console.error(`[leads/general-updates] send failed email=${hashEmail(d.email)}`, sendError);
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
