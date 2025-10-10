import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomerList from "@/components/View/customers/CustomerList";
import { cookies } from "next/headers";
import { apiClientWithSsrCookies } from "@/lib/apiClient";

type Stats = {
  total: number;
  today: number;
  vip: number;
};

export default async function CustomerDashboard() {
  const cookieHeader = cookies().toString(); // SSRでCookie取得
  const client = apiClientWithSsrCookies(cookieHeader);
  const { data: stats } = await client.get<Stats>("/customers/stats");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">顧客管理</h1>

      {/* 概要パネル */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-sm text-muted-foreground">総顧客数</h2>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-sm text-muted-foreground">本日登録</h2>
          <p className="text-2xl font-bold">{stats.today}</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-sm text-muted-foreground">VIP顧客</h2>
          {/* <p className="text-2xl font-bold">{stats.vip}</p> */}
        </div>
      </div>

      <div>
        <Button asChild>
          <Link href="/customers/new">新規登録</Link>
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">最近登録された顧客</h2>
        <CustomerList />
      </div>
    </div>
  );
}
