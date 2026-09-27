import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type NotificationCategory =
  "deals" | "security" | "orders" | "messages" | "network";

export interface EcosystemNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
  actorName?: string;
  actorAvatar?: string;
}

interface NotificationState {
  notifications: EcosystemNotification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (
    notif: Omit<EcosystemNotification, "id" | "timestamp" | "read"> & {
      id?: string;
      timestamp?: string;
      read?: boolean;
    },
  ) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const SEED_NOTIFICATIONS: EcosystemNotification[] = [
  {
    id: "notif-1",
    category: "security",
    title: "Digital NDA Executed",
    message:
      "Sarah Jenkins (Apex Ventures) signed the mutual confidentiality covenant for Thrivo.",
    timestamp: "10 minutes ago",
    read: false,
    link: "/startups/startup_1/dataroom",
    actorName: "Sarah Jenkins",
  },
  {
    id: "notif-2",
    category: "deals",
    title: "Deal Stage Advanced",
    message:
      "Horizon Capital advanced your seed round to 'Due Diligence' in Deal Flow.",
    timestamp: "1 hour ago",
    read: false,
    link: "/investors",
    actorName: "Marcus Thorne",
  },
  {
    id: "notif-3",
    category: "orders",
    title: "Escrow Order Placed",
    message:
      "New consumer marketplace order #THR-849201 placed ($1,499.00 held in vault).",
    timestamp: "3 hours ago",
    read: false,
    link: "/orders",
    actorName: "Alex Johnson",
  },
  {
    id: "notif-4",
    category: "messages",
    title: "New Founder Negotiation",
    message:
      "Dev Tribhuwan sent you a proposal regarding your recent data room review.",
    timestamp: "Yesterday",
    read: true,
    link: "/messages/1",
    actorName: "Dev Tribhuwan",
  },
  {
    id: "notif-5",
    category: "network",
    title: "Accredited Syndicate Match",
    message:
      "Nexus Partners matched your sector thesis: AI & Enterprise Software.",
    timestamp: "2 days ago",
    read: true,
    link: "/investors/inv-2",
    actorName: "Nexus Partners",
  },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: SEED_NOTIFICATIONS,

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      addNotification: (notif) => {
        const item: EcosystemNotification = {
          id: notif.id || `notif-${Date.now()}`,
          timestamp: notif.timestamp || "Just now",
          read: notif.read ?? false,
          ...notif,
        };
        set((state) => ({
          notifications: [item, ...state.notifications],
        }));
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: "thrivo-notifications",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const selectUnreadCount = (state: {
  notifications: EcosystemNotification[];
}) => state.notifications.filter((n) => !n.read).length;
