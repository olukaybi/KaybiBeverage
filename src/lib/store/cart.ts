import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, ProductSku } from '@/lib/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (sku: ProductSku, quantity: number) => void;
  removeItem: (sku: ProductSku) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity) => {
        set((state) => {
          const existing = state.items.find((i) => i.sku === item.sku);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.sku === item.sku ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      updateQuantity: (sku, quantity) => {
        if (quantity <= 0) {
          get().removeItem(sku);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
        }));
      },

      removeItem: (sku) => {
        set((state) => ({ items: state.items.filter((i) => i.sku !== sku) }));
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price_naira * i.quantity, 0),
    }),
    { name: 'kayora-cart' }
  )
);
