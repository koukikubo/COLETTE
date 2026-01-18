import TableMastas from "@/components/settings/admin/views/TableMastas";
import { ssrFetch } from "@/lib/api/ssrAuth";
import { Table } from "@/types/table";

async function getTables(): Promise<Table[]> {
  return (await ssrFetch("/tables")) as Table[];
}

export default async function TableMastaPage() {
  const tables = await getTables();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">テーブルマスタ</h2>
      <p className="text-sm text-muted-foreground">
        予約で使用するテーブル情報を管理します。
      </p>

      <TableMastas initialData={tables} />
    </div>
  );
}
