"use client";
import { ThemeToggle } from "@/components/features/settings/theme/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon } from "lucide-react";

export default function ThemeSection() {
  return (
    <Card className="border border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base">テーマ</CardTitle>
          <CardDescription>ライト / ダークを即座に切り替え</CardDescription>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Moon className="size-3" />
          Live
        </Badge>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <ThemeToggle />
      </CardContent>
    </Card>
  );
}
