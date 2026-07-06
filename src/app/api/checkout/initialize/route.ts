import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { priceOrder, checkMinimumOrder, isPricingRejection } from '@/lib/pricing';
import { SHOP_ENABLED } from '@/lib/flags';

// Strict schemas: the client sends SKUs, quantities and a zone id only.
// Any client-supplied price field (unit_price, subtotal, total, fee, …)
// is an unrecognized key and rejects the request outright — all amounts
// are recomputed server-side from the canonical catalogue.
const OrderItemSchema = z
  .object({
    product_sku: z.string().min(1).max(50),
    quantity: z.number().int().positive().max(1000),
  })
  .strict();

const InitializeSchema = z
  .object({
    customer: z
      .object({
        full_name: z.string().min(2).max(100),
        email: z.string().email(),
        phone: z.string().min(7).max(20),
      })
      .strict(),
    address: z
      .object({
        street_address: z.string().min(3).max(300),
        city: z.string().min(2).max(100),
        lga: z.string().max(100).optional(),
      })
      .strict(),
    delivery_zone: z.string().min(1).max(50),
    customer_notes: z.string().max(1000).optional(),
    scheduled_delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    items: z.array(OrderItemSchema).min(1).max(20),
  })
  .strict();

export async function POST(req: NextRequest) {
  if (!SHOP_ENABLED) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRateLimit(`checkout:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parse = InitializeSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid order data.', details: parse.error.flatten() }, { status: 422 });
  }

  const data = parse.data;

  // Recompute every amount server-side from the canonical catalogue
  const priced = priceOrder(data.items, data.delivery_zone);
  if (isPricingRejection(priced)) {
    return NextResponse.json({ error: priced.error }, { status: priced.status });
  }

  const minOrder = checkMinimumOrder(priced);
  if (minOrder) {
    return NextResponse.json({ error: minOrder.error }, { status: minOrder.status });
  }

  const supabase = createServiceClient();

  // Upsert customer
  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .upsert(
      {
        email: data.customer.email.toLowerCase(),
        full_name: data.customer.full_name,
        phone: data.customer.phone,
      },
      { onConflict: 'email', ignoreDuplicates: false }
    )
    .select('id')
    .single();

  if (customerError || !customerData) {
    console.error('Customer upsert error:', customerError);
    return NextResponse.json({ error: 'Failed to save customer details.' }, { status: 500 });
  }

  // Insert address
  const { data: addressData, error: addressError } = await supabase
    .from('addresses')
    .insert({
      customer_id: customerData.id,
      street_address: data.address.street_address,
      city: data.address.city,
      lga: data.address.lga ?? null,
      delivery_zone: priced.zone.id,
    })
    .select('id')
    .single();

  if (addressError || !addressData) {
    console.error('Address insert error:', addressError);
    return NextResponse.json({ error: 'Failed to save delivery address.' }, { status: 500 });
  }

  // Insert order with pending_payment status
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customerData.id,
      address_id: addressData.id,
      delivery_zone: priced.zone.id,
      status: 'pending_payment',
      subtotal_naira: priced.subtotal_naira,
      delivery_fee_naira: priced.delivery_fee_naira,
      total_naira: priced.total_naira,
      customer_notes: data.customer_notes ?? null,
      scheduled_delivery_date: data.scheduled_delivery_date ?? null,
    })
    .select('id, order_number')
    .single();

  if (orderError || !orderData) {
    console.error('Order insert error:', orderError);
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 });
  }

  // Insert order items
  const { error: itemsError } = await supabase.from('order_items').insert(
    priced.items.map((item) => ({
      order_id: orderData.id,
      product_sku: item.product_sku,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price_naira: item.unit_price_naira,
      line_total_naira: item.line_total_naira,
    }))
  );

  if (itemsError) {
    console.error('Order items insert error:', itemsError);
  }

  // Generate a stable reference tied to the order.
  // order_number already carries the KAY- prefix, so use it as-is.
  const reference = `${orderData.order_number}-${Date.now()}`;

  // Store the reference in the order row for webhook reconciliation
  await supabase
    .from('orders')
    .update({ paystack_reference: reference })
    .eq('id', orderData.id);

  return NextResponse.json(
    {
      order_id: orderData.id,
      order_number: orderData.order_number,
      reference,
      // Server-computed total — Paystack charges what we computed,
      // never what the client sent
      amount_kobo: priced.total_naira * 100,
      email: data.customer.email.toLowerCase(),
      public_key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '',
    },
    { status: 201 }
  );
}
