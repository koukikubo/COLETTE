"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import SignOut from "@/app/auth/signout/SignOut";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        COLETTE
      </Link>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-green-600">{user.email} ログイン中</span>
            <Link href="/mypage" className="text-blue-500 hover:underline">
              マイページ
            </Link>
            <SignOut />
          </>
        ) : (
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
