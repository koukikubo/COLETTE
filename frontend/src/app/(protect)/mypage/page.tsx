// src/app/(protect)/mypage/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MypageView } from "@/components/forms/mypage/MypageView";
import { EditButtonClient } from "@/components/forms/mypage/EditButtonClient";
import type { Mypage } from "types/api";

export const dynamic = "force-dynamic";

export default async function MypagePage() {
  const cookieStore = cookies();

  const apiBase = process.env.API_BASE ?? "http://backend:3001"; // ← dev想定
  const url = `${apiBase}/api/v1/mypages/me`;

  // デバッグ：Next に届いている Cookie を一度ログして確認
  // console.log("SSR cookies", cookieStore.getAll().map(c => c.name));

  const res = await fetch(url, {
    headers: { cookie: cookieStore.toString() }, // ← SSRではこれでOK
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) {
    redirect("/auth/login");
  }
  if (!res.ok) {
    throw new Error(`Failed to load mypage: ${res.status} ${res.statusText}`);
  }

  const mypage: Mypage | null = await res.json();

  return (
    <div className="mx-auto mt-8 max-w-xl space-y-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        マイページ
      </h1>
      <EditButtonClient initialValue={undefined} />
      <MypageView mypage={mypage} />
    </div>
  );
}
