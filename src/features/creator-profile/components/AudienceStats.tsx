import { AudienceMetrics } from "../types";
import { Users, Activity, Target } from "lucide-react";

interface AudienceStatsProps {
  metrics: AudienceMetrics[];
}

export function AudienceStats({ metrics }: AudienceStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Users className="w-6 h-6 text-[#FF007F]" />
        Audience Reach
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.platform}
            className="glass-panel p-6 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {metric.platform}
              </span>
              <Activity className="w-5 h-5 text-[#FF007F]" />
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <p className="text-sm text-zinc-500 font-medium mb-1">
                  Followers
                </p>
                <p className="text-4xl font-extrabold text-white">
                  {formatNumber(metric.followers)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 flex items-center gap-1">
                    <Target className="w-3 h-3" /> Engagement
                  </p>
                  <p className="text-lg font-bold text-[#FF007F]">
                    {metric.engagementRate}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1">
                    Core Demo
                  </p>
                  <p className="text-sm font-bold text-zinc-300 truncate">
                    {metric.topDemographic}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
