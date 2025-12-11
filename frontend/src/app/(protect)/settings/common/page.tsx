import SystemCommonSettings from "@/components/settings/common/SystemCommonSetting";
import SettingsHero from "@/components/settings/SettingsHero";

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
