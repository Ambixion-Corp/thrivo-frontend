"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, MessageSquare, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Add", href: "/add", icon: PlusSquare },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-[72px] bg-black/60 backdrop-blur-2xl border-t border-white/10 px-2 pb-safe">
      <div className="grid h-full w-full grid-cols-5 mx-auto relative">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          if (false) {
            // IG doesn't use a FAB for the main bottom bar anymore
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative inline-flex flex-col items-center justify-center group transition-colors rounded-xl my-1 active:bg-white/5"
            >
              <item.icon
                className={`w-6 h-6 mb-1 transition-all ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium transition-all ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              >
                {item.name}
              </span>

              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
