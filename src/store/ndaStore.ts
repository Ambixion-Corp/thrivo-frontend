import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface NDARecord {
  startupId: string;
  signerName: string;
  signerTitle: string;
  firmName: string;
  signature: string;
  signedAt: string;
  auditHash: string;
}

interface NDAState {
  signedNDAs: Record<string, NDARecord>;
  signNDA: (
    startupId: string,
    data: {
      signerName: string;
      signerTitle: string;
      firmName: string;
      signature: string;
    },
  ) => NDARecord;
  isNDASigned: (startupId: string) => boolean;
  getNDARecord: (startupId: string) => NDARecord | undefined;
  revokeNDA: (startupId: string) => void;
}

export const useNDAStore = create<NDAState>()(
  persist(
    (set, get) => ({
      signedNDAs: {},

      signNDA: (startupId, data) => {
        const timestamp = new Date().toISOString();
        const auditHash = `0x${Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * 16).toString(16),
        ).join("")}`;

        const record: NDARecord = {
          startupId,
          ...data,
          signedAt: timestamp,
          auditHash,
        };

        set((state) => ({
          signedNDAs: {
            ...state.signedNDAs,
            [startupId]: record,
          },
        }));

        return record;
      },

      isNDASigned: (startupId) => {
        return Boolean(get().signedNDAs[startupId]);
      },

      getNDARecord: (startupId) => {
        return get().signedNDAs[startupId];
      },

      revokeNDA: (startupId) => {
        set((state) => {
          const next = { ...state.signedNDAs };
          delete next[startupId];
          return { signedNDAs: next };
        });
      },
    }),
    {
      name: "thrivo-nda-records",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
