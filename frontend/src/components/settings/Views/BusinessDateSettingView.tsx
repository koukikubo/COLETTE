"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BusinessDateSettingView({
  onBack,
}: {
  onBack: () => void;
}) {
  const [month, setMonth] = useState("4月");
  const [criteria, setCriteria] = useState("期首日付");
  const [taxMode, setTaxMode] = useState("税抜");
  const [searchDisplay, setSearchDisplay] = useState("顧客詳細");

  const handleSubmit = () => {
    // TODO: API連携
    console.log({
      処理日付: new Date().toLocaleDateString(),
      処理年度: new Date().getFullYear(),
      期首月: month,
      利用額基準日: criteria,
      税算出単位: taxMode,
      検索後画面: searchDisplay,
    });
    alert("設定を保存しました。");
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle>業務日付設定</CardTitle>
        <Button variant="secondary" onClick={onBack}>
          戻る
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 処理日付・処理年度 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>処理日付</Label>
            <Input readOnly value={new Date().toLocaleDateString()} />
          </div>
          <div>
            <Label>処理年度</Label>
            <Input readOnly value={new Date().getFullYear().toString()} />
          </div>
        </div>

        {/* 期首月日 */}
        <div>
          <Label>期首月日</Label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="選択..." />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }).map((_, i) => (
                <SelectItem key={i} value={`${i + 1}月`}>
                  {i + 1}月
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 顧客年間ご利用額抽出基準日 */}
        <div>
          <Label>顧客年間ご利用額抽出基準日</Label>
          <Select value={criteria} onValueChange={setCriteria}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="期首日付">期首日付</SelectItem>
              <SelectItem value="処理日付">処理日付</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 予算目標 */}
        <div>
          <Label>予算目標（税算出単位）</Label>
          <Select value={taxMode} onValueChange={setTaxMode}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="税抜">税抜</SelectItem>
              <SelectItem value="税込">税込</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 顧客検索後表示画面 */}
        <div>
          <Label>顧客検索後表示画面</Label>
          <Select value={searchDisplay} onValueChange={setSearchDisplay}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="顧客詳細">顧客詳細</SelectItem>
              <SelectItem value="予約情報">予約情報</SelectItem>
              <SelectItem value="利用履歴">利用履歴</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onBack}>
            戻る
          </Button>
          <Button onClick={handleSubmit}>登録</Button>
        </div>
      </CardContent>
    </Card>
  );
}
