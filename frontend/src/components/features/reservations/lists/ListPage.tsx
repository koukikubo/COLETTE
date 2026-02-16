"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Reservation } from "@/types/reservation";
import {
  fetchReservationMasters,
  type ReservationMasters,
} from "@/lib/api/reservation/csr/reservationMasters";
import type { StandardListItem } from "@/types/standard";

type ReservationListProps = {
  selectedDate: string;
  reservations: Reservation[];
};

export default function ReservationList({
  reservations,
}: ReservationListProps) {
  const [masters, setMasters] = useState<ReservationMasters | null>(null);
  const COURSE_MENU_TYPE_CODE = "1";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchReservationMasters();
        setMasters(data);
      } catch (e) {
        console.error("マスタ取得失敗", e);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {reservations.map((r) => {
          const isCourseMenu = r.menu_type_code === COURSE_MENU_TYPE_CODE;
          const menuTypeName =
            masters?.menu_types?.find(
              (m: StandardListItem) => m.list_code === r.menu_type_code,
            )?.name ?? "未選択";
          const courseTypeName =
            masters?.courses?.find(
              (c: StandardListItem) => c.list_code === r.course_code,
            )?.name ?? "未選択";

          return (
            <div
              key={r.id}
              className="block rounded border p-4 hover:bg-accent transition-colors"
            >
              <Link href={`/reservations/${r.id}/edit`} className="block">
                <div className="font-semibold">{r.customer_name} 様</div>

                <div className="text-sm text-muted-foreground">
                  予約時間 : {r.start_at.slice(11, 16)} 〜
                  {r.end_at.slice(11, 16)}まで
                </div>

                <div className="text-sm mt-1">
                  テーブル情報 :{" "}
                  {(r.tables ?? []).map((s) => s.name).join(" / ")}
                </div>

                <div className="text-sm mt-1">メニュー情報：{menuTypeName}</div>

                {isCourseMenu && r.course_code && (
                  <div className="text-sm mt-1">
                    コース種別：{courseTypeName}
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
