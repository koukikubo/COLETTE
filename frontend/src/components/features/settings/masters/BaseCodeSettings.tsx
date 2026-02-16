"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { StandardMasta } from "@/types/standard";
import { fetchStandardMastas } from "@/lib/api/standard_masta/standard";
import { PaginationMeta } from "@/types/pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "@/lib/pagination/getPaginationRange";

type EnabledFilter = "all" | "true" | "false";

type Props = {
  initialData: StandardMasta[];
};

export default function BaseCodeSettingsView({ initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<StandardMasta[]>(
    Array.isArray(initialData) ? initialData : [],
  );
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [enabled, setEnabled] = useState<EnabledFilter>("true");
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  const fetchStandardMasta = useCallback(
    async (query: string, enabled?: boolean, page = 1) => {
      setLoading(true);
      try {
        const res = await fetchStandardMastas({
          query,
          enabled,
          page,
          per: 10,
        });
        setData(res.data);
        setMeta(res.meta);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchStandardMasta("", true, page);
  }, [fetchStandardMasta, page]);

  const handleSearch = () => {
    const enabledParam: boolean | undefined =
      enabled === "all" ? undefined : enabled === "true";
    setPage(1);
    fetchStandardMasta(query.trim(), enabledParam, 1);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>基本コードマスタ</CardTitle>
          <CardDescription>
            顧客ランクやメニュー分類など、各機能で使用する共通コードを管理します。
          </CardDescription>
        </div>
        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => router.push("/settings/standard_code_mastas/new")}
        >
          新規登録
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-3 md:grid-cols-[2fr_minmax(120px,1fr)_auto]">
          <Input
            placeholder="選択肢タイトルで検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Select
            value={enabled}
            onValueChange={(value: EnabledFilter) => setEnabled(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="true">有効</SelectItem>
              <SelectItem value="false">無効</SelectItem>
            </SelectContent>
          </Select>

          <Button disabled={loading} onClick={handleSearch} className="gap-2">
            <Search className="size-4" /> 検索
          </Button>
        </div>

        {/* 一覧 */}
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">コード</th>
                <th className="px-3 py-2 text-left font-medium">名称</th>
                <th className="px-3 py-2 text-left font-medium">備考</th>
                <th className="px-3 py-2 text-left font-medium">状態</th>
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
                    検索中...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    条件に一致する基本コードがありません。
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground">
                      {item.base_code}
                    </td>
                    <td className="px-3 py-3">{item.name}</td>
                    <td className="px-3 py-3">{item.remarks}</td>
                    <td className="px-3 py-3">
                      <Badge variant={item.enabled ? "default" : "secondary"}>
                        {item.enabled ? "有効" : "無効"}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-right flex gap-4 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/settings/standard_code_mastas/standard_code_masta/${item.id}/edit`,
                          )
                        }
                      >
                        編集
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/settings/standard_code_mastas/standard_code_masta/${item.id}/standard_list_mastas`,
                          )
                        }
                      >
                        選択肢設定へ
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {meta && meta.total_pages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                />
              </PaginationItem>

              {getPaginationRange(page, meta.total_pages).map((item, index) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <span className="px-3 py-2 text-muted-foreground">…</span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      isActive={page === item}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((p) => Math.min(meta.total_pages, p + 1))
                  }
                  aria-disabled={page === meta.total_pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}
