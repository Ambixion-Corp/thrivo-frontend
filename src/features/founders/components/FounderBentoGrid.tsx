import { Founder } from "../types";
import { TrendingUp, Rocket, Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FounderBentoGridProps {
  founder: Founder;
}

export function FounderBentoGrid({ founder }: FounderBentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)]">
      {/* Bio Card (Spans 2 columns on Desktop) */}
      <div className="md:col-span-2 rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-xl p-8 sm:p-10 relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <h3 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-3">
          About
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </h3>
        <p className="text-zinc-400 leading-relaxed text-lg font-medium">
          {founder.bio}
        </p>
      </div>

      {/* Metrics Stack */}
      <div className="flex flex-col gap-6">
        <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-[#00C6D8]/10 to-transparent border border-[#00C6D8]/20 shadow-xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-[#00C6D8]/40 transition-colors duration-500">
          <div className="absolute -right-10 -top-10 h-32 w-32 bg-[#00C6D8]/20 rounded-full blur-3xl group-hover:bg-[#00C6D8]/40 transition-colors duration-700" />
          <div className="flex items-center gap-3 text-[#00C6D8] mb-3 relative z-10">
            <TrendingUp className="h-6 w-6" />
            <span className="font-bold text-sm tracking-widest uppercase">
              Total Raised
            </span>
          </div>
          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter relative z-10">
            {founder.metrics.totalRaised}
          </span>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6">
          <div className="rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-xl p-6 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#8DEE5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Rocket className="h-7 w-7 text-[#8DEE5F] mb-3" />
            <span className="text-3xl font-extrabold text-white">
              {founder.metrics.exits}
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
              Exits
            </span>
          </div>
          <div className="rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-xl p-6 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Building2 className="h-7 w-7 text-white mb-3" />
            <span className="text-3xl font-extrabold text-white">
              {founder.metrics.startupsFounded}
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
              Startups
            </span>
          </div>
        </div>
      </div>

      {/* Startups Section (Full Width) */}
      <div className="md:col-span-3 mt-2">
        <h3 className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-3">
          Current & Past Ventures
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {founder.startups.map((startup) => (
            <Link
              href={`/startups/${startup.id}`}
              key={startup.id}
              className="block group"
            >
              <div className="rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-xl p-8 flex flex-col h-full relative group-hover:border-[#00C6D8]/30 group-hover:shadow-[0_0_30px_rgba(0,198,216,0.1)] transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-5 w-5 text-[#00C6D8]" />
                </div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00C6D8] to-[#8DEE5F] shadow-inner">
                    {startup.name.charAt(0)}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold border ${
                      startup.status === "Active"
                        ? "bg-[#8DEE5F]/10 text-[#8DEE5F] border-[#8DEE5F]/20"
                        : startup.status === "Acquired"
                          ? "bg-[#00C6D8]/10 text-[#00C6D8] border-[#00C6D8]/20"
                          : "bg-white/5 text-zinc-400 border-white/10"
                    }`}
                  >
                    {startup.status}
                  </span>
                </div>

                <div className="relative z-10 flex-1">
                  <h4 className="text-xl font-extrabold text-white tracking-tight">
                    {startup.name}
                  </h4>
                  <p className="text-xs font-bold text-[#00C6D8] uppercase tracking-widest mt-1 mb-4">
                    {startup.role}
                  </p>

                  <p className="text-sm text-zinc-400 line-clamp-3 font-medium leading-relaxed">
                    {startup.description}
                  </p>
                </div>

                {startup.metrics && (
                  <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                    {startup.metrics.raised && (
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                          Raised
                        </span>
                        <span className="font-extrabold text-[#8DEE5F] mt-0.5">
                          {startup.metrics.raised}
                        </span>
                      </div>
                    )}
                    {startup.metrics.arr && (
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                          ARR
                        </span>
                        <span className="font-extrabold text-white mt-0.5">
                          {startup.metrics.arr}
                        </span>
                      </div>
                    )}
                    {startup.metrics.users && (
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                          Users
                        </span>
                        <span className="font-extrabold text-white mt-0.5">
                          {startup.metrics.users}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
