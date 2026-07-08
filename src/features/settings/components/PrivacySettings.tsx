"use client";

import { useState } from "react";
import { Lock, ShieldAlert, CheckCircle2, Loader2, EyeOff } from "lucide-react";

export function PrivacySettings() {
  const [requireNda, setRequireNda] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setIsSaved(false);

    // Simulate network request
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#00C6D8]/5 border border-[#00C6D8]/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="h-12 w-12 rounded-full bg-[#00C6D8]/10 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-[#00C6D8]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Data Protection (DPDP Ready)
          </h3>
          <p className="text-sm text-muted-foreground">
            Thrivo automatically encrypts your sensitive metrics using AES-256.
            You have full control over who can view your financial traction.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start justify-between p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-foreground" />
              <h4 className="font-semibold text-foreground">
                Require Investor NDA
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Lock private metrics (MRR, CAC, Churn) behind a digital NDA. Only
              verified investors who sign the agreement can view them.
            </p>
          </div>

          {/* Custom Toggle Switch */}
          <button
            type="button"
            onClick={() => setRequireNda(!requireNda)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              requireNda ? "bg-[#00C6D8]" : "bg-muted"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                requireNda ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-start justify-between p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-foreground" />
              <h4 className="font-semibold text-foreground">
                Hide from Discovery Feed
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Remove your startup from the public discovery feed. You will only
              be discoverable via direct link.
            </p>
          </div>

          <button
            type="button"
            className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-muted"
          >
            <span className="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
        {isSaved && (
          <span className="flex items-center gap-2 text-sm text-[#8DEE5F] animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Privacy settings updated
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl bg-foreground text-background px-6 py-2.5 text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save Privacy Settings"}
        </button>
      </div>
    </div>
  );
}
