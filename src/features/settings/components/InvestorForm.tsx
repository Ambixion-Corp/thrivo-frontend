"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  CircleDollarSign,
  Target,
  PieChart,
  Wallet,
} from "lucide-react";
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

export function InvestorForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [stages, setStages] = useState<InvestmentStage[]>(["Seed", "Series A"]);
  const [sectors, setSectors] = useState<InvestmentSector[]>(["AI", "SaaS"]);

  const toggleStage = (stage: InvestmentStage) => {
    setStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage],
    );
  };

  const toggleSector = (sector: InvestmentSector) => {
    setSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector],
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00C6D8]" />
          Investment Focus
        </h3>
        <p className="text-sm text-muted-foreground">
          Define your thesis to receive highly curated deal flow in your
          discovery feed.
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <PieChart className="w-4 h-4 text-muted-foreground" /> Investment
            Thesis
          </label>
          <textarea
            rows={3}
            defaultValue="We back bold founders building B2B SaaS and AI infrastructure. We prefer to lead seed rounds and take a board seat."
            className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-muted-foreground" />{" "}
              Fund Size (AUM)
            </label>
            <input
              type="text"
              defaultValue="$50M"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Wallet className="w-4 h-4 text-muted-foreground" /> Average
              Ticket Size
            </label>
            <input
              type="text"
              defaultValue="$250k - $1M"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-border/50">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Preferred Stages
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ALL_STAGES.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => toggleStage(stage)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                  stages.includes(stage)
                    ? "bg-[#8DEE5F]/20 border-[#8DEE5F]/50 text-[#8DEE5F]"
                    : "bg-transparent border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Sector Focus
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ALL_SECTORS.map((sector) => (
              <button
                key={sector}
                type="button"
                onClick={() => toggleSector(sector)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                  sectors.includes(sector)
                    ? "bg-[#00C6D8]/20 border-[#00C6D8]/50 text-[#00C6D8]"
                    : "bg-transparent border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
        {isSaved && (
          <span className="flex items-center gap-2 text-sm text-[#8DEE5F] animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Preferences saved
          </span>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-[#00C6D8] text-black px-6 py-2.5 text-sm font-bold hover:bg-[#8DEE5F] transition-colors shadow-lg shadow-[#00C6D8]/20 disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save Deal Flow Preferences"}
        </button>
      </div>
    </form>
  );
}
