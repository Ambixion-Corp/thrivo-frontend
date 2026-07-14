import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SmoothScroll>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 pb-[72px] lg:pb-0">
            <Header />
            <main className="flex-1 w-full relative">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </main>
          </div>
          <RightSidebar />
          <MobileNav />
        </div>
      </SmoothScroll>
    </AuthGuard>
  );
}
