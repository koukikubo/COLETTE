"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ReservationTimeline } from "@/components/View/reservations/ReservationTimeline";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types/reservation";
import { fetchReservations } from "@/lib/api/reservations";
import { useSearchParams, useRouter } from "next/navigation";
import { Table } from "@/types/table";
import { fetchTables } from "@/lib/api/table";

export default function ReservationsPage() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ?? new Date().toISOString().slice(0, 10);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    fetchTables().then(setTables);
    fetchReservations(selectedDate)
      .then(setReservations)
      .catch((err) => {
        console.error("予約取得失敗", err);
        setReservations([]);
      });
  }, [selectedDate]);

  return (
    <div className="p-4 space-y-4">
      {/* 日付選択 */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            router.push(`/reservations?date=${e.target.value}`);
          }}
          className="border rounded px-2 py-1"
        />
        <Button
          variant="outline"
          onClick={() => {
            const today = new Date().toISOString().slice(0, 10);
            router.push(`/reservations?date=${today}`);
          }}
        >
          今日
        </Button>
      </div>

      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              {open ? "閉じる" : "開く"} タイムライン
            </Button>
          </CollapsibleTrigger>

          <Button
            className="w-100"
            onClick={() => {
              if (!selectedDate) return;
              const formatted = format(selectedDate, "yyyy-MM-dd");
              router.push(`/reservations/new?date=${formatted}`);
            }}
          >
            新規予約登録
          </Button>
        </div>

        <CollapsibleContent className="mt-4">
          <ReservationTimeline reservations={reservations} tables={tables} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
