import type { Seat } from "@/types/reservation";

export const SEATS: Seat[] = [
  // カウンター
  ...Array.from({ length: 16 }, (_, i) => ({
    type: "counter" as const,
    code: String(i + 1),
  })),

  // テーブル
  { type: "table", code: "A" },
  { type: "table", code: "B" },
  { type: "table", code: "C" },
  { type: "table", code: "D" },
  { type: "table", code: "菊" },
  { type: "table", code: "梅" },
  { type: "table", code: "竹" },
  { type: "table", code: "松" },
];
