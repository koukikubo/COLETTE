"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!token || !client || !uid) {
      router.push("/auth/signin");
    }
  }, [router]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">COLETTE TOPページ</h1>
      <p className="text-gray-600 mt-2">
        ここに予約一覧やお知らせなどが表示されます。
      </p>
    </div>
  );
}
