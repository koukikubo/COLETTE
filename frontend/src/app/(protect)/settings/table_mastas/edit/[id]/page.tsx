"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@/types/table";
import { fetchTableEdit, updateTable, deleteTable } from "@/lib/api/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  params: { id: string };
};

export default function TableEditPage({ params }: Props) {
  const router = useRouter();

  const id = Number(params.id);

  const [table, setTable] = useState<Table | null>(null);

  const [name, setName] = useState("");
  const [seatType, setSeatType] = useState<Table["seat_type"]>("table");
  const [capacity, setCapacity] = useState<number>(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初期取得
  useEffect(() => {
    if (!Number.isFinite(id)) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTableEdit(id);
        setTable(data);

        // フォーム初期値
        setName(data.name);
        setSeatType(data.seat_type);
        setCapacity(data.capacity);
      } catch (e) {
        console.error("テーブル取得失敗", e);
        setError("テーブル情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleUpdate = async () => {
    if (!table) return;

    setSaving(true);
    setError(null);

    try {
      await updateTable(table.id, {
        name,
        seat_type: seatType,
        capacity,
      });

      router.push("/settings/admin?section=table");
      router.refresh();
    } catch (e) {
      console.error("更新失敗", e);
      setError("更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!Number.isFinite(id)) return;

    const ok = confirm("このテーブルを削除しますか？（元に戻せません）");
    if (!ok) return;

    setDeleting(true);
    setError(null);

    try {
      await deleteTable(id);
      router.push("/settings/admin?section=table");
      router.refresh();
    } catch (e) {
      console.error("削除失敗", e);
      setError("削除に失敗しました（予約に紐づいている可能性があります）");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>テーブル編集</CardTitle>
        <CardDescription>
          コード：
          <span className="font-mono">{table?.code || "読み込み中..."}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label>名称</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>種別</Label>
          <Select
            value={seatType}
            onValueChange={(v) => setSeatType(v as Table["seat_type"])}
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

        <div className="space-y-2">
          <Label>定員</Label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => router.push("/settings/admin?section=table")}
          >
            戻る
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={saving || deleting}
          >
            {deleting ? "削除中..." : "削除"}
          </Button>

          <Button onClick={handleUpdate} disabled={saving || deleting}>
            {saving ? "保存中..." : "更新"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
