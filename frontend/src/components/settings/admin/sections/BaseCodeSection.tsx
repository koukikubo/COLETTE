"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function BaseCodeSection() {
  return (
    <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
      <div className="flex items-center justify-between">
        <Label className="font-medium">基本コードマスタ</Label>
        <Button variant="outline" size="sm">
          新規登録
        </Button>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="選択肢タイトルで検索..."
          className="flex-1 border rounded-md px-2 py-1 text-sm"
        />
        <Button variant="default" size="sm">
          <Search className="size-4 mr-1" /> 検索
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        選択肢タイトル（例：顧客ランク、メニュー分類）を検索できます。
      </p>
    </section>
  );
}
