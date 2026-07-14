"use client";

import { ShoppingBag, Zap } from "lucide-react";

export function ProductShowcase() {
  return (
    <div className="py-8 w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Products
          </h1>
          <p className="text-sm text-zinc-400">
            Discover and buy from innovative startups
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-96 text-center border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Consumer Marketplace Coming Soon
        </h3>
        <p className="text-zinc-500 max-w-sm mb-6">
          We are currently in the Founder/Investor beta. Consumer purchasing
          directly from the feed will launch in Phase 2.
        </p>
        <button className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors">
          Join Waitlist
        </button>
      </div>
    </div>
  );
}
