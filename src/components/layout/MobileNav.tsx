import Link from "next/link";
import {
  Home,
  Users,
  Briefcase,
  CircleDollarSign,
  Globe,
} from "lucide-react";

const navigation = [
  { name: "Feed", href: "/", icon: Home },
  { name: "Founders", href: "/founders", icon: Users },
  { name: "Startups", href: "/startups", icon: Briefcase },
  { name: "Investors", href: "/investors", icon: CircleDollarSign },
  { name: "Network", href: "/network", icon: Globe },
];

export function MobileNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background/80 backdrop-blur-md border-t border-border px-2">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-secondary/50 group transition-colors rounded-lg my-1"
          >
            <item.icon className="w-5 h-5 mb-1 text-muted-foreground group-hover:text-foreground group-active:text-[#00C6D8] transition-colors" />
            <span className="text-[10px] text-muted-foreground group-hover:text-foreground">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
