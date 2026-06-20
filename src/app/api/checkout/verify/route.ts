import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { createServiceClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { formatNaira } from '@/lib/products';
import { SHOP_ENABLED } from '@/lib/flags';


const VerifySchema = z.object({
  reference: z.string().min(1).max(200),
  order_id: z.string().uuid(),
});

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    customer: { email: string };
    metadata?: Record<string, unknown>;
  };
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (!SHOP_ENABLED) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRateLimit(`verify:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parse = VerifySchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Missing reference or order_id.' }, { status: 422 });
  }

  const { reference, order_id } = parse.data;

  // Verify with Paystack
  const paystackRes = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!paystackRes.ok) {
    return NextResponse.json({ error: 'Paystack verification failed.' }, { status: 502 });
  }

  const paystackData = (await paystackRes.json()) as PaystackVerifyResponse;

  if (!paystackData.status || paystackData.data?.status !== 'success') {
    return NextResponse.json({ error: 'Payment not completed.' }, { status: 402 });
  }

  const supabase = await createServiceClient();

  // Fetch order to validate amount and current status
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('id, order_number, status, total_naira, paystack_reference, customers(email, full_name)')
    .eq('id', order_id)
    .single();

  if (fetchError || !order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  }

  // Reference must match what we stored
  if (order.paystack_reference !== reference) {
    console.error('Reference mismatch', { stored: order.paystack_reference, received: reference });
    return NextResponse.json({ error: 'Reference mismatch.' }, { status: 409 });
  }

  // Amount must match (Paystack returns in kobo)
  const paidKobo = paystackData.data.amount;
  const expectedKobo = order.total_naira * 100;
  if (paidKobo < expectedKobo) {
    console.error('Amount mismatch', { paidKobo, expectedKobo });
    return NextResponse.json({ error: 'Payment amount does not match order total.' }, { status: 409 });
  }

  // If already confirmed (idempotent), return success
  if (order.status === 'confirmed') {
    return NextResponse.json({ order_number: order.order_number });
  }

  // Update order to confirmed
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'confirmed', paid_at: new Date().toISOString() })
    .eq('id', order_id);

  if (updateError) {
    console.error('Order update error:', updateError);
    return NextResponse.json({ error: 'Failed to update order status.' }, { status: 500 });
  }

  // Send confirmation email
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
          <p style="margin-top:24px">Questions? Call us on <a href="tel:+2349040789918">0904 078 9918</a> or reply to this email.</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0">
          <p style="font-size:12px;color:#888">Kaybi Beverage Industries Limited · 173 Eket Oron Road, Eket, Akwa Ibom</p>
        </div>
      `,
    });

    // Internal notification
    await resend.emails.send({
      from: 'Kayora Orders <noreply@kayorawater.com>',
      to: 'info@kaybibeverage.com',
      subject: `[PAID] Order ${order.order_number} — ${formatNaira(order.total_naira)}`,
      html: `
        <p>Payment confirmed for order <strong>${order.order_number}</strong>.</p>
        <p>Customer: ${customerName} (${customerEmail})</p>
        <p>Amount: ${formatNaira(order.total_naira)}</p>
        <p>Paystack reference: ${reference}</p>
      `,
    });
  }

  return NextResponse.json({ order_number: order.order_number });
}
