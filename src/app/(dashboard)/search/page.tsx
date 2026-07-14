import {
  Search as SearchIcon,
  Filter,
  TrendingUp,
  Users,
  Rocket,
  DollarSign,
} from "lucide-react";
import Image from "next/image";

export default function SearchPage() {
  const trending = [
    { name: "SaaS Startups", searches: "12.5k" },
    { name: "AI Hardware", searches: "8.2k" },
    { name: "Creator Bounties", searches: "5.1k" },
  ];

  const results = [
    {
      id: 1,
      type: "Startup",
      title: "Thrivo OS",
      subtitle: "Dev Tribhuwan",
      img: "/startup_feed_1.png",
    },
    {
      id: 2,
      type: "Creator",
      title: "Leon Scott",
      subtitle: "Hardware Reviews",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leon",
    },
  ];

  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-4 text-center">
          What are you looking for?
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search startups, founders, creators..."
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-full pl-12 pr-12 py-4 text-white focus:outline-none focus:border-[#00C6D8] focus:bg-black transition-all shadow-xl text-lg"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-white">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Results</h3>
          <div className="space-y-4">
            {results.map((res) => (
              <div
                key={res.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-zinc-700 cursor-pointer transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl overflow-hidden bg-black relative border-2 border-zinc-800 ${res.type === "Creator" ? "rounded-full" : ""}`}
                >
                  <Image
                    src={res.img}
                    alt={res.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{res.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#00C6D8]">
                      {res.type}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      • {res.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
              <TrendingUp className="w-5 h-5 text-[#8DEE5F]" /> Trending
            </h3>
            <div className="space-y-4">
              {trending.map((trend, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-600 font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {trend.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-zinc-500">
                    {trend.searches}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
