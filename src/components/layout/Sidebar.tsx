import Link from "next/link";
import {
  Home,
  Briefcase,
  CircleDollarSign,
  Settings,
  MessageSquare,
  Sparkles,
  Bell,
  PlusSquare,
  User,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Startups", href: "/startups", icon: Briefcase },
  { name: "Investors", href: "/investors", icon: CircleDollarSign },
  { name: "Creators", href: "/creators", icon: Sparkles },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Create", href: "/add", icon: PlusSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:sticky lg:top-0 lg:h-screen shrink-0 lg:border-r lg:border-border lg:bg-background/80 lg:backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-black font-bold text-lg leading-none tracking-tighter">
              T
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Thrivo
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-x-4 rounded-xl px-3 py-3.5 text-base font-semibold text-foreground hover:bg-secondary/50 transition-all duration-200"
            >
              <item.icon
                className="h-6 w-6 shrink-0 text-foreground group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
                strokeWidth={1.75}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
        >
          <Settings className="h-5 w-5 shrink-0" aria-hidden="true" />
          Settings
        </Link>
      </div>
    </div>
  );
}
