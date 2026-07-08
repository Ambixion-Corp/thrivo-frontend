import { Investor } from "../types";
import { MapPin, CircleDollarSign, Send } from "lucide-react";
import Link from "next/link";

interface InvestorCardProps {
  investor: Investor;
}

export function InvestorCard({ investor }: InvestorCardProps) {
  return (
    <div className="rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-xl p-8 flex flex-col group hover:border-[#00C6D8]/30 hover:shadow-[0_0_40px_rgba(0,198,216,0.15)] transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00C6D8]/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full pointer-events-none" />

      <div className="relative flex flex-col h-full z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px] shrink-0 shadow-[0_0_15px_rgba(0,198,216,0.3)]">
              <div className="h-full w-full rounded-2xl bg-[#0A0A0A] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-br from-[#00C6D8] to-[#8DEE5F]">
                {investor.firmName.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-[#00C6D8] transition-colors tracking-tight">
                {investor.firmName}
              </h3>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                {investor.name}
              </p>
            </div>
          </div>
        </div>

        <p className="text-[15px] font-medium text-zinc-300 mb-6 line-clamp-3 flex-1 leading-relaxed">
          &quot;{investor.thesis}&quot;
        </p>

        <div className="space-y-5 mb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <MapPin className="h-4 w-4 text-zinc-500" />
              <span>{investor.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8DEE5F] font-bold tracking-wide">
              <CircleDollarSign className="h-4 w-4" />
              <span>{investor.checkSize}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {investor.stages.map((stage) => (
              <span
                key={stage}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-300"
              >
                {stage}
              </span>
            ))}
            {investor.sectors.map((sector) => (
              <span
                key={sector}
                className="px-3 py-1 rounded-full border border-[#00C6D8]/20 bg-[#00C6D8]/10 text-[10px] font-bold uppercase tracking-widest text-[#00C6D8]"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/messages"
          className="w-full rounded-full bg-white text-black py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#00C6D8] hover:to-[#8DEE5F] hover:shadow-[0_0_20px_rgba(0,198,216,0.4)] hover:text-black transition-all duration-300 active:scale-95 group/btn"
        >
          <Send className="h-4 w-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          PITCH TO {investor.firmName.toUpperCase()}
        </Link>
      </div>
    </div>
  );
}
