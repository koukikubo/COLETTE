import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { MypageView } from "@/components/View/mypage/MypageView";
import type { Mypage } from "types/api";

export default async function OtherMypage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(
    `${
      process.env.INTERNAL_API_URL ?? "http://localhost:3001/api/v1"
    }/mypages/${params.id}`,
    {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const mypage: Mypage | null = await res.json();

  return (
    <div className="mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold mb-6">ユーザーのマイページ</h1>
      <MypageView mypage={mypage} />
    </div>
  );
}
