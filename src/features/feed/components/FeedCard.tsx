import { FeedItem } from "../types";
import { Heart, MessageCircle, Share2, Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  // Generate a consistent but random-looking gradient based on the ID for the placeholder media
  const gradientClass = `bg-gradient-to-br from-[#00C6D8]/20 to-[#8DEE5F]/20`;

  return (
    <div className="w-full max-w-[450px] mx-auto aspect-[9/16] relative rounded-[2rem] overflow-hidden bg-zinc-900 border border-border shadow-xl snap-center shrink-0 group">
      {/* Fake Video/Media Background */}
      <div className={`absolute inset-0 ${gradientClass} transition-transform duration-[10s] group-hover:scale-110 ease-linear`} />
      
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        
        <div className="flex items-end justify-between gap-4">
          {/* Main Info */}
          <div className="flex-1 space-y-3">
            <Link href={`/founders/${item.founderId}`} className="flex items-center gap-2 group/author w-fit">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px]">
                 <div className="h-full w-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold">
                   {item.founderName.charAt(0)}
                 </div>
              </div>
              <span className="font-semibold text-white group-hover/author:text-[#00C6D8] transition-colors shadow-sm">
                {item.founderName}
              </span>
            </Link>

            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {item.startupName}
              </h2>
              <p className="text-sm text-zinc-300 mt-1 line-clamp-2 font-medium">
                {item.oneLiner}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Metrics Mini-Bar */}
            <div className="flex items-center gap-4 pt-2 text-xs font-medium text-zinc-400">
               {item.metrics.raised && <span>Raised: {item.metrics.raised}</span>}
               {item.metrics.users && <span>Users: {item.metrics.users}</span>}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex flex-col items-center gap-5 pb-4">
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white group-hover/btn:text-[#00C6D8] group-active/btn:scale-95 transition-all">
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-white shadow-sm">1.2k</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white group-hover/btn:text-white transition-all group-active/btn:scale-95">
                <MessageCircle className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-white shadow-sm">48</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 group/btn">
              <div className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white group-hover/btn:text-white transition-all group-active/btn:scale-95">
                <Share2 className="h-6 w-6" />
              </div>
            </button>
            
            <Link 
              href={`/startups/${item.id}`}
              className="mt-2 p-3 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] text-black shadow-lg shadow-[#00C6D8]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
            >
              <ArrowUpRight className="h-6 w-6" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
