import { SettingsLayout } from "@/features/settings/components/SettingsLayout";

export default function SettingsPage() {
  return (
    <div className="p-6 sm:p-8 md:p-12 max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
          Dashboard Settings
        </h1>
        <p className="text-lg text-zinc-400">
          Manage your account preferences, profile visibility, and data
          protections.
        </p>
      </div>

      <SettingsLayout />
    </div>
  );
}
