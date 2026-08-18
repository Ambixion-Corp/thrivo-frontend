"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Save } from "lucide-react";
import Link from "next/link";
import { getStartupById } from "@/features/startups/api/getStartup";
import { StartupProfile } from "@/features/startups/types";

interface StartupDraft {
  name: string;
  oneLiner: string;
  description: string;
  stage: string;
}

function getInitialDraft(startup: StartupProfile): StartupDraft {
  if (typeof window !== "undefined") {
    const savedDraft = window.sessionStorage.getItem(
      `thrivo-startup-${startup.id}`,
    );
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft) as StartupDraft;
      } catch {
        window.sessionStorage.removeItem(`thrivo-startup-${startup.id}`);
      }
    }
  }

  return {
    name: startup.name,
    oneLiner: startup.oneLiner,
    description: startup.description,
    stage: startup.stage,
  };
}

export default function StartupEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const {
    data: startup,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["startup", id],
    queryFn: () => getStartupById(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
        <div className="h-10 w-72 bg-muted rounded animate-pulse" />
        <div className="h-96 bg-card rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Startup not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          We could not load the startup you want to edit.
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-6 rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <StartupEditorForm startup={startup} />;
}

function StartupEditorForm({ startup }: { startup: StartupProfile }) {
  const [draft, setDraft] = useState<StartupDraft>(() =>
    getInitialDraft(startup),
  );
  const [saved, setSaved] = useState(false);

  const updateDraft = (field: keyof StartupDraft, value: string) => {
    setSaved(false);
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.sessionStorage.setItem(
      `thrivo-startup-${startup.id}`,
      JSON.stringify(draft),
    );
    setSaved(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href="/startups"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Startups
      </Link>

      <div className="mt-8 mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#00C6D8]">
          Startup profile
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Edit {startup.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Update the profile information shown to investors and creators.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-3xl border border-border bg-card p-6 sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-foreground">
              Startup name
            </span>
            <input
              required
              value={draft.name}
              onChange={(event) => updateDraft("name", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-[#00C6D8] focus:ring-2 focus:ring-[#00C6D8]/20"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-foreground">
              One-liner
            </span>
            <input
              required
              value={draft.oneLiner}
              onChange={(event) => updateDraft("oneLiner", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-[#00C6D8] focus:ring-2 focus:ring-[#00C6D8]/20"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-foreground">Stage</span>
            <select
              value={draft.stage}
              onChange={(event) => updateDraft("stage", event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-[#00C6D8] focus:ring-2 focus:ring-[#00C6D8]/20"
            >
              <option>Pre-Seed</option>
              <option>Seed</option>
              <option>Series A</option>
              <option>Series B</option>
              <option>Growth</option>
            </select>
          </label>

          <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
            Startup ID
            <strong className="mt-1 block text-foreground">{startup.id}</strong>
          </div>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-foreground">
              Description
            </span>
            <textarea
              required
              rows={7}
              value={draft.description}
              onChange={(event) =>
                updateDraft("description", event.target.value)
              }
              className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-[#00C6D8] focus:ring-2 focus:ring-[#00C6D8]/20"
            />
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Prototype mode: changes are saved in this browser session until
            backend persistence is connected.
          </p>
          <div className="flex gap-3">
            <Link
              href="/startups"
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-[#00C6D8] hover:text-black"
            >
              {saved ? (
                <Check className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saved ? "Saved" : "Save draft"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
