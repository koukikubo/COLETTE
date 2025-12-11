import BaseCodeSettingsView from "@/components/settings/admin/views/BaseCodeSettings";
import { ssrFetch } from "@/lib/api/ssrAuth";
import { StandardMasta } from "types/setting";

async function getStandardMastas(): Promise<StandardMasta[]> {
  return await ssrFetch("/setting/standard_code/standard_mastas");
}

export default async function StandardMastaPage() {
  const codes = await getStandardMastas();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">基本コードマスタ</h2>
      <p className="text-sm text-muted-foreground">
        顧客ランクやメニュー分類など、各機能で使用する共通コードを管理します。
      </p>

      {/* CSRコンポーネントへ"初期データだけ"渡す */}
      <BaseCodeSettingsView initialData={codes} />
    </div>
  );
}
