"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/base";
import type { Reservation } from "@/types/reservation";

type Props = {
  params: { id: string };
};

const formatDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);
const formatTime = (iso: string) => new Date(iso).toTimeString().slice(0, 5);

export default function ReservationDetailModal({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get<Reservation>(
          `/reservations/${id}`
        );
        setReservation(data);
      } catch (err) {
        console.error("予約詳細取得失敗", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => router.back()}
      />

      {/* 右スライド */}
      <motion.div
        className="relative h-full w-[420px] bg-background shadow-xl border-l"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25 }}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-muted-foreground"
        >
          ✕
        </button>

        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold">予約詳細</h2>

          {loading && (
            <div className="text-sm text-muted-foreground">読み込み中…</div>
          )}

          {!loading && reservation && (
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">顧客名：</span>
                {reservation.customer_name}
              </div>

              <div>
                <span className="text-muted-foreground">日付：</span>
                {formatDate(reservation.start_at)}
              </div>

              <div>
                <span className="text-muted-foreground">時間：</span>
                {formatTime(reservation.start_at)} ～{" "}
                {formatTime(reservation.end_at)}
              </div>

              <div>
                <span className="text-muted-foreground">人数：</span>
                {reservation.guest_count} 名
              </div>

              <div>
                <span className="text-muted-foreground">席：</span>
                {reservation.tables.map((s) => s.code).join(" / ")}
              </div>

              {reservation.memo && (
                <div>
                  <span className="text-muted-foreground">メモ：</span>
                  {reservation.memo}
                </div>
              )}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button asChild variant="outline" size="sm">
              <Link href={`/reservations/${id}/edit`}>編集する</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
