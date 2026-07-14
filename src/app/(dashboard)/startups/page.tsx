import { Rocket, Plus, Settings2, BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StartupsPage() {
  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/20">
            <Rocket className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              My Startups
            </h1>
            <p className="text-sm text-zinc-400">
              Manage your portfolios and data rooms
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Add Startup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Startup Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-colors group">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black relative border-2 border-zinc-800">
                <Image
                  src="/startup_feed_1.png"
                  alt="Thrivo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Thrivo</h3>
                <p className="text-sm text-zinc-400">
                  The OS for Entrepreneurship
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black border border-zinc-800 rounded-2xl p-4">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                Data Room Views
              </p>
              <p className="text-2xl font-bold text-white">142</p>
            </div>
            <div className="bg-black border border-zinc-800 rounded-2xl p-4">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                Investor Match
              </p>
              <p className="text-2xl font-bold text-[#8DEE5F]">12</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/startups/edit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              <Settings2 className="w-4 h-4" /> Edit Profile
            </Link>
            <Link
              href="/startups/analytics"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#00C6D8] text-black font-bold text-sm rounded-xl hover:bg-[#00C6D8]/80 transition-colors"
            >
              <BarChart2 className="w-4 h-4" /> Analytics
            </Link>
          </div>
        </div>

        {/* Create New Card */}
        <div className="bg-zinc-900/10 border-2 border-dashed border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-zinc-700 hover:bg-zinc-900/20 transition-colors cursor-pointer min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            Launch New Project
          </h3>
          <p className="text-sm text-zinc-500 max-w-[200px]">
            Create a new startup profile to attract investors and creators.
          </p>
        </div>
      </div>
    </div>
  );
}
