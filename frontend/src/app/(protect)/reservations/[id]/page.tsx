export default function ReservationShowPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold mb-2">予約詳細</h1>
      <p className="text-sm text-muted-foreground mb-4">
        ID: <span className="font-mono">{id}</span>
      </p>

      {/* ここに後で予約の詳細情報を SSR / CSR で埋め込んでいく */}
      <div className="rounded-lg border p-4 space-y-2">
        <div>顧客名: （APIから取得）</div>
        <div>日付: （APIから取得）</div>
        <div>時間: （APIから取得）</div>
        <div>メニュー: （APIから取得）</div>
      </div>
    </div>
  );
}
