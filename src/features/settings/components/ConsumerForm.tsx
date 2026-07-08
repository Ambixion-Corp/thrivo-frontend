"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  ShoppingBag,
  MapPin,
  CreditCard,
} from "lucide-react";

export function ConsumerForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [interests, setInterests] = useState<string[]>(["Gadgets", "Software"]);

  const ALL_INTERESTS = [
    "Gadgets",
    "Software",
    "Health & Wellness",
    "Fashion",
    "Gaming",
    "Home Tech",
  ];

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

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
          <ShoppingBag className="w-5 h-5 text-white" />
          Consumer Preferences
        </h3>
        <p className="text-sm text-muted-foreground">
          Discover the coolest new startup products and buy them directly from
          your feed.
        </p>

        <div className="space-y-4 pt-2">
          <label className="text-sm font-medium text-foreground mb-1 block">
            Product Interests
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ALL_INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                  interests.includes(interest)
                    ? "bg-white/20 border-white/50 text-white"
                    : "bg-transparent border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" /> Default
              Shipping Address
            </label>
            <textarea
              rows={3}
              defaultValue="123 Startup Blvd, Suite 400&#10;San Francisco, CA 94105"
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" /> Payment
              Methods
            </label>
            <div className="p-4 rounded-xl border border-border bg-background/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-white">
                  VISA
                </div>
                <span className="text-sm font-medium">•••• 4242</span>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-[#00C6D8] hover:underline"
              >
                Edit
              </button>
            </div>
            <button
              type="button"
              className="w-full py-3 rounded-xl border border-dashed border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              + Add new payment method
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
        {isSaved && (
          <span className="flex items-center gap-2 text-sm text-white animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Preferences saved
          </span>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-white text-black px-6 py-2.5 text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/20 disabled:opacity-70 flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isSaving ? "Saving..." : "Save Consumer Profile"}
        </button>
      </div>
    </form>
  );
}
