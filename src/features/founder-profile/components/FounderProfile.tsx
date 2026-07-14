"use client";

import { useQuery } from "@tanstack/react-query";
import { getFounderProfile } from "../api/getFounder";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { MapPin, Users, Building, Lock } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FounderProfileProps {
  id: string;
}

export function FounderProfile({ id }: FounderProfileProps) {
  const { user } = useAuthStore();
  const {
    data: founder,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["founder", id],
    queryFn: () => getFounderProfile(id),
  });

  const [activeTab, setActiveTab] = useState<"startups" | "about">("startups");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 rounded-full border-4 border-muted border-t-[#00C6D8] animate-spin" />
      </div>
    );
  }

  if (error || !founder) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800 bg-zinc-900 shrink-0 shadow-[0_0_30px_rgba(0,198,216,0.2)]">
          <Image
            src={founder.avatar}
            alt={founder.name}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            {founder.name}
          </h1>
          <p className="text-[#00C6D8] font-semibold mb-4">
            {founder.username}
          </p>
          <p className="text-zinc-400 max-w-xl mx-auto md:mx-0 mb-6 leading-relaxed">
            {founder.bio}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-500" />
              {founder.location}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-500" />
              <span className="font-bold text-white">
                {founder.followersCount.toLocaleString()}
              </span>{" "}
              followers
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
            Follow
          </button>
          <button className="px-8 py-3 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors border border-zinc-700">
            Message
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-zinc-800 mb-8">
        <button
          onClick={() => setActiveTab("startups")}
          className={`pb-4 text-sm font-bold tracking-wide transition-colors relative ${activeTab === "startups" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          STARTUPS
          {activeTab === "startups" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C6D8]"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-4 text-sm font-bold tracking-wide transition-colors relative ${activeTab === "about" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          ABOUT
          {activeTab === "about" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C6D8]"
            />
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === "startups" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founder.startups.map((startup) => (
            <div
              key={startup.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C6D8]/20 to-[#8DEE5F]/20 border border-white/10 flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#00C6D8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {startup.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium">
                    {startup.username}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-300 mb-4">
                {startup.oneLiner}
              </p>

              <div className="flex gap-2 mb-6 flex-wrap">
                {startup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#00C6D8] bg-[#00C6D8]/10 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Data Room / Deck Access */}
              <div className="bg-black rounded-2xl p-4 border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    Data Room
                  </p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    Pitch Deck & Metrics
                  </p>
                </div>
                {user?.role === "investor" ? (
                  <button className="px-4 py-2 bg-[#00C6D8] text-black font-bold text-xs rounded-lg hover:bg-[#00C6D8]/90 transition-colors">
                    View Deck
                  </button>
                ) : (
                  <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-500 uppercase">
                      Investors Only
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
