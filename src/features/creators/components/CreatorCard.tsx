"use client";

import { CreatorProfile } from "../types";
import {
  Video,
  Camera,
  MessageCircle,
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CreatorCardProps {
  creator: CreatorProfile;
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "YouTube":
      return <Video className="w-5 h-5 text-red-500" />;
    case "TikTok":
      return (
        <span className="font-bold text-white tracking-tighter">TikTok</span>
      );
    case "Instagram":
      return <Camera className="w-5 h-5 text-pink-500" />;
    case "X (Twitter)":
      return <MessageCircle className="w-5 h-5 text-blue-400" />;
    default:
      return <Mail className="w-5 h-5 text-zinc-400" />;
  }
};

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-black/40 backdrop-blur-xl border border-white/5 p-6 md:p-8 hover:bg-black/60 transition-all duration-500">
      {/* Decorative gradient orb */}
      <div className="absolute -right-20 -top-20 w-48 h-48 bg-[#8DEE5F]/10 rounded-full blur-3xl group-hover:bg-[#8DEE5F]/20 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        {/* Left Section: Avatar & Info */}
        <div className="flex gap-5 items-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px] shrink-0">
            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-inner">
              {creator.name.charAt(0)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-white group-hover:text-[#8DEE5F] transition-colors">
                {creator.name}
              </h3>
              <span className="text-sm font-medium text-zinc-500">
                {creator.handle}
              </span>
            </div>
            <p className="text-sm text-zinc-400 line-clamp-2 max-w-md leading-relaxed">
              {creator.bio}
            </p>
          </div>
        </div>

        {/* Right Section: Metrics & Actions */}
        <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-6">
            <div className="flex flex-col md:items-end">
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                Platform
              </span>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {getPlatformIcon(creator.primaryPlatform)}
                <span className="text-sm font-semibold text-white">
                  {creator.primaryPlatform}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                Audience
              </span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {creator.audienceSize}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            <Link
              href="/network"
              className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              Media Kit <ExternalLink className="w-4 h-4 text-zinc-400" />
            </Link>
            <Link
              href="/messages"
              className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8DEE5F] to-emerald-400 text-black font-bold hover:shadow-[0_0_20px_rgba(141,238,95,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Propose Deal
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Tags */}
      <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
        {creator.topSectors.map((sector) => (
          <span
            key={sector}
            className="px-3 py-1 rounded-md bg-zinc-900 text-xs font-medium text-zinc-400 border border-zinc-800"
          >
            {sector}
          </span>
        ))}
        <div className="w-px h-6 bg-white/10 mx-2" />
        <span className="text-xs font-medium text-zinc-500 flex items-center">
          Past Sponsors:{" "}
          <span className="text-zinc-300 ml-2">
            {creator.pastSponsors.join(", ")}
          </span>
        </span>
      </div>
    </div>
  );
}
