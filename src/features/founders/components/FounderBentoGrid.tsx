"use client";

import { Founder } from "../types";
import {
  TrendingUp,
  Rocket,
  Building2,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { RequestAccessModal } from "@/features/escrow/components/RequestAccessModal";

interface FounderBentoGridProps {
  founder: Founder;
  hasAccess?: boolean;
  onGrantAccess?: () => void;
}

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function FounderBentoGrid({
  founder,
  hasAccess = false,
  onGrantAccess,
}: FounderBentoGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)]"
      >
        {/* Bio Card */}
        <motion.div
          variants={itemVars}
          className="md:col-span-2 glass-panel rounded-[2rem] p-8 sm:p-10 relative overflow-hidden group transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h3 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-3">
            About
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
          </h3>
          <p className="text-zinc-400 leading-relaxed text-lg font-medium">
            {founder.bio}
          </p>
        </motion.div>

        {/* Metrics Stack */}
        <motion.div
          variants={itemVars}
          className="flex flex-col gap-6 relative"
        >
          {!hasAccess && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl p-6 text-center">
              <Lock className="w-8 h-8 text-[#00C6D8] mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">
                Private Data Room
              </h4>
              <p className="text-xs text-zinc-400 mb-6">
                Metrics and financials are locked.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Request Access
              </button>
            </div>
          )}

          <div
            className={`flex-1 rounded-[2rem] bg-gradient-to-br from-[#00C6D8]/10 to-transparent border border-[#00C6D8]/20 shadow-xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-[#00C6D8]/40 transition-colors duration-500 ${!hasAccess ? "opacity-30" : ""}`}
          >
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

          <div
            className={`flex-1 grid grid-cols-2 gap-6 ${!hasAccess ? "opacity-30" : ""}`}
          >
            <div className="glass-panel rounded-[2rem] p-6 flex flex-col items-center justify-center text-center group transition-colors duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#8DEE5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Rocket className="h-7 w-7 text-[#8DEE5F] mb-3" />
              <span className="text-3xl font-extrabold text-white">
                {founder.metrics.exits}
              </span>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
                Exits
              </span>
            </div>
            <div className="glass-panel rounded-[2rem] p-6 flex flex-col items-center justify-center text-center group transition-colors duration-300 relative overflow-hidden">
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
        </motion.div>

        {/* Startups Section */}
        <motion.div variants={itemVars} className="md:col-span-3 mt-2">
          <h3 className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-3">
            Current & Past Ventures
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
          </h3>
          <motion.div
            variants={containerVars}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {founder.startups.map((startup) => (
              <motion.div variants={itemVars} key={startup.id}>
                <Link
                  href={`/startups/${startup.id}`}
                  className="block group h-full"
                >
                  <div className="glass-panel rounded-[2rem] p-8 flex flex-col h-full relative group-hover:border-[#00C6D8]/30 group-hover:shadow-[0_0_30px_rgba(0,198,216,0.1)] transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
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
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-extrabold text-white tracking-tight">
                          {startup.name}
                        </h4>
                        <span className="text-[10px] font-bold text-[#00C6D8] bg-[#00C6D8]/10 px-1.5 py-0.5 rounded-full border border-[#00C6D8]/20">
                          {startup.username}
                        </span>
                      </div>
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
                            <span
                              className={`font-extrabold text-[#8DEE5F] mt-0.5 ${!hasAccess ? "blur-sm select-none" : ""}`}
                            >
                              {hasAccess ? startup.metrics.raised : "$X.XM"}
                            </span>
                          </div>
                        )}
                        {startup.metrics.arr && (
                          <div className="flex flex-col">
                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                              ARR
                            </span>
                            <span
                              className={`font-extrabold text-white mt-0.5 ${!hasAccess ? "blur-sm select-none" : ""}`}
                            >
                              {hasAccess ? startup.metrics.arr : "$XXXK"}
                            </span>
                          </div>
                        )}
                        {startup.metrics.users && (
                          <div className="flex flex-col">
                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                              Users
                            </span>
                            <span
                              className={`font-extrabold text-white mt-0.5 ${!hasAccess ? "blur-sm select-none" : ""}`}
                            >
                              {hasAccess ? startup.metrics.users : "XX,XXX"}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <RequestAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccessGranted={() => {
          if (onGrantAccess) onGrantAccess();
        }}
        founderName={founder.name}
      />
    </>
  );
}
