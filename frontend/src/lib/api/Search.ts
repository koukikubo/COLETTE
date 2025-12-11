import { apiClient } from "@/lib/api/Client";
import { Customer } from "types/customer";
import { StandardMasta } from "types/setting";
// 基本コードマスタ検索
export async function fetchStandardMasta(
  query = "",
  enabled = ""
): Promise<StandardMasta[]> {
  const res = await apiClient.get<StandardMasta[]>(
    "/setting/standard_code/standard_mastas",
    {
      params: { query, enabled },
    }
  );
  return res.data;
}

// 顧客検索
export async function fetchCustomers(params: Customer) {
  const res = await apiClient.get("/customer/customers/search", { params });
  return res.data as Customer[];
}
