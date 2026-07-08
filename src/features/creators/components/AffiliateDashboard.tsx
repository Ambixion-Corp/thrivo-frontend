"use client";

import { AffiliateCampaign } from "../types";
import {
  Link2,
  MousePointerClick,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";

const mockCampaigns: AffiliateCampaign[] = [
  {
    id: "camp_1",
    startupName: "Scale AI",
    bounty: "$50",
    commission: "20%",
    clicks: 1240,
    conversions: 45,
    earnings: "$2,250",
    status: "Active",
  },
  {
    id: "camp_2",
    startupName: "Vercel",
    bounty: "$0",
    commission: "30%",
    clicks: 850,
    conversions: 12,
    earnings: "$840",
    status: "Active",
  },
  {
    id: "camp_3",
    startupName: "Notion",
    bounty: "$100",
    commission: "0%",
    clicks: 3200,
    conversions: 80,
    earnings: "$8,000",
    status: "Completed",
  },
];

export function AffiliateDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Metrics Row - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <MousePointerClick className="w-12 h-12 text-[#00C6D8]" />
          </div>
          <h4 className="text-zinc-500 font-semibold mb-2">
            Total Link Clicks
          </h4>
          <p className="text-4xl font-extrabold text-white">5,290</p>
          <p className="text-sm text-[#8DEE5F] mt-2 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> +12% this week
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <CheckCircle2 className="w-12 h-12 text-[#8DEE5F]" />
          </div>
          <h4 className="text-zinc-500 font-semibold mb-2">
            Verified Conversions
          </h4>
          <p className="text-4xl font-extrabold text-white">137</p>
          <p className="text-sm text-[#8DEE5F] mt-2 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> +4% this week
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#8DEE5F]/10 to-[#00C6D8]/10 backdrop-blur-xl border border-[#8DEE5F]/20 p-6 rounded-3xl relative overflow-hidden group shadow-[0_0_30px_rgba(141,238,95,0.05)]">
          <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110">
            <DollarSign className="w-12 h-12 text-[#8DEE5F]" />
          </div>
          <h4 className="text-zinc-400 font-semibold mb-2">Pending Payouts</h4>
          <p className="text-4xl font-extrabold text-white tracking-tight">
            $11,090
          </p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors">
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Active Campaigns</h3>
            <p className="text-sm text-zinc-400">
              Manage your tracking links and monitor conversion performance.
            </p>
          </div>
          <Link
            href="/startups"
            className="px-5 py-2.5 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Discover Startups
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Startup
                </th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Terms
                </th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                  Clicks
                </th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                  Conversions
                </th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                  Earnings
                </th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockCampaigns.map((camp) => (
                <tr
                  key={camp.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-white font-bold">
                        {camp.startupName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {camp.startupName}
                        </div>
                        <div className="text-xs text-zinc-500 font-medium">
                          {camp.status === "Active" ? (
                            <span className="text-[#8DEE5F]">● Active</span>
                          ) : (
                            <span>Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      {camp.bounty !== "$0" && (
                        <span className="text-xs font-medium text-zinc-300">
                          <span className="text-[#00C6D8]">{camp.bounty}</span>{" "}
                          / signup
                        </span>
                      )}
                      {camp.commission !== "0%" && (
                        <span className="text-xs font-medium text-zinc-300">
                          <span className="text-[#8DEE5F]">
                            {camp.commission}
                          </span>{" "}
                          rev-share
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold text-white">
                    {camp.clicks.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-semibold text-white">
                    {camp.conversions.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-bold text-[#8DEE5F]">
                    {camp.earnings}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Copy Affiliate Link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
