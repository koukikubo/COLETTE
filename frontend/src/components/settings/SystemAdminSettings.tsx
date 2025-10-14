"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import BaseCodeSettingsView from "./admin/views/BaseCodeSettings";
import MenuSettingsView from "./admin/views/MenuSettings";
import BusinessDateSettingView from "./admin/views/BusinessDateSettingView";

export default function SystemAdminSettings() {
  const [activeView, setActiveView] = useState<
    "menu" | "base" | "list" | "businessDate"
  >("list");

  if (activeView === "base") {
    return <BaseCodeSettingsView onBack={() => setActiveView("list")} />;
  }

  if (activeView === "menu") {
    return <MenuSettingsView onBack={() => setActiveView("list")} />;
  }
  if (activeView === "businessDate") {
    return <BusinessDateSettingView onBack={() => setActiveView("list")} />;
  }

  // === リンク一覧（初期画面） ===
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle>システム管理設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setActiveView("base")}
        >
          基本コードマスタ設定
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setActiveView("menu")}
        >
          メニュー設定
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setActiveView("businessDate")}
        >
          業務日付設定
        </Button>
      </CardContent>
    </Card>
  );
}
