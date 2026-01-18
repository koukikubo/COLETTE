import { StandardListItem } from "@/types/standard";
import { apiClient } from "./base";

// 予約登録画面で使用する
export async function fetchStandardListByBaseCode(
  baseCode: string
): Promise<StandardListItem[]> {
  const res = await apiClient.get(
    `setting/standard_code/standard_mastas/${baseCode}/standard_list_mastas`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  return Array.isArray(res.data) ? res.data : [];
}
