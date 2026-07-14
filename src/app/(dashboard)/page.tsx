"use client";

import { useState } from "react";
import { Feed } from "@/features/feed/components/Feed";
import { UserRole } from "@/features/feed/types";

export default function Home() {
  const [role, setRole] = useState<UserRole>("founder");

  return (
    <div className="w-full h-full bg-black/95 relative flex flex-col">
      {/* Role Selector Header */}
      <div className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto hide-scrollbar">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest hidden sm:inline-block mr-2">
          View As:
        </span>

        <button
          onClick={() => setRole("founder")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            role === "founder"
              ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-white/5 text-zinc-400 hover:bg-white/10"
          }`}
        >
          Founder
        </button>
        <button
          onClick={() => setRole("investor")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            role === "investor"
              ? "bg-[#00C6D8] text-black shadow-[0_0_15px_rgba(0,198,216,0.3)]"
              : "bg-white/5 text-zinc-400 hover:bg-white/10"
          }`}
        >
          Investor
        </button>
        <button
          onClick={() => setRole("creator")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            role === "creator"
              ? "bg-[#8DEE5F] text-black shadow-[0_0_15px_rgba(141,238,95,0.3)]"
              : "bg-white/5 text-zinc-400 hover:bg-white/10"
          }`}
        >
          Creator
        </button>
        <button
          onClick={() => setRole("consumer")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            role === "consumer"
              ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              : "bg-white/5 text-zinc-400 hover:bg-white/10"
          }`}
        >
          Consumer
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* We add key={role} to force remount and reset infinite query when role changes */}
        <Feed key={role} role={role} />
      </div>
    </div>
  );
}
