// frontend/src/app/mypage/page.tsx
"use client"; // クライアントコンポーネントにしたい場合のみ

import React from "react";

export default function MyPage() {
  // ← default export でコンポーネントを出力
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">MyPage</h1>
      <p>ここにマイページの内容を実装します。</p>
    </div>
  );
}
