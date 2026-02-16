import { ssrFetch } from "@/lib/api/ssrAuth";
import type { Table } from "@/types/table";

export async function fetchTables(): Promise<Table[]> {
  return ssrFetch<Table[]>("/tables");
}
