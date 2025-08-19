// src/app/mypage/edit/page.tsx（Server）
import { cookies } from "next/headers";
import { EditButtonClient } from "@/components/forms/mypage/EditButtonClient";

export default async function EditPage() {
  const cookieStore = cookies();
  const res = await fetch(`${process.env.API_BASE}/api/v1/mypages/me`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  const mypage = res.ok ? await res.json() : null;

  return <EditButtonClient initialValue={mypage} />;
}
