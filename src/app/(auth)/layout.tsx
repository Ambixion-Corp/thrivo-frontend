import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background styling for Auth routes */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00C6D8]/20 rounded-full blur-[120px] z-0" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8DEE5F]/10 rounded-full blur-[120px] z-0" />

      {/* Ensure children stay above backgrounds */}
      <div className="relative z-10 w-full px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
