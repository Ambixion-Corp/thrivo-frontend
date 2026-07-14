"use client";

import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Lock,
  FileText,
  Download,
  ShieldAlert,
  FilePieChart,
  FileCode2,
  MessagesSquare,
} from "lucide-react";
import Link from "next/link";

const DOCUMENTS = [
  {
    id: 1,
    name: "Series A Pitch Deck (v3).pdf",
    type: "deck",
    size: "12.4 MB",
    icon: FileText,
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Q3_Financials_Audited.xlsx",
    type: "financials",
    size: "2.1 MB",
    icon: FilePieChart,
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Cap_Table_Current.pdf",
    type: "cap-table",
    size: "840 KB",
    icon: FileText,
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "IP_Patents_Summary.zip",
    type: "ip",
    size: "45.2 MB",
    icon: FileCode2,
    date: "1 month ago",
  },
];

export default function DataRoomVaultPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto pb-16 px-4 sm:px-6 lg:px-8 pt-4">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group font-medium"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </button>
      </div>

      {/* NDA Banner */}
      <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-4 mb-8">
        <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-red-500 font-bold text-sm tracking-wide uppercase mb-1">
            Strictly Confidential
          </h3>
          <p className="text-xs text-red-500/80 leading-relaxed">
            You are viewing this Data Room under an active Non-Disclosure
            Agreement (NDA). All materials, including financials, intellectual
            property, and strategic plans, are strictly confidential and must
            not be shared, duplicated, or distributed.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2 flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#00C6D8]" />
            Secure Data Room
          </h1>
          <p className="text-muted-foreground">
            Accessing highly privileged startup metrics and documents.
          </p>
        </div>

        <Link
          href="/messages/founder-id-123"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-[#00C6D8] hover:text-black transition-all shadow-[0_0_20px_rgba(0,198,216,0.2)]"
        >
          <MessagesSquare className="w-5 h-5" /> Negotiate Deal
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Pitch Deck & Financials (Wider) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pitch Deck Viewer Mock */}
          <div className="bg-card border border-border rounded-3xl p-1 shadow-xl overflow-hidden group">
            <div className="aspect-video w-full bg-[#0a0a0a] rounded-[22px] relative overflow-hidden flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="text-center relative z-10">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] mb-4">
                  Pitch Deck Viewer
                </h2>
                <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Watermarked to your IP address
                </p>
              </div>

              {/* Simulated UI controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full flex items-center gap-6">
                <span className="text-xs text-muted-foreground font-bold hover:text-white cursor-pointer">
                  Prev
                </span>
                <span className="text-xs text-white font-bold">1 / 15</span>
                <span className="text-xs text-muted-foreground font-bold hover:text-white cursor-pointer">
                  Next
                </span>
              </div>
            </div>
          </div>

          {/* Quick Financials Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "ARR", value: "$1.2M", diff: "+12%" },
              { label: "Burn Rate", value: "$45k/mo", diff: "-5%" },
              { label: "Runway", value: "18 mos", diff: "" },
              { label: "Valuation Cap", value: "$15M", diff: "" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center"
              >
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  {stat.diff && (
                    <span
                      className={`text-[10px] font-bold ${stat.diff.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {stat.diff}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Document Vault */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Document Vault
            </h3>

            <div className="flex flex-col gap-3 flex-1">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 border border-transparent hover:border-border transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-[#00C6D8] group-hover:bg-[#00C6D8]/10 transition-colors">
                      <doc.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground truncate max-w-[140px] xl:max-w-[180px]">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5 font-medium">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all shrink-0">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <button className="w-full py-3 rounded-xl bg-secondary/50 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border border-dashed">
                Request Additional Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
