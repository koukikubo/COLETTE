"use client";

import ReservationNew from "@/components/View/reservations/ReservationNew";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ReservationNewModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => router.back()}
      />

      <motion.div
        className="relative h-full w-[420px] bg-background text-foreground shadow-xl z-50 border-l border-border"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25 }}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-500"
        ></button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">新規予約（モーダル）</h2>

          <ReservationNew />
        </div>
      </motion.div>
    </div>
  );
}
