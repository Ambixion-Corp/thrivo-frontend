"use client";

import { useQuery } from "@tanstack/react-query";
import { getDeals, Deal } from "../api/getDeals";
import Image from "next/image";
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  FolderLock,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const StatusIcon = ({ status }: { status: Deal["status"] }) => {
  switch (status) {
    case "Requested":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "Approved":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "Passed":
      return <XCircle className="w-4 h-4 text-red-500" />;
    case "Invested":
      return <ArrowUpRight className="w-4 h-4 text-[#00C6D8]" />;
  }
};

export function DealFlow() {
  const {
    data: deals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deals"],
    queryFn: getDeals,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 rounded-full border-4 border-muted border-t-[#00C6D8] animate-spin" />
      </div>
    );
  }

  if (error || !deals) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load deals.
      </div>
    );
  }

  const columns: { title: string; status: Deal["status"] }[] = [
    { title: "Data Room Requests", status: "Requested" },
    { title: "In Diligence", status: "Approved" },
    { title: "Portfolio", status: "Invested" },
  ];

  return (
    <div className="py-8 w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#00C6D8]/20 flex items-center justify-center">
          <FolderLock className="w-5 h-5 text-[#00C6D8]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Deal Flow
          </h1>
          <p className="text-sm text-zinc-400">
            Manage your active investments and data room access
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colDeals = deals.filter((d) => d.status === col.status);

          return (
            <div
              key={col.status}
              className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 flex flex-col min-h-[500px] min-w-[300px]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">{col.title}</h3>
                <span className="bg-zinc-800 text-zinc-400 text-xs font-bold px-2.5 py-1 rounded-full">
                  {colDeals.length}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {colDeals.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl">
                    <p className="text-sm font-medium text-zinc-600">
                      No deals in this stage
                    </p>
                  </div>
                ) : (
                  colDeals.map((deal) => (
                    <motion.div
                      layoutId={deal.id}
                      key={deal.id}
                      className="bg-black border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-colors group relative"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 relative">
                            <Image
                              src={deal.startupAvatar}
                              alt={deal.startupName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/startups/${deal.startupId}`}
                              className="font-bold text-white text-sm hover:text-[#00C6D8] transition-colors line-clamp-1"
                            >
                              {deal.startupName}
                            </Link>
                            <p className="text-xs text-zinc-500 font-medium">
                              {deal.founderName}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 p-1.5 bg-zinc-900 rounded-full">
                          <StatusIcon status={deal.status} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 text-xs font-medium border-t border-zinc-900 pt-3">
                        <span className="text-zinc-500">
                          {deal.requestedAt}
                        </span>
                        {deal.dealSize && (
                          <span className="text-[#8DEE5F] font-bold">
                            {deal.dealSize}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
