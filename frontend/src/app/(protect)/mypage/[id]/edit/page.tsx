import { isAxiosError } from "@/lib/isAxiosError";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { MypageView } from "@/components/View/mypage/MypageView";
import { apiClientWithSsrCookies } from "@/lib/api/Client";
import type { Mypage } from "types/api";

export default async function OtherMypageEdit({
  params,
}: {
  params: { id: string };
}) {
  const client = apiClientWithSsrCookies(cookies().toString());

  try {
    const res = await client.get<Mypage>(`/mypage/mypages/${params.id}`);
    const mypage = res.data ?? null;

    return (
      <div className="mx-auto max-w-xl mt-8">
        <h1 className="text-2xl font-bold mb-6">ユーザーのマイページ</h1>
        <MypageView mypage={mypage} />
      </div>
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        notFound();
      }
      if (status === 401 || status === 403) {
        redirect("/auth/login");
      }
    }

    throw error;
  }
}
