"use client";

import { useState } from "react";
import type { Mypage } from "types/mypages";
import { Button } from "@/components/ui/button";
import { PrefectureSelect } from "../components/prefecture-select";
import { updateMypage } from "@/lib/api/mypage/csr/mypage";
import { useRouter } from "next/navigation";

const textFields: { label: string; name: keyof Mypage; type: string }[] = [
  { label: "姓", name: "family_name", type: "text" },
  { label: "姓（カナ）", name: "family_name_kana", type: "text" },
  { label: "名", name: "given_name", type: "text" },
  { label: "名（カナ）", name: "given_name_kana", type: "text" },
  { label: "ニックネーム", name: "nick_name", type: "text" },
  { label: "役職", name: "position", type: "text" },
  { label: "誕生日", name: "birthday", type: "date" },
  { label: "電話番号", name: "phone", type: "tel" },
];

export function EditForm({ initialValue }: { initialValue: Mypage | null }) {
  const router = useRouter();

  const [form, setForm] = useState<Mypage>(initialValue!);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateMypage(form.id!, form);
      router.push("/mypage");
      router.refresh();
    } catch {
      setError("更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {textFields.map(({ label, name, type }) => (
        <div key={String(name)}>
          <label className="mb-1 block text-sm font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={form[name] ?? ""}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <PrefectureSelect
        value={form.made_in}
        onChange={(v) => setForm((prev) => ({ ...prev, made_in: v }))}
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button disabled={saving}>{saving ? "保存中..." : "保存"}</Button>
    </form>
  );
}
