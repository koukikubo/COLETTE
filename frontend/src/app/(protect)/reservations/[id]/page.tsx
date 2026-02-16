"use client";

import { useEffect, useState } from "react";
import { ReservationTimeline } from "@/components/features/reservations/components/Timeline";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import type { Reservation } from "@/types/reservation";
import { Table } from "@/types/table";

export default function ReservationDetailTimeline({ date }: { date: string }) {
  const [open, setOpen] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  useEffect(() => {
    fetch(`/api/v1/reservations?date=${date}`)
      .then((res) => res.json())
      .then(setReservations);
    fetch(`/api/v1/tables`)
      .then((res) => res.json())
      .then(setTables);
  }, [date]);

  return (
    <div className="p-4 space-y-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline">
            {open ? "閉じる" : "開く"} タイムライン
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4">
          <ReservationTimeline reservations={reservations} tables={tables} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
