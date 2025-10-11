"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MenuSettingsView({ onBack }: { onBack: () => void }) {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle>メニュー設定</CardTitle>
        <Button variant="secondary" onClick={onBack}>
          戻る
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          商品グループやメニューコードの登録・編集を行います。
        </p>
        <div className="border rounded-md p-4 text-sm text-muted-foreground">
          （ここにフォーム・一覧などを後で追加）
        </div>
      </CardContent>
    </Card>
  );
}
