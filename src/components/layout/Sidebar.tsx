import Link from "next/link";
import {
  Home,
  Users,
  Briefcase,
  CircleDollarSign,
  Globe,
  Settings,
  MessageSquare,
  Sparkles,
  Activity,
  Package,
} from "lucide-react";

const navigation = [
  { name: "Discovery Feed", href: "/", icon: Home },
  { name: "Founders", href: "/founders", icon: Users },
  { name: "Startups", href: "/startups", icon: Briefcase },
  { name: "Investors", href: "/investors", icon: CircleDollarSign },
  { name: "Creators", href: "/creators", icon: Sparkles },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Network", href: "/network", icon: Globe },
  { name: "Affiliates", href: "/affiliates", icon: Activity },
  { name: "My Orders", href: "/orders", icon: Package },
];

export function Sidebar() {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-background/80 lg:backdrop-blur-md">
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
              className="group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
            >
              <item.icon
                className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground"
                aria-hidden="true"
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
