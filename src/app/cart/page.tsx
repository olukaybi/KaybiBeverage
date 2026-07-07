'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatNaira, DELIVERY_ZONES } from '@/lib/products';
import { useState } from 'react';
import type { DeliveryZoneId } from '@/lib/types';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  const [zone, setZone] = useState<DeliveryZoneId>('eket_city');
  const deliveryFee = DELIVERY_ZONES.find((z) => z.id === zone)?.fee_naira ?? 500;
  const total = subtotal + deliveryFee;

  // Minimum order: ₦15,000 subtotal (to ensure minimum for dispatch)
  const MIN_SUBTOTAL = 15000;
  const belowMin = subtotal < MIN_SUBTOTAL && items.length > 0;
  const isRefillOnly = items.length > 0 && items.every((i) => i.sku === '18.9L-refill');

  // Per-SKU minimum (e.g. 10 cases for 30cl/50cl/75cl). Blocks checkout, not just a warning.
  const belowAnyItemMin = items.some((i) => i.quantity < i.min_order_quantity);
  const checkoutBlocked = belowMin || belowAnyItemMin;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-6xl text-kayora-mist mb-6">🛒</p>
          <h1 className="font-display text-display-md text-kayora-ink mb-4">Your cart is empty</h1>
          <p className="text-kayora-graphite mb-8">
            Browse our products and add some Kayora water to your order.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors"
          >
            Browse shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-display-md text-kayora-ink mb-10">Your cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const belowItemMin = item.quantity < item.min_order_quantity;
              return (
                <div
                  key={item.sku}
                  className="bg-white border border-kayora-mist rounded-xl p-5 flex gap-4"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-kayora-blue-100">
                    <Image
                      src={item.image_src}
                      alt={item.display_name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-kayora-ink">{item.display_name}</p>
                        <p className="text-sm text-kayora-stone italic">{item.nickname}</p>
                        <p className="text-xs text-kayora-stone mt-0.5">
                          {item.unit_of_sale === 'case'
                            ? `Case of ${item.bottles_per_unit}`
                            : item.unit_of_sale === 'refill'
                            ? 'Refill service — bring your empty Kayora bottle'
                            : 'Bottle'}{' '}
                          · {formatNaira(item.price_naira)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.sku)}
                        className="text-kayora-stone hover:text-red-600 transition-colors text-xs font-medium mt-0.5 flex-shrink-0"
                        aria-label={`Remove ${item.display_name} from cart`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-kayora-mist rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                          className="px-3 py-2 text-kayora-graphite hover:bg-kayora-blue-100 transition-colors text-lg leading-none"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 font-semibold text-kayora-ink min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                          className="px-3 py-2 text-kayora-graphite hover:bg-kayora-blue-100 transition-colors text-lg leading-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold text-kayora-ink">
                        {formatNaira(item.price_naira * item.quantity)}
                      </span>
                    </div>

                    {belowItemMin && (
                      <p className="text-xs text-amber-700 mt-2">
                        Minimum {item.min_order_quantity} {item.unit_of_sale === 'case' ? 'cases' : item.unit_of_sale === 'refill' ? 'refills' : 'bottles'} for this product
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/shop"
                className="text-sm font-medium text-kayora-blue-700 hover:text-kayora-blue-900 transition-colors"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-kayora-mist rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-xl font-semibold text-kayora-ink mb-5">
                Order summary
              </h2>

              {/* Delivery zone selector */}
              <div className="mb-5">
                <label htmlFor="zone" className="block text-sm font-medium text-kayora-graphite mb-2">
                  Delivery area
                </label>
                <select
                  id="zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value as DeliveryZoneId)}
                  className="w-full border border-kayora-mist rounded-lg px-3 py-2.5 text-sm text-kayora-ink bg-white focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
                >
                  {DELIVERY_ZONES.filter((z) => z.active).map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.display_name} — {formatNaira(z.fee_naira)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-kayora-graphite">Subtotal</span>
                  <span className="font-medium text-kayora-ink">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kayora-graphite">Delivery</span>
                  <span className="font-medium text-kayora-ink">{formatNaira(deliveryFee)}</span>
                </div>
                <div className="border-t border-kayora-mist pt-3 flex justify-between text-base font-semibold">
                  <span className="text-kayora-ink">Total</span>
                  <span className="text-kayora-ink">{formatNaira(total)}</span>
                </div>
              </div>

              {belowMin && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  {isRefillOnly ? (
                    <p className="text-xs text-amber-800">
                      Refill orders under {formatNaira(MIN_SUBTOTAL)} are not available for home delivery. Bring your empty Kayora bottle to our Eket factory at 173 Eket Oron Road, or to any authorised dealer, for direct exchange. For delivery, your refill order must total {formatNaira(MIN_SUBTOTAL)} or more.
                    </p>
                  ) : (
                    <p className="text-xs text-amber-800">
                      Minimum order is {formatNaira(MIN_SUBTOTAL)}. Add{' '}
                      {formatNaira(MIN_SUBTOTAL - subtotal)} more to continue.
                    </p>
                  )}
                </div>
              )}

              {belowAnyItemMin && !belowMin && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    One or more items are below the minimum order quantity. Adjust the highlighted quantities above to continue.
                  </p>
                </div>
              )}

              <Link
                href={`/checkout?zone=${zone}`}
                className={`mt-5 flex items-center justify-center min-h-[48px] w-full px-5 py-3 text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2 ${
                  checkoutBlocked
                    ? 'bg-kayora-mist text-kayora-stone cursor-not-allowed pointer-events-none'
                    : 'bg-kayora-blue-900 text-kayora-cream hover:bg-kayora-blue-700'
                }`}
                aria-disabled={checkoutBlocked}
                tabIndex={checkoutBlocked ? -1 : 0}
              >
                Proceed to checkout →
              </Link>

              <p className="mt-4 text-xs text-kayora-stone text-center">
                NAFDAC A1-111026 · SON MANCAP Certified
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
