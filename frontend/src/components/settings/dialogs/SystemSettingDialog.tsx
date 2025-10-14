"use client";
import * as React from "react";
import { motion, useDragControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Minus, Maximize2, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ThemeSection from "../common/sections/ThemeSection";
import LanguageSection from "../common/sections/LanguageSection";
import AboutSection from "../common/sections/AboutSection";
import SystemAdminSettings from "../SystemAdminSettings";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SystemSettingDialog({ open, onClose }: Props) {
  const [minimized, setMinimized] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"common" | "admin">(
    "common"
  );
  const dragControls = useDragControls();
  const boundsRef = React.useRef<HTMLDivElement>(null);

  if (!open) return null;

  return (
    <div
      ref={boundsRef}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="設定"
        className={[
          "fixed rounded-2xl border border-border/70 bg-card/90 text-foreground shadow-2xl",
          minimized ? "bottom-6 right-6" : "left-1/2 top-12 -translate-x-1/2",
        ].join(" ")}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={boundsRef}
        style={{
          width: minimized ? 360 : 960,
          height: minimized ? 56 : "80vh",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        layout
      >
        {/* タイトルバー */}
        <div
          className="flex items-center justify-between px-3 py-2 border-b bg-background/80 rounded-t-2xl"
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("[data-window-action]"))
              return;
            dragControls.start(e);
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">システム設定</span>
            <GripVertical className="ml-1 size-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1">
            <Button
              data-window-action
              variant="ghost"
              size="icon"
              className="size-7"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setMinimized((v) => !v)}
            >
              {minimized ? (
                <Maximize2 className="size-4" />
              ) : (
                <Minus className="size-4" />
              )}
            </Button>
            <Button
              data-window-action
              variant="ghost"
              size="icon"
              className="size-7"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* メイン */}
        {!minimized && (
          <div className="flex h-full">
            {/* 左側タブナビ */}
            <aside className="w-56 border-r p-4 space-y-2 bg-background/60">
              <Button
                variant={activeTab === "common" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("common")}
              >
                システム共通設定
              </Button>
              <Button
                variant={activeTab === "admin" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("admin")}
              >
                システム管理設定
              </Button>
            </aside>

            {/* コンテンツ領域 */}
            <main className="flex-1 overflow-y-auto p-6">
              {activeTab === "common" && (
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">システム設定</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ThemeSection />
                    <LanguageSection />
                    <AboutSection />
                  </CardContent>
                </Card>
              )}

              {activeTab === "admin" && <SystemAdminSettings />}
            </main>
          </div>
        )}
      </motion.div>
    </div>
  );
}
