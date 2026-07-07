'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart';
import { PRODUCTS, PRODUCT_IMAGES, formatNaira } from '@/lib/products';
import type { Product } from '@/lib/types';

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
      className="w-full inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 focus-visible:ring-offset-2 disabled:opacity-60"
    >
      {added
        ? 'Added!'
        : qty > 0
        ? `Add more (${qty} in cart)`
        : `Add to cart — min ${product.min_order_quantity}`}
    </button>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const imageSrc = PRODUCT_IMAGES[product.sku] ?? '';

  const unitLabel =
    product.unit_of_sale === 'case'
      ? `Case of ${product.bottles_per_unit}`
      : 'Bottle';

  return (
    <motion.div
      className="bg-white border border-kayora-mist rounded-2xl overflow-hidden flex flex-col"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="relative aspect-[4/5] bg-kayora-blue-100">
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
            RRP / {product.unit_of_sale}
          </span>
        </p>

        <p className="text-xs text-kayora-stone">
          Minimum order: {product.min_order_quantity}{' '}
          {product.unit_of_sale === 'case' ? 'cases' : 'bottles'}
          {' '}({product.min_order_quantity * product.bottles_per_unit} bottles)
        </p>

        <div className="mt-auto">
          {product.in_stock ? (
            <AddToCartButton product={product} />
          ) : (
            <button
              disabled
              className="w-full inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 bg-kayora-mist text-kayora-stone text-sm font-semibold rounded-lg cursor-not-allowed"
            >
              Out of stock
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopClient() {
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <main className="min-h-screen bg-kayora-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
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

        {/* Delivery info */}
        <div className="mt-16 bg-white border border-kayora-mist rounded-2xl p-8">
          <h2 className="font-display text-xl font-semibold text-kayora-ink mb-6">
            Delivery Information
          </h2>
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
      </div>
    </main>
  );
}
