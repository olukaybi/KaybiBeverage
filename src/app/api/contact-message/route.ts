import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createHash } from 'crypto';
import { checkRateLimit } from '@/lib/ratelimit';

const schema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim(),
  phone: z.string().max(30).optional(),
  subject: z.enum([
    'Placing an order',
    'Distribution enquiry',
    'Bulk/event order',
    'Partnership or sponsorship',
    'Press or media',
    'Something else',
  ]),
  message: z.string().min(10).max(2000).trim(),
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

  const { fullName, email, phone, subject, message, _hp } = result.data;

  // Honeypot: filled means bot — silently succeed
  if (_hp) return NextResponse.json({ success: true });

  const ts = watTimestamp();
  console.log(`[contact-message] received subject="${subject}" email=${hashEmail(email)}`);

  const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;font-size:14px;color:#1a1a2e;line-height:1.6;margin:0;padding:24px}
  table{border-collapse:collapse;width:100%;max-width:580px}
  td{padding:9px 14px;border-bottom:1px solid #e8edf0;vertical-align:top}
  .lbl{font-weight:600;color:#555;width:110px;white-space:nowrap}
  .val{color:#1a1a2e}
  .section{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888;
           background:#f5f7f9;padding:10px 14px 6px;font-weight:600}
  .msg{white-space:pre-wrap;font-family:inherit}
  h2{font-size:16px;margin:0 0 4px}
  .meta{font-size:12px;color:#888;margin:0 0 24px}
</style>
</head>
<body>
<h2>Contact form submission — kayorawater.com</h2>
<p class="meta">Received: ${ts}</p>
<table>
  <tr><td class="section" colspan="2">Contact Details</td></tr>
  ${htmlRow('Name', esc(fullName))}
  ${htmlRow('Email', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
  ${htmlRow('Phone', esc(phone || '—'))}
  ${htmlRow('Subject', esc(subject))}
  <tr><td class="section" colspan="2">Message</td></tr>
  <tr><td colspan="2" class="val msg">${esc(message)}</td></tr>
</table>
<p style="margin-top:24px;font-size:12px;color:#888">
  Reply-To is set to the submitter's address — reply directly from your email client.
</p>
</body></html>`;

  const textBody = `Contact form submission — kayorawater.com
Received: ${ts}

NAME:    ${fullName}
EMAIL:   ${email}
PHONE:   ${phone || '—'}
SUBJECT: ${subject}

MESSAGE:
${message}

---
Reply-To is set to the submitter's address.`;

  const { error: sendError } = await resend.emails.send({
    from: 'Kayora Water <noreply@kayorawater.com>',
    to: 'info@kaybibeverage.com',
    replyTo: email,
    subject: `[Kayora] Contact form — ${subject}`,
    html: htmlBody,
    text: textBody,
  });

  if (sendError) {
    console.error(`[contact-message] send failed email=${hashEmail(email)}`, sendError);
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
  }

  console.log(`[contact-message] sent ok email=${hashEmail(email)}`);
  return NextResponse.json({ success: true });
}
