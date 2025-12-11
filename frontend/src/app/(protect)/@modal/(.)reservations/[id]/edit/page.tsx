"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReservationEditModal({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    customer_name: "",
    date: "",
    time: "",
    menu: "",
    memo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: PUT /api/v1/reservations/:id に置き換え
    alert(`ID ${id} を更新（ダミー）: ` + JSON.stringify(form));
    router.back();
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => router.back()}
      />

      {/* 右からスライドするパネル */}
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
          <h2 className="text-xl font-bold">予約編集（モーダル）</h2>
          <p className="text-xs text-muted-foreground mb-2">
            ID: <span className="font-mono">{id}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="顧客名"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
            />
            <Input
              placeholder="日付 (YYYY-MM-DD)"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <Input
              placeholder="時間 (HH:MM)"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
            <Input
              placeholder="メニュー"
              name="menu"
              value={form.menu}
              onChange={handleChange}
            />
            <Input
              placeholder="メモ"
              name="memo"
              value={form.memo}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full mt-2">
              保存する
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
