import { create } from "zustand";

interface CommandPaletteState {
  isOpen: boolean;
  searchQuery: string;
  setIsOpen: (isOpen: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearchQuery: (query: string) => void;
}

export const useCommandPaletteStore = create<CommandPaletteState>((set) => ({
  isOpen: false,
  searchQuery: "",
  setIsOpen: (isOpen) => set({ isOpen }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, searchQuery: "" }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
