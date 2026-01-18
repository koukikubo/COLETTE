"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import type { Reservation } from "@/types/reservation";
import { SeatLane } from "./SeatLane";
import type { Table } from "@/types/table";

type Props = {
  reservations: Reservation[];
  tables: Table[];
  onChange?: (next: Reservation[]) => void;
};

const GRID_MINUTES = 15;
const BASE_PX_PER_GRID = 30;
const BASE_PX_PER_MINUTE = BASE_PX_PER_GRID / GRID_MINUTES;
const LEFT_GUTTER_PX = 64;
const GAP_PX = 8;

const TIMELINE_START = "16:00";
const TIMELINE_END = "24:00";

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const toStr = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(
    2,
    "0"
  )}`;

export function ReservationTimeline({ reservations, tables, onChange }: Props) {
  /* ===== 時間軸 ===== */
  const startMinutes = toMin(TIMELINE_START);
  const endMinutes = toMin(TIMELINE_END);
  const totalMinutes = endMinutes - startMinutes;

  /* ===== 横幅の自動計算 ===== */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const target = containerRef.current?.parentElement ?? containerRef.current;
    if (!target) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const measuredWidth =
    containerWidth > LEFT_GUTTER_PX + GAP_PX
      ? containerWidth - LEFT_GUTTER_PX - GAP_PX
      : 0;

  const effectiveWidth = measuredWidth || totalMinutes * BASE_PX_PER_MINUTE;
  const pxPerMinute = effectiveWidth / totalMinutes;
  const gridPx = pxPerMinute * GRID_MINUTES;

  /* ===== ドラッグ終了 ===== */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    if (!over) return;

    const reservationId = Number(active.id);
    const newTableId = Number(over.id); // ★ SeatLane droppable id = table.id

    const target = reservations.find((r) => r.id === reservationId);
    if (!target) return;

    const currentStart = toMin(target.start_at.slice(11, 16));
    const currentEnd = toMin(target.end_at.slice(11, 16));
    const duration = currentEnd - currentStart;

    const minutesDelta = Math.round(delta.x / gridPx) * GRID_MINUTES;

    const nextStart = Math.min(
      Math.max(startMinutes, currentStart + minutesDelta),
      endMinutes - duration
    );
    const nextEnd = nextStart + duration;

    const newTable = tables.find((t) => t.id === newTableId);
    if (!newTable) return;

    // ★ tables をダミーで壊さない。newTable をそのまま入れる
    const updated: Reservation = {
      ...target,
      start_at: `${target.start_at.slice(0, 11)}${toStr(nextStart)}:00+09:00`,
      end_at: `${target.end_at.slice(0, 11)}${toStr(nextEnd)}:00+09:00`,
      tables: [newTable],
    };

    const nextReservations = reservations.map((r) =>
      r.id === reservationId ? updated : r
    );

    onChange?.(nextReservations);
  };

  const hourMarkers = Array.from(
    { length: Math.floor(totalMinutes / 60) + 1 },
    (_, i) => startMinutes + i * 60
  );

  const safeTables = Array.isArray(tables) ? tables : [];

  /* ===== グループ分け ===== */
  const seatGroups: { title: string; tables: Table[] }[] = [
    {
      title: "カウンター",
      tables: safeTables.filter((t) => t.seat_type === "counter"),
    },
    {
      title: "テーブル",
      tables: safeTables.filter((t) => t.seat_type === "table"),
    },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div ref={containerRef} className="w-full overflow-x-hidden">
        <div className="space-y-4">
          {/* ===== 時間ヘッダ ===== */}
          <div className="flex" style={{ gap: GAP_PX }}>
            <div style={{ width: LEFT_GUTTER_PX }} />
            <div
              className="relative h-8 text-xs text-muted-foreground"
              style={{ width: effectiveWidth }}
            >
              {hourMarkers.map((m) => (
                <div
                  key={m}
                  className="absolute"
                  style={{
                    left: `${(m - startMinutes) * pxPerMinute}px`,
                    transform:
                      m === endMinutes
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
                  }}
                >
                  {toStr(m)}
                </div>
              ))}
            </div>
          </div>

          {/* ===== レーン ===== */}
          {seatGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground">
                {group.title}
              </div>

              {group.tables.map((table) => (
                <SeatLane
                  key={table.id}
                  table={table}
                  startMinutes={startMinutes}
                  endMinutes={endMinutes}
                  pxPerMinute={pxPerMinute}
                  gridPx={gridPx}
                  laneWidth={effectiveWidth}
                  gapPx={GAP_PX}
                  reservations={reservations.filter((r) =>
                    (r.tables ?? []).some((rt) => rt.id === table.id)
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
