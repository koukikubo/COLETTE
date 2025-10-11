"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BaseCodeSettingsView({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle>基本コードマスタ設定</CardTitle>
        <Button variant="secondary" onClick={onBack}>
          戻る
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm mb-2 text-muted-foreground">
            コードタイトル検索
          </label>
          <div className="flex gap-2">
            <Input placeholder="顧客ランク、メニュー分類などで検索..." />
            <Button>検索</Button>
          </div>
        </div>

        <div className="border rounded-md p-4 text-sm text-muted-foreground">
          （ここに検索結果や登録フォームを後で追加）
        </div>
      </CardContent>
    </Card>
  );
}
