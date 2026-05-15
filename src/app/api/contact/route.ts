import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';

const resend = new Resend(process.env.RESEND_API_KEY);

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
});

function watTimestamp(): string {
  return (
    new Date().toLocaleString('en-NG', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'full',
      timeStyle: 'short',
    }) + ' WAT'
  );
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
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

  const { fullName, email, phone, subject, message } = result.data;

  const teamBody = `
New contact message — kayorawater.com
Received: ${watTimestamp()}

──────────────────────────────────────
CONTACT DETAILS
──────────────────────────────────────
Name:     ${fullName}
Email:    ${email}
Phone:    ${phone || '—'}
Subject:  ${subject}

──────────────────────────────────────
MESSAGE
──────────────────────────────────────
${message}

──────────────────────────────────────
Reply directly to: ${email}
`.trim();

  const confirmationBody = `
Dear ${fullName},

Thank you for contacting Kayora. We have received your message and our team will respond within one business day.

For urgent orders, call us directly:
0904 078 9918  (Monday – Saturday, 8:00am – 6:00pm WAT)

Or email: info@kaybibeverage.com

—
Kayora Premium Purified Water
173 Eket-Oron Road, Eket, Akwa Ibom State, Nigeria
kayorawater.com

Purified to the Highest Standard. Safe for Every Table.
`.trim();

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Kayora Website <noreply@kayorawater.com>',
        to: 'info@kaybibeverage.com',
        replyTo: email,
        subject: `[Kayora] New contact message — ${subject}`,
        text: teamBody,
      }),
      resend.emails.send({
        from: 'Kayora <noreply@kayorawater.com>',
        to: email,
        subject: 'We received your message — Kayora',
        text: confirmationBody,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
