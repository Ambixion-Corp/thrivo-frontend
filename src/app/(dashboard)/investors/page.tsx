"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvestors } from "@/features/investors/api/getInvestors";
import { InvestorCard } from "@/features/investors/components/InvestorCard";
import { DealFlow } from "@/features/investors/components/DealFlow";
import { InvestmentSector } from "@/features/investors/types";
import { CircleDollarSign, Search, Filter, Kanban, Users } from "lucide-react";

export default function InvestorsPage() {
  const [activeTab, setActiveTab] = useState<"directory" | "deals">(
    "directory",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<
    InvestmentSector | "All"
  >("All");

  const { data: investors, isLoading } = useQuery({
    queryKey: ["investors"],
    queryFn: getInvestors,
  });

  const filteredInvestors = investors?.filter((inv) => {
    const matchesSearch =
      inv.firmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.thesis.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector =
      selectedSector === "All" ||
      inv.sectors.includes(selectedSector as InvestmentSector);

    return matchesSearch && matchesSector;
  });

  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00C6D8]/20 flex items-center justify-center border border-[#00C6D8]/30">
            <CircleDollarSign className="w-5 h-5 text-[#00C6D8]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Investor Hub & Matching
            </h1>
            <p className="text-sm text-zinc-400">
              Discover active venture capital firms, angel syndicates, and track
              pipeline deals.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "directory"
                ? "bg-[#00C6D8] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Investor Directory
          </button>
          <button
            onClick={() => setActiveTab("deals")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "deals"
                ? "bg-[#00C6D8] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Kanban className="w-4 h-4" />
            Deal Flow
          </button>
        </div>
      </div>

      {/* DIRECTORY VIEW */}
      {activeTab === "directory" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search firms, angels, thesis..."
                className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00C6D8]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <Filter className="w-4 h-4 text-zinc-500 shrink-0 hidden sm:inline" />
              {["All", "AI", "SaaS", "Fintech", "DeepTech", "Consumer"].map(
                (sec) => (
                  <button
                    key={sec}
                    onClick={() =>
                      setSelectedSector(sec as InvestmentSector | "All")
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedSector === sec
                        ? "bg-white/20 text-white border border-white/30"
                        : "bg-black/50 text-zinc-400 hover:text-white border border-zinc-800"
                    }`}
                  >
                    {sec}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-[2rem] bg-card border border-border p-8 h-80 animate-pulse"
                />
              ))}
            </div>
          ) : filteredInvestors?.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-500 text-sm font-medium">
                No investors found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInvestors?.map((investor) => (
                <InvestorCard key={investor.id} investor={investor} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* DEAL FLOW KANBAN VIEW */}
      {activeTab === "deals" && (
        <div className="animate-in fade-in duration-300">
          <DealFlow />
        </div>
      )}
    </div>
  );
}
