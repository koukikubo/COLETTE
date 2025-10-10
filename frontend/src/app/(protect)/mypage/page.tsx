import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MypageView } from "@/components/View/mypage/MypageView";
import type { Mypage } from "types/api";

export const dynamic = "force-dynamic";

type MypageResponse = {
  user: {
    id: number;
    email: string;
  } | null;
  mypage: Mypage | null;
};

export default async function MypagePage() {
  const cookieStore = cookies();
  console.log("SSR cookies (raw):", cookieStore.getAll());

  const cookieHeader = cookieStore.toString();

  // SSRでは内部URLを優先（docker-compose の backend サービス名を利用）
  const apiBase =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api/v1";

  const url = `${apiBase}/mypages/me`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: cookieHeader, // SSR時にCookieをRailsへ渡す
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  // 未ログイン時はログイン画面へリダイレクト
  if (res.status === 401 || res.status === 403) {
    redirect("/auth/login");
  }

  if (!res.ok) {
    throw new Error(`Failed to load mypage: ${res.status} ${res.statusText}`);
  }

  const data: MypageResponse = await res.json();
  const mypage = data?.mypage ?? null;

  return (
    <div className="mx-auto mt-8 max-w-xl space-y-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        マイページ
      </h1>
      <MypageView mypage={mypage} />
    </div>
  );
}
