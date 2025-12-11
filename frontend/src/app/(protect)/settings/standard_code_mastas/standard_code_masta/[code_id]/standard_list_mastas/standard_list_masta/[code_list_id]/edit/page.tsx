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

export default function StandardListEditPage() {
  const params = useParams<{ code_id: string; code_list_id: string }>();
  const router = useRouter();

  const [form, setForm] = useState({
    list_code: "",
    name: "",
    remarks: "",
    enabled: "true" as "true" | "false",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 選択肢コードデータを取得 - エンドポイントを修正
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get<StandardListMasta>(
          `/setting/standard_code/standard_mastas/${params.code_id}/standard_list_mastas/${params.code_list_id}`
        );
        const data = res.data;

        setForm({
          list_code: data.list_code,
          name: data.name,
          remarks: data.remarks || "",
          enabled: data.enabled ? "true" : "false",
        });
      } catch (error) {
        console.error("データ取得エラー:", error);
        alert("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (params.code_id && params.code_list_id) {
      fetchData();
    }
  }, [params.code_id, params.code_list_id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      // エンドポイントを修正
      await apiClient.put(
        `/setting/standard_code/standard_mastas/${params.code_id}/standard_list_mastas/${params.code_list_id}`,
        {
          standard_list_masta: {
            list_code: form.list_code,
            name: form.name,
            remarks: form.remarks,
            enabled: form.enabled === "true",
          },
        }
      );

      alert("更新しました");
      router.push(
        `/settings/standard_code_mastas/standard_code_masta/${params.code_id}/standard_list_mastas`
      );
    } catch (error) {
      console.error("更新エラー:", error);
      alert("更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">読み込み中...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>選択肢コード編集</CardTitle>
          <CardDescription>
            基本コードID: {params.code_id} / 選択肢コードID:{" "}
            {params.code_list_id}
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
                />
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
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">備考</label>
              <Textarea
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  router.push(
                    `/settings/standard_code_mastas/standard_code_masta/${params.code_id}/standard_list_mastas`
                  )
                }
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "更新中..." : "更新"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
