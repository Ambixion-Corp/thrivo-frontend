import { StartupProfile } from "../types";
import { Play } from "lucide-react";

interface StartupHeroProps {
  startup: StartupProfile;
}

export function StartupHero({ startup }: StartupHeroProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] rounded-b-[3rem] overflow-hidden group">
      {/* Fake Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/20 to-[#8DEE5F]/20 transition-transform duration-[20s] group-hover:scale-110 ease-linear" />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Play Button Overlay (Simulating Video Trailer) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-[#00C6D8]/20 transition-all shadow-2xl">
           <Play className="h-8 w-8 ml-1" />
        </button>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-5xl mx-auto w-full">
        <div className="flex items-end gap-6 relative z-10">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px] shrink-0 shadow-2xl">
             <div className="h-full w-full rounded-2xl bg-black flex items-center justify-center text-3xl font-bold text-white">
               {startup.logo}
             </div>
          </div>
          
          <div className="flex-1 pb-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {startup.name}
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mt-2 font-medium max-w-2xl">
              {startup.oneLiner}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
