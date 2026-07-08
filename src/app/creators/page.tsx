"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCreators } from "@/features/creators/api/getCreators";
import { CreatorCard } from "@/features/creators/components/CreatorCard";
import { Search, Loader2 } from "lucide-react";

export default function CreatorsPage() {
  const [activePlatform, setActivePlatform] = useState<string>("All Platforms");

  const { data: creators, isLoading } = useQuery({
    queryKey: ["creators", activePlatform],
    queryFn: () => getCreators({ platform: activePlatform }),
  });

  const PLATFORMS = [
    "All Platforms",
    "YouTube",
    "TikTok",
    "X (Twitter)",
    "Newsletter",
  ];

  return (
    <div className="min-h-screen w-full bg-black/95 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        {/* Header Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Creator{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
              Marketplace
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Discover top-tier influencers and creators ready to promote your
            startup. Browse by platform, audience size, and past sponsorships to
            find the perfect partner for your next campaign.
          </p>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search by name, handle, or sector..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activePlatform === platform
                      ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-[#8DEE5F] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {creators?.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
            {creators?.length === 0 && (
              <div className="col-span-full py-20 text-center text-zinc-500">
                No creators found for the selected platform.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
