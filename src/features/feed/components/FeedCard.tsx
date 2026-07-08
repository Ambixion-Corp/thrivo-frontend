import { FeedItem, UserRole } from "../types";
import {
  Heart,
  MessageCircle,
  Share2,
  ArrowUpRight,
  Maximize2,
  ShoppingCart,
  Target,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeedCardProps {
  item: FeedItem;
  role?: UserRole;
}

export function FeedCard({ item, role = "founder" }: FeedCardProps) {
  return (
    <div className="w-full max-w-[450px] mx-auto aspect-[9/16] relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl snap-center shrink-0 group">
      {/* Media Background - using generated asset */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/feed-placeholder.png"
          alt="Product Showcase"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[15s] group-hover:scale-110 ease-linear opacity-80"
          priority
        />
      </div>

      {/* Elegant Dark Gradient Overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-90" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A]/60 to-transparent" />

      {/* Top Bar - Header/Controls */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start">
        <div className="flex gap-2">
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00C6D8] animate-pulse shadow-[0_0_8px_#00C6D8]" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">
              Live Demo
            </span>
          </div>

          {/* Role Specific Badges */}
          {role === "creator" && item.affiliateCommission && (
            <div className="px-3 py-1.5 rounded-full bg-[#8DEE5F]/20 backdrop-blur-md border border-[#8DEE5F]/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#8DEE5F]" />
              <span className="text-[10px] font-bold text-[#8DEE5F] tracking-wider uppercase">
                {item.affiliateCommission} Commission
              </span>
            </div>
          )}
          {role === "investor" && item.ticketSize && (
            <div className="px-3 py-1.5 rounded-full bg-[#00C6D8]/20 backdrop-blur-md border border-[#00C6D8]/30 flex items-center gap-1.5">
              <Target className="w-3 h-3 text-[#00C6D8]" />
              <span className="text-[10px] font-bold text-[#00C6D8] tracking-wider uppercase">
                {item.ticketSize}
              </span>
            </div>
          )}
          {role === "consumer" && item.price && (
            <div className="px-3 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 flex items-center gap-1.5">
              <ShoppingCart className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] font-bold text-purple-400 tracking-wider uppercase">
                {item.price}
              </span>
            </div>
          )}
        </div>
        <button className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-end justify-between gap-4">
          {/* Main Info */}
          <div className="flex-1 space-y-4">
            <Link
              href={`/founders/${item.founderId}`}
              className="flex items-center gap-3 group/author w-fit"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px] shadow-[0_0_15px_rgba(0,198,216,0.3)]">
                <div className="h-full w-full bg-[#0A0A0A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {item.founderName.charAt(0)}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white group-hover/author:text-[#00C6D8] transition-colors text-sm">
                  {item.founderName}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  Verified Founder
                </span>
              </div>
            </Link>

            <div className="space-y-1.5">
              <h2 className="text-3xl font-extrabold text-white leading-[1.1] tracking-tight">
                {item.startupName}
              </h2>
              <p className="text-sm text-zinc-300 line-clamp-2 font-medium leading-relaxed max-w-[90%]">
                {item.oneLiner}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-xs font-medium text-zinc-200 border border-white/10 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics Mini-Bar */}
            <div className="flex items-center gap-4 pt-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              {item.metrics.raised && (
                <div className="flex flex-col">
                  <span className="text-zinc-500">Raised</span>
                  <span className="text-[#8DEE5F]">{item.metrics.raised}</span>
                </div>
              )}
              {item.metrics.users && (
                <div className="flex flex-col">
                  <span className="text-zinc-500">Users</span>
                  <span className="text-white">{item.metrics.users}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex flex-col items-center gap-6 pb-2">
            <button className="flex flex-col items-center gap-1.5 group/btn">
              <span className="flex p-3.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white group-hover/btn:bg-white/10 group-hover/btn:text-[#00C6D8] group-hover/btn:border-[#00C6D8]/50 group-active/btn:scale-95 transition-all duration-300">
                <Heart className="h-6 w-6" />
              </span>
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                1.2k
              </span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group/btn">
              <span className="flex p-3.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white group-hover/btn:bg-white/10 transition-all duration-300 group-active/btn:scale-95">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                48
              </span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group/btn">
              <span className="flex p-3.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white group-hover/btn:bg-white/10 transition-all duration-300 group-active/btn:scale-95">
                <Share2 className="h-6 w-6" />
              </span>
            </button>

            {role === "consumer" ? (
              <Link
                href={`/checkout/${item.id}`}
                className="mt-2 p-4 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                <ShoppingCart className="h-6 w-6 relative z-10" />
              </Link>
            ) : role === "creator" ? (
              <Link
                href="/affiliates"
                className="mt-2 p-4 rounded-full bg-gradient-to-tr from-[#8DEE5F] to-emerald-400 text-black shadow-[0_0_20px_rgba(141,238,95,0.4)] hover:shadow-[0_0_30px_rgba(141,238,95,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                <Sparkles className="h-6 w-6 relative z-10" />
              </Link>
            ) : (
              <Link
                href={`/startups/${item.id}`}
                className="mt-2 p-4 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] text-black shadow-[0_0_20px_rgba(0,198,216,0.4)] hover:shadow-[0_0_30px_rgba(0,198,216,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                <ArrowUpRight className="h-6 w-6 relative z-10" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar mimic */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 backdrop-blur-sm">
        <div className="h-full bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] w-[35%] rounded-r-full shadow-[0_0_10px_#00C6D8]" />
      </div>
    </div>
  );
}
