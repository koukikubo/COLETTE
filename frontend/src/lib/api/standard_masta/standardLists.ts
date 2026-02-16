import { apiClient } from "@/lib/api/base";
import { StandardListItem } from "@/types/standard";

export type StandardCodeResponse = {
  base_code: string;
  name: string;
  lists: StandardListItem[];
};

export async function fetchStandardList(
  baseCode: string,
): Promise<StandardListItem[]> {
  const res = await apiClient.get<StandardCodeResponse>(
    `setting/standard_code/standard_mastas/${baseCode}`,
  );

  return res.data.lists;
}

export async function fetchStandardListCode(
  baseCode: string,
): Promise<StandardListItem[]> {
  const res = await apiClient.get(
    `setting/standard_code/standard_mastas/${baseCode}/standard_list_mastas`,
  );

  return Array.isArray(res.data) ? res.data : [];
}
