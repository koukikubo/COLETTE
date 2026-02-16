"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api/base";
import { StandardMasta, StandardListMasta } from "types/standard";

export default function StandardListMastasPage() {
  const params = useParams<{ code_id: string }>();
  const router = useRouter();
  const [parentData, setParentData] = useState<StandardMasta | null>(null);
  const [childData, setChildData] = useState<StandardListMasta[]>([]);
  const [loading, setLoading] = useState(true);

  // データ取得
  useEffect(() => {
    if (!params.code_id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 基本コード情報を取得
        const parentRes = await apiClient.get<StandardMasta>(
          `/setting/standard_code/standard_mastas/${params.code_id}`,
        );
        setParentData(parentRes.data);

        // 選択肢コード一覧を取得
        const childRes = await apiClient.get<StandardListMasta[]>(
          `/setting/standard_code/standard_mastas/${params.code_id}/standard_list_mastas`,
        );
        setChildData(childRes.data);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.code_id]);

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                選択肢コード管理
                <Badge variant="secondary">基本コードに紐づく選択肢</Badge>
              </CardTitle>
              <CardDescription>現在編集中の基本コード情報</CardDescription>
            </div>
            <Button
              onClick={() => router.push("/settings/admin?section=base")}
              variant="outline"
            >
              基本コード一覧に戻る
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {parentData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  基本コード
                </label>
                <p className="font-mono text-lg">{parentData.base_code}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  基本コード名称
                </label>
                <p className="text-lg">{parentData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  状態
                </label>
                <div className="mt-1">
                  <Badge variant={parentData.enabled ? "default" : "secondary"}>
                    {parentData.enabled ? "有効" : "無効"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 選択肢コード一覧 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>選択肢コード一覧</CardTitle>
            <CardDescription>
              この基本コードに紐づく選択肢一覧 ({childData.length}件)
            </CardDescription>
          </div>
          <Button
            onClick={() =>
              router.push(
                `/settings/standard_code_mastas/standard_code_masta/${params.code_id}/standard_list_mastas/new`,
              )
            }
          >
            新規登録
          </Button>
        </CardHeader>
        <CardContent>
          {childData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>選択肢コードが登録されていません</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  router.push(
                    `/settings/standard_code_mastas/standard_code_masta/${params.code_id}/standard_list_mastas/new`,
                  )
                }
              >
                最初の選択肢を登録
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">
                      選択肢コード
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      選択肢名称
                    </th>
                    <th className="px-4 py-3 text-left font-medium">備考</th>
                    <th className="px-4 py-3 text-left font-medium">状態</th>
                    <th className="px-4 py-3 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {childData.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-muted/50">
                      <td className="px-4 py-3 font-mono text-xs">
                        {item.list_code}
                      </td>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.remarks}</td>
                      <td className="px-4 py-3">
                        <Badge variant={item.enabled ? "default" : "secondary"}>
                          {item.enabled ? "有効" : "無効"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(
                              `/settings/standard_code_mastas/standard_code_masta/${params.code_id}/standard_list_mastas/standard_list_masta/${item.id}/edit`,
                            )
                          }
                        >
                          編集
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
