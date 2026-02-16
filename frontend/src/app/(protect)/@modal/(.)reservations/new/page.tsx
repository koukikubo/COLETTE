"use client";

import { NewPage } from "@/components/features/reservations/forms/NewPage";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReservationNewModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const date =
    searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => router.back()}
      />

      <motion.div
        className="relative h-full w-[420px] bg-background shadow-xl border-l"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25 }}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">新規予約</h2>
          <NewPage date={date} />
        </div>
      </motion.div>
    </div>
  );
}
