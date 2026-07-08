import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
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
        title="Welcome back"
        description="Enter your credentials to access your account."
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkHref="/signup"
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
}
