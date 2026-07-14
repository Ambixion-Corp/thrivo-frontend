"use client";

import { useQuery } from "@tanstack/react-query";
import { getCreators } from "../api/getCreators";
import Image from "next/image";
import {
  MonitorPlay,
  Camera,
  MessageCircle,
  Search,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export function CreatorDirectory() {
  const { data: creators, isLoading } = useQuery({
    queryKey: ["creators"],
    queryFn: getCreators,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 rounded-full border-4 border-muted border-t-[#8DEE5F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Creator Directory
          </h1>
          <p className="text-sm text-zinc-400">
            Find the perfect creator to launch your product
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search niches, names..."
            className="w-full md:w-64 bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#8DEE5F]/50 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators?.map((creator) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={creator.id}
            className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all hover:shadow-[0_8px_30px_rgba(141,238,95,0.05)] group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
                  <Image
                    src={creator.avatar}
                    alt={creator.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {creator.name}
                  </h3>
                  <p className="text-xs text-[#8DEE5F] font-medium">
                    {creator.username}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {creator.platforms.includes("youtube") && (
                  <MonitorPlay className="w-4 h-4 text-red-500" />
                )}
                {creator.platforms.includes("instagram") && (
                  <Camera className="w-4 h-4 text-pink-500" />
                )}
                {creator.platforms.includes("twitter") && (
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                )}
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-medium mb-4 line-clamp-2 h-10">
              {creator.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {creator.niche.map((n) => (
                <span
                  key={n}
                  className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider rounded-md"
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  Followers
                </p>
                <p className="text-white font-bold">
                  {creator.followers.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  Starting at
                </p>
                <p className="text-white font-bold">{creator.startingRate}</p>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
              <MessageSquare className="w-4 h-4" />
              Pitch Campaign
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
