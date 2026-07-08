"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  Video,
  Users,
  UploadCloud,
} from "lucide-react";

export function CreatorForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8DEE5F]" />
          Creator Portfolio
        </h3>
        <p className="text-sm text-muted-foreground">
          Showcase your reach to attract brand deals and high-paying affiliates
          from top startups.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Video className="w-4 h-4 text-muted-foreground" /> Primary
              Platform
            </label>
            <select className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all appearance-none">
              <option>YouTube</option>
              <option>TikTok</option>
              <option>Instagram</option>
              <option>X / Twitter</option>
              <option>Newsletter / Blog</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" /> Total Audience
              Size
            </label>
            <input
              type="text"
              defaultValue="500k+"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#8DEE5F]/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <h3 className="text-lg font-bold text-foreground">Media Kit Upload</h3>
        <div className="border-2 border-dashed border-border hover:border-[#8DEE5F]/50 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-card/30">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="text-foreground font-semibold mb-1">
            Upload your Media Kit
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            PDF format recommended. Showcase your demographics, past sponsors,
            and rate card.
          </p>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-[#8DEE5F] hover:text-black transition-colors"
          >
            Browse Files
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
        {isSaved && (
          <span className="flex items-center gap-2 text-sm text-[#8DEE5F] animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Portfolio saved
          </span>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-[#00C6D8] text-black px-6 py-2.5 text-sm font-bold hover:bg-[#8DEE5F] transition-colors shadow-lg shadow-[#8DEE5F]/20 disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save Creator Profile"}
        </button>
      </div>
    </form>
  );
}
