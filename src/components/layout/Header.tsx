import { Search, LogIn } from "lucide-react";
import Link from "next/link";
import { NotificationDropdown } from "./NotificationDropdown";

export function Header() {
  // Temporary auth state for UI purposes
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search Bar */}
        <form className="relative flex flex-1" action="#" method="GET">
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
            name="search"
          />
        </form>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <NotificationDropdown />

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-border"
            aria-hidden="true"
          />

          {/* Profile or Login CTA */}
          {isAuthenticated ? (
            <button className="flex items-center p-1.5 focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] flex items-center justify-center shadow-inner">
                <span className="text-black font-bold text-xs">U</span>
              </div>
            </button>
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
