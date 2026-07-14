"use client";

import { AffiliateDashboard } from "@/features/creators/components/AffiliateDashboard";
import { Sparkles, BarChart3, Settings2 } from "lucide-react";
import Link from "next/link";

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen w-full bg-black/95 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-10 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] text-black shadow-[0_0_20px_rgba(141,238,95,0.4)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Creator{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
                  Hub
                </span>
              </h1>
            </div>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mt-2">
              Generate unique tracking links, monitor your real-time conversion
              metrics, and manage your payouts from top startup sponsors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-zinc-400" /> Advanced Reports
            </button>
            <Link
              href="/settings"
              className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Settings2 className="w-5 h-5 text-zinc-400" />
            </Link>
          </div>
        </div>

        {/* The Dashboard Component */}
        <AffiliateDashboard />
      </div>
    </div>
  );
}
