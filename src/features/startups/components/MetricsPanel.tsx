"use client";

import { StartupProfile } from "../types";
import { Lock } from "lucide-react";
import { useState } from "react";

interface MetricsPanelProps {
  startup: StartupProfile;
}

export function MetricsPanel({ startup }: MetricsPanelProps) {
  // Simulate an unverified user looking at the profile
  const [accessState, setAccessState] = useState<
    "none" | "pending" | "approved" | "upgrade_required"
  >("none");

  const handleRequestAccess = () => {
    // Simulate checking if user has free requests left (e.g., they don't, so they need Pro)
    const randomVal = Math.random();
    if (randomVal > 0.66) {
      setAccessState("upgrade_required");
    } else if (randomVal > 0.33) {
      setAccessState("pending");
    } else {
      setAccessState("approved");
    }
  };

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
          className={`grid grid-cols-2 gap-6 p-6 md:p-8 transition-all duration-500 ${
            accessState !== "approved" ? "blur-md opacity-30 select-none" : ""
          }`}
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

          {accessState === "approved" && (
            <div className="col-span-2 pt-6 border-t border-border mt-2">
              <a
                href={`/startups/${startup.id}/dataroom`}
                className="w-full rounded-xl bg-foreground text-background py-4 flex items-center justify-center font-bold gap-2 hover:bg-[#00C6D8] hover:text-black transition-all hover:scale-[1.02]"
              >
                Enter Secure Data Room <Lock className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}
        </div>

        {/* NDA/Investor Lock Overlay */}
        {accessState !== "approved" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/5 backdrop-blur-[2px]">
            <div className="bg-card border border-border shadow-xl rounded-3xl p-6 text-center max-w-sm mx-4 relative overflow-hidden">
              {accessState === "upgrade_required" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
              )}

              <div
                className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 ${accessState === "upgrade_required" ? "bg-yellow-500/20 text-yellow-500" : "bg-muted text-[#00C6D8]"}`}
              >
                <Lock className="h-5 w-5" />
              </div>

              {accessState === "none" && (
                <>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Investor Access Required
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sensitive growth and financial metrics are locked behind an
                    NDA.
                  </p>
                  <button
                    onClick={handleRequestAccess}
                    className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold hover:bg-[#00C6D8] hover:text-black transition-colors"
                  >
                    Request Access
                  </button>
                </>
              )}

              {accessState === "pending" && (
                <>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Request Pending
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Your request for the Data Room and NDA has been sent to the
                    founder.
                  </p>
                  <button
                    disabled
                    className="w-full rounded-xl bg-muted text-muted-foreground py-3 text-sm font-semibold cursor-not-allowed"
                  >
                    Awaiting Approval
                  </button>
                </>
              )}

              {accessState === "upgrade_required" && (
                <>
                  <h3 className="text-lg font-bold text-yellow-500 mb-2">
                    Thrivo Pro Required
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    You have used all your free Data Room requests for this
                    month. Upgrade to access unlimited deals.
                  </p>
                  <button className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-3 text-sm font-extrabold hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-shadow">
                    Upgrade to Pro
                  </button>
                  <button
                    onClick={() => setAccessState("none")}
                    className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
