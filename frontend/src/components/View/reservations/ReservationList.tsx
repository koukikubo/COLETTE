"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Reservation } from "@/types/reservation";
import { Button } from "@/components/ui/button";
import { fetchReservations } from "@/lib/api/reservations";

export default function ReservationList() {
  const today = new Date().toISOString().slice(0, 10);

  const [selectedDate, setSelectedDate] = useState(today);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchReservations(selectedDate)
      .then(setReservations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedDate]);

  if (loading) return <p className="p-6">読み込み中...</p>;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">予約一覧リスト</h1>
      </div>

      {/* 日付切り替え */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded px-2 py-1"
      />

      <Link href="/reservations/new">
        <Button>新規予約</Button>
      </Link>

      <div className="space-y-4">
        {reservations.map((r) => (
          <Link
            key={r.id}
            href={`/reservations/${r.id}`}
            className="block rounded border p-4 hover:bg-accent transition-colors"
          >
            <div className="font-semibold">{r.customer_name}</div>

            <div className="text-sm text-muted-foreground">
              {r.start_at.slice(0, 10)} {r.start_at.slice(11, 16)} →{" "}
              {r.end_at.slice(11, 16)}
            </div>

            <div className="text-sm mt-1">
              {r.tables.map((s) => s.code).join(" / ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
