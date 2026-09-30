"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import {
  Search as SearchIcon,
  TrendingUp,
  Sparkles,
  Building,
  User,
  ShoppingBag,
  Command,
  X,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCommandPaletteStore } from "@/store/commandPaletteStore";

type SearchCategory =
  "All" | "Startups" | "Investors" | "Products" | "Creators";

interface SearchRecord {
  id: string;
  category: "Startups" | "Investors" | "Products" | "Creators";
  title: string;
  subtitle: string;
  badge: string;
  meta: string;
  url: string;
  image?: string;
  avatarSeed?: string;
}

const SEARCH_DATASET: SearchRecord[] = [
  // Startups
  {
    id: "st-1",
    category: "Startups",
    title: "Thrivo OS",
    subtitle:
      "Horizontal ecosystem uniting founders, investors, creators, and consumers.",
    badge: "Pre-Seed",
    meta: "Dev Tribhuwan • Enterprise",
    url: "/startups/1",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "st-2",
    category: "Startups",
    title: "Aether Dynamics",
    subtitle: "Next-gen neuromorphic edge AI coprocessors for spatial compute.",
    badge: "Seed",
    meta: "Elena Rostova • Hardware",
    url: "/startups/startup-1",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "st-3",
    category: "Startups",
    title: "Synapse Bio",
    subtitle:
      "Non-invasive neural interfaces and continuous metabolic tracking.",
    badge: "Series A",
    meta: "Alex Thorne • BioTech",
    url: "/startups/startup-2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "st-4",
    category: "Startups",
    title: "QuantumFlow Labs",
    subtitle:
      "High-frequency algorithmic liquidity and automated market making.",
    badge: "Seed",
    meta: "Karan Patel • FinTech",
    url: "/startups/startup-3",
    image:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&auto=format&fit=crop&q=80",
  },

  // Investors
  {
    id: "inv-1",
    category: "Investors",
    title: "Apex Global Ventures",
    subtitle:
      "Multi-stage venture fund investing $1M - $5M in AI & Web3 infrastructure.",
    badge: "Lead VC",
    meta: "Marcus Thorne • $50M AUM",
    url: "/investors",
    avatarSeed: "Marcus",
  },
  {
    id: "inv-2",
    category: "Investors",
    title: "Horizon Capital",
    subtitle:
      "DeepTech seed syndicate backing audacious hardware and bio founders.",
    badge: "Syndicate",
    meta: "Elena Vance • $25M AUM",
    url: "/investors",
    avatarSeed: "Elena",
  },
  {
    id: "inv-3",
    category: "Investors",
    title: "BlueShift Angel Syndicate",
    subtitle:
      "Former unicorn founders angel investing in developer tooling and SaaS.",
    badge: "Angels",
    meta: "Sam Altman Syndicate • B2B SaaS",
    url: "/investors",
    avatarSeed: "Sam",
  },

  // Products
  {
    id: "prod-1",
    category: "Products",
    title: "Aether AI DevKit (Early Access)",
    subtitle:
      "Hardware Beta Unit with onboard SDK and edge inference acceleration.",
    badge: "$299 USD",
    meta: "By Aether Dynamics • Escrow Protected",
    url: "/products",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "prod-2",
    category: "Products",
    title: "NeuroLink Biosensor Watch",
    subtitle: "Obsidian Black wearable with continuous galvanic skin response.",
    badge: "$189 USD",
    meta: "By Synapse Bio • Free Shipping",
    url: "/products",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
  },

  // Creators
  {
    id: "cr-1",
    category: "Creators",
    title: "Leon Scott",
    subtitle:
      "Hardware Reviews & Tech Influencer analyzing cutting-edge startup gadgets.",
    badge: "1.2M Followers",
    meta: "Hardware & AI • 45 Bounties Completed",
    url: "/creators",
    avatarSeed: "Leon",
  },
  {
    id: "cr-2",
    category: "Creators",
    title: "Sarah Jenkins",
    subtitle:
      "SaaS & AI Growth Strategist helping seed founders acquire their first 10k users.",
    badge: "450K Audience",
    meta: "SaaS & Growth • $45k Earned Bounties",
    url: "/creators",
    avatarSeed: "Sarah",
  },
];

const TRENDING_TOPICS = [
  "AI Hardware",
  "Series Seed",
  "Biosensors",
  "DevKit",
  "Thrivo OS",
  "Apex Global",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] =
    useState<SearchCategory>("All");
  const openCommandPalette = useCommandPaletteStore((s) => s.open);

  const filteredResults = useMemo(() => {
    return SEARCH_DATASET.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const q = query.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [query, selectedCategory]);

  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case "Startups":
        return <Building className="w-4 h-4 text-[#00C6D8]" />;
      case "Investors":
        return <User className="w-4 h-4 text-amber-400" />;
      case "Products":
        return <ShoppingBag className="w-4 h-4 text-[#8DEE5F]" />;
      case "Creators":
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      default:
        return <SearchIcon className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Search Header Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-[#00C6D8]" />
          <span>Unified Ecosystem Discovery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          What are you looking for?
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Search across startups, accredited venture investors, tech products,
          and creator marketing bounties.
        </p>

        {/* Search Input Bar */}
        <div className="relative max-w-2xl mx-auto mt-4">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search startups, founders, investors, products..."
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl pl-12 pr-28 py-4 text-white focus:outline-none focus:border-[#00C6D8] focus:bg-black transition-all shadow-2xl text-base placeholder:text-zinc-500"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1.5 text-zinc-400 hover:text-white"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={openCommandPalette}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 font-mono text-xs flex items-center gap-1 transition-colors"
              title="Open Command Palette"
            >
              <Command className="w-3 h-3" />
              <span>⌘K</span>
            </button>
          </div>
        </div>

        {/* Trending Searches Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-zinc-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#8DEE5F]" /> Trending:
          </span>
          {TRENDING_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setQuery(topic)}
              className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#00C6D8] text-zinc-300 hover:text-white transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {(
          [
            "All",
            "Startups",
            "Investors",
            "Products",
            "Creators",
          ] as SearchCategory[]
        ).map((category) => {
          const count =
            category === "All"
              ? SEARCH_DATASET.length
              : SEARCH_DATASET.filter((d) => d.category === category).length;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? "bg-white text-black shadow-lg"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {getCategoryIcon(category)}
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? "bg-black/20 text-black"
                    : "bg-white/10 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span>
            Showing{" "}
            <strong className="text-white">{filteredResults.length}</strong>{" "}
            results {query ? `for "${query}"` : ""}
          </span>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#00C6D8] hover:underline"
            >
              Reset search
            </button>
          )}
        </div>

        {filteredResults.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-zinc-900/30 border border-zinc-800/80 p-8 space-y-3">
            <SearchIcon className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No results found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try
              searching for a different term or browse categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResults.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="bg-black/40 backdrop-blur-xl border border-zinc-800/80 hover:border-zinc-700 rounded-3xl p-5 flex items-start gap-4 transition-all hover:bg-white/[0.02] group"
              >
                {/* Visual Thumbnail / Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden relative shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : item.avatarSeed ? (
                    <Image
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatarSeed}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    getCategoryIcon(item.category)
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase bg-white/5 text-zinc-400 border border-white/5">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-[#8DEE5F] font-mono">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00C6D8] transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-2 font-medium truncate">
                    {item.meta}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black/95 flex items-center justify-center text-zinc-500">
          Loading search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
