"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/base";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CiMemoPad } from "react-icons/ci";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { Customer, CustomerFormState } from "@/types/customer";

export default function CustomerEditPage() {
  const router = useRouter();
  const { id } = useParams(); // URLから顧客ID取得
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CustomerFormState>({
    family_name: "",
    family_name_kana: "",
    given_name: "",
    given_name_kana: "",
    phone1: "",
    phone2: "",
    email: "",
    birthday: undefined,
    memo: "",
  });

  // ★ データ取得
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await apiClient.get<Customer>(`/customer/customers/${id}`);
        const data = res.data;

        setForm({
          family_name: data.family_name ?? "",
          family_name_kana: data.family_name_kana ?? "",
          given_name: data.given_name ?? "",
          given_name_kana: data.given_name_kana ?? "",
          phone1: data.phone1 ?? "",
          phone2: data.phone2 ?? "",
          email: data.email ?? "",
          birthday: data.birthday ? new Date(data.birthday) : undefined,
          memo: data.memo ?? "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading customer:", error);
        alert("顧客データの読み込みに失敗しました");
      }
    }

    fetchCustomer();
  }, [id]);

  // 入力変更ハンドラ
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 更新処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        birthday: form.birthday ? format(form.birthday, "yyyy-MM-dd") : null,
      };
      await apiClient.put(`/customer/customers/${id}`, {
        customer: payload,
      });

      alert("更新しました");
      router.push("/customers");
    } catch (error) {
      console.error("Update failed:", error);
      alert("更新に失敗しました");
    }
  };

  if (loading) return <p className="p-6">読み込み中...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">顧客編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="family_name">姓</Label>
          <Input
            id="family_name"
            name="family_name"
            value={form.family_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="given_name">名</Label>
          <Input
            id="given_name"
            name="given_name"
            value={form.given_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="phone1">電話番号1</Label>
          <Input
            id="phone1"
            name="phone1"
            value={form.phone1}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="phone1">電話番号2</Label>
          <Input
            id="phone2"
            name="phone2"
            value={form.phone2}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email">メール</Label>
          <Input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email">生年月日</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !form.birthday && "text-muted-foreground"
                }`}
              >
                {form.birthday
                  ? format(form.birthday, "yyyy年MM月dd日", { locale: ja })
                  : "日付を選択"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                selected={form.birthday}
                onSelect={(date) => setForm({ ...form, birthday: date })}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <CiMemoPad />
          <Textarea
            id="memo"
            name="memo"
            value={form.memo}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          更新する
        </Button>
      </form>
    </div>
  );
}
