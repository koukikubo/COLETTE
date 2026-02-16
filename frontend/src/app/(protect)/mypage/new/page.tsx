import { redirect } from "next/navigation";
import { fetchMyMypage } from "@/lib/api/mypage/ssr/mypage";
import NewForm from "@/components/features/mypage/forms/NewForm";

export default async function MypageNewPage() {
  const mypage = await fetchMyMypage();

  if (mypage) {
    redirect("/mypage/edit");
  }

  return <NewForm />;
}
