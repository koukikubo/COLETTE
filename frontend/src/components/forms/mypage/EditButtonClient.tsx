// src/components/forms/mypage/EditButtonClient.tsx
"use client";

import Link from "next/link";

type EditButtonClientProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any;
};

export function EditButtonClient({ initialValue }: EditButtonClientProps) {
  console.log(initialValue);
  return (
    <Link href="/mypage/edit">
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        編集する
      </button>
    </Link>
  );
}
