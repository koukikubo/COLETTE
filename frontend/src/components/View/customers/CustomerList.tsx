"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

type Customer = {
  id: number;
  family_name: string;
  given_name: string;
  email?: string;
  created_at: string;
};

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await apiClient.get("/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("顧客一覧の取得に失敗:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (customers.length === 0) return <p>顧客がまだ登録されていません</p>;

  return (
    <ul className="list-disc list-inside text-sm mt-2">
      {customers.slice(-5).reverse().map((c) => (
        <li key={c.id}>
          {c.family_name} {c.given_name} ({c.email ?? "メール未登録"})
        </li>
      ))}
    </ul>
  );
}
