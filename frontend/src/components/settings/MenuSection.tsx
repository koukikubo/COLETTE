"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function MenuSection() {
  return (
    <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
      <div className="flex items-center justify-between">
        <Label className="font-medium">メニュー設定</Label>
        <Button variant="outline" size="sm">
          <PlusCircle className="size-4 mr-1" /> 新規メニュー
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        商品グループやメニューコードを設定します。
      </p>
    </section>
  );
}
