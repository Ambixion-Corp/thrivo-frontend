import { Users, Search, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NetworkPage() {
  const connections = [
    {
      id: 1,
      name: "Alice Wonderland",
      role: "Investor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    {
      id: 2,
      name: "Bob Builder",
      role: "Founder",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    {
      id: 3,
      name: "Charlie Chaplin",
      role: "Creator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    },
  ];

  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
          <Users className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Your Network
          </h1>
          <p className="text-sm text-zinc-400">
            Manage your connections across the ecosystem
          </p>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full bg-black border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00C6D8] transition-colors"
            />
          </div>
          <div className="text-sm font-bold text-zinc-400 hidden sm:block">
            {connections.length} Connections
          </div>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {connections.map((conn) => (
            <div
              key={conn.id}
              className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
                  <Image
                    src={conn.avatar}
                    alt={conn.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{conn.name}</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                    {conn.role}
                  </p>
                </div>
              </div>
              <Link
                href="/messages"
                className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-white"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
