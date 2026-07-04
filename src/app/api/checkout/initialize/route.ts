import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/ratelimit';
import { SHOP_ENABLED } from '@/lib/flags';

const OrderItemSchema = z.object({
  product_sku: z.string().min(1),
  product_name: z.string().min(1),
  quantity: z.number().int().positive(),
  unit_price_naira: z.number().int().positive(),
  line_total_naira: z.number().int().positive(),
});

const InitializeSchema = z.object({
  customer: z.object({
    full_name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(7).max(20),
  }),
  address: z.object({
    street_address: z.string().min(3).max(300),
    city: z.string().min(2).max(100),
    lga: z.string().max(100).optional(),
    delivery_zone: z.enum(['eket_city', 'uyo', 'wider_akwa_ibom']),
  }),
  delivery_zone: z.enum(['eket_city', 'uyo', 'wider_akwa_ibom']),
  delivery_fee_naira: z.number().int().nonnegative(),
  subtotal_naira: z.number().int().positive(),
  total_naira: z.number().int().positive(),
  customer_notes: z.string().max(1000).optional(),
  scheduled_delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  items: z.array(OrderItemSchema).min(1).max(20),
});

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

  if (data.subtotal_naira < 15000) {
    const refillOnly = data.items.every((item) => item.product_sku === '18.9L-refill');
    const error = refillOnly
      ? 'Refill orders under ₦15,000 are not available for home delivery. Bring your empty Kayora bottle to our Eket factory at 173 Eket Oron Road, or to any authorised dealer, for direct exchange. For delivery, your refill order must total ₦15,000 or more.'
      : 'Minimum order subtotal is ₦15,000.';
    return NextResponse.json({ error }, { status: 422 });
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
      delivery_zone: data.address.delivery_zone,
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
      delivery_zone: data.delivery_zone,
      status: 'pending_payment',
      subtotal_naira: data.subtotal_naira,
      delivery_fee_naira: data.delivery_fee_naira,
      total_naira: data.total_naira,
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
    data.items.map((item) => ({
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
      amount_kobo: data.total_naira * 100,
      email: data.customer.email.toLowerCase(),
      public_key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '',
    },
    { status: 201 }
  );
}
