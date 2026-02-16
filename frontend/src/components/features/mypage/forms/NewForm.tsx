"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMypage } from "@/lib/api/mypage/csr/mypage";
import { PrefectureSelect } from "@/components/features/mypage/components/prefecture-select";
import type { Mypage } from "types/mypages";

export default function NewForm() {
  const router = useRouter();

  const [form, setForm] = useState<Mypage>({
    family_name: "",
    family_name_kana: "",
    given_name: "",
    given_name_kana: "",
    nick_name: "",
    position: "",
    birthday: "",
    made_in: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await createMypage(form);
      router.push("/mypage");
      router.refresh();
    } catch (err: unknown) {
      console.error("登録エラー:", err);
      setError("登録に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const textFields: {
    label: string;
    name: keyof Mypage;
    type: string;
    required?: boolean;
  }[] = [
    { label: "姓", name: "family_name", type: "text", required: true },
    {
      label: "姓（カナ）",
      name: "family_name_kana",
      type: "text",
      required: true,
    },
    { label: "名", name: "given_name", type: "text", required: true },
    {
      label: "名（カナ）",
      name: "given_name_kana",
      type: "text",
      required: true,
    },
    { label: "ニックネーム", name: "nick_name", type: "text" },
    { label: "役職", name: "position", type: "text" },
    { label: "誕生日", name: "birthday", type: "date", required: true },
    { label: "電話番号", name: "phone", type: "tel", required: true },
  ];

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-6 text-2xl font-bold">マイページ情報の登録</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {textFields.map(({ label, name, type, required }) => (
          <div key={String(name)}>
            <label className="mb-1 block text-sm font-medium">{label}</label>
            <input
              type={type}
              name={name as string}
              value={form[name] ?? ""}
              onChange={handleChange}
              required={required}
              className="w-full rounded border px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <PrefectureSelect
          value={form.made_in}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              made_in: value,
            }))
          }
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white
                     hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "登録中..." : "登録する"}
        </button>
      </form>
    </div>
  );
}
