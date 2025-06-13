// frontend/src/app/mypage/page.tsx
"use client"; // クライアントコンポーネントにしたい場合のみ

import React from "react";
import { useUser } from "@/contexts/UserContext";

export default function MyPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="p-4">
        <p>Loading... or not logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">MyPage</h1>
      <p>Email: {user.email}</p>
      {user.staff_member && (
        <>
          <p>Nick Name: {user.staff_member.nick_name}</p>
          <p>Phone: {user.staff_member.phone}</p>
        </>
      )}
    </div>
  );
}
