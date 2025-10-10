"use client";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
      <div className="flex items-center gap-2">
        <Info className="size-4" />
        <Label className="font-medium">About</Label>
      </div>
      <p className="text-xs text-muted-foreground">バージョン 1.0.0</p>
    </section>
  );
}
