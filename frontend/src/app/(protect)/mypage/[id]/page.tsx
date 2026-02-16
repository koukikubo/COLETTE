import { notFound } from "next/navigation";
import { MypageView } from "@/components/features/mypage/pages/Index";
import { fetchMypageById } from "@/lib/api/mypage/ssr/mypage";

export const dynamic = "force-dynamic";

export default async function OtherMypage({
  params,
}: {
  params: { id: string };
}) {
  const mypage = await fetchMypageById(params.id);
  if (!mypage) notFound();

  return (
    <div className="mx-auto mt-8 max-w-xl space-y-4">
      <h1 className="mb-6 text-2xl font-bold">ユーザーのマイページ</h1>
      <MypageView mypage={mypage} />
    </div>
  );
}
