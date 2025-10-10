"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CustomerEditPage() {
  const { id } = useParams(); // URLから顧客ID取得
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    visits: 0,
    memo: "",
  });

  useEffect(() => {
    // TODO: APIからデータ取得
    // fetch(`/api/customers/${id}`)
    //   .then(res => res.json())
    //   .then(data => setForm(data))
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("更新:", form);
    // TODO: APIにPUT
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">顧客編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">氏名</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
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
          <Label htmlFor="visits">来店回数</Label>
          <Input
            id="visits"
            name="visits"
            type="number"
            value={form.visits}
            onChange={handleChange}
          />
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
        <Button type="submit">更新する</Button>
      </form>
    </div>
  );
}
