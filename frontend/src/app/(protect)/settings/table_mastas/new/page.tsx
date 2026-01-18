"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { createTable } from "@/lib/api/table";

export default function TableMastasNewPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [seatType, setSeatType] = useState<"counter" | "table">("counter");
  const [capacity, setCapacity] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);

    try {
      await createTable({
        name,
        seat_type: seatType,
        capacity,
        code: "",
      });

      router.push("/settings/admin?section=table");
      router.refresh();
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "response" in e) {
        const err = e as {
          response?: { data?: { message?: string } };
        };
        setError(err.response?.data?.message ?? "登録に失敗しました");
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold">テーブル新規登録</h1>

      {/* 名称 */}
      <div className="space-y-1">
        <label className="text-sm">名称</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: カウンター1"
        />
      </div>

      {/* 種別 */}
      <div className="space-y-1">
        <label className="text-sm">種別</label>
        <Select
          value={seatType}
          onValueChange={(v) => setSeatType(v as "counter" | "table")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="counter">カウンター</SelectItem>
            <SelectItem value="table">テーブル</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 定員 */}
      <div className="space-y-1">
        <label className="text-sm">定員</label>
        <Input
          type="number"
          min={1}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
      </div>

      {/* エラー */}
      {error && <div className="text-sm text-destructive">{error}</div>}

      {/* 操作 */}
      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={submitting}>
          登録
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/settings/admin?section=table")}
        >
          キャンセル
        </Button>
      </div>
    </div>
  );
}
