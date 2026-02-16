import { notFound } from "next/navigation";
import { fetchMypage } from "@/lib/api/mypage/ssr/mypage";
import { EditForm } from "@/components/features/mypage/forms/EditForm";

export default async function OtherMypageEdit({
  params,
}: {
  params: { id: string };
}) {
  try {
    const mypage = await fetchMypage(params.id);

    return (
      <div className="mx-auto max-w-xl mt-8">
        <h1 className="text-2xl font-bold mb-6">マイページ編集</h1>
        <EditForm initialValue={mypage} />
      </div>
    );
  } catch {
    notFound();
  }
}
