"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Globe, Plus, MessageSquare, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Network", href: "/network", icon: Globe },
    { name: "Add", href: "/add", icon: Plus, isFab: true },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: "/settings", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-[72px] bg-black/60 backdrop-blur-2xl border-t border-white/10 px-2 pb-safe">
      <div className="grid h-full w-full grid-cols-5 mx-auto relative">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          if (item.isFab) {
            return (
              <div
                key="fab"
                className="relative flex justify-center h-full pt-1 pointer-events-none"
              >
                <Link
                  href={item.href}
                  className="absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] text-black shadow-[0_0_20px_rgba(0,198,216,0.4)] active:scale-95 transition-transform pointer-events-auto border-4 border-black"
                >
                  <item.icon className="w-7 h-7" />
                </Link>
                <span className="absolute bottom-2 text-[10px] font-medium text-muted-foreground pointer-events-auto">
                  {item.name}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className="inline-flex flex-col items-center justify-center group transition-colors rounded-xl my-1 active:bg-white/5"
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
                <span className="absolute top-1 w-8 h-1 rounded-full bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
