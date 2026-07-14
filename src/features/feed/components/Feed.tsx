"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "../api/getFeed";
import { FeedCard } from "./FeedCard";
import { useEffect, useRef } from "react";

import { UserRole } from "../types";

interface FeedProps {
  role?: UserRole;
}

export function Feed({ role = "founder" }: FeedProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["feed", role],
      queryFn: ({ pageParam = 0 }) => getFeed(pageParam, role),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center overflow-hidden py-6 gap-8">
        <div className="w-full max-w-[450px] aspect-[9/16] rounded-[2rem] bg-card border border-border animate-pulse shadow-xl" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-20 text-center text-red-500">
        Error loading feed. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full h-full overflow-y-auto py-8 hide-scrollbar max-w-2xl mx-auto snap-y snap-mandatory scroll-smooth">
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex} className="contents">
          {page.items.map((item) => (
            <div
              key={item.id}
              className="w-full snap-center flex justify-center"
            >
              <FeedCard item={item} role={role} />
            </div>
          ))}
        </div>
      ))}

      <div
        ref={loadMoreRef}
        className="w-full flex items-center justify-center py-6 snap-start"
      >
        {isFetchingNextPage ? (
          <div className="h-8 w-8 rounded-full border-4 border-muted border-t-[#00C6D8] animate-spin" />
        ) : !hasNextPage ? (
          <p className="text-muted-foreground text-sm font-medium">
            You&apos;ve reached the end!
          </p>
        ) : null}
      </div>
    </div>
  );
}
