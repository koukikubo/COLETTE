"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ReservationForm() {
  const [form, setForm] = useState({
    customer_name: "",
    date: "",
    time: "",
    menu: "",
    memo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("送信内容: " + JSON.stringify(form));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="顧客名"
        name="customer_name"
        value={form.customer_name}
        onChange={handleChange}
      />
      <Input
        placeholder="日付 (YYYY-MM-DD)"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <Input
        placeholder="時間 (HH:MM)"
        name="time"
        value={form.time}
        onChange={handleChange}
      />
      <Input
        placeholder="メニュー"
        name="menu"
        value={form.menu}
        onChange={handleChange}
      />

      <Button type="submit" className="w-full">
        登録する
      </Button>
    </form>
  );
}
