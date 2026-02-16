import { customerSsr } from "@/lib/api/customer/index";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomerSearch from "@/components/features/customers/components/CustomerSearch";

export default async function Page() {
  const stats = await customerSsr.fetchCustomerStats();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">顧客管理</h1>

      <Button asChild>
        <Link href="/customers/new">新規登録</Link>
      </Button>

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
        </div>
      </div>

      <CustomerSearch />
    </div>
  );
}
