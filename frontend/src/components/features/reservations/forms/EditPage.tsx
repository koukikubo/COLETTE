/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/base";
import type { Table } from "@/types/table";
import { fetchTables } from "@/lib/api/table/csr/tables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteReservation, fetchReservation } from "@/lib/api/reservations";
import {
  fetchReservationMasters,
  ReservationMasters,
} from "@/lib/api/reservation/csr/reservationMasters";

type Props = {
  id: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const toDateInputLocal = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const toTimeInputLocal = (iso: string) => {
  const d = new Date(iso);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

export default function ReservationEditPageContent({ id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [tables, setTables] = useState<Table[]>([]);
  const [masters, setMasters] = useState<ReservationMasters | null>(null);

  const [form, setForm] = useState({
    customer_name: "",
    contact_phone: "",
    date: "",
    start_time: "",
    end_time: "",
    guest_count: 1,
    memo: "",
    status_code: "1",
    guest_counts: {} as Record<string, number>,
    menu_type_code: "",
    course_code: "",
    purpose_code: "",
    cancel_reason_code: "",
    allergy_codes: [] as string[],
    table_id: null as number | null,
  });

  // ★あなたの環境の「コース」のlist_codeに合わせる
  const COURSE_MENU_TYPE_CODE = "1";
  const isCourseMenu = form.menu_type_code === COURSE_MENU_TYPE_CODE;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [reservation, mastersData, tablesData] = await Promise.all([
          fetchReservation(Number(id)),
          fetchReservationMasters(),
          fetchTables(),
        ]);

        setMasters(mastersData);
        setTables(tablesData.filter((t) => t.enabled !== false));

        setForm((prev) => ({
          ...prev,
          customer_name: reservation.customer_name,
          contact_phone: reservation.contact_phone ?? "",
          date: toDateInputLocal(reservation.start_at),
          start_time: toTimeInputLocal(reservation.start_at),
          end_time: toTimeInputLocal(reservation.end_at),
          guest_count: Number(reservation.guest_count),
          guest_counts: {},
          memo: reservation.memo ?? "",
          status_code: reservation.status_code ?? "1",
          menu_type_code: reservation.menu_type_code || "",
          course_code: reservation.course_code || "",
          purpose_code: reservation.purpose_code || "",
          cancel_reason_code: reservation.cancel_reason_code || "",
          allergy_codes: reservation.allergy_codes ?? [],
          table_id: reservation.tables?.[0]?.id ?? null,
        }));
      } catch (err) {
        console.error("予約データ取得失敗", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleDelete = async () => {
    const ok = confirm("この予約を削除しますか？");
    if (!ok) return;

    try {
      setSaving(true);
      await deleteReservation(Number(id));
      alert("削除しました");
      window.dispatchEvent(new Event("reservation:updated"));
      router.back();
    } catch (err) {
      console.error("削除失敗", err);
      alert("削除に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await apiClient.put(`/reservations/${id}`, {
        reservation: {
          customer_name: form.customer_name,
          contact_phone: form.contact_phone,
          start_at: `${form.date}T${form.start_time}:00+09:00`,
          end_at: `${form.date}T${form.end_time}:00+09:00`,
          guest_count: form.guest_count,
          memo: form.memo,
          status_code: form.status_code,
          menu_type_code: form.menu_type_code || "",
          course_code: form.course_code || "",
          purpose_code: form.purpose_code || "",
          cancel_reason_code: form.cancel_reason_code || "",
          allergy_codes: form.allergy_codes,
          table_id: form.table_id,
        },
      });

      alert("更新しました");
      router.back();
    } catch (err) {
      console.error("更新失敗", err);
      alert("更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-sm">読み込み中…</div>;
  if (!masters) return <div className="p-6 text-sm">マスタ読み込み中…</div>;

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

      {/* ステータス */}
      <Select
        value={form.status_code}
        onValueChange={(v) => setForm((prev) => ({ ...prev, status_code: v }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="ステータス" />
        </SelectTrigger>
        <SelectContent>
          {(masters.status ?? [])
            .filter((p: any) => p.enabled)
            .map((s: any) => (
              <SelectItem key={s.list_code} value={s.list_code}>
                {s.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* メニュータイプ（★ここでコース以外なら course_code を消す） */}
      <Select
        value={form.menu_type_code}
        onValueChange={(v) =>
          setForm((prev) => ({
            ...prev,
            menu_type_code: v,
            course_code: v === COURSE_MENU_TYPE_CODE ? prev.course_code : "",
          }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="メニュータイプ" />
        </SelectTrigger>
        <SelectContent>
          {(masters.menu_types ?? [])
            .filter((p: any) => p.enabled)
            .map((m: any) => (
              <SelectItem key={m.list_code} value={m.list_code}>
                {m.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* コース種別（★コースの時だけ表示） */}
      {isCourseMenu && (
        <Select
          value={form.course_code}
          onValueChange={(v) =>
            setForm((prev) => ({ ...prev, course_code: v }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="コース種別" />
          </SelectTrigger>
          <SelectContent>
            {(masters.courses ?? [])
              .filter((p: any) => p.enabled)
              .map((c: any) => (
                <SelectItem key={c.list_code} value={c.list_code}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      {/* 利用目的 */}
      <Select
        value={form.purpose_code}
        onValueChange={(v) => setForm((prev) => ({ ...prev, purpose_code: v }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="利用目的" />
        </SelectTrigger>
        <SelectContent>
          {(masters.purpose ?? [])
            .filter((p: any) => p.enabled)
            .map((p: any) => (
              <SelectItem key={p.list_code} value={p.list_code}>
                {p.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* キャンセル理由 */}
      <Select
        value={form.cancel_reason_code}
        onValueChange={(v) =>
          setForm((prev) => ({ ...prev, cancel_reason_code: v }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="キャンセル理由" />
        </SelectTrigger>
        <SelectContent>
          {(masters.cancel ?? [])
            .filter((p: any) => p.enabled)
            .map((c: any) => (
              <SelectItem key={c.list_code} value={c.list_code}>
                {c.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* テーブル */}
      <Select
        value={form.table_id ? String(form.table_id) : ""}
        onValueChange={(v) =>
          setForm((prev) => ({ ...prev, table_id: Number(v) }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="テーブル" />
        </SelectTrigger>
        <SelectContent>
          {tables.map((t) => (
            <SelectItem key={t.id} value={String(t.id)}>
              {t.code} / {t.name}（{t.capacity}名）
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="メモ"
        name="memo"
        value={form.memo}
        onChange={handleChange}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="destructive"
          className="w-1/2"
          onClick={handleDelete}
          disabled={saving}
        >
          削除
        </Button>

        <Button type="submit" className="w-1/2" disabled={saving}>
          {saving ? "保存中…" : "保存"}
        </Button>
      </div>
    </form>
  );
}
