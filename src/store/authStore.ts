import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserRole } from "@/features/feed/types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) =>
        set((state) => ({ user: state.user ? { ...state.user, role } : null })),
    }),
    {
      name: "thrivo-auth-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
