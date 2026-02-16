"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSettingsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Highlights Card Skeletons */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="shadow-sm border rounded-lg p-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <Skeleton className="h-11 w-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        {/* Tabs Header */}
        <div className="grid w-full gap-2 bg-muted/40 p-1 md:grid-cols-3 rounded-lg">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Tabs Content Skeleton */}
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    </div>
  );
}
