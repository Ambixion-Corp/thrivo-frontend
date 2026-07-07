"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvestors } from "@/features/investors/api/getInvestors";
import { InvestorCard } from "@/features/investors/components/InvestorCard";
import { useState, useMemo } from "react";
import { InvestmentStage, InvestmentSector } from "@/features/investors/types";

const ALL_STAGES: InvestmentStage[] = ["Pre-seed", "Seed", "Series A", "Series B+"];
const ALL_SECTORS: InvestmentSector[] = ["AI", "SaaS", "Fintech", "Consumer", "DeepTech"];

export default function InvestorsPage() {
  const { data: investors, isLoading } = useQuery({
    queryKey: ["investors"],
    queryFn: getInvestors,
  });

  const [activeStage, setActiveStage] = useState<InvestmentStage | "All">("All");
  const [activeSector, setActiveSector] = useState<InvestmentSector | "All">("All");

  const filteredInvestors = useMemo(() => {
    if (!investors) return [];
    return investors.filter((inv) => {
      const matchStage = activeStage === "All" || inv.stages.includes(activeStage);
      const matchSector = activeSector === "All" || inv.sectors.includes(activeSector);
      return matchStage && matchSector;
    });
  }, [investors, activeStage, activeSector]);

  return (
    <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Investor Matching
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
          Find the perfect partners for your next round. Filter by stage and sector to discover active VCs and angel syndicates.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Stage</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStage("All")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeStage === "All" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              All Stages
            </button>
            {ALL_STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeStage === stage ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Sector</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSector("All")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeSector === "All" ? "bg-[#00C6D8] text-black" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              All Sectors
            </button>
            {ALL_SECTORS.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSector === sector ? "bg-[#00C6D8] text-black" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((investor) => (
              <InvestorCard key={investor.id} investor={investor} />
            ))}
          </div>
          {filteredInvestors.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl mt-6">
              <p className="text-muted-foreground font-medium">No investors found matching your criteria.</p>
              <button 
                onClick={() => { setActiveStage("All"); setActiveSector("All"); }}
                className="mt-4 text-[#00C6D8] font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
