import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Frame } from '@/types';

export interface CartItem {
  frameId: string;
  name: string;
  image: string;
  qty: number;
  price: number; // paise
  lensType: string | null;
  lensPrice: number | null; // paise
}

interface CartStore {
  items: CartItem[];
  addItem: (frame: Frame, qty: number, lensType?: string | null, lensPrice?: number | null) => void;
  removeItem: (frameId: string) => void;
  updateQty: (frameId: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number; // in paise
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,

      addItem: (frame, qty, lensType = null, lensPrice = null) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.frameId === frame.id && item.lensType === lensType
          );

          let nextItems;

          if (existingItemIndex > -1) {
            nextItems = state.items.map((item, idx) =>
              idx === existingItemIndex ? { ...item, qty: item.qty + qty } : item
            );
          } else {
            nextItems = [
              ...state.items,
              {
                frameId: frame.id,
                name: frame.name,
                image: frame.images[0] || '',
                qty,
                price: frame.price,
                lensType,
                lensPrice,
              },
            ];
          }

          const itemCount = nextItems.reduce((acc, item) => acc + item.qty, 0);
          const subtotal = nextItems.reduce(
            (acc, item) => acc + (item.price + (item.lensPrice || 0)) * item.qty,
            0
          );

          return { items: nextItems, itemCount, subtotal };
        });
      },

      removeItem: (frameId) => {
        set((state) => {
          const nextItems = state.items.filter((item) => item.frameId !== frameId);
          const itemCount = nextItems.reduce((acc, item) => acc + item.qty, 0);
          const subtotal = nextItems.reduce(
            (acc, item) => acc + (item.price + (item.lensPrice || 0)) * item.qty,
            0
          );

          return { items: nextItems, itemCount, subtotal };
        });
      },

      updateQty: (frameId, qty) => {
        if (qty <= 0) {
          get().removeItem(frameId);
          return;
        }

        set((state) => {
          const nextItems = state.items.map((item) =>
            item.frameId === frameId ? { ...item, qty } : item
          );
          const itemCount = nextItems.reduce((acc, item) => acc + item.qty, 0);
          const subtotal = nextItems.reduce(
            (acc, item) => acc + (item.price + (item.lensPrice || 0)) * item.qty,
            0
          );

          return { items: nextItems, itemCount, subtotal };
        });
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, subtotal: 0 });
      },
    }),
    {
      name: 'optic-vision-cart', // key in localStorage
    }
  )
);
