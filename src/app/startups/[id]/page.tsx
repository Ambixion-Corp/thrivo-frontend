"use client";

import { useQuery } from "@tanstack/react-query";
import { getStartupById } from "@/features/startups/api/getStartup";
import { StartupHero } from "@/features/startups/components/StartupHero";
import { MetricsPanel } from "@/features/startups/components/MetricsPanel";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function StartupProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: startup,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["startup", id],
    queryFn: () => getStartupById(id),
  });

  if (isLoading) {
    return (
      <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        <div className="w-full h-[60vh] min-h-[400px] bg-card rounded-b-[3rem] animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-card rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-foreground">
          Startup not found
        </h2>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group font-medium"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      <StartupHero startup={startup} />

      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {startup.description}
            </p>
          </section>

          <MetricsPanel startup={startup} />
        </div>

        <div className="space-y-8">
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">Founding Team</h3>
            <div className="space-y-4">
              {startup.founderIds.map((fId) => (
                <Link
                  key={fId}
                  href={`/founders/${fId}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px]">
                    <div className="h-full w-full bg-background rounded-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-[#00C6D8] transition-colors">
                      Founder Profile
                    </p>
                    <p className="text-xs text-muted-foreground">
                      View Portfolio
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
