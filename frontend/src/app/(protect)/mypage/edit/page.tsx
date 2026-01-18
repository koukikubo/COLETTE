// app/(protect)/mypages/edit/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MypageEditForm } from "@/components/View/mypage/MypageEditForm";
import type { Mypage } from "types/api";
import { apiClientWithSsrCookies } from "@/lib/api/base";

type MypageResponse = {
  mypage: Mypage | null;
};

export default async function EditPage() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const client = apiClientWithSsrCookies(cookieHeader);
  const res = await client.get<MypageResponse>("/mypage/mypages/me");

  if (res.status === 401 || res.status === 403) {
    redirect("/auth/login");
  }

  const mypage: Mypage | null = res.data?.mypage ?? null;

  return (
    <div className="mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold mb-6">マイページ編集</h1>
      <MypageEditForm initialValue={mypage} />
    </div>
  );
}
