"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Reservation } from "@/types/reservation";
import { ReservationBar } from "./ReservationBar";
import type { Table } from "@/types/table";

type Props = {
  table: Table;
  reservations: Reservation[];
  startMinutes: number;
  endMinutes: number;
  pxPerMinute: number;
  gridPx: number;
  laneWidth: number;
  gapPx?: number;
};

export function SeatLane({
  table,
  reservations,
  startMinutes,
  endMinutes,
  pxPerMinute,
  gridPx,
  laneWidth,
  gapPx = 0,
}: Props) {
  // ★ droppable id は table.id に統一
  const { setNodeRef, isOver } = useDroppable({
    id: table.id, // number OK
  });

  // 表示用（C1→1 表示）
  const displayCode = table.code.startsWith("C")
    ? String(Number(table.code.slice(1)))
    : table.code;

  return (
    <div className="flex items-center" style={{ gap: gapPx }}>
      <div className="w-16 text-right text-xs font-medium">{displayCode}</div>

      <div
        ref={setNodeRef}
        className={`relative h-10 flex-none rounded border overflow-visible ${
          isOver ? "bg-accent/60" : "bg-muted"
        }`}
        style={{
          backgroundImage: [
            "linear-gradient(to right, var(--border) 1px, transparent 1px)",
            "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: `${gridPx}px 100%, ${gridPx * 4}px 100%`,
          backgroundPosition: "0 0, 0 0",
          width: laneWidth,
          minWidth: laneWidth,
        }}
      >
        {reservations.map((r) => (
          <ReservationBar
            key={r.id}
            reservation={r}
            startMinutes={startMinutes}
            endMinutes={endMinutes}
            pxPerMinute={pxPerMinute}
            gridPx={gridPx}
          />
        ))}
      </div>
    </div>
  );
}
