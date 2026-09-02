"use client";

import { useState } from "react";
import {
  Upload,
  Rocket,
  DollarSign,
  Target,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PitchFormData {
  name: string;
  oneLiner: string;
  category: string;
  stage: string;
  fundingGoal: string;
  targetCheckSize: string;
  monthlyRunway: string;
  deckFileName: string;
  ndaRequired: boolean;
}

const INITIAL_DATA: PitchFormData = {
  name: "",
  oneLiner: "",
  category: "AI & Machine Learning",
  stage: "Seed",
  fundingGoal: "",
  targetCheckSize: "$50k - $250k",
  monthlyRunway: "12 months",
  deckFileName: "",
  ndaRequired: true,
};

export default function CreatePitchPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<PitchFormData>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("thrivo_pitch_draft");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          sessionStorage.removeItem("thrivo_pitch_draft");
        }
      }
    }
    return INITIAL_DATA;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof PitchFormData, value: string | boolean) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      sessionStorage.setItem("thrivo_pitch_draft", JSON.stringify(next));
      return next;
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      setIsSubmitting(true);
      // Simulate pitch creation submission
      sessionStorage.removeItem("thrivo_pitch_draft");
      setTimeout(() => {
        router.push("/startups");
      }, 600);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField("deckFileName", file.name);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 sm:p-8 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-tr from-[#00C6D8]/10 to-[#8DEE5F]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl bg-black/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 sm:p-10 relative z-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create a Pitch
            </h1>
            <p className="text-zinc-400 font-medium text-sm">
              {step === 1 && "Step 1 of 3: Startup Basics"}
              {step === 2 && "Step 2 of 3: Financials & Traction"}
              {step === 3 && "Step 3 of 3: Confidential Pitch Deck"}
            </p>
          </div>
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/5 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <form onSubmit={handleNextStep}>
          {/* STEP 1: Startup Basics */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label
                  htmlFor="startupName"
                  className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                >
                  Startup Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Rocket className="h-5 w-5 text-[#00C6D8]" />
                  </div>
                  <input
                    id="startupName"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. Thrivo OS"
                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all text-base font-medium shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="oneLiner"
                  className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                >
                  One-Liner (Elevator Pitch)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-[#8DEE5F]" />
                  </div>
                  <input
                    id="oneLiner"
                    required
                    type="text"
                    value={formData.oneLiner}
                    onChange={(e) => updateField("oneLiner", e.target.value)}
                    placeholder="The unified operating system for entrepreneurship"
                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all text-base font-medium shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                  >
                    Primary Sector
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Layers className="h-5 w-5 text-zinc-400" />
                    </div>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-base font-medium"
                    >
                      <option className="bg-zinc-900">
                        AI & Machine Learning
                      </option>
                      <option className="bg-zinc-900">B2B SaaS</option>
                      <option className="bg-zinc-900">Fintech</option>
                      <option className="bg-zinc-900">
                        Hardware & DeepTech
                      </option>
                      <option className="bg-zinc-900">Consumer Tech</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stage"
                    className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                  >
                    Funding Stage
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-zinc-400" />
                    </div>
                    <select
                      id="stage"
                      value={formData.stage}
                      onChange={(e) => updateField("stage", e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-base font-medium"
                    >
                      <option className="bg-zinc-900">Pre-Seed</option>
                      <option className="bg-zinc-900">Seed</option>
                      <option className="bg-zinc-900">Series A</option>
                      <option className="bg-zinc-900">Series B</option>
                      <option className="bg-zinc-900">Growth</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Financials & Traction */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label
                  htmlFor="fundingGoal"
                  className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                >
                  Total Funding Round Goal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    id="fundingGoal"
                    required
                    type="text"
                    value={formData.fundingGoal}
                    onChange={(e) => updateField("fundingGoal", e.target.value)}
                    placeholder="e.g. $1,500,000"
                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-base font-medium shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkSize"
                    className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                  >
                    Target Check Size
                  </label>
                  <select
                    id="checkSize"
                    value={formData.targetCheckSize}
                    onChange={(e) =>
                      updateField("targetCheckSize", e.target.value)
                    }
                    className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-base font-medium"
                  >
                    <option className="bg-zinc-900">$25k - $50k</option>
                    <option className="bg-zinc-900">$50k - $250k</option>
                    <option className="bg-zinc-900">$250k - $1M</option>
                    <option className="bg-zinc-900">$1M+</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="runway"
                    className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2"
                  >
                    Current Runway
                  </label>
                  <select
                    id="runway"
                    value={formData.monthlyRunway}
                    onChange={(e) =>
                      updateField("monthlyRunway", e.target.value)
                    }
                    className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-base font-medium"
                  >
                    <option className="bg-zinc-900">3 - 6 months</option>
                    <option className="bg-zinc-900">6 - 12 months</option>
                    <option className="bg-zinc-900">12 - 18 months</option>
                    <option className="bg-zinc-900">18+ months</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-400 leading-relaxed">
                💡{" "}
                <span className="font-bold text-white">
                  Tiered Privacy Note:
                </span>{" "}
                Specific revenue and customer count figures will be encrypted in
                your secure Data Room and only revealed to accredited investors
                who execute your digital NDA.
              </div>
            </div>
          )}

          {/* STEP 3: Deck Upload & Review */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2">
                  Pitch Deck Document (PDF)
                </label>
                <label className="w-full h-36 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#00C6D8]/50 hover:bg-[#00C6D8]/5 transition-all group cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#00C6D8]" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-white group-hover:text-[#00C6D8]">
                      {formData.deckFileName ||
                        "Click to select or drop pitch deck PDF"}
                    </span>
                    <p className="text-xs text-zinc-500 mt-1">
                      Maximum file size: 50MB
                    </p>
                  </div>
                </label>
              </div>

              {/* Review summary */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Startup Name:</span>
                  <span className="text-white font-semibold">
                    {formData.name || "Untitled Startup"}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Stage & Sector:</span>
                  <span className="text-white font-semibold">
                    {formData.stage} • {formData.category}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Funding Round:</span>
                  <span className="text-[#8DEE5F] font-bold">
                    {formData.fundingGoal || "$1,000,000"}
                  </span>
                </div>
              </div>

              {/* NDA Checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ndaRequired}
                  onChange={(e) => updateField("ndaRequired", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#00C6D8] focus:ring-[#00C6D8]"
                />
                <div className="text-xs text-zinc-300 leading-relaxed">
                  <div className="flex items-center gap-1 font-bold text-white mb-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#00C6D8]" />
                    Enforce Tiered Privacy & Digital NDA
                  </div>
                  Lock detailed financial projections and the full pitch deck
                  behind an investor NDA signature barrier.
                </div>
              </label>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-zinc-300 font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold tracking-wide hover:shadow-[0_0_25px_rgba(0,198,216,0.4)] transition-all flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing...</span>
              ) : step === 3 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Publish Pitch
                </>
              ) : (
                <>
                  Next Step <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
