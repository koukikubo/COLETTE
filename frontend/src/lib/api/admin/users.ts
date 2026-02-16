import { apiClient } from "@/lib/api/base";
import { AdminUserRow } from "@/types/adminUser";

export async function fetchUsersForAdmin(): Promise<AdminUserRow[]> {
  const res = await apiClient.get<AdminUserRow[]>("/api/v1/admin/users");
  return res.data;
}
