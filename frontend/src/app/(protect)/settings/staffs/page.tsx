import UsersTable from "@/components/features/settings/admin/users/UsersTable";
import { fetchUsersForAdmin } from "@/lib/api/admin/users";

export default async function AdminUsersPage() {
  const users = await fetchUsersForAdmin();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-semibold">担当者マスタ</h1>
      <UsersTable users={users} />
    </div>
  );
}
