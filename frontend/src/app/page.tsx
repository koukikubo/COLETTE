// frontend/src/app/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  // Cookie から認証情報を取得（SSR段階で判定）
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token")?.value;
  const client = cookieStore.get("client")?.value;
  const uid = cookieStore.get("uid")?.value;

  // どれか1つでも欠けていれば未認証 → /auth/login にリダイレクト
  if (!accessToken || !client || !uid) {
    redirect("/auth/login");
  }

  // 認証済みユーザーのみ到達可能
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">COLETTE TOPページ</h1>
      <p className="text-gray-600 mt-2">
        ここに予約一覧やお知らせなどが表示されます。
      </p>
    </div>
  );
}
