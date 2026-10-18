"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, PieChart, ShieldCheck } from "lucide-react";
import { getStartupById } from "@/features/startups/api/getStartup";
import { CapTableSimulator } from "@/features/startups/components/CapTableSimulator";

export default function StartupCapTablePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const {
    data: startup,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["startup", id],
    queryFn: () => getStartupById(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
        <div className="h-10 w-80 bg-muted rounded animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 rounded-3xl bg-card animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Startup not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          We could not load cap table data for the requested startup.
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-6 rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header & Sub-navigation */}
      <div>
        <Link
          href={`/startups/${startup.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group font-medium"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Startup Profile
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C6D8]">
                Capitalization & Equity Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8DEE5F]/10 text-[#8DEE5F] border border-[#8DEE5F]/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Tier-1 Audited
              </span>
            </div>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {startup.name}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
                Cap Table
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Interactive equity ledger, shareholder allocation, and funding
              round dilution simulator.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/startups/${startup.id}/dataroom`}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
            >
              Data Room
            </Link>
            <Link
              href={`/startups/${startup.id}/analytics`}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
            >
              Analytics
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-border pb-1 overflow-x-auto">
          <Link
            href={`/startups/${startup.id}`}
            className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Overview
          </Link>
          <Link
            href={`/startups/${startup.id}/analytics`}
            className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Analytics
          </Link>
          <Link
            href={`/startups/${startup.id}/captable`}
            className="px-4 py-2 text-xs font-bold text-white border-b-2 border-[#00C6D8] -mb-1 flex items-center gap-1.5"
          >
            <PieChart className="w-3.5 h-3.5 text-[#00C6D8]" /> Cap Table
          </Link>
          <Link
            href={`/startups/${startup.id}/dataroom`}
            className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Data Room
          </Link>
          <Link
            href={`/startups/${startup.id}/edit`}
            className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Simulator Component */}
      <CapTableSimulator startupId={startup.id} startupName={startup.name} />
    </div>
  );
}
