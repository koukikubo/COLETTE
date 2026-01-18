import { apiClient } from "./base";
import type { CustomerFormState, Customer } from "@/types/customer";

export async function createCustomer(payload: CustomerFormState) {
  const res = await apiClient.post<Customer>("/customer/customers", {
    customer: payload,
  });
  return res.data;
}

export async function fetchCustomerStats() {
  const res = await apiClient.get("/customer/customers/stats");
  return res.data;
}
