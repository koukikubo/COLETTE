import SystemAdminSettings from "@/components/features/settings/layout/SystemAdminSettings";
import SettingsHero from "@/components/features/settings/layout/SettingsHero";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Loading from "./loading";

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6">
      <SettingsHero
        title="システム管理"
        description="店舗情報や基本コード、メニューなどマスタのメンテナンスを一箇所で。"
        badge="管理ツール"
        action={
          <Button
            asChild
            variant="secondary"
            className="gap-2 border-white/50 bg-white/20 text-white hover:bg-white/30"
          ></Button>
        }
      />

      <Suspense fallback={<Loading />}>
        <SystemAdminSettings />
      </Suspense>
    </div>
  );
}
