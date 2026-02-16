import { ssrFetch } from "@/lib/api/ssrAuth";
import type { CustomerDetail, Stats } from "@/types/customer";

// 顧客詳細取得
export async function fetchCustomerById(id: string): Promise<CustomerDetail> {
  return await ssrFetch<CustomerDetail>(`/customer/customers/${id}`);
}
// 顧客統計情報取得
export async function fetchCustomerStats(): Promise<Stats> {
  return await ssrFetch<Stats>("/customer/customers/stats");
}
