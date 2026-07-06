import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/server';
import {
  sendCustomerPaidConfirmation,
  sendInternalOrderNotification,
} from '@/lib/email/order-notifications';
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

  if (order.status === 'paid') {
    return NextResponse.json({ received: true });
  }

  if (paidKobo < order.total_naira * 100) {
    console.error('Webhook amount mismatch', { paidKobo, expected: order.total_naira * 100 });
    return NextResponse.json({ received: true });
  }

  // 'paid' is the DB enum value — there is no 'confirmed'
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', order.id);

  if (updateError) {
    console.error('Webhook order update error:', updateError);
    // Non-2xx so Paystack retries the webhook
    return NextResponse.json({ error: 'Failed to update order.' }, { status: 500 });
  }

  // Send confirmation emails (backup path if verify endpoint missed it;
  // never throws)
  const customer = Array.isArray(order.customers) ? order.customers[0] : order.customers;
  const emailInfo = {
    orderNumber: order.order_number,
    totalNaira: order.total_naira,
    customerName: customer?.full_name ?? 'Customer',
    customerEmail: customer?.email ?? '',
    reference,
  };
  await sendCustomerPaidConfirmation(emailInfo);
  await sendInternalOrderNotification(emailInfo, 'paid-webhook');

  return NextResponse.json({ received: true });
}
