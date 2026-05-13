import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Log the submission (replace with email/CRM integration as needed)
    console.log('Contact form submission:', { name, phone, email, subject, message });

    // TODO: integrate with email provider (e.g. Resend, Nodemailer, or Formspree)
    // await sendEmail({ to: 'info@kaybibeverage.com', subject: `New ${subject} from ${name}`, body: ... })

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
