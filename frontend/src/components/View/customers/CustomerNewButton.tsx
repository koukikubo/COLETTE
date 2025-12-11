import Link from "next/link";
import { isAxiosError } from "@/lib/isAxiosError";
import { Button } from "@/components/ui/button";
import CustomerSearch from "./CustomerSearch";
import { cookies } from "next/headers";
import { apiClientWithSsrCookies } from "@/lib/api/Client";

type Stats = { total: number; today: number; vip?: number };

export default async function CustomerDashboard() {
  const cookieHeader = cookies().toString(); // SSRでCookie取得
  const client = apiClientWithSsrCookies(cookieHeader);

  let stats: Stats = { total: 0, today: 0 };

  try {
    const res = await client.get<Stats>("/customer/customers/stats");
    stats = res.data;
  } catch (error: unknown) {
    console.error("Failed to load customer stats", error);
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        throw error; // middleware / ssrFetch 側で未ログインを処理する
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">顧客管理</h1>
      <div>
        <Button asChild>
          <Link href="/customers/new">新規登録</Link>
        </Button>
      </div>

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
        <CustomerSearch />
      </div>
    </div>
  );
}
