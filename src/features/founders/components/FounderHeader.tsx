import { Founder } from "../types";
import { MapPin, Globe, CheckCircle2 } from "lucide-react";
interface FounderHeaderProps {
  founder: Founder;
}

export function FounderHeader({ founder }: FounderHeaderProps) {
  return (
    <div className="relative rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-2xl overflow-hidden mb-8 group">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/20 via-transparent to-[#8DEE5F]/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C6D8]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
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
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {founder.name}
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
    </div>
  );
}
