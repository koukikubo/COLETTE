"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/lib/api/customer/csr/customer";
import { CreateCustomerPayload, CustomerFormState } from "@/types/customer";

export default function CustomerForm() {
  const router = useRouter();
  const [form, setForm] = useState<CustomerFormState>({
    family_name: "",
    family_name_kana: "",
    given_name: "",
    given_name_kana: "",
    phone1: "",
    phone2: "",
    email: "",
    memo: "",
    birthday: undefined,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: CreateCustomerPayload = {
        ...form,
        birthday: form.birthday ? format(form.birthday, "yyyy-MM-dd") : null,
      };

      await createCustomer(payload);

      router.push("/customers");
    } catch (err) {
      console.error(err);
      alert("登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="family_name">姓</Label>
        <Input
          id="family_name"
          name="family_name"
          value={form.family_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="family_name_kana">姓（カナ）</Label>
        <Input
          id="family_name_kana"
          name="family_name_kana"
          value={form.family_name_kana}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="given_name">名</Label>
        <Input
          id="given_name"
          name="given_name"
          value={form.given_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="given_name_kana">名（カナ）</Label>
        <Input
          id="given_name_kana"
          name="given_name_kana"
          value={form.given_name_kana}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone1">電話番号 1</Label>
        <Input
          id="phone1"
          name="phone1"
          value={form.phone1}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="phone2">電話番号 2</Label>
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
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="birthday">生年月日</Label>
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
        <Label htmlFor="memo">メモ</Label>
        <Textarea
          id="memo"
          name="memo"
          value={form.memo}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "登録中..." : "登録する"}
      </Button>
    </form>
  );
}
