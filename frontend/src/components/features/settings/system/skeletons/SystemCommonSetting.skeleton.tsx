"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SystemCommonSettingSkeleton() {
  return (
    <div className="space-y-6">
      {/* 上段2枚 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Card 1 */}
        <div className="border border-border/70 shadow-sm rounded-lg p-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-20" />
        </div>

        {/* Card 2 */}
        <div className="border border-border/70 shadow-sm rounded-lg p-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      {/* 下段1枚 About */}
      <div className="border border-border/70 shadow-sm rounded-lg p-6 space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
