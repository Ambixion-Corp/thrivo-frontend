import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { RightSidebar } from "@/components/layout/RightSidebar";

export default function ImmersiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full pb-[72px] lg:pb-0">
        <main className="flex-1 w-full relative overflow-hidden">
          {children}
        </main>
      </div>
      <RightSidebar />
      <MobileNav />
    </div>
  );
}
