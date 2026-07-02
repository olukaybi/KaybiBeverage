'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { DELIVERY_ZONES, formatNaira, minDeliveryDate } from '@/lib/products';
import type { DeliveryZoneId } from '@/lib/types';

declare global {
  interface Window {
    PaystackPop: {
      setup(options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        onClose: () => void;
        callback: (response: { reference: string }) => void;
      }): { openIframe: () => void };
    };
  }
}

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zoneParam = (searchParams.get('zone') ?? 'eket_city') as DeliveryZoneId;

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [zone, setZone] = useState<DeliveryZoneId>(zoneParam);
  const deliveryFee = DELIVERY_ZONES.find((z) => z.id === zone)?.fee_naira ?? 500;
  const total = subtotal + deliveryFee;

  const minDate = minDeliveryDate().toISOString().split('T')[0];

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    street_address: '',
    city: '',
    lga: '',
    delivery_date: minDate,
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [payMode, setPayMode] = useState<'card' | 'cod' | null>(null);
  const [error, setError] = useState('');
  const paystackLoaded = useRef(false);
  const orderPlacedRef = useRef(false);

  // Redirect if cart is empty — but not after a successful order placement
  useEffect(() => {
    if (items.length === 0 && !orderPlacedRef.current) router.replace('/shop');
  }, [items, router]);

  // Load Paystack inline script once
  useEffect(() => {
    if (paystackLoaded.current) return;
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => { paystackLoaded.current = true; };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function buildOrderPayload() {
    return {
      customer: {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
      },
      address: {
        street_address: form.street_address,
        city: form.city,
        lga: form.lga,
        delivery_zone: zone,
      },
      delivery_zone: zone,
      delivery_fee_naira: deliveryFee,
      subtotal_naira: subtotal,
      total_naira: total,
      customer_notes: form.notes,
      scheduled_delivery_date: form.delivery_date,
      items: items.map((i) => ({
        product_sku: i.sku,
        product_name: i.display_name,
        quantity: i.quantity,
        unit_price_naira: i.price_naira,
        line_total_naira: i.price_naira * i.quantity,
      })),
    };
  }

  async function handlePayWithCard(e: React.MouseEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    setPayMode('card');

    let handler: { openIframe: () => void };
    try {
      const res = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildOrderPayload()),
      });

      const initData = await res.json();

      if (!res.ok) {
        setError(initData.error ?? 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      if (!window.PaystackPop) {
        setError('Payment provider failed to load. Please refresh and try again.');
        setSubmitting(false);
        return;
      }

      handler = window.PaystackPop.setup({
        key: initData.public_key,
        email: initData.email,
        amount: initData.amount_kobo,
        currency: 'NGN',
        ref: initData.reference,
        metadata: { order_number: initData.order_number },
        onClose: () => {
          setSubmitting(false);
          setPayMode(null);
        },
        callback: async (response) => {
          try {
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                reference: response.reference,
                order_id: initData.order_id,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setError(verifyData.error ?? 'Payment verification failed. Call us on 0904 078 9918.');
              setSubmitting(false);
              return;
            }
            orderPlacedRef.current = true;
            clearCart();
            router.push(`/order-confirmation/${verifyData.order_number}?paid=true`);
          } catch {
            setError('Network error during verification. Call us on 0904 078 9918.');
            setSubmitting(false);
          }
        },
      });
    } catch {
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
      return;
    }

    // openIframe is called outside the try block so a successful popup
    // opening never triggers the "Network error" catch above
    handler.openIframe();
  }

  async function handleCOD(e: React.MouseEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    setPayMode('cod');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildOrderPayload()),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      orderPlacedRef.current = true;
      clearCart();
      router.push(`/order-confirmation/${data.order_number}`);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/cart"
            className="text-sm font-medium text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors"
          >
            ← Back to cart
          </Link>
          <h1 className="font-display text-display-md text-kayora-ink mt-4 mb-2">Checkout</h1>
          <p className="text-kayora-graphite text-sm">
            Fill in your details, then choose to pay by card or arrange payment on delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Form fields */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact */}
            <section className="bg-white border border-kayora-mist rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-kayora-ink mb-5">Contact details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="full_name">
                    Full name *
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                    placeholder="e.g. Uduak Essien"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="email">
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="phone">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                    placeholder="080 000 0000"
                  />
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="bg-white border border-kayora-mist rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-kayora-ink mb-5">Delivery details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="street_address">
                    Street address *
                  </label>
                  <input
                    id="street_address"
                    name="street_address"
                    type="text"
                    required
                    value={form.street_address}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                    placeholder="House no. / street name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="city">
                    City / Town *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                    placeholder="e.g. Eket"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="lga">
                    LGA
                  </label>
                  <input
                    id="lga"
                    name="lga"
                    type="text"
                    value={form.lga}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                    placeholder="e.g. Eket LGA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="zone-checkout">
                    Delivery area *
                  </label>
                  <select
                    id="zone-checkout"
                    name="zone"
                    value={zone}
                    onChange={(e) => setZone(e.target.value as DeliveryZoneId)}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink bg-white focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                  >
                    {DELIVERY_ZONES.filter((z) => z.active).map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.display_name} — {formatNaira(z.fee_naira)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="delivery_date">
                    Preferred delivery date *
                  </label>
                  <input
                    id="delivery_date"
                    name="delivery_date"
                    type="date"
                    required
                    min={minDate}
                    value={form.delivery_date}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink bg-white focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-kayora-graphite mb-1.5" htmlFor="notes">
                    Delivery notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink placeholder-kayora-stone focus:outline-none focus:ring-2 focus:ring-kayora-blue-500 resize-none"
                    placeholder="Any landmark, gate instructions, or special requests"
                  />
                </div>
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Right: Summary + payment */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-kayora-mist rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-lg font-semibold text-kayora-ink mb-5">Order summary</h2>

              <div className="space-y-2 mb-5">
                {items.map((item) => (
                  <div key={item.sku} className="flex justify-between text-sm">
                    <span className="text-kayora-graphite">
                      {item.display_name} × {item.quantity}
                    </span>
                    <span className="font-medium text-kayora-ink">
                      {formatNaira(item.price_naira * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-kayora-mist pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-kayora-graphite">Subtotal</span>
                  <span className="font-medium">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kayora-graphite">Delivery</span>
                  <span className="font-medium">{formatNaira(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-kayora-mist">
                  <span>Total</span>
                  <span>{formatNaira(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {/* Primary: Pay by card — plain button, no <form>, so no
                    native submit/navigation can race the fetch flow */}
                <div>
                  <button
                    type="button"
                    onClick={handlePayWithCard}
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center min-h-[48px] px-5 py-3 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {submitting && payMode === 'card' ? 'Opening payment…' : 'Pay with card'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-kayora-stone text-xs">
                  <hr className="flex-1 border-kayora-mist" />
                  <span>or</span>
                  <hr className="flex-1 border-kayora-mist" />
                </div>

                {/* Secondary: COD / bank transfer — plain button, no <form> */}
                <div>
                  <button
                    type="button"
                    onClick={handleCOD}
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 border border-kayora-blue-900 text-kayora-blue-900 text-sm font-semibold rounded-lg hover:bg-kayora-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 disabled:opacity-60"
                  >
                    {submitting && payMode === 'cod' ? 'Placing order…' : 'Place order — pay later'}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs text-kayora-stone text-center leading-relaxed">
                Card payments are processed securely via Paystack. &ldquo;Pay later&rdquo; orders are confirmed by our team via call or WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}
