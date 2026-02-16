import { apiClient } from "../../base";
import type { Customer, CreateCustomerPayload, Stats } from "@/types/customer";

// 顧客作成用
export async function createCustomer(payload: CreateCustomerPayload) {
  const res = await apiClient.post<Customer>("/customer/customers", {
    customer: payload,
  });
  return res.data;
}
// 顧客ステータス取得用
export async function fetchCustomerStats(): Promise<Stats> {
  const res = await apiClient.get<Stats>("/customer/customers/stats");
  return res.data;
}

// 顧客検索
export async function fetchCustomers(params: Partial<Customer>) {
  const res = await apiClient.get<Customer[]>("/customer/customers/search", {
    params,
  });
  return res.data;
}
