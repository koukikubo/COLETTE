"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import apiClient from "@/lib/apiClient";
import type { Mypage } from "types/api";
import { useMypage } from "@/app/(protect)/mypage/hooks/useMypage";
import { PrefectureSelect } from "@/components/forms/prefecture-select";

export default function MypageNewPage() {
  const router = useRouter();
  const { mypage, loading, error: swrError } = useMypage();

  // 既に登録済みなら編集へ
  useEffect(() => {
    if (mypage) router.replace("/mypage/edit");
  }, [mypage, router]);

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

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p className="p-6">読み込み中...</p>;
  if (swrError) return <p className="p-6">読み込みに失敗しました</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    try {
      setSubmitting(true);
      await apiClient.post("/mypages", { mypage: form });
      router.push("/mypage");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const messages = err.response?.data?.errors;
        setFormError(messages?.join(", ") || "登録に失敗しました");
      } else {
        setFormError("予期しないエラーが発生しました");
      }
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        マイページ情報の登録
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {textFields.map(({ label, name, type }) => (
          <div key={String(name)}>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
              {label}
            </label>
            <input
              type={type}
              name={name as string}
              value={form[name] ?? ""}
              onChange={handleChange}
              className="w-full rounded border border-gray-400 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              required={name !== "nick_name" && name !== "position"}
            />
          </div>
        ))}

        <PrefectureSelect
          value={form.made_in}
          onChange={(v) => setForm((prev) => ({ ...prev, made_in: v }))}
          required
        />

        {formError && <p className="text-sm text-red-500">{formError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "登録中..." : "登録する"}
        </button>
      </form>
    </div>
  );
}
