"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/settings/common", label: "共通設定", description: "テーマや言語" },
  {
    href: "/settings/admin",
    label: "システム管理",
    description: "店舗・マスタ管理",
  },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <Card className="w-full max-w-sm self-start border border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Settings className="size-5" />
        </div>
        <div>
          <CardTitle className="text-base">設定メニュー</CardTitle>
          <p className="text-xs text-muted-foreground">
            セクションを選択して詳細を編集
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {links.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-lg border px-4 py-3 transition hover:-translate-y-0.5",
                active
                  ? "border-primary/80 bg-primary/10 text-primary"
                  : "border-border/50 hover:border-primary/40"
              )}
            >
              <span className="inline-flex items-center gap-1 text-sm font-medium">
                {link.label}
                {active && <Sparkles className="size-3" />}
              </span>
              <span className="text-xs text-muted-foreground">
                {link.description}
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
