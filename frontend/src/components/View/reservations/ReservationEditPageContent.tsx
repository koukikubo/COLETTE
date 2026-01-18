"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Reservation } from "@/types/reservation";
import { apiClient } from "@/lib/api/base";

type Props = {
  id: string;
};

export default function ReservationEditPageContent({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  /**
   * フォーム状態
   * ※ Reservation 全体ではなく「編集に必要な項目だけ」
   */
  const [form, setForm] = useState({
    customer_name: "",
    contact_phone: "",
    date: "", // UI用
    start_time: "", // UI用
    end_time: "", // UI用
    guest_count: 1,
    memo: "",
  });

  /** 初期データ取得 */
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get<Reservation>(
          `/reservations/${id}`
        );

        // start_at / end_at を UI 用に分解
        const start = new Date(data.start_at);
        const end = new Date(data.end_at);

        setForm({
          customer_name: data.customer_name,
          contact_phone: data.contact_phone ?? "",
          date: start.toISOString().slice(0, 10),
          start_time: start.toISOString().slice(11, 16),
          end_time: end.toISOString().slice(11, 16),
          guest_count: Number(data.guest_count),
          memo: data.memo ?? "",
        });
      } catch (err) {
        console.error("予約データ取得失敗", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  /** 入力更新 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** 保存 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.put(`/reservations/${id}`, {
        reservation: {
          customer_name: form.customer_name,
          contact_phone: form.contact_phone,
          start_at: `${form.date}T${form.start_time}:00+09:00`,
          end_at: `${form.date}T${form.end_time}:00+09:00`,
          guest_count: form.guest_count,
          memo: form.memo,
        },
      });

      alert("更新しました");
      router.back();
    } catch (err) {
      console.error("更新失敗", err);
      alert("更新に失敗しました");
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground px-6 py-4">
        データ読み込み中…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <Input
        placeholder="顧客名"
        name="customer_name"
        value={form.customer_name}
        onChange={handleChange}
      />

      <Input
        placeholder="電話番号"
        name="contact_phone"
        value={form.contact_phone}
        onChange={handleChange}
      />

      <Input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
        />
        <Input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
        />
      </div>

      <Input
        type="number"
        min={1}
        name="guest_count"
        value={form.guest_count}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            guest_count: Number(e.target.value),
          }))
        }
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
