import { InvestorProfile } from "../types";
import { MapPin, Globe, CheckCircle2, TrendingUp } from "lucide-react";

interface InvestorHeaderProps {
  investor: InvestorProfile;
}

export function InvestorHeader({ investor }: InvestorHeaderProps) {
  return (
    <div className="relative rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-2xl overflow-hidden mb-8 group flex flex-col">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/20 via-transparent to-[#8DEE5F]/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C6D8]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 flex-1">
        {/* Logo Placeholder */}
        <div className="shrink-0 relative">
          <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px] shadow-[0_0_30px_rgba(0,198,216,0.2)]">
            <div className="h-full w-full rounded-2xl bg-[#0A0A0A] flex items-center justify-center overflow-hidden border-[4px] border-[#0A0A0A]">
              {investor.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={investor.logoUrl}
                  alt={investor.fundName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#00C6D8] to-[#8DEE5F]">
                  {investor.fundName.charAt(0)}
                </span>
              )}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#0A0A0A] rounded-full p-1.5 border border-white/10">
            <CheckCircle2 className="w-6 h-6 text-[#8DEE5F]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight flex items-center gap-4 flex-wrap">
                {investor.fundName}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 font-medium max-w-2xl">
                {investor.tagline}
              </p>
            </div>

            {/* AUM Badge */}
            {investor.aum && (
              <div className="flex items-center gap-2 bg-[#00C6D8]/10 px-4 py-2 rounded-xl border border-[#00C6D8]/20 shrink-0">
                <TrendingUp className="w-5 h-5 text-[#00C6D8]" />
                <div>
                  <div className="text-xs text-[#00C6D8] font-bold uppercase tracking-wider">
                    AUM
                  </div>
                  <div className="text-lg font-bold text-white">
                    ${investor.aum}M
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <div className="flex items-center gap-2 text-zinc-400 font-medium">
              <MapPin className="w-5 h-5 text-[#00C6D8]" />
              {investor.location}
            </div>

            {investor.websiteUrl && (
              <a
                href={investor.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-zinc-400 font-medium hover:text-[#00C6D8] transition-colors"
              >
                <Globe className="w-5 h-5 text-[#8DEE5F]" />
                {investor.websiteUrl.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
