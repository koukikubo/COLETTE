"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SettingsHero from "@/components/settings/SettingsHero";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api/Client";

const BASE_LIST_PATH = "/settings/admin?section=base";

const statusOptions = [
  { label: "有効", value: "true" },
  { label: "無効", value: "false" },
];

type FormState = {
  base_code: string;
  name: string;
  remarks: string;
  enabled: "true" | "false";
};

type MessageState = { type: "success" | "error"; text: string } | null;

export default function StandardCodeNewPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<MessageState>(null);

  useEffect(() => {
    fetchNextCode();
  }, []);

  const fetchNextCode = async () => {
    try {
      setLoading(true);
      setMessage(null);
      const res = await apiClient.get<{ base_code: string }>(
        "/setting/standard_code/standard_mastas/next_code"
      );
      setForm({
        base_code: res.data.base_code,
        name: "",
        remarks: "",
        enabled: "true",
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "次の基本コードを取得できませんでした。",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;

    try {
      setSaving(true);
      setMessage(null);
      await apiClient.post("/setting/standard_code/standard_mastas", {
        standard_masta: {
          base_code: form.base_code,
          name: form.name,
          remarks: form.remarks,
          enabled: form.enabled === "true",
        },
      });
      router.push(BASE_LIST_PATH);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "登録に失敗しました。" });
    } finally {
      setSaving(false);
    }
  };

  const formBody = () => {
    if (loading || !form) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-muted-foreground">基本コード</label>
            <Input value={form.base_code} disabled className="mt-1" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">状態</label>
            <Select
              value={form.enabled}
              onValueChange={(value: "true" | "false") =>
                setForm((prev) => (prev ? { ...prev, enabled: value } : prev))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            基本コード名称
          </label>
          <Input
            className="mt-1"
            value={form.name}
            onChange={(e) =>
              setForm((prev) =>
                prev ? { ...prev, name: e.target.value } : prev
              )
            }
            placeholder="例: 顧客ランク"
            required
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">備考</label>
          <Textarea
            className="mt-1"
            rows={4}
            value={form.remarks}
            onChange={(e) =>
              setForm((prev) =>
                prev ? { ...prev, remarks: e.target.value } : prev
              )
            }
            placeholder="メモや補足情報"
          />
        </div>

        {message && (
          <div
            className={
              message.type === "success"
                ? "rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
                : "rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700"
            }
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-2 md:flex-row md:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(BASE_LIST_PATH)}
          >
            戻る
          </Button>
          <Button
            type="submit"
            disabled={saving || !form.name.trim()}
            className="gap-2"
          >
            {saving ? "登録中..." : "登録"}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <SettingsHero
        title="基本コード新規登録"
        description="次の連番を自動採番して、基本コードを素早く追加します。"
        badge="登録"
        action={
          <Button
            variant="secondary"
            onClick={() => router.push(BASE_LIST_PATH)}
          >
            一覧へ戻る
          </Button>
        }
      />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>新規基本コード</CardTitle>
          <CardDescription>
            次のコード:
            <Badge variant="outline">{form?.base_code ?? "----"}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>{formBody()}</CardContent>
      </Card>
    </div>
  );
}
