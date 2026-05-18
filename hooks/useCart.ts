import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export function useCart() {
  const store = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    items: isMounted ? store.items : [],
    itemCount: isMounted ? store.itemCount : 0,
    subtotal: isMounted ? store.subtotal : 0,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQty: store.updateQty,
    clearCart: store.clearCart,
    isMounted,
  };
}
