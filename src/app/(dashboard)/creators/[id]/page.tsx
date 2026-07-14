import { MonitorPlay, Camera, MessageSquare } from "lucide-react";
import Image from "next/image";

export default async function CreatorProfilePage() {
  return (
    <div className="py-8 w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8DEE5F]/10 to-transparent blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-black border-4 border-zinc-900">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Leon"
                alt="Creator"
                width={96}
                height={96}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Leon Scott
              </h1>
              <p className="text-[#8DEE5F] font-bold text-sm mt-1">@leon_hw</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs font-bold text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md">
                  <MonitorPlay className="w-3 h-3 text-red-500" /> 500k
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md">
                  <Camera className="w-3 h-3 text-pink-500" /> 390k
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors">
              <MessageSquare className="w-4 h-4" /> Pitch Campaign
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-8 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">
              About the Creator
            </h3>
            <p className="text-zinc-300 leading-relaxed text-sm">
              Hardware unboxings. Fast-paced 60fps tech aesthetics. I help EV
              and smart gadget startups reach a Gen-Z and Millennial audience
              through highly engaging short-form content.
            </p>
          </div>
          <div>
            <div className="bg-black border border-zinc-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
                Pricing
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    Dedicated Short
                  </span>
                  <span className="text-sm font-bold text-[#8DEE5F]">
                    $1.2k
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    YouTube Integration
                  </span>
                  <span className="text-sm font-bold text-[#8DEE5F]">
                    $2.5k
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
