import BaseCodeSettingsView from "@/components/features/settings/masters/BaseCodeSettings";
import { ssrFetch } from "@/lib/api/ssrAuth";
import { StandardMasta } from "types/standard";

async function getStandardMastas(): Promise<StandardMasta[]> {
  return (await ssrFetch(
    "/setting/standard_code/standard_mastas",
  )) as StandardMasta[];
}

export default async function StandardMastaPage() {
  const codes = await getStandardMastas();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">基本コードマスタ</h2>
      <p className="text-sm text-muted-foreground">
        顧客ランクやメニュー分類など、各機能で使用する共通コードを管理します。
      </p>
      <BaseCodeSettingsView initialData={codes} />
    </div>
  );
}
