import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createHash } from 'crypto';
import { checkRateLimit } from '@/lib/ratelimit';

const EVENT_TYPES = [
  'Wedding',
  'Corporate event',
  'Naming ceremony',
  'Conference',
  'Hotel / restaurant supply',
  'Other',
] as const;

// type distinguishes the generic contact form from the bulk/event quote
// form added on /contact (Sprint CRO Change 13) — both post here so
// submissions keep landing in one inbox, just tagged differently.
const schema = z
  .object({
    type: z.enum(['general', 'bulk_quote']).optional().default('general'),
    fullName: z.string().min(2).max(100).trim(),
    email: z.string().email().max(200).trim().optional(),
    phone: z.string().max(30).optional(),
    subject: z
      .enum([
        'Placing an order',
        'Distribution enquiry',
        'Bulk/event order',
        'Partnership or sponsorship',
        'Press or media',
        'Something else',
      ])
      .optional(),
    message: z.string().max(2000).trim().optional(),
    eventType: z.enum(EVENT_TYPES).optional(),
    guestCount: z.coerce.number().int().positive().max(100000).optional(),
    deliveryDate: z.string().max(20).optional(),
    location: z.string().max(200).trim().optional(),
    notes: z.string().max(2000).trim().optional(),
    _hp: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'bulk_quote') {
      if (!data.phone || data.phone.trim().length < 7) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['phone'], message: 'Phone / WhatsApp number is required.' });
      }
      if (!data.eventType) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['eventType'], message: 'Please select an event or order type.' });
      }
      if (!data.location || data.location.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['location'], message: 'Delivery area is required.' });
      }
    } else {
      if (!data.email) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['email'], message: 'Please enter a valid email address.' });
      }
      if (!data.subject) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['subject'], message: 'Please select a subject.' });
      }
      if (!data.message || data.message.trim().length < 10) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['message'], message: 'Please write at least 10 characters.' });
      }
    }
  });

function hashContact(value: string): string {
  return createHash('sha256').update(value.toLowerCase().trim()).digest('hex').slice(0, 12);
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

const EMAIL_STYLE = `
  body{font-family:Arial,sans-serif;font-size:14px;color:#1a1a2e;line-height:1.6;margin:0;padding:24px}
  table{border-collapse:collapse;width:100%;max-width:580px}
  td{padding:9px 14px;border-bottom:1px solid #e8edf0;vertical-align:top}
  .lbl{font-weight:600;color:#555;width:130px;white-space:nowrap}
  .val{color:#1a1a2e}
  .section{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888;
           background:#f5f7f9;padding:10px 14px 6px;font-weight:600}
  .msg{white-space:pre-wrap;font-family:inherit}
  h2{font-size:16px;margin:0 0 4px}
  .meta{font-size:12px;color:#888;margin:0 0 24px}
`;

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

  const data = result.data;

  // Honeypot: filled means bot — silently succeed
  if (data._hp) return NextResponse.json({ success: true });

  const ts = watTimestamp();
  const contactKey = data.email ?? data.phone ?? data.fullName;

  if (data.type === 'bulk_quote') {
    console.log(`[contact-message] received type=bulk_quote eventType="${data.eventType}" phone=${hashContact(data.phone!)}`);

    const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${EMAIL_STYLE}</style></head>
<body>
<h2>Bulk / event quote request — kayorawater.com</h2>
<p class="meta">Received: ${ts}</p>
<table>
  <tr><td class="section" colspan="2">Contact Details</td></tr>
  ${htmlRow('Name', esc(data.fullName))}
  ${htmlRow('Phone / WhatsApp', `<a href="tel:${esc(data.phone!)}">${esc(data.phone!)}</a>`)}
  ${data.email ? htmlRow('Email', `<a href="mailto:${esc(data.email)}">${esc(data.email)}</a>`) : ''}
  <tr><td class="section" colspan="2">Event / Order Details</td></tr>
  ${htmlRow('Type', esc(data.eventType!))}
  ${htmlRow('Guests / people served', data.guestCount ? String(data.guestCount) : '—')}
  ${htmlRow('Preferred delivery date', esc(data.deliveryDate || '—'))}
  ${htmlRow('Delivery area', esc(data.location!))}
  ${data.notes ? `<tr><td class="section" colspan="2">Additional Notes</td></tr><tr><td colspan="2" class="val msg">${esc(data.notes)}</td></tr>` : ''}
</table>
</body></html>`;

    const textBody = `Bulk / event quote request — kayorawater.com
Received: ${ts}

NAME:     ${data.fullName}
PHONE:    ${data.phone}
EMAIL:    ${data.email || '—'}

TYPE:     ${data.eventType}
GUESTS:   ${data.guestCount ?? '—'}
DATE:     ${data.deliveryDate || '—'}
AREA:     ${data.location}

NOTES:
${data.notes || '—'}`;

    const { error: sendError } = await resend.emails.send({
      from: 'Kayora Water <noreply@kayorawater.com>',
      to: 'info@kaybibeverage.com',
      ...(data.email ? { replyTo: data.email } : {}),
      subject: `[Kayora] Bulk/event quote — ${data.eventType}`,
      html: htmlBody,
      text: textBody,
    });

    if (sendError) {
      console.error(`[contact-message] bulk_quote send failed phone=${hashContact(data.phone!)}`, sendError);
      return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
    }

    console.log(`[contact-message] bulk_quote sent ok phone=${hashContact(data.phone!)}`);
    return NextResponse.json({ success: true });
  }

  console.log(`[contact-message] received subject="${data.subject}" email=${hashContact(contactKey)}`);

  const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${EMAIL_STYLE}</style></head>
<body>
<h2>Contact form submission — kayorawater.com</h2>
<p class="meta">Received: ${ts}</p>
<table>
  <tr><td class="section" colspan="2">Contact Details</td></tr>
  ${htmlRow('Name', esc(data.fullName))}
  ${htmlRow('Email', `<a href="mailto:${esc(data.email!)}">${esc(data.email!)}</a>`)}
  ${htmlRow('Phone', esc(data.phone || '—'))}
  ${htmlRow('Subject', esc(data.subject!))}
  <tr><td class="section" colspan="2">Message</td></tr>
  <tr><td colspan="2" class="val msg">${esc(data.message!)}</td></tr>
</table>
<p style="margin-top:24px;font-size:12px;color:#888">
  Reply-To is set to the submitter's address — reply directly from your email client.
</p>
</body></html>`;

  const textBody = `Contact form submission — kayorawater.com
Received: ${ts}

NAME:    ${data.fullName}
EMAIL:   ${data.email}
PHONE:   ${data.phone || '—'}
SUBJECT: ${data.subject}

MESSAGE:
${data.message}

---
Reply-To is set to the submitter's address.`;

  const { error: sendError } = await resend.emails.send({
    from: 'Kayora Water <noreply@kayorawater.com>',
    to: 'info@kaybibeverage.com',
    replyTo: data.email!,
    subject: `[Kayora] Contact form — ${data.subject}`,
    html: htmlBody,
    text: textBody,
  });

  if (sendError) {
    console.error(`[contact-message] send failed email=${hashContact(contactKey)}`, sendError);
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
  }

  console.log(`[contact-message] sent ok email=${hashContact(contactKey)}`);
  return NextResponse.json({ success: true });
}
