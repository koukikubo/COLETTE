"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SystemMasterView({ onBack }: { onBack: () => void }) {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle>システムマスタ設定</CardTitle>
        <Button variant="secondary" onClick={onBack}>
          戻る
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          業務日付や基本システム項目の設定を行います。
        </p>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => alert("業務日付設定画面を開く（後で実装）")}
        >
          業務日付設定
        </Button>
      </CardContent>
    </Card>
  );
}
