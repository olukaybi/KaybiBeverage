import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/ratelimit';
import {
  sendCustomerPaidConfirmation,
  sendInternalOrderNotification,
} from '@/lib/email/order-notifications';
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

  const supabase = createServiceClient();

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

  // If already paid (idempotent), return success
  if (order.status === 'paid') {
    return NextResponse.json({ order_number: order.order_number });
  }

  // Update order to paid ('paid' is the DB enum value — there is no 'confirmed')
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', order_id);

  if (updateError) {
    console.error('Order update error:', updateError);
    return NextResponse.json({ error: 'Failed to update order status.' }, { status: 500 });
  }

  // Send confirmation emails (never throws — a Resend failure must not
  // report a successful payment as failed)
  const customer = Array.isArray(order.customers) ? order.customers[0] : order.customers;
  const emailInfo = {
    orderNumber: order.order_number,
    totalNaira: order.total_naira,
    customerName: customer?.full_name ?? 'Customer',
    customerEmail: customer?.email ?? '',
    reference,
  };
  await sendCustomerPaidConfirmation(emailInfo);
  await sendInternalOrderNotification(emailInfo, 'paid');

  return NextResponse.json({ order_number: order.order_number });
}
