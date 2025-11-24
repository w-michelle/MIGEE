import { create } from "zustand";

interface CartStore {
  cartId: string | null;
  isCartOpen: boolean;

  setCartId: (id: string | null) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartId: null,
  isCartOpen: false,
  setCartId: (id) => set({ cartId: id }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
