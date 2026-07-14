"use client";

import { FeedItem, UserRole } from "../types";
import {
  Heart,
  MessageCircle,
  Share2,
  Target,
  MoreHorizontal,
  Bookmark,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { RequestAccessModal } from "@/features/escrow/components/RequestAccessModal";
import { useRouter } from "next/navigation";

interface FeedCardProps {
  item: FeedItem;
  role?: UserRole;
}

export function FeedCard({ item, role = "founder" }: FeedCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleAccessGranted = () => {
    // Navigate to the founder's profile upon access granted
    router.push(`/founders/${item.founderId}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-[420px] mx-auto bg-black sm:bg-[#0A0A0A]/80 sm:backdrop-blur-2xl sm:border sm:border-white/10 sm:hover:border-white/20 sm:rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.6)] flex flex-col mb-6 transition-colors duration-500"
      >
        {/* 1. Header Area */}
        <div className="flex items-center justify-between p-3 sm:p-4">
          <Link
            href={`/founders/${item.founderId}`}
            className="flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px]">
              <div className="h-full w-full bg-[#0A0A0A] rounded-full flex items-center justify-center text-xs font-bold text-white overflow-hidden relative">
                <span className="z-10">{item.founderName.charAt(0)}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-[14px] hover:text-[#00C6D8] transition-colors leading-none tracking-tight">
                {item.founderUsername}
              </span>
              <span className="text-[11px] text-[#00C6D8] mt-0.5 font-medium tracking-wide">
                VERIFIED FOUNDER
              </span>
            </div>
          </Link>
          <button className="text-muted-foreground hover:text-foreground p-1">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Media Area */}
        <motion.div
          whileHover={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative w-full aspect-[9/16] bg-black cursor-pointer overflow-hidden rounded-md sm:rounded-none group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full relative"
          >
            <Image
              src={item.imageUrl || "/feed-placeholder.png"}
              alt="Startup Showcase"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C6D8] animate-pulse" />
              <span className="text-[9px] font-bold text-white tracking-wider uppercase">
                Live Demo
              </span>
            </div>
            {role === "investor" && item.ticketSize && (
              <div className="px-2.5 py-1 rounded-full bg-[#00C6D8]/80 backdrop-blur-md flex items-center gap-1.5">
                <Target className="w-3 h-3 text-black" />
                <span className="text-[9px] font-bold text-black tracking-wider uppercase">
                  {item.ticketSize}
                </span>
              </div>
            )}
          </div>

          {/* Request Access Overlay for Investors */}
          {role === "investor" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="px-6 py-3 rounded-full bg-white text-black font-extrabold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Request Data Room Access
              </button>
            </div>
          )}
        </motion.div>

        {/* 3. Action Bar */}
        <div className="flex flex-col px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-red-500 transition-colors group"
              >
                <Heart
                  className="w-[26px] h-[26px] text-foreground group-hover:text-red-500"
                  strokeWidth={1.75}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-muted-foreground transition-colors"
              >
                <MessageCircle
                  className="w-[26px] h-[26px] text-foreground"
                  strokeWidth={1.75}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-muted-foreground transition-colors"
              >
                <Share2
                  className="w-[26px] h-[26px] text-foreground"
                  strokeWidth={1.75}
                />
              </motion.button>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-muted-foreground transition-colors"
              >
                <Bookmark
                  className="w-[26px] h-[26px] text-foreground"
                  strokeWidth={1.75}
                />
              </motion.button>
            </div>
          </div>

          {/* 4. Likes & Caption */}
          <div className="text-[14px] font-bold text-white mb-1.5 tracking-tight">
            1,248 likes
          </div>

          <div className="text-[14px] leading-[20px] text-zinc-300">
            <span className="font-bold text-white mr-1.5 tracking-tight">
              {item.startupUsername}
            </span>
            <span>
              Launching{" "}
              <span className="text-white font-medium">{item.startupName}</span>
              ! {item.oneLiner}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[#00C6D8] text-[13px] hover:underline cursor-pointer"
              >
                #{tag.replace(/\s+/g, "")}
              </span>
            ))}
          </div>

          {/* View all comments */}
          <div className="text-[13px] text-muted-foreground mt-2 cursor-pointer hover:text-zinc-300">
            View all 48 comments
          </div>

          {/* Timestamp */}
          <div className="text-[10px] text-muted-foreground uppercase mt-2 tracking-wide">
            2 hours ago
          </div>
        </div>
      </motion.div>

      <RequestAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccessGranted={handleAccessGranted}
        founderName={item.founderName}
      />
    </>
  );
}
