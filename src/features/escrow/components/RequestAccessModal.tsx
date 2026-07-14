"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, X, Loader2 } from "lucide-react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: () => void;
  founderName: string;
}

export function RequestAccessModal({
  isOpen,
  onClose,
  onAccessGranted,
  founderName,
}: RequestAccessModalProps) {
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    setIsStaking(true);
    // Simulate API call for staking credits and getting access
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsStaking(false);
    onAccessGranted();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00C6D8]/20 to-[#8DEE5F]/20 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-[#00C6D8]" />
                </div>

                <h2 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
                  Request Data Room Access
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  To ensure a high signal-to-noise ratio for founders, Thrivo
                  requires investors to stake platform credits in Escrow to view
                  sensitive metrics.
                </p>

                <div className="glass-panel rounded-xl p-4 mb-8 flex items-center justify-between border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Required Escrow
                    </span>
                    <span className="text-xl font-black text-white">
                      50 Credits
                    </span>
                  </div>
                  <Lock className="w-6 h-6 text-zinc-500" />
                </div>

                <button
                  onClick={handleStake}
                  disabled={isStaking}
                  className="w-full relative group overflow-hidden rounded-xl bg-foreground text-background font-bold text-lg py-4 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] opacity-0 group-hover:opacity-10 transition-opacity" />
                  {isStaking ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Staking Credits...
                    </span>
                  ) : (
                    `Stake & Request from ${founderName.split(" ")[0]}`
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
