'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { PRODUCTS, PRODUCT_IMAGES, formatNaira } from '@/lib/products';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { Product } from '@/lib/types';

// Per-SKU WhatsApp order message names — not derived from display_name +
// nickname because the refill SKU's naming breaks that pattern ("Kayora
// 18.9L Refill", not "Kayora 18.9L Refill Never Finish Refill").
const WHATSAPP_SKU_NAME: Record<string, string> = {
  '30cl': 'Kayora 30cl Sharp-sharp',
  '50cl': 'Kayora 50cl Original',
  '75cl': 'Kayora 75cl Jara',
  '18.9L': 'Kayora 18.9L Never Finish',
  '18.9L-refill': 'Kayora 18.9L Refill',
};

function unitWord(unit: Product['unit_of_sale'], qty: number): string {
  const plural = qty !== 1;
  if (unit === 'case') return plural ? 'cases' : 'case';
  if (unit === 'refill') return plural ? 'refills' : 'refill';
  return plural ? 'bottles' : 'bottle';
}

function WhatsAppButton({ product }: { product: Product }) {
  const name = WHATSAPP_SKU_NAME[product.sku] ?? `Kayora ${product.display_name}`;
  // name already carries the "Kayora ..." prefix (see WHATSAPP_SKU_NAME) —
  // the spec's template sentence + SKU_NAME would otherwise read
  // "...order Kayora Kayora 30cl Sharp-sharp".
  const href = buildWhatsAppLink(`Hi, I would like to order ${name}`);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 border-2 border-[#25D366] text-[#128C7E] text-sm font-semibold rounded-lg hover:bg-[#25D366]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
    >
      <svg className="w-4 h-4 shrink-0" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Order via WhatsApp
    </a>
  );
}

function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.sku === product.sku);
  const qty = inCart ? inCart.quantity : 0;

  function handleAdd() {
    addItem(
      {
        sku: product.sku,
        display_name: product.display_name,
        nickname: product.nickname,
        unit_of_sale: product.unit_of_sale,
        bottles_per_unit: product.bottles_per_unit,
        price_naira: product.price_naira,
        min_order_quantity: product.min_order_quantity,
        image_src: PRODUCT_IMAGES[product.sku] ?? '',
      },
      product.min_order_quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2 disabled:opacity-60"
    >
      {added
        ? 'Added!'
        : qty > 0
        ? `Add more (${qty} in cart)`
        : 'Add to Cart'}
    </button>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imageSrc = PRODUCT_IMAGES[product.sku] ?? '';

  const unitLabel =
    product.unit_of_sale === 'case'
      ? `Case of ${product.bottles_per_unit}`
      : 'Bottle';

  const totalFrom = product.price_naira * product.min_order_quantity;

  return (
    <Reveal
      className="bg-white border border-kayora-mist rounded-2xl overflow-hidden flex flex-col"
      delaySeconds={index * 0.08}
      margin="-40px"
    >
      <div id={product.sku} className="relative aspect-[4/5] bg-kayora-blue-100 scroll-mt-24">
        <Image
          src={imageSrc}
          alt={`Kayora ${product.display_name} — ${product.nickname}`}
          fill
          className="object-contain p-6"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-kayora-stone bg-white/90 px-3 py-1 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans text-xs mb-1">
            {unitLabel}
          </p>
          <h2 className="font-display text-2xl font-semibold text-kayora-ink leading-tight">
            {product.display_name}
          </h2>
          <p className="text-kayora-clay-500 font-sans text-sm italic mt-0.5">
            {product.nickname}
          </p>
        </div>

        <p className="font-display text-3xl font-bold text-kayora-ink">
          {formatNaira(product.price_naira)}
          <span className="font-sans text-base font-normal text-kayora-stone ml-1">
            / {product.unit_of_sale}
          </span>
        </p>

        <p className="text-xs text-kayora-stone">
          Minimum {product.min_order_quantity} {unitWord(product.unit_of_sale, product.min_order_quantity)}
          {' · Total from '}
          <span className="font-semibold text-kayora-graphite">{formatNaira(totalFrom)}</span>
        </p>

        {product.sku === '18.9L' && (
          <p className="text-xs text-kayora-stone leading-relaxed">
            Price includes the reusable polycarbonate bottle. Subsequent refills are ₦1,000 per bottle.
          </p>
        )}
        {product.sku === '18.9L-refill' && (
          <p className="text-xs text-kayora-stone leading-relaxed">
            For customers who already own a Kayora dispenser bottle.
          </p>
        )}

        <div className="mt-auto space-y-2 pt-1">
          {product.in_stock ? (
            <>
              <WhatsAppButton product={product} />
              <AddToCartButton product={product} />
            </>
          ) : (
            <button
              disabled
              className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-kayora-mist text-kayora-stone text-sm font-semibold rounded-lg cursor-not-allowed"
            >
              Out of stock
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ShopClient() {
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-eyebrow uppercase tracking-widest text-kayora-gold-500 font-sans mb-3">
            Order Online
          </p>
          <h1 className="font-display text-display-lg text-kayora-ink mb-4">
            Shop Kayora Water
          </h1>
          <p className="text-kayora-graphite max-w-2xl leading-relaxed">
            Fresh from our Eket facility. Delivered to your door across Akwa Ibom State.
            All products are NAFDAC Registered (A1-111026) and SON MANCAP Certified.
          </p>
        </div>

        {/* Delivery info — moved above the product grid so the minimum-order
            question is answered before shoppers hit it on a product card */}
        <div className="mb-12 bg-white border border-kayora-mist rounded-2xl p-8">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-3">
            We Deliver Across Akwa Ibom State
          </h2>
          <p className="text-sm text-kayora-graphite leading-relaxed mb-6 max-w-[70ch]">
            Kayora delivers direct from our Eket facility. Because we operate our own delivery fleet, all orders are subject to a minimum order quantity — this keeps your delivery cost low and guarantees freshness. Prefer to pick up or order from a distributor near you?{' '}
            <Link href="/distribution" className="text-kayora-blue-700 hover:underline font-medium">
              See distribution network →
            </Link>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { zone: 'Eket City', fee: '₦500', note: '1–2 business days' },
              { zone: 'Uyo', fee: '₦2,000', note: '2–3 business days' },
              { zone: 'Wider Akwa Ibom', fee: '₦3,500', note: 'Oron, Ikot Ekpene, Abak, Itu & more · 2–4 days' },
            ].map((z) => (
              <div key={z.zone} className="flex flex-col gap-1">
                <p className="font-semibold text-kayora-ink">{z.zone}</p>
                <p className="text-2xl font-display text-kayora-blue-900">{z.fee}</p>
                <p className="text-sm text-kayora-stone">{z.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-kayora-stone">
            Need delivery outside these zones or a large bulk order?{' '}
            <Link href="/contact" className="text-kayora-blue-700 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* Sticky cart summary bar */}
        {itemCount > 0 && (
          <div className="sticky top-20 z-30 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-kayora-blue-900 text-kayora-cream rounded-xl px-5 py-3.5 flex items-center justify-between shadow-lg">
              <span className="text-sm font-medium">
                {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
              </span>
              <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 text-sm font-semibold bg-kayora-gold-500 text-white px-4 py-2 rounded-lg hover:bg-kayora-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Review cart &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.filter((p) => p.active).map((product, i) => (
            <ProductCard key={product.sku} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
