import { Founder } from "../types";
import { TrendingUp, Rocket, Building2 } from "lucide-react";

interface FounderBentoGridProps {
  founder: Founder;
}

export function FounderBentoGrid({ founder }: FounderBentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Bio Card (Spans 2 columns on Desktop) */}
      <div className="md:col-span-2 rounded-3xl bg-card border border-border shadow-sm p-6 sm:p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          About
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {founder.bio}
        </p>
      </div>

      {/* Metrics Stack */}
      <div className="flex flex-col gap-6">
        <div className="flex-1 rounded-3xl bg-card border border-border shadow-sm p-6 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-[#00C6D8]/10 rounded-full blur-2xl group-hover:bg-[#00C6D8]/20 transition-colors duration-500" />
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <TrendingUp className="h-5 w-5 text-[#00C6D8]" />
            <span className="font-medium text-sm">Total Raised</span>
          </div>
          <span className="text-3xl font-bold text-foreground">{founder.metrics.totalRaised}</span>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
           <div className="rounded-3xl bg-card border border-border shadow-sm p-4 flex flex-col items-center justify-center text-center">
             <Rocket className="h-5 w-5 text-[#8DEE5F] mb-2" />
             <span className="text-2xl font-bold text-foreground">{founder.metrics.exits}</span>
             <span className="text-xs text-muted-foreground mt-1">Exits</span>
           </div>
           <div className="rounded-3xl bg-card border border-border shadow-sm p-4 flex flex-col items-center justify-center text-center">
             <Building2 className="h-5 w-5 text-foreground mb-2" />
             <span className="text-2xl font-bold text-foreground">{founder.metrics.startupsFounded}</span>
             <span className="text-xs text-muted-foreground mt-1">Startups</span>
           </div>
        </div>
      </div>

      {/* Startups Section (Full Width) */}
      <div className="md:col-span-3 mt-4">
        <h3 className="text-xl font-semibold mb-6 text-foreground">Current & Past Ventures</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {founder.startups.map((startup) => (
            <div key={startup.id} className="rounded-3xl bg-card border border-border shadow-sm p-6 flex flex-col relative group hover:border-[#00C6D8]/50 transition-colors duration-300">
               <div className="flex justify-between items-start mb-4">
                 <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold">
                   {startup.name.charAt(0)}
                 </div>
                 <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                   startup.status === 'Active' ? 'bg-[#8DEE5F]/20 text-[#8DEE5F]' : 
                   startup.status === 'Acquired' ? 'bg-[#00C6D8]/20 text-[#00C6D8]' : 'bg-muted text-muted-foreground'
                 }`}>
                   {startup.status}
                 </span>
               </div>
               
               <h4 className="text-lg font-bold text-foreground">{startup.name}</h4>
               <p className="text-sm font-medium text-muted-foreground mt-1 mb-4">{startup.role}</p>
               
               <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                 {startup.description}
               </p>

               {startup.metrics && (
                 <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
                   {startup.metrics.raised && (
                     <div className="flex flex-col">
                       <span className="text-muted-foreground text-xs">Raised</span>
                       <span className="font-semibold text-foreground">{startup.metrics.raised}</span>
                     </div>
                   )}
                   {startup.metrics.arr && (
                     <div className="flex flex-col">
                       <span className="text-muted-foreground text-xs">ARR</span>
                       <span className="font-semibold text-foreground">{startup.metrics.arr}</span>
                     </div>
                   )}
                   {startup.metrics.users && (
                     <div className="flex flex-col">
                       <span className="text-muted-foreground text-xs">Users</span>
                       <span className="font-semibold text-foreground">{startup.metrics.users}</span>
                     </div>
                   )}
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
