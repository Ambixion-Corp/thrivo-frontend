"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "../api/getFeed";
import { FeedCard } from "./FeedCard";
import { useEffect, useRef } from "react";

export function Feed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam = 0 }) => getFeed(pageParam),
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
      { threshold: 0.1 }
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
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] w-full overflow-y-auto snap-y snap-mandatory pb-24 scroll-smooth">
      <div className="flex flex-col items-center py-6 sm:py-8 gap-8 lg:gap-12">
        {data.pages.map((page, pageIndex) => (
          <div key={pageIndex} className="flex flex-col gap-8 lg:gap-12 w-full contents">
            {page.items.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        ))}
        
        <div ref={loadMoreRef} className="h-20 w-full flex items-center justify-center snap-center">
          {isFetchingNextPage ? (
            <div className="h-8 w-8 rounded-full border-4 border-muted border-t-[#00C6D8] animate-spin" />
          ) : !hasNextPage ? (
            <p className="text-muted-foreground text-sm font-medium">You've reached the end!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
