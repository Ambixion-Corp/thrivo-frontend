import { SettingsLayout } from "@/features/settings/components/SettingsLayout";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-sm">
          <SettingsIcon className="w-5 h-5 text-[#00C6D8]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Settings & Ecosystem Preferences
          </h1>
          <p className="text-sm text-zinc-400">
            Configure your personal profile, startup metrics, investor thesis,
            and billing.
          </p>
        </div>
      </div>

      <SettingsLayout />
    </div>
  );
}
