'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { PRODUCTS, PRODUCT_IMAGES, formatNaira } from '@/lib/products';
import { track, type EventParams } from '@/lib/analytics';

function unitLabel(unitOfSale: string, plural: boolean): string {
  if (unitOfSale === 'case') return plural ? 'cases' : 'case';
  return plural ? 'bottles' : 'bottle';
}

interface AddMinToCartButtonProps {
  sku: string;
  event?: string;
  eventParams?: EventParams;
  className?: string;
}

/**
 * Adds a product's minimum order quantity to the cart and takes the
 * customer straight to /cart, replacing a plain "Order Kayora" link that
 * went to the cart without putting anything in it.
 */
export default function AddMinToCartButton({ sku, event, eventParams, className }: AddMinToCartButtonProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const product = PRODUCTS.find((p) => p.sku === sku);

  if (!product) return null;

  const total = product.price_naira * product.min_order_quantity;

  function handleClick() {
    if (event) track(event, eventParams);
    addItem(
      {
        sku: product!.sku,
        display_name: product!.display_name,
        nickname: product!.nickname,
        unit_of_sale: product!.unit_of_sale,
        bottles_per_unit: product!.bottles_per_unit,
        price_naira: product!.price_naira,
        min_order_quantity: product!.min_order_quantity,
        image_src: PRODUCT_IMAGES[product!.sku] ?? '',
      },
      product!.min_order_quantity
    );
    router.push('/cart');
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      Add {product.min_order_quantity} {unitLabel(product.unit_of_sale, product.min_order_quantity !== 1)} &middot; {formatNaira(total)}
    </button>
  );
}
