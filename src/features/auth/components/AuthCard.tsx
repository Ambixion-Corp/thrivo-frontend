import { ReactNode } from "react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border shadow-2xl relative overflow-hidden">
      {/* Decorative subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#00C6D8]/10 blur-[80px] rounded-full -z-10" />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}

      <div className="mt-8 text-center text-sm text-muted-foreground">
        {footerText}{" "}
        <Link
          href={footerLinkHref}
          className="font-semibold text-[#00C6D8] hover:text-[#8DEE5F] transition-colors"
        >
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
}
