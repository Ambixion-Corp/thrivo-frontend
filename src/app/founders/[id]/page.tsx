"use client";

import { useQuery } from "@tanstack/react-query";
import { getFounderById } from "@/features/founders/api/getFounder";
import { FounderHeader } from "@/features/founders/components/FounderHeader";
import { FounderBentoGrid } from "@/features/founders/components/FounderBentoGrid";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FounderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: founder, isLoading, error } = useQuery({
    queryKey: ["founder", id],
    queryFn: () => getFounderById(id),
  });

  if (isLoading) {
    return (
      <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
         {/* Back button skeleton */}
         <div className="h-6 w-24 bg-muted rounded animate-pulse" />
         {/* Header skeleton */}
         <div className="h-48 w-full bg-card rounded-3xl animate-pulse" />
         {/* Grid skeleton */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 h-64 bg-card rounded-3xl animate-pulse" />
           <div className="flex flex-col gap-6">
             <div className="flex-1 bg-card rounded-3xl animate-pulse" />
             <div className="flex-1 bg-card rounded-3xl animate-pulse" />
           </div>
         </div>
      </div>
    );
  }

  if (error || !founder) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-foreground">Founder not found</h2>
        <p className="text-muted-foreground mt-2 mb-6">We couldn't find the profile you're looking for.</p>
        <button 
          onClick={() => router.back()}
          className="rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/founders" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>
      </div>

      <FounderHeader founder={founder} />
      <FounderBentoGrid founder={founder} />
    </div>
  );
}
