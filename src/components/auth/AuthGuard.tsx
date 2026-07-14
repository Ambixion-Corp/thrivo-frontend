"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [isAuthenticated, router, pathname]);

  if (!mounted) return null;

  if (!isAuthenticated) return null; // Let the router handle the redirect

  return <>{children}</>;
}
