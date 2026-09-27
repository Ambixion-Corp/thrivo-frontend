"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Lock,
  Unlock,
  FileText,
  Download,
  ShieldCheck,
  FilePieChart,
  FileCode2,
  MessagesSquare,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useNDAStore } from "@/store/ndaStore";
import { NDAModal } from "@/features/dataroom/components/NDAModal";

const DOCUMENTS = [
  {
    id: 1,
    name: "Series A Pitch Deck (v3).pdf",
    type: "deck",
    size: "12.4 MB",
    icon: FileText,
    date: "2 days ago",
    confidential: false,
  },
  {
    id: 2,
    name: "Q3_Financials_Audited.xlsx",
    type: "financials",
    size: "2.1 MB",
    icon: FilePieChart,
    date: "1 week ago",
    confidential: true,
  },
  {
    id: 3,
    name: "Cap_Table_Current.pdf",
    type: "cap-table",
    size: "840 KB",
    icon: FileText,
    date: "2 weeks ago",
    confidential: true,
  },
  {
    id: 4,
    name: "IP_Patents_Summary.zip",
    type: "ip",
    size: "45.2 MB",
    icon: FileCode2,
    date: "1 month ago",
    confidential: true,
  },
];

export default function DataRoomVaultPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const startupId = params?.id || "1";

  const { isNDASigned, getNDARecord, revokeNDA } = useNDAStore();
  const isSigned = isNDASigned(startupId);
  const ndaRecord = getNDARecord(startupId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState("");

  const handleDownload = (docName: string, isConfidential: boolean) => {
    if (isConfidential && !isSigned) {
      setIsModalOpen(true);
      return;
    }
    setDownloadToast(`Decrypting & downloading ${docName}...`);
    setTimeout(() => setDownloadToast(""), 2500);
  };

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

      {/* NDA Banner / Verification Badge */}
      {isSigned && ndaRecord ? (
        <div className="w-full bg-[#8DEE5F]/10 border border-[#8DEE5F]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-in fade-in duration-300">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#8DEE5F]/20 text-[#8DEE5F] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm tracking-wide">
                  Active Digital NDA Executed
                </h3>
                <span className="text-[10px] font-mono text-[#8DEE5F] bg-[#8DEE5F]/10 px-2 py-0.5 rounded-full border border-[#8DEE5F]/20">
                  Verified
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Signed by{" "}
                <strong className="text-white">{ndaRecord.signerName}</strong> (
                {ndaRecord.firmName}) on{" "}
                {new Date(ndaRecord.signedAt).toLocaleDateString()} • Audit:{" "}
                <span className="font-mono text-zinc-500">
                  {ndaRecord.auditHash.slice(0, 10)}...
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => revokeNDA(startupId)}
              className="text-xs font-semibold text-zinc-500 hover:text-red-400 transition-colors"
            >
              Reset NDA
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-amber-400 font-bold text-sm tracking-wide uppercase">
                Confidential Due Diligence Barrier
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 max-w-xl">
                Financial models, cap tables, and patent disclosures require an
                executed Digital Non-Disclosure Agreement (NDA) under Thrivo
                Tiered Privacy protocol.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-xs shrink-0 flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(0,198,216,0.3)] transition-all"
          >
            <Unlock className="w-3.5 h-3.5" /> Execute Digital NDA
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2 flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#00C6D8]" />
            Secure Data Room
          </h1>
          <p className="text-muted-foreground">
            Privileged metrics, cap table distributions, and diligence
            disclosures.
          </p>
        </div>

        <Link
          href={`/messages/founder-${startupId}`}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-[#00C6D8] hover:text-black transition-all shadow-[0_0_20px_rgba(0,198,216,0.2)]"
        >
          <MessagesSquare className="w-5 h-5" /> Negotiate Deal
        </Link>
      </div>

      {downloadToast && (
        <div className="mb-6 p-3 rounded-xl bg-[#00C6D8]/10 border border-[#00C6D8]/30 text-xs text-[#00C6D8] font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadToast}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Pitch Deck & Financials */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pitch Deck Viewer Mock */}
          <div className="bg-card border border-border rounded-3xl p-1 shadow-xl overflow-hidden group">
            <div className="aspect-video w-full bg-[#0a0a0a] rounded-[22px] relative overflow-hidden flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="text-center relative z-10 p-6">
                <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] mb-3">
                  Pitch Deck Viewer
                </h2>
                <p className="text-muted-foreground font-medium text-xs sm:text-sm flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-[#00C6D8]" />
                  {isSigned
                    ? `Watermarked for ${ndaRecord?.signerName} (${ndaRecord?.firmName})`
                    : "Watermarked to institutional session IP"}
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
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "ARR", value: "$1.2M", diff: "+12%" },
                { label: "Burn Rate", value: "$45k/mo", diff: "-5%" },
                { label: "Runway", value: "18 mos", diff: "" },
                { label: "Valuation Cap", value: "$15M", diff: "" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-card border border-border rounded-2xl p-4 flex flex-col justify-center transition-all ${
                    !isSigned ? "blur-[6px] select-none" : ""
                  }`}
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
                        className={`text-[10px] font-bold ${
                          stat.diff.startsWith("+")
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {stat.diff}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isSigned && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-[2px] p-4 text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-2 backdrop-blur-md shadow-lg transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-[#00C6D8]" /> Unlock
                  Verified Metrics with NDA
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Document Vault */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-muted-foreground" />
                Document Vault
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {DOCUMENTS.length} Files
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {DOCUMENTS.map((doc) => {
                const isLocked = doc.confidential && !isSigned;

                return (
                  <div
                    key={doc.id}
                    onClick={() => handleDownload(doc.name, doc.confidential)}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 border border-transparent hover:border-border transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isLocked
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-secondary text-muted-foreground group-hover:text-[#00C6D8] group-hover:bg-[#00C6D8]/10"
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <doc.icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate max-w-[140px] xl:max-w-[180px]">
                          {doc.name}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5 font-medium">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          {doc.confidential && (
                            <span className="text-[9px] font-bold uppercase text-amber-400">
                              NDA
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                        isLocked
                          ? "border-amber-500/30 text-amber-400 bg-amber-500/10 group-hover:bg-amber-500/20"
                          : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <button
                onClick={() => {
                  if (!isSigned) setIsModalOpen(true);
                  else
                    alert(
                      "Request for custom technical diligence audit submitted to founders.",
                    );
                }}
                className="w-full py-3 rounded-xl bg-secondary/50 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border border-dashed flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Request Additional
                Diligence Audit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NDA Modal */}
      <NDAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        startupId={startupId}
        startupName="Thrivo Technologies"
        onSuccess={() => {
          setDownloadToast(
            "Digital NDA executed! Confidential documents unlocked.",
          );
          setTimeout(() => setDownloadToast(""), 3000);
        }}
      />
    </div>
  );
}
