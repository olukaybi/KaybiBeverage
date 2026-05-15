import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const {
    fullName,
    businessName,
    businessType,
    city,
    lga,
    state,
    phone,
    whatsapp,
    email,
    monthlyVolume,
    yearsInBusiness,
    anythingElse,
  } = result.data;

  const teamBody = `
New distributor application — kayorawater.com
Received: ${watTimestamp()}

──────────────────────────────────────
APPLICANT
──────────────────────────────────────
Name:              ${fullName}
Email:             ${email}
Phone:             ${phone}
WhatsApp:          ${whatsapp || '—'}

──────────────────────────────────────
BUSINESS
──────────────────────────────────────
Business Name:     ${businessName}
Business Type:     ${businessType}
Location:          ${city}, ${lga} LGA, ${state} State

──────────────────────────────────────
DISTRIBUTION DETAILS
──────────────────────────────────────
Est. Monthly Vol:  ${monthlyVolume}
Years in Business: ${yearsInBusiness || '—'}

──────────────────────────────────────
ADDITIONAL INFO
──────────────────────────────────────
${anythingElse || '(none provided)'}

──────────────────────────────────────
Reply directly to: ${email}
`.trim();

  const confirmationBody = `
Dear ${fullName},

Thank you for applying to become a Kayora distributor. We have received your application for ${businessName} and our team will be in touch within one business day.

If you need to speak with us urgently, call:
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
        subject: `[Kayora] New distributor application — ${businessName}`,
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
    console.error('[distributor] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
