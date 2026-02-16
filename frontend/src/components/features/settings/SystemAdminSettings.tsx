"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Store } from "lucide-react";
import BaseCodeSettingsView from "./admin/views/BaseCodeSettings";
import ShopInfoSettingView from "./admin/views/ShopInfoSetting";
import { useStandardMastaCount } from "@/hooks/useStandardMastaCount";
import TableMastasView from "./admin/views/TableMastas";

export default function SystemAdminSettings() {
  const count = useStandardMastaCount();
  const searchParams = useSearchParams();
  const router = useRouter();

  const highlights = useMemo(
    () => [
      {
        title: "店舗",
        value: "基本情報",
        icon: Store,
        description: "住所や営業時間などを管理",
      },
      {
        title: "基本コード",
        value: count !== null ? `${count}件` : "読み込み中…",
        icon: Layers,
        description: "システム共通の項目などを設定できます。",
      },
      {
        title: "テーブルマスタ",
        value: "テーブルマスタ",
        icon: Layers,
        description: "予約テーブル管理ができます。",
      },
      // {
      //   title: "メニュー",
      //   value: "Coming soon",
      //   icon: Utensils,
      //   description: "商品マスタや価格設定",
      // },
    ],
    [count]
  );

  type TabValue = "shop" | "base" | "table";
  const allowedTabs = useMemo<TabValue[]>(() => ["shop", "base", "table"], []);
  const resolveTab = useCallback(
    (value: string | null): TabValue => {
      return allowedTabs.includes(value as TabValue)
        ? (value as TabValue)
        : "shop";
    },
    [allowedTabs]
  );

  const [tab, setTab] = useState<TabValue>(() =>
    resolveTab(searchParams.get("section"))
  );

  useEffect(() => {
    const section = resolveTab(searchParams.get("section"));
    if (section !== tab) {
      setTab(section);
    }
  }, [searchParams, tab, resolveTab]);

  const handleTabChange = (value: string) => {
    const nextTab = resolveTab(value);
    setTab(nextTab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", nextTab);
    router.replace(`/settings/admin?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} className="shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">
                  {item.title}
                </p>
                <CardTitle className="text-lg font-semibold">
                  {item.value}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full gap-2 bg-muted/40 p-1 md:grid-cols-3">
          <TabsTrigger value="shop">店舗情報</TabsTrigger>
          <TabsTrigger value="base">基本コード</TabsTrigger>
          <TabsTrigger value="table">テーブルマスタ</TabsTrigger>
          {/* <TabsTrigger value="menu">メニュー</TabsTrigger> */}
        </TabsList>

        <TabsContent value="shop" className="space-y-4">
          <Badge variant="outline" className="w-fit">
            店舗マスタ
          </Badge>
          <ShopInfoSettingView />
        </TabsContent>

        <TabsContent value="base">
          <BaseCodeSettingsView initialData={[]} />
        </TabsContent>

        <TabsContent value="table">
          <TableMastasView initialData={[]} />
        </TabsContent>

        {/* <TabsContent value="menu">
          <MenuSettingsView />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
