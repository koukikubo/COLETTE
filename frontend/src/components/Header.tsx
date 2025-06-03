"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-lg font-bold">COLETTE</div>
      <nav className="flex items-center space-x-4">
        {user ? (
          // ログインしている場合の表示
          <>
            <span className="text-green-600">{user.email} ログイン中</span>
            <Link href="/mypage" className="text-blue-500 hover:underline">
              マイページ
            </Link>
            <Link href="/logout" className="text-gray-500 hover:underline">
              ログアウト
            </Link>
          </>
        ) : (
          // 未ログインの場合の表示
          <>
            <Link href="/auth/signin" className="text-blue-500 hover:underline">
              ログイン
            </Link>
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              新規登録
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
