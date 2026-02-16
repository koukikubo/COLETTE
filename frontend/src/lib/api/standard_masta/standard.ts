import { apiClient } from "@/lib/api/base";
import { PaginatedResponse } from "@/types/pagination";
import {
  FetchStandardMastaParams,
  StandardCodeResponse,
  StandardListItem,
  StandardMasta,
} from "@/types/standard";

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

export async function fetchStandardMastas(
  params: FetchStandardMastaParams,
): Promise<PaginatedResponse<StandardMasta>> {
  const res = await apiClient.get<PaginatedResponse<StandardMasta>>(
    "/setting/standard_code/standard_mastas",
    { params },
  );

  return res.data;
}

export async function fetchStandardMastaSearch(
  query = "",
  enabled = "",
): Promise<StandardMasta[]> {
  const res = await apiClient.get<StandardMasta[]>(
    "/setting/standard_code/standard_mastas",
    {
      params: { query, enabled },
    },
  );
  return res.data;
}
