"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

export default function MenuSettingsView() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-1">
        <CardTitle>メニュー設定</CardTitle>
        <CardDescription>
          商品グループやメニューの登録を管理します。近日中にメニュー一覧を追加予定です。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm text-muted-foreground">
              メニューカテゴリ名
            </label>
            <Input placeholder="例: フード" className="mt-1" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">表示順</label>
            <Input type="number" min={0} className="mt-1" />
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">説明</label>
          <Textarea
            rows={3}
            className="mt-1"
            placeholder="カテゴリの概要を入力"
          />
        </div>
        <div className="flex justify-end">
          <Button className="gap-2">
            <PlusCircle className="size-4" />
            カテゴリを追加
          </Button>
        </div>
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
