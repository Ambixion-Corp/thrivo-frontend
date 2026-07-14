import { ReactNode } from "react";

import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Left Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center relative z-10 px-4 py-12 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00C6D8]/10 rounded-full blur-[120px] z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>

      {/* Right Side: Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 items-center justify-center p-12 overflow-hidden">
        {/* Dynamic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/20 via-[#0A0A0A] to-[#8DEE5F]/20" />
        <div className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-[#00C6D8]/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] bg-[#8DEE5F]/10 rounded-full blur-[150px] mix-blend-screen" />

        {/* Glassmorphic Card */}
        <div className="relative z-10 w-full max-w-lg rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl p-10 transform hover:scale-[1.02] transition-transform duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-[2.5rem]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#8DEE5F]" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                The Ecosystem
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              The Operating System for Entrepreneurship.
            </h2>
            <p className="text-lg text-zinc-400 font-medium mb-8">
              Pitch to investors, discover groundbreaking startups, and monetize
              your influence all in one unified platform.
            </p>

            {/* Pseudo-UI elements to look like the app */}
            <div className="space-y-4">
              <div className="h-16 w-full rounded-2xl bg-white/5 border border-white/5 flex items-center px-4 gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00C6D8] to-[#8DEE5F] flex items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-[#0A0A0A]" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-2.5 w-1/3 bg-white/20 rounded-full" />
                  <div className="h-2 w-1/4 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="h-16 w-3/4 rounded-2xl bg-white/5 border border-white/5 flex items-center px-4 gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-[#0A0A0A]" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-2.5 w-1/3 bg-white/20 rounded-full" />
                  <div className="h-2 w-1/4 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
