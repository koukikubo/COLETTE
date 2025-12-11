// /settings/standard_code_mastas/standard_code_masta/[code_id]/standard_list_mastas/new/page.tsx
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StandardListMasta } from "types/setting";

export default function StandardListNewPage() {
  const params = useParams<{ code_id: string }>();
  const router = useRouter();

  const [form, setForm] = useState({
    list_code: "",
    name: "",
    remarks: "",
    enabled: "true" as "true" | "false",
  });
  const [saving, setSaving] = useState(false);
  const [existingLists, setExistingLists] = useState<StandardListMasta[]>([]);
  const [loading, setLoading] = useState(true);

  // 次の選択肢コードを計算
  const calculateNextListCode = (lists: StandardListMasta[]): string => {
    if (lists.length === 0) return "1";

    // 数値に変換して最大値を取得
    const codes = lists.map((item) => {
      const num = parseInt(item.list_code, 10);
      return isNaN(num) ? 0 : num;
    });

    const maxCode = Math.max(...codes);
    return String(maxCode + 1);
  };

  // 既存の選択肢コードを取得して次の番号を計算
  useEffect(() => {
    const fetchExistingLists = async () => {
      try {
        const res = await apiClient.get<StandardListMasta[]>(
          `/setting/standard_code/standard_mastas/${params.code_id}/standard_list_mastas`
        );
        setExistingLists(res.data);

        // 次の選択肢コードを自動設定
        const nextCode = calculateNextListCode(res.data);
        setForm((prev) => ({ ...prev, list_code: nextCode }));
      } catch (error) {
        console.error("データ取得エラー:", error);
        // エラー時もとりあえず1を設定
        setForm((prev) => ({ ...prev, list_code: "1" }));
      } finally {
        setLoading(false);
      }
    };

    if (params.code_id) {
      fetchExistingLists();
    }
  }, [params.code_id]);

  // 既存の選択肢コード数を表示（デバッグ用）
  useEffect(() => {
    if (existingLists.length > 0) {
      console.log(`既存の選択肢コード数: ${existingLists.length}`);
      console.log(`次の選択肢コード: ${form.list_code}`);
    }
  }, [existingLists, form.list_code]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 既存のコードと重複していないかチェック
    const isDuplicate = existingLists.some(
      (item) => item.list_code === form.list_code
    );
    if (isDuplicate) {
      alert("この選択肢コードは既に使用されています");
      return;
    }

    try {
      setSaving(true);

      // エンドポイントを修正
      await apiClient.post(
        `/setting/standard_code/standard_mastas/${params.code_id}/standard_list_mastas`,
        {
          standard_list_masta: {
            list_code: form.list_code,
            name: form.name,
            remarks: form.remarks,
            enabled: form.enabled === "true",
          },
        }
      );

      router.push(
        `/settings/standard_code_mastas/standard_code_masta/${params.code_id}/standard_list_mastas`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("登録エラー詳細:", error);
      alert("登録に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>選択肢コード新規登録</CardTitle>
          <CardDescription>
            基本コードID: {params.code_id}
            {existingLists.length > 0 && (
              <span className="ml-2 text-xs">
                (既存 {existingLists.length}件)
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">選択肢コード</label>
                <Input
                  value={form.list_code}
                  onChange={(e) =>
                    setForm({ ...form, list_code: e.target.value })
                  }
                  required
                  disabled={loading} // 読み込み中は入力不可
                  className="bg-muted" // 背景色で固定されていることを示す
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {loading
                    ? "計算中..."
                    : `自動採番されています (既存: ${existingLists.length}件)`}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">状態</label>
                <Select
                  value={form.enabled}
                  onValueChange={(value: "true" | "false") =>
                    setForm({ ...form, enabled: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">有効</SelectItem>
                    <SelectItem value="false">無効</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">選択肢名称</label>
              <Input
                placeholder="選択肢の名称を入力"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">備考</label>
              <Textarea
                placeholder="備考があれば入力"
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={saving || loading}>
                {saving ? "登録中..." : "登録"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
