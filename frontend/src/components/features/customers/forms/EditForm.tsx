"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

import type { CustomerDetail, CustomerFormState } from "@/types/customer";

type Props = {
  customer: CustomerDetail;
};

export default function CustomerEditForm({ customer }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<CustomerFormState>({
    family_name: customer.family_name ?? "",
    family_name_kana: customer.family_name_kana ?? "",
    given_name: customer.given_name ?? "",
    given_name_kana: customer.given_name_kana ?? "",
    phone1: customer.phone1 ?? "",
    phone2: customer.phone2 ?? "",
    email: customer.email ?? "",
    birthday: customer.birthday ? new Date(customer.birthday) : undefined,
    memo: customer.memo ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        birthday: form.birthday ? format(form.birthday, "yyyy-MM-dd") : null,
      };

      await apiClient.put(`/customer/customers/${customer.id}`, {
        customer: payload,
      });

      alert("更新しました");
      router.push("/customers");
    } catch (error) {
      console.error("Update failed:", error);
      alert("更新に失敗しました");
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
        <Label htmlFor="phone2">電話番号2</Label>
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
        <Label>生年月日</Label>
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
  );
}
