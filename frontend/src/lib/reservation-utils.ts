import type { Reservation } from "@/types/reservation";

/**
 * "18:30" → 分（1110）
 */
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/**
 * 時間が重なっているか？
 */
export const isOverlapping = (
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string
) => {
  const aS = toMinutes(aStart);
  const aE = toMinutes(aEnd);
  const bS = toMinutes(bStart);
  const bE = toMinutes(bEnd);
  return aS < bE && bS < aE;
};

/**
 * 同じ席を同じ時間に使っていないか？
 */
export const hasSeatConflict = (
  existing: Reservation[],
  next: Reservation
) => {
  return existing.some((r) => {
    // 時間が重なっていなければOK
    if (
      !isOverlapping(
        r.start_at.slice(11, 16),
        r.end_at.slice(11, 16),
        next.start_at.slice(11, 16),
        next.end_at.slice(11, 16)
      )
    ) {
      return false;
    }

    // 既存予約で使われている席
    const usedSeats = new Set(r.seats.map((s) => s.code));

    // 新しい予約が同じ席を使っていないか
    return next.seats.some((s) => usedSeats.has(s.code));
  });
};