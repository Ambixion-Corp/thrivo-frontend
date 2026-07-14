"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeed } from "@/features/feed/api/getFeed";
import { Loader2, ArrowUpRight, Search, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDiscoveryStore } from "@/store/useDiscoveryStore";
import { motion } from "framer-motion";

export function StartupsClient() {
  const { searchQuery, setSearchQuery } = useDiscoveryStore();

  const { data: feedData, isLoading } = useQuery({
    queryKey: ["startups-directory"],
    queryFn: () => getFeed(0, "founder"), // use founder feed to get startups
  });

  const startups =
    feedData?.items.filter(
      (item) =>
        item.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.startupUsername
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    ) || [];

  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] text-black shadow-[0_0_20px_rgba(0,198,216,0.4)]">
                <Briefcase className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Startup{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
                  Directory
                </span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-2">
              Explore products, metrics, and pitch decks from top emerging
              startups in the Thrivo ecosystem.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search by name or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-12 h-12 text-[#00C6D8] animate-spin" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {startups.map((startup) => (
              <motion.div
                key={startup.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={`/startups/${startup.id}`}
                  className="group flex flex-col glass-panel rounded-[2rem] overflow-hidden hover:border-[#00C6D8]/30 transition-all duration-300 h-full"
                >
                  <div className="h-48 w-full relative bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-80" />
                    <Image
                      src="/feed-placeholder.png"
                      alt={startup.startupName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                        {startup.metrics.raised ? "Funded" : "Bootstrapped"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px] shrink-0">
                        <div className="w-full h-full bg-background rounded-xl flex items-center justify-center font-bold text-foreground text-sm">
                          {startup.startupName.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-[#00C6D8] transition-colors flex items-center gap-2">
                          {startup.startupName}
                          <span className="text-[10px] font-bold text-[#00C6D8] bg-[#00C6D8]/10 px-1.5 py-0.5 rounded-full border border-[#00C6D8]/20">
                            {startup.startupUsername}
                          </span>
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium">
                          By {startup.founderName} ({startup.founderUsername})
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6 flex-1">
                      {startup.oneLiner}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {startup.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-semibold text-muted-foreground border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        View Portfolio
                      </div>
                      <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#00C6D8]/20 transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#00C6D8]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && startups.length === 0 && (
          <div className="py-20 text-center text-muted-foreground font-medium">
            No startups found matching &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
