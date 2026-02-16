"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function AboutSection() {
  return (
    <Card className="border border-border/70 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="size-4 text-primary" />
          <CardTitle className="text-base">バージョン情報</CardTitle>
        </div>
        <CardDescription>COLETTE Platform v1.0.0</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">最終更新: 2025/11/01</p>
        <Button variant="outline" size="sm">
          リリースノート
        </Button>
      </CardContent>
    </Card>
  );
}
