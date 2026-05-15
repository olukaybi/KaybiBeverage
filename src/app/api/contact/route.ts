import { NextRequest, NextResponse } from 'next/server';

// TODO: Integrate with Resend (https://resend.com) or similar email provider
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Log the submission
    console.log('[Contact Form] New submission:', {
      fullName,
      email,
      phone: phone || '(not provided)',
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email via Resend
    // await resend.emails.send({
    //   from: 'website@kayorawater.com',
    //   to: 'info@kaybibeverage.com',
    //   subject: `New contact: ${subject} from ${fullName}`,
    //   text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
