import { apiClient } from "@/lib/api/base";
import { StandardMasta } from "@/types/setting";
import { FetchStandardMastaParams, StandardCodeResponse, StandardListItem } from "@/types/standard";

export async function fetchStandardList(
  baseCode: string
): Promise<StandardListItem[]> {
  const res = await apiClient.get<StandardCodeResponse>(
    `setting/standard_code/standard_mastas/${baseCode}`
  );

  return res.data.lists;
}
export async function fetchStandardListCode(
  baseCode: string
): Promise<StandardListItem[]> {
  const res = await apiClient.get(
    `setting/standard_code/standard_mastas/${baseCode}/standard_list_mastas`
  );

  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchStandardMastas(
  params: FetchStandardMastaParams
): Promise<StandardMasta[]> {
  const res = await apiClient.get<StandardMasta[]>(
    "/setting/standard_code/standard_mastas",
    { params }
  );

  return res.data;
}
