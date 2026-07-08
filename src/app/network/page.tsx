"use client";

import {
  Users,
  UserPlus,
  Check,
  X,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const mockRequests = [
  { id: "req_1", name: "David Chen", role: "Angel Investor", mutual: 4 },
  { id: "req_2", name: "Elena Rostova", role: "Founder @ Lumina", mutual: 12 },
];

const mockConnections = [
  {
    id: "conn_1",
    name: "Sarah Jenkins",
    role: "Partner at Sequoia",
    sector: "Fintech",
    active: true,
  },
  {
    id: "conn_2",
    name: "Marcus Tech",
    role: "Creator (2.8M)",
    sector: "Consumer",
    active: false,
  },
  {
    id: "conn_3",
    name: "Alex Dev",
    role: "Founder @ Scale AI",
    sector: "DevTools",
    active: true,
  },
  {
    id: "conn_4",
    name: "Priya Sharma",
    role: "Angel Investor",
    sector: "AI/ML",
    active: false,
  },
  {
    id: "conn_5",
    name: "Tom Cruise",
    role: "Actor & Investor",
    sector: "Media",
    active: true,
  },
  {
    id: "conn_6",
    name: "Jessica Alba",
    role: "Founder @ Honest",
    sector: "Consumer",
    active: false,
  },
];

export default function NetworkPage() {
  return (
    <div className="min-h-screen w-full bg-black/95 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] text-black shadow-[0_0_20px_rgba(141,238,95,0.4)]">
                <Users className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
                  Network
                </span>
              </h1>
            </div>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mt-2">
              Manage your connections, pending introductions, and warm leads
              across the ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-zinc-400" /> Import Contacts
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Connections Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Connections</h3>
              <span className="text-sm font-medium text-zinc-500">
                248 Total
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockConnections.map((conn) => (
                <div
                  key={conn.id}
                  className="bg-black/40 backdrop-blur-xl border border-white/5 p-5 rounded-3xl flex flex-col hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00C6D8]/20 to-[#8DEE5F]/20 p-0.5 relative">
                        {conn.active && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#8DEE5F] border-2 border-black" />
                        )}
                        <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center font-bold text-white text-sm">
                          {conn.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-[#00C6D8] transition-colors">
                          {conn.name}
                        </h4>
                        <p className="text-xs text-zinc-400 font-medium">
                          {conn.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500 bg-white/5 px-2.5 py-1 rounded-md">
                      {conn.sector}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        href="/founders/f1"
                        className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/messages"
                        className="p-2 rounded-xl bg-gradient-to-r from-[#00C6D8]/20 to-[#8DEE5F]/20 text-[#8DEE5F] hover:shadow-[0_0_15px_rgba(141,238,95,0.2)] transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Pending Requests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Pending Introductions
              </h3>
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                2
              </span>
            </div>

            <div className="space-y-4">
              {mockRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-xl border border-purple-500/20 p-5 rounded-3xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">
                      {req.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{req.name}</h4>
                      <p className="text-xs text-zinc-400">{req.role}</p>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-500 font-medium mb-4 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {req.mutual} mutual
                    connections
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-purple-500 text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button className="px-3 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Match Suggestion */}
            <div className="mt-8 bg-black/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-16 h-16 text-[#00C6D8]" />
              </div>
              <h4 className="font-bold text-white mb-1">Recommended for you</h4>
              <p className="text-sm text-zinc-400 mb-4">
                Based on your recent investments
              </p>
              <Link
                href="/founders/f1"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00C6D8] hover:text-[#8DEE5F] transition-colors"
              >
                View Profile <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
