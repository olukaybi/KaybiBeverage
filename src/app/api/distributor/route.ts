import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, businessName, phone, location, partnerType } = body;

    if (!fullName || !businessName || !phone || !location || !partnerType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('Distributor application:', body);

    // TODO: integrate with email provider or CRM
    // await sendEmail({ to: 'info@kaybibeverage.com', subject: `New distributor application: ${businessName}`, ... })

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
