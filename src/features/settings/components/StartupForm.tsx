"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Presentation,
  TrendingUp,
  DollarSign,
  Users,
  Activity,
} from "lucide-react";

export function StartupForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);

    // Simulate network request
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Pitch Deck Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Presentation className="w-5 h-5 text-[#00C6D8]" />
          Pitch Deck
        </h3>
        <div className="border-2 border-dashed border-border hover:border-[#00C6D8]/50 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-card/30">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Presentation className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="text-foreground font-semibold mb-1">
            Upload your latest Pitch Deck
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            PDF format recommended. Max size 20MB. This will be visible on your
            startup portfolio.
          </p>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-[#00C6D8] transition-colors"
          >
            Select File
          </button>
        </div>
      </div>

      {/* Public Metrics Section */}
      <div className="space-y-4 pt-4 border-t border-border/50">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#8DEE5F]" />
            Public Metrics
          </h3>
          <p className="text-sm text-muted-foreground">
            These metrics are visible to everyone on your public portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              Current Stage
            </label>
            <select className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all appearance-none">
              <option>Pre-Seed</option>
              <option>Seed</option>
              <option>Series A</option>
              <option>Series B+</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              Total Funding Raised
            </label>
            <input
              type="text"
              defaultValue="$0"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Private Metrics Section (NDA Protected) */}
      <div className="space-y-4 pt-4 border-t border-border/50">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00C6D8]" />
            Private Financials
          </h3>
          <p className="text-sm text-muted-foreground">
            These metrics are locked behind an NDA if you enable it in Privacy
            Settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" /> Monthly
              Recurring Revenue
            </label>
            <input
              type="text"
              defaultValue="$0"
              placeholder="$10,000"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" /> Customer
              Acquisition Cost
            </label>
            <input
              type="text"
              defaultValue="$0"
              placeholder="$50"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" /> Monthly
              Churn Rate
            </label>
            <input
              type="text"
              defaultValue="0%"
              placeholder="2.5%"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
        {isSaved && (
          <span className="flex items-center gap-2 text-sm text-[#8DEE5F] animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Startup details saved
          </span>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-[#00C6D8] text-black px-6 py-2.5 text-sm font-bold hover:bg-[#8DEE5F] transition-colors shadow-lg shadow-[#00C6D8]/20 disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save Startup Data"}
        </button>
      </div>
    </form>
  );
}
