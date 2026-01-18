"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@/types/table";
import { fetchTables } from "@/lib/api/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  initialData: Table[];
};

export default function TableMastasView({ initialData }: Props) {
  const router = useRouter();
  const [tables, setTables] = useState<Table[]>(
    Array.isArray(initialData) ? initialData : []
  );
  const [loading, setLoading] = useState(false);

  // SSR初期データが無い場合のみCSR取得
  useEffect(() => {
    if (initialData.length > 0) return;

    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchTables();
        setTables(data);
      } catch (e) {
        console.error("テーブル取得失敗", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [initialData]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>テーブルマスタ</CardTitle>
          <CardDescription>
            予約で使用するテーブル・カウンター情報を管理します。
          </CardDescription>
        </div>

        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => router.push("/settings/table_mastas/new")}
        >
          新規登録
        </Button>
      </CardHeader>

      {/* ===== Content ===== */}
      <CardContent className="space-y-6">
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">コード</th>
                <th className="px-3 py-2 text-left font-medium">名称</th>
                <th className="px-3 py-2 text-left font-medium">種別</th>
                <th className="px-3 py-2 text-left font-medium">定員</th>
                <th className="px-3 py-2 text-right font-medium">操作</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    読み込み中...
                  </td>
                </tr>
              ) : tables.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    テーブルが登録されていません。
                  </td>
                </tr>
              ) : (
                tables.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground">
                      {t.code}
                    </td>
                    <td className="px-3 py-3">{t.name}</td>
                    <td className="px-3 py-3">
                      {t.seat_type === "counter" ? "カウンター" : "テーブル"}
                    </td>
                    <td className="px-3 py-3">{t.capacity}名</td>
                    <td className="px-3 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/settings/table_mastas/edit/${t.id}`)
                        }
                      >
                        編集
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
