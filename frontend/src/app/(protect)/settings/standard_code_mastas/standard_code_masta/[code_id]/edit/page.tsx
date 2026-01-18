"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/base";
import { StandardMasta } from "@/types/setting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SettingsHero from "@/components/settings/SettingsHero";
import { Badge } from "@/components/ui/badge";

export default function StandardMastaEditPage() {
  const { code_id } = useParams<{ code_id: string }>();
  const router = useRouter();

  const [data, setData] = useState<StandardMasta | null>(null);
  const [name, setName] = useState("");
  const [baseCode, setBaseCode] = useState("");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!code_id) return;
    apiClient
      .get<StandardMasta>(`/setting/standard_code/standard_mastas/${code_id}`)
      .then((res) => {
        setData(res.data);
        setName(res.data.name);
        setBaseCode(res.data.base_code);
        setEnabled(res.data.enabled);
      });
  }, [code_id]);

  const handleUpdate = async () => {
    try {
      await apiClient.put(
        `/setting/standard_code/standard_mastas/${code_id}/`,
        {
          name,
          base_code: baseCode,
          enabled,
        }
      );

      router.push("/settings/admin?section=base");
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <p>読み込み中...</p>;

  return (
    <div className="space-y-6">
      <SettingsHero
        title={`基本コード編集：${data.name}（${data.base_code}）`}
        description="ここで基本情報の編集・更新ができます。"
        badge={
          <Badge variant={enabled ? "default" : "secondary"}>
            {enabled ? "有効" : "無効"}
          </Badge>
        }
        action={
          <Button
            variant="secondary"
            onClick={() => router.push("/settings/admin?section=base")}
          >
            基本コード一覧へ
          </Button>
        }
      />

      <div className="space-y-4 border rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium mb-1">名称</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">コード</label>
          <Input
            value={baseCode}
            onChange={(e) => setBaseCode(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Checkbox
            checked={enabled}
            onCheckedChange={(checked) => setEnabled(!!checked)}
          />
          <label className="text-sm">{enabled ? "有効" : "無効"}</label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => router.back()}>
            キャンセル
          </Button>
          <Button onClick={handleUpdate}>更新する</Button>
        </div>
      </div>
    </div>
  );
}
