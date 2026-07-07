import { Investor } from "../types";
import { MapPin, CircleDollarSign, Send } from "lucide-react";

interface InvestorCardProps {
  investor: Investor;
}

export function InvestorCard({ investor }: InvestorCardProps) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-sm p-6 flex flex-col group hover:border-[#00C6D8]/50 transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px] shrink-0">
               <div className="h-full w-full rounded-full bg-background flex items-center justify-center font-bold text-lg">
                 {investor.firmName.charAt(0)}
               </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-[#00C6D8] transition-colors">{investor.firmName}</h3>
              <p className="text-sm font-medium text-muted-foreground">{investor.name}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-foreground mb-4 line-clamp-3 flex-1">
          "{investor.thesis}"
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{investor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CircleDollarSign className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{investor.checkSize}</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            {investor.stages.map(stage => (
              <span key={stage} className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-medium text-muted-foreground">
                {stage}
              </span>
            ))}
            {investor.sectors.map(sector => (
              <span key={sector} className="px-2 py-0.5 rounded-md bg-[#8DEE5F]/10 text-[10px] font-medium text-[#8DEE5F]">
                {sector}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full rounded-xl bg-foreground text-background py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#00C6D8] hover:text-black transition-colors active:scale-95 shadow-lg relative z-10">
          <Send className="h-4 w-4" />
          Pitch
        </button>
      </div>
    </div>
  );
}
