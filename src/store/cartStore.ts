import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // Composite key: `${productId}-${variantId || 'default'}`
  productId: string;
  name: string;
  variantId?: string;
  variantName?: string;
  price: number;
  currency: string;
  image: string;
  startupName: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (
    item: Omit<CartItem, "quantity" | "id"> & {
      id?: string;
      quantity?: number;
    },
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (item) => {
        const itemId =
          item.id || `${item.productId}-${item.variantId || "default"}`;
        const addQty = item.quantity || 1;

        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === itemId);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + addQty,
            };
            return { items: updated, isDrawerOpen: true };
          }

          return {
            items: [...state.items, { ...item, id: itemId, quantity: addQty }],
            isDrawerOpen: true,
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () =>
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    }),
    {
      name: "thrivo-cart-storage",
      storage: createJSONStorage(() => localStorage),
      // Don't persist drawer open state across page loads
      partialize: (state) => ({ items: state.items }) as CartState,
    },
  ),
);

// Helper selectors
export const selectTotalItems = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
