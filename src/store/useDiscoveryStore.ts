import { create } from "zustand";

interface DiscoveryState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Can add more filters here later (e.g. ticketSize, industry)
}

export const useDiscoveryStore = create<DiscoveryState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
