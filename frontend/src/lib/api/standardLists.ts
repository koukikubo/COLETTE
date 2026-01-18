import { apiClient } from "@/lib/api/base";
import { StandardListItem } from "@/types/standard";

type StandardCodeResponse = {
  base_code: string;
  name: string;
  lists: StandardListItem[];
};

export async function fetchStandardList(
  baseCode: string
): Promise<StandardListItem[]> {
  const res = await apiClient.get<StandardCodeResponse>(
    `setting/standard_code/standard_mastas/${baseCode}`
  );

  return res.data.lists;
}
// すでに基本コードマスタ情報を取得するAPIが存在しているため、今回は別に用意しました。
export async function fetchStandardListCode(
  baseCode: string
): Promise<StandardListItem[]> {
  const res = await apiClient.get(
    `setting/standard_code/standard_mastas/${baseCode}/standard_list_mastas`
  );

  return Array.isArray(res.data) ? res.data : [];
}
