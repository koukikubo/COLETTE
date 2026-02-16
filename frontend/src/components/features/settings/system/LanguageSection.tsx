"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSection() {
  return (
    <Card className="border border-border/70 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-primary">
          <Globe className="size-4" />
          <CardTitle className="text-base">言語</CardTitle>
        </div>
        <CardDescription>
          表示言語は現在日本語に固定されています。
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Badge variant="outline">日本語</Badge>
        <Button variant="ghost" size="sm" disabled></Button>
      </CardContent>
    </Card>
  );
}
