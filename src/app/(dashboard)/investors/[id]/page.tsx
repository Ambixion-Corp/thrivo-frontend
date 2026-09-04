import { getInvestor } from "@/features/investor-profile/api/getInvestor";
import { InvestorHeader } from "@/features/investor-profile/components/InvestorHeader";
import { InvestmentThesisDisplay } from "@/features/investor-profile/components/InvestmentThesis";
import {
  Building,
  ChevronLeft,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface InvestorPageProps {
  params: Promise<{ id: string }>;
}

export default async function InvestorProfilePage({
  params,
}: InvestorPageProps) {
  const { id } = await params;
  const investor = await getInvestor(id);

  return (
    <div className="py-8 w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Back to Directory */}
      <Link
        href="/investors"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group font-medium"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Investor Directory
      </Link>

      {/* Header */}
      <InvestorHeader investor={investor} />

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4">
        <div>
          <p className="text-sm font-bold text-white">
            Interested in pitching to {investor.fundName}?
          </p>
          <p className="text-xs text-zinc-400">
            Directly connect with the investment team through Thrivo.
          </p>
        </div>
        <Link
          href={`/messages/${investor.id}`}
          className="px-6 py-2.5 bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(0,198,216,0.3)] transition-all flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> Pitch Startup
        </Link>
      </div>

      {/* Thesis */}
      <InvestmentThesisDisplay thesis={investor.thesis} />

      {/* Portfolio Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Building className="w-5 h-5 text-[#8DEE5F]" /> Notable Portfolio
          Companies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {investor.portfolio.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-lg">{item.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C6D8] bg-[#00C6D8]/10 px-2 py-0.5 rounded-full border border-[#00C6D8]/20">
                    {item.stage}
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-400 mb-2">
                  Industry: {item.industry}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/50 flex items-center justify-end">
                <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                  Active Investment <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
