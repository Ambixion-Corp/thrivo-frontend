"use client";

import { Search, LogIn, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { NotificationDropdown } from "./NotificationDropdown";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const { items, openDrawer } = useCartStore();
  const totalItems = selectTotalItems({ items } as never);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search Bar */}
        <form className="relative flex flex-1" action="/search" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground ml-2"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-9 pr-0 text-foreground bg-transparent placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
            placeholder="Search founders, startups, investors..."
            type="search"
            name="q"
          />
        </form>

        <div className="flex items-center gap-x-3 sm:gap-x-4 lg:gap-x-5">
          {/* Shopping Cart Button */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            title="Shopping Cart"
          >
            <span className="sr-only">Open cart</span>
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-[10px] font-black text-black shadow-md animate-in zoom-in">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-border"
            aria-hidden="true"
          />

          {/* Profile or Login CTA */}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-secondary transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] flex items-center justify-center shadow-inner">
                <span className="text-black font-extrabold text-xs">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <span className="hidden xl:inline text-xs font-bold text-foreground">
                {user?.name || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-foreground/10"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
