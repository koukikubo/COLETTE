import { fetchMyMypage } from "@/lib/api/mypage/ssr/mypage";
import { EditForm } from "@/components/features/mypage/forms/EditForm";

export default async function EditPage() {
  const mypage = await fetchMyMypage();

  return (
    <div className="mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold mb-6">マイページ編集</h1>
      <EditForm initialValue={mypage} />
    </div>
  );
}
