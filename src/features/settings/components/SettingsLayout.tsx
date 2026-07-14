"use client";

import { useState } from "react";

import {
  User,
  Shield,
  Rocket,
  Target,
  Sparkles,
  ShoppingBag,
  Crown,
} from "lucide-react";
import { ProfileForm } from "./ProfileForm";
import { PrivacySettings } from "./PrivacySettings";
import { StartupForm } from "./StartupForm";
import { InvestorForm } from "./InvestorForm";
import { CreatorForm } from "./CreatorForm";
import { ConsumerForm } from "./ConsumerForm";
import { BillingSettings } from "./BillingSettings";

export function SettingsLayout() {
  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "startup"
    | "investor"
    | "creator"
    | "consumer"
    | "privacy"
    | "subscription"
  >("profile");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-[#00C6D8]/10 text-[#00C6D8] font-semibold border border-[#00C6D8]/20 shadow-[0_0_20px_rgba(0,198,216,0.1)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <User className="w-5 h-5" />
            General Profile
          </button>

          <button
            onClick={() => setActiveTab("startup")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "startup"
                ? "bg-[#00C6D8]/10 text-[#00C6D8] font-semibold border border-[#00C6D8]/20 shadow-[0_0_20px_rgba(0,198,216,0.1)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Rocket className="w-5 h-5" />
            Startup Metrics
          </button>

          <button
            onClick={() => setActiveTab("investor")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "investor"
                ? "bg-[#00C6D8]/10 text-[#00C6D8] font-semibold border border-[#00C6D8]/20 shadow-[0_0_20px_rgba(0,198,216,0.1)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Target className="w-5 h-5" />
            Investor Focus
          </button>

          <button
            onClick={() => setActiveTab("creator")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "creator"
                ? "bg-[#8DEE5F]/10 text-[#8DEE5F] font-semibold border border-[#8DEE5F]/20 shadow-[0_0_20px_rgba(141,238,95,0.1)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Creator Portfolio
          </button>

          <button
            onClick={() => setActiveTab("consumer")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "consumer"
                ? "bg-white/10 text-white font-semibold border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Consumer Prefs
          </button>

          <button
            onClick={() => setActiveTab("subscription")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "subscription"
                ? "bg-gradient-to-r from-amber-500/20 to-yellow-400/20 text-yellow-500 font-semibold border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Crown className="w-5 h-5" />
            Thrivo Pro
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "privacy"
                ? "bg-[#8DEE5F]/10 text-[#8DEE5F] font-semibold border border-[#8DEE5F]/20 shadow-[0_0_20px_rgba(141,238,95,0.1)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Shield className="w-5 h-5" />
            Privacy & Security
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-card/40 backdrop-blur-xl border border-border rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 -z-10 ${
            activeTab === "profile"
              ? "bg-[#00C6D8]/5"
              : activeTab === "subscription"
                ? "bg-yellow-500/10"
                : "bg-[#8DEE5F]/5"
          }`}
        />

        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
            {activeTab === "profile" && "General Profile"}
            {activeTab === "startup" && "Startup Metrics & Portfolio"}
            {activeTab === "investor" && "Investor Preferences"}
            {activeTab === "creator" && "Creator Portfolio"}
            {activeTab === "consumer" && "Consumer Preferences"}
            {activeTab === "privacy" && "Privacy & Security"}
            {activeTab === "subscription" && "Billing & Subscription"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {activeTab === "profile" &&
              "Manage how you appear on the Thrivo platform."}
            {activeTab === "startup" &&
              "Update your pitch deck, financials, and growth metrics."}
            {activeTab === "investor" &&
              "Define your thesis and receive curated deal flow."}
            {activeTab === "creator" &&
              "Showcase your reach to attract brand deals."}
            {activeTab === "consumer" &&
              "Manage your shopping and product discovery settings."}
            {activeTab === "privacy" &&
              "Control your data, metrics visibility, and NDA requirements."}
            {activeTab === "subscription" &&
              "Manage your billing, invoices, and Thrivo Pro features."}
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "startup" && <StartupForm />}
          {activeTab === "investor" && <InvestorForm />}
          {activeTab === "creator" && <CreatorForm />}
          {activeTab === "consumer" && <ConsumerForm />}
          {activeTab === "privacy" && <PrivacySettings />}
          {activeTab === "subscription" && <BillingSettings />}
        </div>
      </main>
    </div>
  );
}
