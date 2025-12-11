"use client";
import { Customer } from "types/customer";
import { useSearch } from "./useSearch";
import { fetchCustomers } from "@/lib/api/Search";

export function useCustomerSearch() {
  return useSearch<Customer>(
    fetchCustomers as (params: Record<string, unknown>) => Promise<Customer[]>
  );
}

