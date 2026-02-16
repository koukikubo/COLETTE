"use client";

import { useRouter } from "next/navigation";
import { AdminUserRow } from "@/types/adminUser";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  users: AdminUserRow[];
};

export default function UsersTable({ users }: Props) {
  const router = useRouter();

  if (users.length === 0) {
    return (
      <div className="rounded border p-6 text-center text-muted-foreground">
        担当者が登録されていません
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">氏名</th>
            <th className="px-4 py-3 text-left">メール</th>
            <th className="px-4 py-3 text-left">権限</th>
            <th className="px-4 py-3 text-left">状態</th>
            <th className="px-4 py-3 text-right">操作</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>

              <td className="px-4 py-3">
                <Badge variant="outline">{user.role}</Badge>
              </td>

              <td className="px-4 py-3">
                <Badge variant={user.suspended ? "destructive" : "default"}>
                  {user.suspended ? "停止中" : "有効"}
                </Badge>
              </td>

              <td className="px-4 py-3 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                >
                  編集
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
