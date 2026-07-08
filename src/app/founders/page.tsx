"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedFounders } from "@/features/founders/api/getFounder";
import Link from "next/link";
import { Rocket, TrendingUp } from "lucide-react";

export default function FoundersPage() {
  const { data: founders, isLoading } = useQuery({
    queryKey: ["founders", "featured"],
    queryFn: getFeaturedFounders,
  });

  return (
    <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Founder Directory
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the visionary builders behind the next big startups.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-3xl bg-card border border-border p-6 h-48 animate-pulse flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-1/2 bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
              </div>
              <div className="h-10 w-full bg-muted rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders?.map((founder) => (
            <Link
              key={founder.id}
              href={`/founders/${founder.id}`}
              className="group block rounded-3xl bg-card border border-border shadow-sm p-6 hover:border-[#00C6D8]/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start gap-4 relative">
                <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px]">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-xl font-bold">
                    {founder.name.charAt(0)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-foreground truncate group-hover:text-[#00C6D8] transition-colors">
                    {founder.name}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground truncate mt-1">
                    {founder.headline}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 pt-4 border-t border-border/50 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>{founder.metrics.totalRaised}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Rocket className="h-4 w-4" />
                  <span>{founder.metrics.startupsFounded} Startups</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
