"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";

export default function CustomerShow({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-6 p-6 max-w-xl mx-auto">
      <Link href={`/customers/${customer.id}/edit`}>
        <Button className="w-full">編集する</Button>
      </Link>

      <Item
        label="氏名"
        value={`${customer.family_name} ${customer.given_name}`}
      />
      <Item
        label="氏名（カナ）"
        value={`${customer.family_name_kana ?? ""} ${
          customer.given_name_kana ?? ""
        }`}
      />
      <Item label="電話番号1" value={customer.phone1 ?? ""} />
      <Item label="電話番号2" value={customer.phone2 ?? ""} />
      <Item label="メール" value={customer.email ?? ""} />
      <Item
        label="生年月日"
        value={
          customer.birthday
            ? new Date(customer.birthday).toLocaleDateString("ja-JP")
            : "-"
        }
      />
      <Item label="メモ" value={customer.memo ?? ""} />
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </div>

      <div
        className="
          rounded border border-gray-300 bg-white p-3 text-gray-900
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
        "
      >
        {value || "-"}
      </div>
    </div>
  );
}
