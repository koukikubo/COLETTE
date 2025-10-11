"use client";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/settings/theme/theme-toggle";

export default function ThemeSection() {
  return (
    <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
      <div className="flex items-center justify-between">
        <Label className="font-medium">ダークモード</Label>
        <ThemeToggle />
      </div>
      <p className="text-xs text-muted-foreground">
        アプリ全体の配色を切り替えます（ライト/ダーク）。
      </p>
    </section>
  );
}
