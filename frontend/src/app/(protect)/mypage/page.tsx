import { MypageView } from "@/components/features/mypage/pages/Index";
import { fetchMyMypage } from "@/lib/api/mypage/ssr/mypage";

export const dynamic = "force-dynamic";

export default async function MypagePage() {
  const mypage = await fetchMyMypage();

  return (
    <div className="mx-auto mt-8 max-w-xl space-y-4">
      <h1 className="mb-6 text-2xl font-bold">マイページ</h1>
      <MypageView mypage={mypage} />
    </div>
  );
}