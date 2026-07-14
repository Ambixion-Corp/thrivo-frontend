import { InvestmentThesis } from "../types";
import { Target, Banknote, Layers } from "lucide-react";

interface InvestmentThesisProps {
  thesis: InvestmentThesis;
}

export function InvestmentThesisDisplay({ thesis }: InvestmentThesisProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${amount / 1000000}M`;
    }
    if (amount >= 1000) {
      return `$${amount / 1000}K`;
    }
    return `$${amount}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Target className="w-6 h-6 text-[#00C6D8]" />
        Investment Thesis
      </h2>

      <div className="glass-panel p-8 rounded-3xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8DEE5F]/5 rounded-full blur-[80px] pointer-events-none" />

        <p className="text-lg text-zinc-300 leading-relaxed font-medium relative z-10">
          {thesis.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 relative z-10">
          {/* Sectors */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4" /> Sectors
            </h3>
            <div className="flex flex-wrap gap-2">
              {thesis.focusSectors.map((sector) => (
                <span
                  key={sector}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-300"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Target className="w-4 h-4" /> Stages
            </h3>
            <div className="flex flex-wrap gap-2">
              {thesis.preferredStages.map((stage) => (
                <span
                  key={stage}
                  className="px-3 py-1 bg-[#00C6D8]/10 border border-[#00C6D8]/20 rounded-lg text-sm text-[#00C6D8] font-medium"
                >
                  {stage}
                </span>
              ))}
            </div>
          </div>

          {/* Check Size */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Banknote className="w-4 h-4" /> Check Size
            </h3>
            <div className="px-4 py-3 bg-[#8DEE5F]/10 border border-[#8DEE5F]/20 rounded-xl">
              <span className="text-[#8DEE5F] font-bold text-lg">
                {formatCurrency(thesis.checkSize.min)} -{" "}
                {formatCurrency(thesis.checkSize.max)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
