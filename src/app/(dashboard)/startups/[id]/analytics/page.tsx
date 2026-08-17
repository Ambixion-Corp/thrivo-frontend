"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BarChart3, Eye, Users, TrendingUp } from "lucide-react";
import { getStartupById } from "@/features/startups/api/getStartup";

export default function StartupAnalyticsPage() {
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
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
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
          We could not load analytics for the requested startup.
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/startups"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Startups
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#00C6D8]">
            Startup analytics
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            {startup.name}
          </h1>
          <p className="mt-2 text-muted-foreground">{startup.oneLiner}</p>
        </div>
        <Link
          href={`/startups/${startup.id}/edit`}
          className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          Edit profile
        </Link>
      </div>

      <section aria-labelledby="overview-heading" className="mt-10">
        <h2 id="overview-heading" className="sr-only">
          Analytics overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Data room views"
            value="142"
            detail="All time"
            icon={<Eye className="h-5 w-5" />}
          />
          <MetricCard
            label="Investor matches"
            value="12"
            detail="Current pipeline"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            label="Profile stage"
            value={startup.stage}
            detail="Current startup status"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C6D8]/10 text-[#00C6D8]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Public metrics
              </h2>
              <p className="text-sm text-muted-foreground">
                Information visible on the startup profile.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {startup.publicMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-foreground">
            Investor pipeline
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Track the next steps for investors who have discovered your startup.
          </p>
          <div className="mt-6 space-y-4">
            <PipelineRow label="Profile views" value="142" progress="78%" />
            <PipelineRow label="Investor matches" value="12" progress="48%" />
            <PipelineRow label="Data room requests" value="6" progress="28%" />
          </div>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        Prototype mode: analytics are based on the current mock startup data
        until the analytics API is connected.
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between text-[#00C6D8]">
        <span className="text-sm font-semibold text-muted-foreground">
          {label}
        </span>
        {icon}
      </div>
      <p className="mt-5 text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function PipelineRow({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-bold text-foreground">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}
