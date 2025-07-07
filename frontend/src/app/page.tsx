// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

export default function Home() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("access-token")?.value;
  // const client = cookieStore.get("client")?.value;
  // const uid = cookieStore.get("uid")?.value;

  // if (!token || !client || !uid) {
  //   redirect("auth/signup"); // 新規登録ページへ
  // }

  return (
    <div>
      <h1 className="text-xl font-bold">COLETTE TOPページ</h1>
      <p className="text-gray-600 mt-2">
        ここに予約一覧やお知らせなどが表示されます。
      </p>
    </div>
  );
}
