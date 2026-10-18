"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  ShoppingBag,
  Package,
  Sparkles,
  Briefcase,
  Bell,
  Settings,
  Building,
  ArrowRight,
  X,
  User,
} from "lucide-react";
import { useCommandPaletteStore } from "@/store/commandPaletteStore";
import { useCartStore } from "@/store/cartStore";

interface CommandItem {
  id: string;
  category: "Actions" | "Startups" | "Investors" | "Products" | "Creators";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { isOpen, close, toggle, searchQuery, setSearchQuery } =
    useCommandPaletteStore();
  const { openDrawer } = useCartStore();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle, close]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 50);
    }
  }, [isOpen]);

  const navigateTo = useCallback(
    (path: string) => {
      close();
      router.push(path);
    },
    [close, router],
  );

  const allItems: CommandItem[] = useMemo(() => {
    return [
      // Actions
      {
        id: "act-create-pitch",
        category: "Actions",
        title: "Create Startup Pitch Wizard",
        subtitle: "Launch 4-step funding pitch flow",
        icon: <Plus className="w-4 h-4 text-[#8DEE5F]" />,
        onSelect: () => navigateTo("/add"),
      },
      {
        id: "act-cart-drawer",
        category: "Actions",
        title: "Open Shopping Cart Drawer",
        subtitle: "View cart items and escrow summary",
        icon: <ShoppingBag className="w-4 h-4 text-[#00C6D8]" />,
        onSelect: () => {
          close();
          openDrawer();
        },
      },
      {
        id: "act-view-orders",
        category: "Actions",
        title: "My Orders & Escrow Tracking",
        subtitle: "Track packages and release escrow payments",
        icon: <Package className="w-4 h-4 text-purple-400" />,
        onSelect: () => navigateTo("/orders"),
      },
      {
        id: "act-creator-hub",
        category: "Actions",
        title: "Creator Hub & Affiliates",
        subtitle: "Generate tracking links and monitor bounties",
        icon: <Sparkles className="w-4 h-4 text-pink-400" />,
        onSelect: () => navigateTo("/affiliates"),
      },
      {
        id: "act-investors",
        category: "Actions",
        title: "Browse Investor Directory",
        subtitle: "Accredited venture funds and angels",
        icon: <Briefcase className="w-4 h-4 text-amber-400" />,
        onSelect: () => navigateTo("/investors"),
      },
      {
        id: "act-notifications",
        category: "Actions",
        title: "Real-time Notification Center",
        subtitle: "Deals, escrow, orders, and system alerts",
        icon: <Bell className="w-4 h-4 text-blue-400" />,
        onSelect: () => navigateTo("/notifications"),
      },
      {
        id: "act-settings",
        category: "Actions",
        title: "Account & Security Settings",
        subtitle: "Manage profile, 2FA, and preferences",
        icon: <Settings className="w-4 h-4 text-zinc-400" />,
        onSelect: () => navigateTo("/settings"),
      },

      // Startups
      {
        id: "st-1",
        category: "Startups",
        title: "Thrivo OS",
        subtitle: "Horizontal ecosystem platform for founders",
        icon: <Building className="w-4 h-4 text-[#00C6D8]" />,
        onSelect: () => navigateTo("/startups/1"),
      },
      {
        id: "st-2",
        category: "Startups",
        title: "Aether Dynamics",
        subtitle: "Edge AI coprocessors and spatial compute",
        icon: <Building className="w-4 h-4 text-[#8DEE5F]" />,
        onSelect: () => navigateTo("/startups/startup-1"),
      },
      {
        id: "st-3",
        category: "Startups",
        title: "Synapse Bio",
        subtitle: "Non-invasive neural interfaces and biosensors",
        icon: <Building className="w-4 h-4 text-purple-400" />,
        onSelect: () => navigateTo("/startups/startup-2"),
      },
      {
        id: "st-4",
        category: "Startups",
        title: "QuantumFlow Labs",
        subtitle: "High-frequency algorithmic liquidity infra",
        icon: <Building className="w-4 h-4 text-amber-400" />,
        onSelect: () => navigateTo("/startups/startup-3"),
      },

      // Products
      {
        id: "prod-1",
        category: "Products",
        title: "Aether AI DevKit (Early Access)",
        subtitle: "Hardware Beta Unit • $299 USD",
        icon: <ShoppingBag className="w-4 h-4 text-[#00C6D8]" />,
        onSelect: () => navigateTo("/products"),
      },
      {
        id: "prod-2",
        category: "Products",
        title: "NeuroLink Biosensor Watch",
        subtitle: "Obsidian Black wearable • $189 USD",
        icon: <ShoppingBag className="w-4 h-4 text-[#8DEE5F]" />,
        onSelect: () => navigateTo("/products"),
      },

      // Investors
      {
        id: "inv-1",
        category: "Investors",
        title: "Apex Global Ventures",
        subtitle: "Series Seed & Series A Lead • 12 active deals",
        icon: <User className="w-4 h-4 text-amber-400" />,
        onSelect: () => navigateTo("/investors"),
      },
      {
        id: "inv-2",
        category: "Investors",
        title: "Horizon Capital",
        subtitle: "AI & DeepTech fund • Looking for Seed ventures",
        icon: <User className="w-4 h-4 text-purple-400" />,
        onSelect: () => navigateTo("/investors"),
      },

      // Creators
      {
        id: "cr-1",
        category: "Creators",
        title: "Leon Scott",
        subtitle: "Hardware Reviews & Tech Influencer • 1.2M followers",
        icon: <Sparkles className="w-4 h-4 text-pink-400" />,
        onSelect: () => navigateTo("/creators"),
      },
      {
        id: "cr-2",
        category: "Creators",
        title: "Sarah Jenkins",
        subtitle: "SaaS & AI Growth Strategist",
        icon: <Sparkles className="w-4 h-4 text-[#8DEE5F]" />,
        onSelect: () => navigateTo("/creators"),
      },
    ];
  }, [navigateTo, close, openDrawer]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allItems;

    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)),
    );
  }, [allItems, searchQuery]);

  // Handle arrow key navigation and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        className="w-full max-w-2xl bg-[#0D0D0D] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 ml-1 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search startups, investors, products, actions... (⌘K)"
            className="w-full bg-transparent border-0 px-3 py-1 text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono font-bold text-zinc-400 ml-2">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
              <p className="font-semibold text-zinc-400">
                No matching results found
              </p>
              <p className="text-[11px] mt-0.5">
                Press Enter to explore full search in &apos;/search&apos;
              </p>
              <button
                onClick={() =>
                  navigateTo(`/search?q=${encodeURIComponent(searchQuery)}`)
                }
                className="mt-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs"
              >
                Go to Full Search Page
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-zinc-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-white/15" : "bg-white/5"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">
                          {item.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold uppercase bg-white/5 text-zinc-400">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-zinc-500 truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-opacity ${
                      isSelected ? "opacity-100 text-[#00C6D8]" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[9px] text-zinc-400">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[9px] text-zinc-400">
                ↵
              </kbd>{" "}
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[9px] text-zinc-400">
                esc
              </kbd>{" "}
              Close
            </span>
          </div>

          <span className="text-zinc-600 font-mono text-[10px]">
            Thrivo OmniSearch v0.2
          </span>
        </div>
      </div>
    </div>
  );
}
