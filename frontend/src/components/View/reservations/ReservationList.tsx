"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Reservation = {
  id: number;
  customer_name: string;
  date: string;
  time: string;
  menu: string;
};

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // 後でAPI接続に置き換える
  useEffect(() => {
    setTimeout(() => {
      setReservations([
        {
          id: 1,
          customer_name: "久保 太郎",
          date: "2025-12-03",
          time: "17:00",
          menu: "梅コース",
        },
        {
          id: 2,
          customer_name: "佐藤 花子",
          date: "2025-12-04",
          time: "18:30",
          menu: "松コース",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <p className="p-6">読み込み中...</p>;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">予約一覧</h1>
        <Link href="/reservations/new">
          <Button>新規予約</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {reservations.map((r) => (
          <Link
            key={r.id}
            href={`/reservations/${r.id}`}
            className="block rounded border p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <div className="font-semibold">{r.customer_name}</div>
            <div className="text-sm text-muted-foreground">
              {r.date} {r.time}
            </div>
            <div className="text-sm mt-1">{r.menu}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
