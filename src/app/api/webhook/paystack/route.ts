import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { createServiceClient } from '@/lib/supabase/server';
import { formatNaira } from '@/lib/products';
import { SHOP_ENABLED } from '@/lib/flags';


interface ChargeSuccessEvent {
  event: 'charge.success';
  data: {
    reference: string;
    amount: number;
    status: string;
    customer: { email: string };
  };
}

function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.PAYSTACK_SECRET_KEY ?? '';
  const hash = crypto.createHmac('sha512', secret).update(payload).digest('hex');
  return hash === signature;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (!SHOP_ENABLED) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const signature = req.headers.get('x-paystack-signature') ?? '';
  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  let event: ChargeSuccessEvent;
  try {
    event = JSON.parse(rawBody) as ChargeSuccessEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  if (event.event !== 'charge.success') {
    // Acknowledge non-handled events
    return NextResponse.json({ received: true });
  }

  const { reference, amount: paidKobo } = event.data;

  const supabase = createServiceClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, order_number, status, total_naira, customers(email, full_name)')
    .eq('paystack_reference', reference)
    .single();

  if (error || !order) {
    // Not our order or already processed — acknowledge anyway
    return NextResponse.json({ received: true });
  }

  if (order.status === 'confirmed') {
    return NextResponse.json({ received: true });
  }

  if (paidKobo < order.total_naira * 100) {
    console.error('Webhook amount mismatch', { paidKobo, expected: order.total_naira * 100 });
    return NextResponse.json({ received: true });
  }

  await supabase
    .from('orders')
    .update({ status: 'confirmed', paid_at: new Date().toISOString() })
    .eq('id', order.id);

  // Send confirmation email (backup path if verify endpoint missed it)
  const customer = Array.isArray(order.customers) ? order.customers[0] : order.customers;
  const customerEmail = customer?.email ?? '';
  const customerName = customer?.full_name ?? 'Customer';

  if (customerEmail) {
    await resend.emails.send({
      from: 'Kayora Water <noreply@kayorawater.com>',
      to: customerEmail,
      subject: `Payment confirmed — Order ${order.order_number}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h1 style="font-size:24px;margin-bottom:8px">Payment confirmed</h1>
          <p>Hi ${customerName},</p>
          <p>We've received your payment for <strong>Order ${order.order_number}</strong> — ${formatNaira(order.total_naira)}.</p>
          <p>Our team will be in touch shortly to confirm your delivery schedule.</p>
          <p style="margin-top:24px">Questions? Call us on <a href="tel:+2349040789918">0904 078 9918</a>.</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0">
          <p style="font-size:12px;color:#888">Kaybi Beverage Industries Limited · 173 Eket Oron Road, Eket, Akwa Ibom</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'Kayora Orders <noreply@kayorawater.com>',
      to: 'info@kaybibeverage.com',
      subject: `[PAID via webhook] Order ${order.order_number} — ${formatNaira(order.total_naira)}`,
      html: `
        <p>Payment confirmed (via webhook) for order <strong>${order.order_number}</strong>.</p>
        <p>Customer: ${customerName} (${customerEmail})</p>
        <p>Amount: ${formatNaira(order.total_naira)}</p>
        <p>Paystack reference: ${reference}</p>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
