import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createHash } from 'crypto';
import { checkRateLimit } from '@/lib/ratelimit';


const schema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  businessName: z.string().min(2).max(150).trim(),
  businessType: z.enum(['Retailer', 'Wholesaler', 'Event Supplier', 'HoReCa', 'Other']),
  city: z.string().min(2).max(100).trim(),
  lga: z.string().min(2).max(100).trim(),
  state: z.string().min(2).max(100).trim(),
  phone: z.string().min(10).max(30).trim(),
  whatsapp: z.string().max(30).optional(),
  email: z.string().email().max(200).trim(),
  monthlyVolume: z.string().min(1).max(200).trim(),
  yearsInBusiness: z.string().max(100).optional(),
  anythingElse: z.string().max(2000).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content: z.string().max(100).optional(),
  utm_term: z.string().max(100).optional(),
  _hp: z.string().optional(),
});

function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex').slice(0, 12);
}

function watTimestamp(): string {
  return (
    new Date().toLocaleString('en-NG', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'full',
      timeStyle: 'short',
    }) + ' WAT'
  );
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function htmlRow(label: string, value: string): string {
  return `<tr><td class="lbl">${label}</td><td class="val">${value}</td></tr>`;
}

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

  const {
    fullName, businessName, businessType,
    city, lga, state,
    phone, whatsapp, email,
    monthlyVolume, yearsInBusiness, anythingElse,
    utm_source, utm_medium, utm_campaign,
    _hp,
  } = result.data;
  const campaignLabel = [utm_source, utm_medium, utm_campaign].filter(Boolean).join(' / ');

  // Honeypot: filled means bot — silently succeed
  if (_hp) return NextResponse.json({ success: true });

  const ts = watTimestamp();
  console.log(`[distributor-application] received name="${fullName}" state="${state}" email=${hashEmail(email)}`);

  const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#1a1a2e;line-height:1.6;margin:0;padding:24px}
  table{border-collapse:collapse;width:100%;max-width:580px}
  td{padding:9px 14px;border-bottom:1px solid #e8edf0;vertical-align:top}
  .lbl{font-weight:600;color:#555;width:140px;white-space:nowrap}
  .val{color:#1a1a2e}
  .section{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888;
           background:#f5f7f9;padding:10px 14px 6px;font-weight:600}
  .msg{white-space:pre-wrap;font-family:inherit}
  h2{font-size:16px;margin:0 0 4px}
  .meta{font-size:12px;color:#888;margin:0 0 24px}
</style>
</head>
<body>
<h2>Distributor application — kayorawater.com</h2>
<p class="meta">Received: ${ts}</p>
<table>
  <tr><td class="section" colspan="2">Applicant</td></tr>
  ${htmlRow('Name', esc(fullName))}
  ${htmlRow('Email', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
  ${htmlRow('Phone', esc(phone))}
  ${htmlRow('WhatsApp', esc(whatsapp || '—'))}

  <tr><td class="section" colspan="2">Business</td></tr>
  ${htmlRow('Business Name', esc(businessName))}
  ${htmlRow('Business Type', esc(businessType))}
  ${htmlRow('Location', esc(`${city}, ${lga} LGA, ${state} State`))}

  <tr><td class="section" colspan="2">Distribution</td></tr>
  ${htmlRow('Est. Monthly Volume', esc(monthlyVolume))}
  ${htmlRow('Years in Business', esc(yearsInBusiness || '—'))}

  <tr><td class="section" colspan="2">Additional Info</td></tr>
  <tr><td colspan="2" class="val msg">${esc(anythingElse || '(none provided)')}</td></tr>
  ${campaignLabel ? `<tr><td class="section" colspan="2">Campaign</td></tr>${htmlRow('Source', esc(campaignLabel))}` : ''}
</table>
<p style="margin-top:24px;font-size:12px;color:#888">
  Reply-To is set to the applicant's address — reply directly from your email client.
</p>
</body></html>`;

  const textBody = `Distributor application — kayorawater.com
Received: ${ts}

APPLICANT
  Name:              ${fullName}
  Email:             ${email}
  Phone:             ${phone}
  WhatsApp:          ${whatsapp || '—'}

BUSINESS
  Business Name:     ${businessName}
  Business Type:     ${businessType}
  Location:          ${city}, ${lga} LGA, ${state} State

DISTRIBUTION
  Est. Monthly Vol:  ${monthlyVolume}
  Years in Business: ${yearsInBusiness || '—'}

ADDITIONAL INFO
${anythingElse || '(none provided)'}
${campaignLabel ? `\nCAMPAIGN: ${campaignLabel}\n` : ''}
---
Reply-To is set to the applicant's address.`;

  const { error: sendError } = await resend.emails.send({
    from: 'Kayora Water <noreply@kayorawater.com>',
    to: 'info@kaybibeverage.com',
    replyTo: email,
    subject: `[Kayora] Distributor application — ${fullName}, ${state}`,
    html: htmlBody,
    text: textBody,
  });

  if (sendError) {
    console.error(`[distributor-application] send failed email=${hashEmail(email)}`, sendError);
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
  }

  console.log(`[distributor-application] sent ok email=${hashEmail(email)}`);
  return NextResponse.json({ success: true });
}
