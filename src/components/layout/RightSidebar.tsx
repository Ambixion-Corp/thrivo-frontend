"use client";

import { TrendingUp, Users, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen shrink-0 lg:border-l lg:border-border lg:bg-background/50 lg:backdrop-blur-md transition-all duration-300 relative ${
        isCollapsed ? "lg:w-16" : "lg:w-72"
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3.5 top-5 bg-background border border-border rounded-full p-1.5 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-secondary hover:text-[#00C6D8] text-foreground transition-all z-50 flex items-center justify-center"
      >
        {isCollapsed ? (
          <ChevronLeft className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Header */}
      <div
        className={`flex h-16 shrink-0 items-center border-b border-border/50 transition-all ${isCollapsed ? "px-0 justify-center" : "px-6"}`}
      >
        {!isCollapsed ? (
          <h2 className="text-sm font-semibold text-foreground tracking-tight">
            Trending
          </h2>
        ) : (
          <TrendingUp className="h-5 w-5 text-[#00C6D8]" />
        )}
      </div>

      <div
        className={`flex flex-1 flex-col overflow-y-auto py-6 gap-6 transition-all ${isCollapsed ? "px-2 items-center" : "px-4"}`}
      >
        {/* Trending Startups Placeholder Widget */}
        <div
          className={`rounded-xl border border-border/50 bg-secondary/20 flex flex-col ${isCollapsed ? "p-2" : "p-4"}`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-[#00C6D8]" />
              Hot Startups
            </div>
          )}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-start gap-3 group cursor-pointer ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="h-10 w-10 shrink-0 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00C6D8]/50 transition-colors">
                  <span className="text-xs font-bold">S{i}</span>
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-semibold text-foreground group-hover:text-[#00C6D8] truncate transition-colors">
                      Startup Name {i}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      AI Infrastructure
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {!isCollapsed && (
            <Link
              href="/startups"
              className="block mt-4 text-xs font-medium text-center text-muted-foreground hover:text-foreground transition-colors"
            >
              View all startups &rarr;
            </Link>
          )}
        </div>

        {/* Recommended Connections Widget */}
        <div
          className={`rounded-xl border border-border/50 bg-secondary/20 flex flex-col ${isCollapsed ? "p-2" : "p-4"}`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4 text-[#8DEE5F]" />
              Connects
            </div>
          )}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`flex items-center gap-3 group cursor-pointer ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/5 flex items-center justify-center">
                  <span className="text-xs font-bold">U{i}</span>
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-semibold text-foreground group-hover:text-[#8DEE5F] truncate transition-colors">
                      Investor Name {i}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      Seed & Series A
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
