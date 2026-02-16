import SystemCommonSettings from "@/components/features/settings/layout/SystemCommonSetting";
import SettingsHero from "@/components/features/settings/layout/SettingsHero";

export default function SettingsCommonPage() {
  return (
    <div className="space-y-6">
      <SettingsHero
        title="共通設定"
        description="テーマ、言語、アプリ情報など日々の運用に直結する項目をまとめています。"
      />
      <SystemCommonSettings />
    </div>
  );
}
