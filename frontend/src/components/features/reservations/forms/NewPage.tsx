/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { createReservation } from "@/lib/api/reservations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { GuestCountMap } from "@/types/standard";
import { useReservationMasters } from "@/hooks/useReservationMasters";
import type { CreateReservationPayload } from "@/types/reservation";
import type { Table } from "@/types/table";
import { fetchTables } from "@/lib/api/table/csr/tables";

type Props = {
  date: string;
  onSuccess?: () => void;
};

export function NewPage({ date, onSuccess }: Props) {
  const router = useRouter();

  /* ===== 基本入力 ===== */
  const [customerName, setCustomerName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [start, setStart] = useState("17:00");
  const [end, setEnd] = useState("19:30");

  /* ===== マスタ系（基本コード） ===== */
  const {
    menu_types,
    courses,
    allergies,
    guest_types,
    status,
    purpose,
    cancel,
  } = useReservationMasters();

  /* ===== テーブルマスタ ===== */
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  useEffect(() => {
    const loadTables = async () => {
      try {
        const data = await fetchTables();
        setTables(data.filter((t: Table) => t.enabled !== false));
      } catch (e) {
        console.error("テーブル取得失敗", e);
      }
    };
    loadTables();
  }, []);

  /* ===== 入力されている内容の管理 ===== */
  const [menuTypeCode, setMenuTypeCode] = useState<string>();
  const [courseCode, setCourseCode] = useState<string>();
  const [allergyCodes, setAllergyCodes] = useState<string[]>([]);
  const [guestCounts, setGuestCounts] = useState<GuestCountMap>({});
  const [statusCode, setStatusCode] = useState<string>();
  const [purposeCode, setPurposeCode] = useState<string>();
  const [cancelCode, setCancelCode] = useState<string>();
  const [selectedDate, setSelectedDate] = useState(date);
  const [memo, setMemo] = useState("");

  /** 合計人数 */
  const totalGuests = Object.values(guestCounts).reduce((a, b) => a + b, 0);
  /* ===== UI状態 ===== */
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  /* ===== 登録 ===== */
  const handleSubmit = async () => {
    setError(null);

    if (!customerName.trim()) return setError("顧客名を入力してください");
    if (!selectedTableId) return setError("テーブルを選択してください");
    if (start >= end) return setError("時間が不正です");
    if (totalGuests <= 0) return setError("人数を入力してください");

    setSubmitting(true);

    const payload: CreateReservationPayload = {
      customer_name: customerName.trim(),
      contact_phone: contactPhone || null,
      start_at: `${selectedDate}T${start}:00+09:00`,
      end_at: `${selectedDate}T${end}:00+09:00`,
      guest_count: totalGuests,
      guest_counts: guestCounts,
      status_code: statusCode ?? "1",
      menu_type_code: menuTypeCode ?? null,
      course_code: courseCode ?? null,
      allergy_code: allergyCodes.join(",") || null,
      table_ids: [selectedTableId],
      purpose_code: purposeCode ?? null,
      cancel_reason_code: cancelCode ?? null,
      memo: memo || null,
    };

    try {
      await createReservation(payload);

      onSuccess?.();
      router.refresh();
      router.back();
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "isAxiosError" in e &&
        (e as { isAxiosError: boolean }).isAxiosError
      ) {
        const axiosError = e as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message ?? "登録に失敗しました");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setSubmitting(false);
    }
  };
  const COURSE_MENU_TYPE_CODE = "1";
  const isCourseMenu = menuTypeCode === COURSE_MENU_TYPE_CODE;

  return (
    <div className="space-y-4">
      <Input
        placeholder="顧客名"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <Input
        placeholder="電話番号"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
      />

      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <Input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div>人数</div>
        {guest_types
          .filter((p: any) => p.enabled)
          .map((p: any) => (
            <div key={p.list_code} className="flex items-center gap-2">
              <span className="w-24">{p.name}</span>
              <Input
                type="number"
                min={0}
                value={guestCounts[p.list_code] ?? 0}
                onChange={(e) =>
                  setGuestCounts((prev) => ({
                    ...prev,
                    [p.list_code]: Number(e.target.value),
                  }))
                }
                className="w-20"
              />
              <span>名</span>
            </div>
          ))}
        <div className="text-sm text-muted-foreground">
          合計: {totalGuests} 名
        </div>
      </div>

      <Select
        value={menuTypeCode}
        onValueChange={(v) => {
          setMenuTypeCode(v);
          if (v !== COURSE_MENU_TYPE_CODE) {
            setCourseCode("");
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="メニュータイプ" />
        </SelectTrigger>
        <SelectContent>
          {menu_types
            .filter((p) => p.enabled)
            .map((m) => (
              <SelectItem key={m.list_code} value={m.list_code}>
                {m.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {isCourseMenu && (
        <Select value={courseCode} onValueChange={setCourseCode}>
          <SelectTrigger>
            <SelectValue placeholder="コース種別" />
          </SelectTrigger>
          <SelectContent>
            {courses
              .filter((p) => p.enabled)
              .map((c) => (
                <SelectItem key={c.list_code} value={c.list_code}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      <Select value={statusCode} onValueChange={setStatusCode}>
        <SelectTrigger>
          <SelectValue placeholder="ステータス" />
        </SelectTrigger>
        <SelectContent>
          {status
            .filter((p) => p.enabled)
            .map((s) => (
              <SelectItem key={s.list_code} value={s.list_code}>
                {s.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={purposeCode} onValueChange={setPurposeCode}>
        <SelectTrigger>
          <SelectValue placeholder="利用目的" />
        </SelectTrigger>
        <SelectContent>
          {purpose
            .filter((p) => p.enabled)
            .map((s) => (
              <SelectItem key={s.list_code} value={s.list_code}>
                {s.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={cancelCode} onValueChange={setCancelCode}>
        <SelectTrigger>
          <SelectValue placeholder="キャンセル理由" />
        </SelectTrigger>
        <SelectContent>
          {cancel
            .filter((p) => p.enabled)
            .map((s) => (
              <SelectItem key={s.list_code} value={s.list_code}>
                {s.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* テーブル（tablesマスタから選択） */}
      <Select
        value={selectedTableId ? String(selectedTableId) : ""}
        onValueChange={(v) => setSelectedTableId(Number(v))}
      >
        <SelectTrigger>
          <SelectValue placeholder="テーブル" />
        </SelectTrigger>
        <SelectContent>
          {tables.map((t) => (
            <SelectItem key={t.id} value={String(t.id)}>
              {t.name}（{t.capacity}名）
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* アレルギー */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {allergyCodes.length
              ? `${allergyCodes.length}件選択中`
              : "アレルギーを選択"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          {allergies
            .filter((p) => p.enabled)
            .map((a) => (
              <label key={a.list_code} className="flex items-center gap-2">
                <Checkbox
                  checked={allergyCodes.includes(a.list_code)}
                  onCheckedChange={(v) =>
                    setAllergyCodes((prev) =>
                      v
                        ? [...prev, a.list_code]
                        : prev.filter((c) => c !== a.list_code),
                    )
                  }
                />
                {a.name}
              </label>
            ))}
        </PopoverContent>
      </Popover>

      <div className="space-y-1">
        <div>メモ</div>
        <textarea
          className="w-full min-h-[80px] border rounded p-2 text-sm"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      <Button onClick={handleSubmit} disabled={submitting}>
        登録
      </Button>
    </div>
  );
}
