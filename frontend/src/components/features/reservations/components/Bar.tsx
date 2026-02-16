"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import type { Reservation } from "@/types/reservation";

type Props = {
  reservation: Reservation;
  startMinutes: number;
  endMinutes: number;
  pxPerMinute: number;
  gridPx: number;
};
const toMinutesFromISO = (iso: string) => {
  const date = new Date(iso);
  return date.getHours() * 60 + date.getMinutes();
};
const formatMinutes = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(
    2,
    "0",
  )}`;

export function ReservationBar({
  reservation,
  startMinutes,
  endMinutes,
  pxPerMinute,
}: Props) {
  /* ===== 予約時間（分） ===== */
  const start = toMinutesFromISO(reservation.start_at);
  const end = toMinutesFromISO(reservation.end_at);

  /* ===== 表示範囲に収める ===== */
  const clampedStart = Math.max(startMinutes, start);
  const clampedEndRaw = Math.min(endMinutes, end);
  const clampedEnd =
    clampedEndRaw > clampedStart ? clampedEndRaw : clampedStart;

  const left = (clampedStart - startMinutes) * pxPerMinute;
  const width = Math.max(
    (clampedEnd - clampedStart) * pxPerMinute,
    pxPerMinute,
  );

  const style: CSSProperties = {
    left,
    width,
    zIndex: 1,
    pointerEvents: "auto",
  };

  return (
    <div
      style={style}
      className="absolute top-1 h-8 rounded bg-primary px-2 text-xs text-primary-foreground select-none flex items-center shadow-sm"
    >
      {/* 予約詳細リンク */}
      <Link
        href={`/reservations/${reservation.id}/edit`}
        className="flex items-center gap-2 flex-1 hover:underline"
      >
        <span className="font-semibold">{reservation.customer_name} 様</span>

        <span className="opacity-90">
          {formatMinutes(start)} → {formatMinutes(end)}
        </span>

        <span className="opacity-80 text-[11px]">
          {reservation.guest_count}名
        </span>
      </Link>
    </div>
  );
}
