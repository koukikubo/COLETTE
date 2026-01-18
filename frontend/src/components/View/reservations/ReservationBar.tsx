"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
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

/**
 * Rails の datetime（ISO8601）を「分」に変換
 * 例: 2026-01-05T18:30:00+09:00 → 1110
 */
const toMinutesFromISO = (iso: string) => {
  const date = new Date(iso);
  return date.getHours() * 60 + date.getMinutes();
};

/**
 * 分 → HH:mm 表示
 */
const formatMinutes = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(
    2,
    "0"
  )}`;

export function ReservationBar({
  reservation,
  startMinutes,
  endMinutes,
  pxPerMinute,
  gridPx,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: reservation.id, // number OK（DnD-kit対応）
  });

  /* ===== 予約時間（分） ===== */
  const start = toMinutesFromISO(reservation.start_at);
  const end = toMinutesFromISO(reservation.end_at);
  const duration = end - start;

  /* ===== 表示範囲に収める ===== */
  const clampedStart = Math.max(startMinutes, start);
  const clampedEndRaw = Math.min(endMinutes, end);
  const clampedEnd =
    clampedEndRaw > clampedStart ? clampedEndRaw : clampedStart;

  const left = (clampedStart - startMinutes) * pxPerMinute;
  const width = Math.max(
    (clampedEnd - clampedStart) * pxPerMinute,
    pxPerMinute
  );

  /* ===== ドラッグ中のプレビュー ===== */
  const gridMinutes = Math.round(gridPx / pxPerMinute);
  const dragMinutes = transform
    ? Math.round(transform.x / gridPx) * gridMinutes
    : 0;

  const maxPreviewStart = Math.max(startMinutes, endMinutes - duration);
  const previewStart = Math.min(
    Math.max(startMinutes, start + dragMinutes),
    maxPreviewStart
  );
  const previewEnd = Math.min(previewStart + duration, endMinutes);

  const style: CSSProperties = {
    left,
    width,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : 1,
    pointerEvents: "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="absolute top-1 h-8 rounded bg-primary px-2 text-xs text-primary-foreground cursor-grab select-none flex items-center shadow-sm"
    >
      {/* ドラッグハンドル */}
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="mr-2 h-5 w-5 flex items-center justify-center rounded bg-primary-foreground/20 text-primary-foreground cursor-grab"
        aria-label="ドラッグで移動"
      >
        ☰
      </button>

      {/* 予約詳細リンク */}
      <Link
        href={`/reservations/${reservation.id}`}
        className="flex items-center gap-2 flex-1 hover:underline"
      >
        <span className="font-semibold">{reservation.customer_name}</span>

        <span className="opacity-90">
          {formatMinutes(previewStart)} → {formatMinutes(previewEnd)}
        </span>

        <span className="opacity-80 text-[11px]">
          {reservation.guest_count}名
        </span>
      </Link>
    </div>
  );
}
