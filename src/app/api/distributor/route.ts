import { NextRequest, NextResponse } from 'next/server';

// TODO: Integrate with Resend (https://resend.com) or similar email provider
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, businessName, businessType, city, lga, state, phone, email, monthlyVolume } = body;

    if (!fullName || !businessName || !businessType || !phone || !email || !monthlyVolume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Log the application
    console.log('[Distributor Application] New submission:', {
      fullName,
      businessName,
      businessType,
      location: { city, lga, state },
      phone,
      whatsapp: body.whatsapp || '(same as phone)',
      email,
      monthlyVolume,
      yearsInBusiness: body.yearsInBusiness || '(not provided)',
      anythingElse: body.anythingElse || '(none)',
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email via Resend
    // await resend.emails.send({
    //   from: 'website@kayorawater.com',
    //   to: 'info@kaybibeverage.com',
    //   subject: `New distributor application: ${businessName} (${businessType})`,
    //   text: `Name: ${fullName}\nBusiness: ${businessName}\nType: ${businessType}\nLocation: ${city}, ${lga}, ${state}\nPhone: ${phone}\nEmail: ${email}\nMonthly Volume: ${monthlyVolume}`,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
