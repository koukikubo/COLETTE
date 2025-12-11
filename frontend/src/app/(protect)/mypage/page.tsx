import { isAxiosError } from "@/lib/isAxiosError";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MypageView } from "@/components/View/mypage/MypageView";
import { apiClientWithSsrCookies } from "@/lib/api/Client";
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
  const cookieHeader = cookies().toString();
  const client = apiClientWithSsrCookies(cookieHeader);

  try {
    const res = await client.get<MypageResponse>("/mypage/mypages/me");
    const mypage = res.data?.mypage ?? null;

    return (
      <div className="mx-auto mt-8 max-w-xl space-y-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          マイページ
        </h1>
        <MypageView mypage={mypage} />
      </div>
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        redirect("/auth/login");
      }
    }

    throw error;
  }
}
