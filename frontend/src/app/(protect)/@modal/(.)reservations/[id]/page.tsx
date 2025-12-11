"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/Client";
import type { Reservation } from "@/types/reservation";

type Props = {
  params: { id: string };
};

export default function ReservationDetailModal({ params }: Props) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  /** 初期データ取得 **/
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
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => router.back()}
      />

      {/* 右からスライド */}
      <motion.div
        className="relative h-full w-[420px] bg-background text-foreground shadow-xl z-50 border-l border-border"
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
          <h2 className="text-xl font-bold">予約詳細（モーダル）</h2>

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
                {reservation.date}
              </div>
              <div>
                <span className="text-muted-foreground">時間：</span>
                {reservation.time}
              </div>
              <div>
                <span className="text-muted-foreground">メニュー：</span>
                {reservation.menu}
              </div>
              <div>
                <span className="text-muted-foreground">メモ：</span>
                {reservation.memo}
              </div>
            </div>
          )}

          {/* 編集ボタン */}
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
