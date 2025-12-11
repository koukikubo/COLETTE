"use client";

import { useRouter, useParams } from "next/navigation";
import SettingsHero from "@/components/settings/SettingsHero";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/Client";
import { StandardMasta } from "types/setting";

export default function StandardMastaDetailPage() {
  const { code_id } = useParams<{
    code_id: string;
  }>();
  const router = useRouter();
  const [data, setData] = useState<StandardMasta | null>(null);

  useEffect(() => {
    if (!code_id) return;

    const fetch = async () => {
      const res = await apiClient.get<StandardMasta>(
        `/setting/standard_code/standard_mastas/${code_id}`
      );
      setData(res.data);
    };

    fetch();
  }, [code_id]);

  if (!data) return <p>読み込み中...</p>;

  return (
    <SettingsHero
      title={`基本コード詳細：${data.name} (${data.base_code})`}
      description="このコードに紐づく選択肢を管理できます。"
      badge={data.enabled ? "有効" : "無効"}
      action={
        <Button
          variant="outline"
          onClick={() =>
            router.push(`/settings/standard_code_masta/${code_id}/options`)
          }
        >
          選択肢を表示する
        </Button>
      }
    />
  );
}
