"use client";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

export default function LanguageSection() {
  return (
    <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
      <div className="flex items-center gap-2">
        <Globe className="size-4" />
        <Label className="font-medium">言語</Label>
      </div>
      <div className="flex items-center justify-between rounded-md border px-3 py-2">
        <span className="text-sm">日本語</span>
        <span className="text-xs text-muted-foreground">固定</span>
      </div>
    </section>
  );
}
