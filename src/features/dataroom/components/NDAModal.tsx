"use client";

import { useState } from "react";
import { useNDAStore, NDARecord } from "@/store/ndaStore";
import {
  X,
  FileCheck2,
  Building,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  startupId: string;
  startupName: string;
  onSuccess?: (record: NDARecord) => void;
}

export function NDAModal({
  isOpen,
  onClose,
  startupId,
  startupName,
  onSuccess,
}: NDAModalProps) {
  const { signNDA } = useNDAStore();

  const [fullName, setFullName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [signerTitle, setSignerTitle] = useState("Managing Partner");
  const [signature, setSignature] = useState("");
  const [isAccredited, setIsAccredited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAccredited) {
      setErrorMsg("Please certify your accredited investor status to proceed.");
      return;
    }
    if (signature.trim().toLowerCase() !== fullName.trim().toLowerCase()) {
      setErrorMsg("Your signature must match your full legal name.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    setTimeout(() => {
      const record = signNDA(startupId, {
        signerName: fullName,
        signerTitle,
        firmName: firmName || "Angel Syndicate",
        signature,
      });

      setIsSubmitting(false);
      if (onSuccess) onSuccess(record);
      onClose();
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00C6D8]/10 border border-[#00C6D8]/20 flex items-center justify-center text-[#00C6D8]">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Execute Digital NDA
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-[#00C6D8]" />
                    Confidential Due Diligence for{" "}
                    <span className="text-white font-semibold">
                      {startupName}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Agreement Body */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-3 leading-relaxed">
                <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-zinc-800">
                  <FileText className="w-4 h-4 text-[#8DEE5F]" />
                  MUTUAL NON-DISCLOSURE & PROPRIETARY EVALUATION COVENANT
                </div>

                <p>
                  <strong>1. Confidentiality Obligation:</strong> The
                  undersigned investor agrees to maintain strictly confidential
                  all financial statements, detailed metrics, cap tables, code
                  audits, and strategic projections disclosed by {startupName}.
                </p>

                <p>
                  <strong>2. Permitted Use:</strong> Confidential Material shall
                  be used solely for the purpose of evaluating a potential
                  venture capital investment or strategic partnership with{" "}
                  {startupName}, and shall not be shared with competitive
                  entities.
                </p>

                <p>
                  <strong>3. Non-Circumvention:</strong> The investor covenants
                  not to bypass, circumvent, or avoid {startupName} with respect
                  to proprietary customer lists, trade secrets, or core
                  engineering formulations.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Controls */}
              <form
                id="nda-form"
                onSubmit={handleSubmit}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="legalName"
                      className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                    >
                      Legal Full Name
                    </label>
                    <input
                      id="legalName"
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="firm"
                      className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                    >
                      Firm / Entity Name
                    </label>
                    <input
                      id="firm"
                      required
                      type="text"
                      value={firmName}
                      onChange={(e) => setFirmName(e.target.value)}
                      placeholder="e.g. Apex Ventures"
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                    >
                      Signer Title
                    </label>
                    <input
                      id="title"
                      required
                      type="text"
                      value={signerTitle}
                      onChange={(e) => setSignerTitle(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sign"
                      className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                    >
                      Typed Signature (Full Name)
                    </label>
                    <input
                      id="sign"
                      required
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Type your full legal name"
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-serif italic text-[#00C6D8] focus:outline-none focus:border-[#00C6D8]"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAccredited}
                    onChange={(e) => setIsAccredited(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#00C6D8] focus:ring-[#00C6D8]"
                  />
                  <span className="text-xs text-zinc-300 leading-relaxed">
                    I declare and certify under penalty of perjury that I am an{" "}
                    <strong>Accredited Investor</strong> or authorized
                    institutional venture delegate under applicable securities
                    regulations.
                  </span>
                </label>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                form="nda-form"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,198,216,0.35)] transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Audit Seal...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Sign & Unlock Data Room
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
