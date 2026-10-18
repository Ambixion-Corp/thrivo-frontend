import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ShareholderRole =
  "Founder" | "Investor" | "Employee" | "Option Pool";
export type ShareClass = "Common" | "Preferred" | "Options" | "SAFE";

export interface Shareholder {
  id: string;
  name: string;
  role: ShareholderRole;
  shareClass: ShareClass;
  shares: number;
  color: string;
}

export interface RoundSimulation {
  roundName: string;
  preMoneyValuation: number;
  investmentAmount: number;
  optionPoolExpansionPercent: number; // e.g. 5 means 5% of post-money
  targetInvestorName: string;
}

interface StartupCapTable {
  startupId: string;
  authorizedShares: number;
  shareholders: Shareholder[];
  simulation: RoundSimulation;
}

interface CapTableStoreState {
  capTables: Record<string, StartupCapTable>;
  getCapTable: (startupId: string) => StartupCapTable;
  addShareholder: (
    startupId: string,
    shareholder: Omit<Shareholder, "id">,
  ) => void;
  removeShareholder: (startupId: string, id: string) => void;
  updateSimulation: (
    startupId: string,
    simulation: Partial<RoundSimulation>,
  ) => void;
  resetCapTable: (startupId: string) => void;
}

const DEFAULT_SHAREHOLDERS: Shareholder[] = [
  {
    id: "sh-1",
    name: "Lead Founder (CEO)",
    role: "Founder",
    shareClass: "Common",
    shares: 5500000,
    color: "#00C6D8",
  },
  {
    id: "sh-2",
    name: "Technical Co-Founder (CTO)",
    role: "Founder",
    shareClass: "Common",
    shares: 2500000,
    color: "#8DEE5F",
  },
  {
    id: "sh-3",
    name: "Early Angel Syndicate",
    role: "Investor",
    shareClass: "Preferred",
    shares: 1000000,
    color: "#A855F7",
  },
  {
    id: "sh-4",
    name: "Unallocated ESOP Pool",
    role: "Option Pool",
    shareClass: "Options",
    shares: 1000000,
    color: "#F59E0B",
  },
];

const DEFAULT_SIMULATION: RoundSimulation = {
  roundName: "Series Seed Round",
  preMoneyValuation: 10000000, // $10,000,000
  investmentAmount: 2500000, // $2,500,000
  optionPoolExpansionPercent: 5, // 5%
  targetInvestorName: "Apex Global Ventures",
};

export const useCapTableStore = create<CapTableStoreState>()(
  persist(
    (set, get) => ({
      capTables: {},

      getCapTable: (startupId: string) => {
        const state = get();
        if (state.capTables[startupId]) {
          return state.capTables[startupId];
        }

        const initial: StartupCapTable = {
          startupId,
          authorizedShares: 10000000,
          shareholders: DEFAULT_SHAREHOLDERS,
          simulation: DEFAULT_SIMULATION,
        };

        return initial;
      },

      addShareholder: (startupId, shareholder) => {
        set((state) => {
          const current = state.getCapTable(startupId);
          const newSh: Shareholder = {
            ...shareholder,
            id: `sh-${Date.now()}`,
          };
          const updated: StartupCapTable = {
            ...current,
            shareholders: [...current.shareholders, newSh],
          };
          return {
            capTables: {
              ...state.capTables,
              [startupId]: updated,
            },
          };
        });
      },

      removeShareholder: (startupId, id) => {
        set((state) => {
          const current = state.getCapTable(startupId);
          const updated: StartupCapTable = {
            ...current,
            shareholders: current.shareholders.filter((s) => s.id !== id),
          };
          return {
            capTables: {
              ...state.capTables,
              [startupId]: updated,
            },
          };
        });
      },

      updateSimulation: (startupId, simUpdate) => {
        set((state) => {
          const current = state.getCapTable(startupId);
          const updated: StartupCapTable = {
            ...current,
            simulation: {
              ...current.simulation,
              ...simUpdate,
            },
          };
          return {
            capTables: {
              ...state.capTables,
              [startupId]: updated,
            },
          };
        });
      },

      resetCapTable: (startupId) => {
        set((state) => ({
          capTables: {
            ...state.capTables,
            [startupId]: {
              startupId,
              authorizedShares: 10000000,
              shareholders: DEFAULT_SHAREHOLDERS,
              simulation: DEFAULT_SIMULATION,
            },
          },
        }));
      },
    }),
    {
      name: "thrivo_captable_storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
