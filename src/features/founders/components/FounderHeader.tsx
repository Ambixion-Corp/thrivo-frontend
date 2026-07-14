import { Founder } from "../types";
import { MapPin, Globe, CheckCircle2, Eye, Zap } from "lucide-react";
interface FounderHeaderProps {
  founder: Founder;
  isOwner?: boolean; // True if the current user is this founder
}

export function FounderHeader({
  founder,
  isOwner = false,
}: FounderHeaderProps) {
  return (
    <div className="relative rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-2xl overflow-hidden mb-8 group flex flex-col">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/20 via-transparent to-[#8DEE5F]/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C6D8]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 flex-1">
        {/* Avatar Placeholder */}
        <div className="shrink-0 relative">
          <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px] shadow-[0_0_30px_rgba(0,198,216,0.2)]">
            <div className="h-full w-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden border-[6px] border-[#0A0A0A]">
              {founder.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={founder.avatarUrl}
                  alt={founder.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#00C6D8] to-[#8DEE5F]">
                  {founder.name.charAt(0)}
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
                {founder.name}
                <span className="text-xl sm:text-2xl font-bold text-[#00C6D8] bg-[#00C6D8]/10 px-3 py-1 rounded-full border border-[#00C6D8]/20 tracking-wider">
                  {founder.username}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 font-medium max-w-2xl">
                {founder.headline}
              </p>
            </div>

            {/* Actions / Socials */}
            <div className="flex items-center gap-3">
              {founder.socials.twitter && (
                <a
                  href={founder.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-[#00C6D8] hover:border-[#00C6D8]/50 hover:bg-[#00C6D8]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              )}
              {founder.socials.linkedin && (
                <a
                  href={founder.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-[#00C6D8] hover:border-[#00C6D8]/50 hover:bg-[#00C6D8]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}
              {founder.socials.website && (
                <a
                  href={founder.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-[#8DEE5F] hover:border-[#8DEE5F]/50 hover:bg-[#8DEE5F]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}

              {!isOwner && (
                <>
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-[#00C6D8] hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,198,216,0.4)] hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Message
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500 pt-2 font-medium">
            <MapPin className="h-4 w-4 text-zinc-400" />
            <span className="uppercase tracking-widest">
              {founder.location}
            </span>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="relative z-10 bg-[#00C6D8]/5 border-t border-[#00C6D8]/20 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#00C6D8]/10 text-[#00C6D8]">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                3 Investors are currently viewing your Data Room
                <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold animate-pulse">
                  Live
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                You have accepted 1/3 inbound connection requests this month.
              </p>
            </div>
          </div>
          <button className="shrink-0 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,198,216,0.3)] flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  );
}
