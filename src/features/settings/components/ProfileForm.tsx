"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  CheckCircle2,
  Loader2,
  FileText,
  Building2,
} from "lucide-react";

export function ProfileForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);

    // Simulate network request
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);

      // Reset saved state after 3 seconds
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[2px]">
            <div className="h-full w-full bg-card rounded-full flex items-center justify-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#00C6D8] to-[#8DEE5F]">
              J
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">
              Profile Picture
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              JPG, GIF or PNG. Max size of 5MB.
            </p>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors border border-border"
            >
              Upload New
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" /> Full Name
            </label>
            <input
              type="text"
              defaultValue="Juztriyaa"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" /> Location
            </label>
            <input
              type="text"
              defaultValue="San Francisco, CA"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" /> Headline
          </label>
          <input
            type="text"
            defaultValue="Building the next generation of AI tools at Thrivo."
            className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" /> Full Bio
          </label>
          <textarea
            rows={4}
            defaultValue="I'm a passionate builder focused on accelerating startup ecosystems. Previously founded two successful SaaS platforms and actively angel investing in hard tech."
            className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" /> Startup
              Name
            </label>
            <input
              type="text"
              defaultValue="Thrivo"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-muted-foreground" /> Website URL
            </label>
            <input
              type="url"
              defaultValue="https://thrivo.app"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="flex items-center text-muted-foreground mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </span>{" "}
              Twitter URL
            </label>
            <input
              type="url"
              defaultValue="https://twitter.com/juztriyaa"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="flex items-center text-muted-foreground mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </span>{" "}
              LinkedIn URL
            </label>
            <input
              type="url"
              defaultValue="https://linkedin.com/in/juztriyaa"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C6D8]/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
        {isSaved && (
          <span className="flex items-center gap-2 text-sm text-[#8DEE5F] animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Profile updated successfully
          </span>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-[#00C6D8] text-black px-6 py-2.5 text-sm font-bold hover:bg-[#8DEE5F] transition-colors shadow-lg shadow-[#00C6D8]/20 disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
