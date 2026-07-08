import { AuthCard } from "@/features/auth/components/AuthCard";
import { SignupForm } from "@/features/auth/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <Link
        href="/"
        className="flex items-center gap-2 mb-4 group hover:scale-105 transition-transform"
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px] shadow-lg shadow-[#00C6D8]/20">
          <div className="h-full w-full bg-black rounded-lg flex items-center justify-center font-bold text-white">
            T
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Thrivo
        </span>
      </Link>

      <AuthCard
        title="Create an account"
        description="Join the ultimate startup ecosystem today."
        footerText="Already have an account?"
        footerLinkText="Log in"
        footerLinkHref="/login"
      >
        <SignupForm />
      </AuthCard>
    </div>
  );
}
