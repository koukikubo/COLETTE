// components/forms/mypage/MypageEditForm.tsx
"use client";

import { useState } from "react";
import type { Mypage } from "types/api";
import { Button } from "@/components/ui/button";
import { PrefectureSelect } from "./prefecture-select";
import apiClient from "@/lib/api/Client";
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

export function MypageEditForm({
  initialValue,
}: {
  initialValue: Mypage | null;
}) {
  const [form, setForm] = useState<Mypage>(
    initialValue ?? {
      id: 0,
      family_name: "",
      family_name_kana: "",
      given_name: "",
      given_name_kana: "",
      nick_name: "",
      position: "",
      birthday: "",
      made_in: "",
      phone: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/mypage/mypages/${form.id}`, { mypage: form });
      router.push("/");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("更新に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {textFields.map(({ label, name, type }) => (
        <div key={String(name)}>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={form[name] ?? ""}
            onChange={handleChange}
            className="w-full rounded border border-gray-400 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      ))}

      <PrefectureSelect
        value={form.made_in}
        onChange={(v) => setForm((prev) => ({ ...prev, made_in: v }))}
        required
      />

      <Button type="submit">保存</Button>
    </form>
  );
}
