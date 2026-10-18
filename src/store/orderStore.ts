import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cartStore";

export type OrderStatus =
  "Processing" | "Shipped" | "Delivered" | "Completed" | "Disputed";

export interface OrderShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PlacedOrder {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  escrowContractId: string;
  escrowReleasedAt?: string;
  trackingNumber?: string;
  carrier?: string;
  shippingDetails: OrderShippingDetails;
}

interface OrderState {
  orders: PlacedOrder[];
  addOrder: (order: PlacedOrder) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  releaseEscrow: (orderId: string) => void;
  getOrderById: (orderId: string) => PlacedOrder | undefined;
}

const initialSeedOrders: PlacedOrder[] = [
  {
    id: "THR-749201",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    items: [
      {
        id: "prod_seed_1",
        productId: "startup-1",
        name: "Aether AI DevKit (Early Access)",
        price: 299,
        currency: "USD",
        quantity: 1,
        variantName: "Standard Beta Unit",
        startupName: "Aether Dynamics",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 299,
    tax: 0,
    shipping: 0,
    total: 299,
    status: "Delivered",
    escrowContractId: "0x89f2a781b2c4e8039d91fca2980e14c93a772b11",
    trackingNumber: "TRV-89420-US",
    carrier: "FedEx Express",
    shippingDetails: {
      fullName: "Alex Johnson",
      email: "alex.johnson@venturelab.io",
      phone: "+1 (415) 555-0192",
      address: "500 Howard Street, Suite 400",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
    },
  },
  {
    id: "THR-628104",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    items: [
      {
        id: "prod_seed_2",
        productId: "startup-2",
        name: "NeuroLink Biosensor Watch",
        price: 189,
        currency: "USD",
        quantity: 2,
        variantName: "Obsidian Black",
        startupName: "Synapse Bio",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 378,
    tax: 0,
    shipping: 0,
    total: 378,
    status: "Completed",
    escrowContractId: "0x3e198b1a20c78d91f24098ea437b92f01948cd32",
    escrowReleasedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    trackingNumber: "UPS-12048-CA",
    carrier: "UPS Next Day Air",
    shippingDetails: {
      fullName: "Alex Johnson",
      email: "alex.johnson@venturelab.io",
      phone: "+1 (415) 555-0192",
      address: "500 Howard Street, Suite 400",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
    },
  },
];

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: initialSeedOrders,

      addOrder: (newOrder) =>
        set((state) => ({
          orders: [newOrder, ...state.orders],
        })),

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o,
          ),
        })),

      releaseEscrow: (orderId) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: "Completed",
                  escrowReleasedAt: new Date().toISOString(),
                }
              : o,
          ),
        })),

      getOrderById: (orderId) => get().orders.find((o) => o.id === orderId),
    }),
    {
      name: "thrivo_orders_storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
