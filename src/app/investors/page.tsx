"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvestors } from "@/features/investors/api/getInvestors";
import { InvestorCard } from "@/features/investors/components/InvestorCard";
import { useState, useMemo } from "react";
import { InvestmentStage, InvestmentSector } from "@/features/investors/types";

const ALL_STAGES: InvestmentStage[] = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B+",
];
const ALL_SECTORS: InvestmentSector[] = [
  "AI",
  "SaaS",
  "Fintech",
  "Consumer",
  "DeepTech",
];

export default function InvestorsPage() {
  const { data: investors, isLoading } = useQuery({
    queryKey: ["investors"],
    queryFn: getInvestors,
  });

  const [activeStage, setActiveStage] = useState<InvestmentStage | "All">(
    "All",
  );
  const [activeSector, setActiveSector] = useState<InvestmentSector | "All">(
    "All",
  );

  const filteredInvestors = useMemo(() => {
    if (!investors) return [];
    return investors.filter((inv) => {
      const matchStage =
        activeStage === "All" || inv.stages.includes(activeStage);
      const matchSector =
        activeSector === "All" || inv.sectors.includes(activeSector);
      return matchStage && matchSector;
    });
  }, [investors, activeStage, activeSector]);

  return (
    <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-[#00C6D8]/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mb-12 text-center sm:text-left relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white mb-4">
          Investor Matching
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
          Find the perfect partners for your next round. Filter by stage and
          sector to discover active VCs and angel syndicates.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 space-y-8 relative z-10">
        <div>
          <h3 className="text-sm font-bold text-white mb-4 tracking-widest uppercase flex items-center gap-3">
            Investment Stage
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveStage("All")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeStage === "All"
                  ? "bg-[#8DEE5F] text-black shadow-[0_0_15px_rgba(141,238,95,0.4)]"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Stages
            </button>
            {ALL_STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeStage === stage
                    ? "bg-[#8DEE5F] text-black shadow-[0_0_15px_rgba(141,238,95,0.4)]"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-4 tracking-widest uppercase flex items-center gap-3">
            Sector Focus
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveSector("All")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeSector === "All"
                  ? "bg-[#00C6D8] text-black shadow-[0_0_15px_rgba(0,198,216,0.4)]"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Sectors
            </button>
            {ALL_SECTORS.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeSector === sector
                    ? "bg-[#00C6D8] text-black shadow-[0_0_15px_rgba(0,198,216,0.4)]"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-72 rounded-[2rem] bg-[#0A0A0A] border border-white/5 animate-pulse relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredInvestors.map((investor) => (
              <InvestorCard key={investor.id} investor={investor} />
            ))}
          </div>
          {filteredInvestors.length === 0 && (
            <div className="py-24 text-center border border-white/10 bg-[#0A0A0A] rounded-[2rem] mt-6 relative z-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No investors found
              </h3>
              <p className="text-zinc-500 font-medium max-w-md mx-auto">
                Try adjusting your filters to discover more venture partners.
              </p>
              <button
                onClick={() => {
                  setActiveStage("All");
                  setActiveSector("All");
                }}
                className="mt-8 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold tracking-wide transition-colors border border-white/10 hover:border-white/20"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
