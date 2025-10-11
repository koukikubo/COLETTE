"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ThemeSection from "./sections/ThemeSection";
import LanguageSection from "./sections/LanguageSection";
import AboutSection from "./sections/AboutSection";
import { useState } from "react";
import SystemMasterView from "./sections/SystemMasterView";

/**
 * システム共通設定画面
 * - ダークモード切替、言語設定、About情報
 * - システムマスタ設定へのリンクあり
 */
export default function SystemCommonSettings() {
  const [activeView, setActiveView] = useState<"list" | "master">("list");

  // ✅ システムマスタ画面表示中
  if (activeView === "master") {
    return <SystemMasterView onBack={() => setActiveView("list")} />;
  }

  // ✅ 共通設定メイン画面
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          システム共通設定
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 各設定セクション */}
        <ThemeSection />
        <LanguageSection />
        <AboutSection />

        {/* システムマスタへの遷移リンク */}
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setActiveView("master")}
        >
          システムマスタ
        </Button>
      </CardContent>
    </Card>
  );
}
