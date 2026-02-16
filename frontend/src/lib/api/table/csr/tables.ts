import { Table } from "@/types/table";
import { apiClient } from "../../base";

export async function fetchTables(): Promise<Table[]> {
  const res = await apiClient.get<Table[]>("/tables");
  return res.data;
}
export async function fetchTableEdit(id: number): Promise<Table> {
  const res = await apiClient.get<Table>(`/tables/${id}`);
  return res.data;
}

export async function createTable(payload: Omit<Table, "id">): Promise<Table> {
  const res = await apiClient.post<Table>("/tables", {
    table: payload,
  });
  return res.data;
}

export async function updateTable(
  id: number,
  payload: Partial<Table>,
): Promise<Table> {
  const res = await apiClient.put<Table>(`/tables/${id}`, {
    table: payload,
  });
  return res.data;
}

export async function deleteTable(id: number): Promise<void> {
  await apiClient.delete(`/tables/${id}`);
}
