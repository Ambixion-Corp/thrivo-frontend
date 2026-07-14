import { CreatorProfile } from "../types";
import { CheckCircle2, Sparkles } from "lucide-react";

interface CreatorHeaderProps {
  creator: CreatorProfile;
}

export function CreatorHeader({ creator }: CreatorHeaderProps) {
  return (
    <div className="relative rounded-[2rem] bg-[#0A0A0A] border border-white/5 shadow-2xl overflow-hidden mb-8 group flex flex-col">
      {/* Decorative Background Gradient - Creators get a pink/purple tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF007F]/20 via-transparent to-[#7B2CBF]/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF007F]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 flex-1">
        {/* Avatar Placeholder */}
        <div className="shrink-0 relative">
          <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-tr from-[#FF007F] to-[#7B2CBF] p-[2px] shadow-[0_0_30px_rgba(255,0,127,0.2)]">
            <div className="h-full w-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden border-[6px] border-[#0A0A0A]">
              {creator.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#FF007F] to-[#7B2CBF]">
                  {creator.displayName.charAt(0)}
                </span>
              )}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#0A0A0A] rounded-full p-1.5 border border-white/10">
            <CheckCircle2 className="w-6 h-6 text-[#FF007F]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight flex items-center gap-4 flex-wrap">
                {creator.displayName}
                <span className="text-xl sm:text-2xl font-bold text-[#FF007F] bg-[#FF007F]/10 px-3 py-1 rounded-full border border-[#FF007F]/20 tracking-wider">
                  {creator.handle}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 font-medium max-w-2xl">
                {creator.bio}
              </p>
            </div>

            {/* Top Niche Badge */}
            {creator.niche.length > 0 && (
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 shrink-0">
                <Sparkles className="w-5 h-5 text-[#FF007F]" />
                <span className="text-sm text-zinc-300 font-bold uppercase tracking-wider">
                  {creator.niche[0]}
                </span>
              </div>
            )}
          </div>

          {/* Niches Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {creator.niche.slice(1).map((n) => (
              <span
                key={n}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-400"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
