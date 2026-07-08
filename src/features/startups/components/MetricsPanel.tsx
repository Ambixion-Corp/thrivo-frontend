"use client";

import { StartupProfile } from "../types";
import { Lock } from "lucide-react";
import { useState } from "react";

interface MetricsPanelProps {
  startup: StartupProfile;
}

export function MetricsPanel({ startup }: MetricsPanelProps) {
  // Simulate an unverified user looking at the profile
  const [isVerifiedInvestor] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Traction & Metrics</h2>

      {/* Public Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {startup.publicMetrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-card border border-border rounded-3xl p-5 hover:border-muted-foreground/50 transition-colors"
          >
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {metric.label}
            </p>
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Private/Tiered Metrics Area */}
      <div className="relative rounded-3xl border border-border bg-card overflow-hidden mt-6">
        {/* Blurry Data Layer */}
        <div
          className={`grid grid-cols-2 gap-6 p-6 md:p-8 ${!isVerifiedInvestor ? "blur-md opacity-30 select-none" : ""}`}
        >
          {startup.privateMetrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* NDA/Investor Lock Overlay */}
        {!isVerifiedInvestor && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/5 backdrop-blur-[2px]">
            <div className="bg-card border border-border shadow-xl rounded-3xl p-6 text-center max-w-sm mx-4">
              <div className="mx-auto h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4 text-[#00C6D8]">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Investor Access Required
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sensitive growth and financial metrics are locked behind an NDA.
              </p>
              <button className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold hover:bg-[#00C6D8] hover:text-black transition-colors">
                Request Access
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
