import { Building, ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function InvestorProfilePage() {
  return (
    <div className="py-8 w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#00C6D8]/20 to-transparent"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-black border-4 border-zinc-900">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sequoia"
                alt="Investor"
                width={96}
                height={96}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Alice Wonderland
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-[#00C6D8] uppercase tracking-widest">
                  Partner @ Sequoia
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C6D8] text-black font-bold text-sm rounded-xl hover:bg-[#00C6D8]/80 transition-colors">
              <MessageCircle className="w-4 h-4" /> Message
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-8 border-t border-zinc-800/50">
          <h3 className="text-lg font-bold text-white mb-4">
            Investment Thesis
          </h3>
          <p className="text-zinc-300 leading-relaxed max-w-2xl text-sm">
            Focusing on early-stage (Pre-Seed & Seed) B2B SaaS and AI
            infrastructure startups. Looking for technical founders building the
            picks and shovels of the next decade. Check sizes range from $250k -
            $1M.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6">Recent Investments</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-zinc-900/20 border border-zinc-800 rounded-2xl p-4 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center shrink-0">
              <Building className="w-6 h-6 text-zinc-500" />
            </div>
            <div>
              <h4 className="font-bold text-white">Startup Alpha {i}</h4>
              <p className="text-xs text-zinc-500 font-medium mb-2">
                Seed Round • $500k
              </p>
              <Link
                href="#"
                className="text-xs font-bold text-[#00C6D8] flex items-center gap-1 hover:underline"
              >
                View Portfolio <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
