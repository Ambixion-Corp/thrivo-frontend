"use client";

import { useState } from "react";
import {
  Upload,
  Rocket,
  DollarSign,
  Target,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";

export default function CreatePitchPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 sm:p-8 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-tr from-[#00C6D8]/10 to-[#8DEE5F]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 sm:p-10 relative z-10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create a Pitch
            </h1>
            <p className="text-zinc-400 font-medium">
              Step {step} of 3: The Basics
            </p>
          </div>
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/5 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-300 uppercase tracking-widest mb-2">
              Startup Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Rocket className="h-5 w-5 text-[#00C6D8]" />
              </div>
              <input
                type="text"
                placeholder="e.g. Thrivo"
                className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all text-lg font-medium shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-300 uppercase tracking-widest mb-2">
              One-Liner
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Target className="h-5 w-5 text-[#8DEE5F]" />
              </div>
              <input
                type="text"
                placeholder="The OS for Entrepreneurship"
                className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all text-lg font-medium shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-300 uppercase tracking-widest mb-2">
              Funding Goal
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="$1,000,000"
                className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-lg font-medium shadow-inner"
              />
            </div>
          </div>

          {/* Upload Box */}
          <div>
            <label className="block text-sm font-bold text-zinc-300 uppercase tracking-widest mb-2">
              Pitch Deck (Confidential)
            </label>
            <button className="w-full h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#00C6D8]/50 hover:bg-[#00C6D8]/5 transition-all group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-zinc-400 group-hover:text-[#00C6D8]" />
              </div>
              <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">
                Click to upload PDF
              </span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              if (step === 3) {
                window.location.href = "/profile";
              } else {
                setStep(step + 1);
              }
            }}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-extrabold tracking-wide hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {step === 3 ? "Submit Pitch" : "Next Step"}{" "}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
