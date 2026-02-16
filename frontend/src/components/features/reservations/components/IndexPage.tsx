"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ReservationTimeline } from "@/components/features/reservations/components/Timeline";
import ReservationList from "@/components/features/reservations/lists/ListPage";
import { fetchReservations } from "@/lib/api/reservations";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Reservation } from "@/types/reservation";
import { Table } from "@/types/table";

type Props = {
  initialReservations: Reservation[];
  tables: Table[];
  selectedDate: string;
};

export default function IndexPage({
  initialReservations,
  tables,
  selectedDate,
}: Props) {
  const router = useRouter();

  // ★SSRの値を初期値にする
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);

  const [open, setOpen] = useState(true);

  // CSR更新用
  const reloadReservations = useCallback(async () => {
    const data = await fetchReservations(selectedDate);
    setReservations(data);
  }, [selectedDate]);

  // イベント更新
  useEffect(() => {
    const handler = () => reloadReservations();
    window.addEventListener("reservation:updated", handler);
    return () => window.removeEventListener("reservation:updated", handler);
  }, [reloadReservations]);

  return (
    <div className="p-4 space-y-4">
      {/* 日付操作 */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => router.push(`/reservations?date=${e.target.value}`)}
          className="border rounded px-2 py-1"
        />
        <Button
          variant="outline"
          onClick={() =>
            router.push(
              `/reservations?date=${new Date().toISOString().slice(0, 10)}`,
            )
          }
        >
          今日
        </Button>
      </div>

      {/* タイムライン */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              {open ? "閉じる" : "開く"} タイムライン
            </Button>
          </CollapsibleTrigger>

          <Button
            onClick={() =>
              router.push(`/reservations/new?date=${selectedDate}`)
            }
          >
            新規予約登録
          </Button>
        </div>

        <CollapsibleContent className="mt-4">
          <ReservationTimeline reservations={reservations} tables={tables} />
        </CollapsibleContent>
      </Collapsible>

      {!open && (
        <ReservationList
          selectedDate={selectedDate}
          reservations={reservations}
        />
      )}
    </div>
  );
}
