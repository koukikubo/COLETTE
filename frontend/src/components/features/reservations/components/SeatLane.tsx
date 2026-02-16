"use client";

import type { Reservation } from "@/types/reservation";
import { ReservationBar } from "./Bar";
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
  const normalizeSeatLabel = (table: Table) => {
    const code = String(table.name);
    if (/^[CT]\d+$/i.test(code)) return code.toUpperCase();

    // 数字だけなら seat_type で付ける
    if (/^\d+$/.test(code)) {
      if (table.seat_type === "counter") return `${code}`;
      if (table.seat_type === "table") return `${code}`;
    }
    return code;
  };
  // 表示用（C1,T1→1 表示）
  const displayCode = normalizeSeatLabel(table);

  return (
    <div className="flex items-center" style={{ gap: gapPx }}>
      <div className="w-16 text-right text-xs font-medium">{displayCode}</div>

      <div
        className="relative h-10 flex-none rounded border overflow-visible bg-muted"
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
