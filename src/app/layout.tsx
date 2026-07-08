import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import Providers from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thrivo - Make it Matter",
  description:
    "The unified platform connecting founders, creators, investors, and consumers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground"
      >
        <Providers>
          <Sidebar />

          {/* Main Content Area */}
          <div className="lg:pl-64 flex flex-col min-h-screen pb-16 lg:pb-0">
            <Header />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </main>
          </div>

          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
