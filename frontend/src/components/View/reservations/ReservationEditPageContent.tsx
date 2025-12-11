"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/Client";
import type { Reservation } from "types/reservation";

type Props = {
  id: string;
};

export default function ReservationEditPageContent({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Reservation>>({
    customer_name: "",
    date: "",
    time: "",
    menu: "",
    memo: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get<Reservation>(
          `/reservations/${id}`
        );

        setForm({
          customer_name: data.customer_name || "",
          date: data.date || "",
          time: data.time || "",
          menu: data.menu || "",
          memo: data.memo || "",
        });
      } catch (err) {
        console.error("予約データ取得失敗", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  /** 入力更新 **/
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** 保存 **/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/reservations/${id}`, form);
      alert("更新しました");
      router.back();
    } catch (err) {
      console.error("更新失敗", err);
      alert("更新に失敗しました");
    }
  };

  if (loading)
    return (
      <div className="text-sm text-muted-foreground px-6 py-4">
        データ読み込み中…
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
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

      <Button type="submit" className="w-full">
        保存
      </Button>
    </form>
  );
}
