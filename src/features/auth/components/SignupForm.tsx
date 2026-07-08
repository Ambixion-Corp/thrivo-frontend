"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  User,
  Megaphone,
} from "lucide-react";

export function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "founder",
      title: "Founder",
      icon: <Building2 className="w-5 h-5" />,
      desc: "Build startups and raise capital",
    },
    {
      id: "investor",
      title: "Investor",
      icon: <Briefcase className="w-5 h-5" />,
      desc: "Fund the next big thing",
    },
    {
      id: "creator",
      title: "Creator",
      icon: <Megaphone className="w-5 h-5" />,
      desc: "Monetize your audience",
    },
    {
      id: "consumer",
      title: "Consumer",
      icon: <User className="w-5 h-5" />,
      desc: "Discover new products",
    },
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    // Handle the actual signup logic here
    console.log("Signing up with role:", selectedRole);
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 px-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Sign up with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
              <span className="bg-[#0A0A0A] px-3 text-zinc-500">
                Or create an account
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleNextStep}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-xs font-bold text-zinc-400 uppercase tracking-wider"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Satoshi"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 focus:border-[#00C6D8]/50 transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-xs font-bold text-zinc-400 uppercase tracking-wider"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Nakamoto"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 focus:border-[#00C6D8]/50 transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-bold text-zinc-400 uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="founder@startup.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 focus:border-[#00C6D8]/50 transition-all placeholder:text-zinc-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-bold text-zinc-400 uppercase tracking-wider"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 focus:border-[#00C6D8]/50 transition-all placeholder:text-zinc-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black py-3.5 text-sm font-extrabold hover:shadow-[0_0_20px_rgba(0,198,216,0.4)] transition-all duration-300 mt-6 flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <form
          onSubmit={handleSignup}
          className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              How will you use Thrivo?
            </h3>
            <p className="text-sm text-zinc-400 font-medium">
              Select your primary role. You can always change this later.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <label
                key={role.id}
                className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                  selectedRole === role.id
                    ? "border-[#00C6D8] bg-[#00C6D8]/10 shadow-[0_0_20px_rgba(0,198,216,0.15)]"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.id}
                  className="sr-only"
                  onChange={(e) => setSelectedRole(e.target.value)}
                  checked={selectedRole === role.id}
                />

                <div
                  className={`mb-3 p-3 rounded-xl transition-colors duration-300 ${
                    selectedRole === role.id
                      ? "bg-[#00C6D8]/20 text-[#00C6D8]"
                      : "bg-white/10 text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {role.icon}
                </div>

                <span
                  className={`font-bold text-base mb-1 ${
                    selectedRole === role.id
                      ? "text-white"
                      : "text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {role.title}
                </span>

                <span
                  className={`text-[11px] font-medium text-center ${
                    selectedRole === role.id
                      ? "text-[#00C6D8]"
                      : "text-zinc-500"
                  }`}
                >
                  {role.desc}
                </span>

                {/* Active glow */}
                {selectedRole === role.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00C6D8]/10 to-transparent pointer-events-none" />
                )}
              </label>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!selectedRole}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black py-3.5 text-sm font-extrabold hover:shadow-[0_0_20px_rgba(0,198,216,0.4)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              Complete Signup
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
