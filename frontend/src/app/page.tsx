"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth/signup");
    }
  }, [router, user]);

  return (
    <div>
      <h1 className="text-xl font-bold">COLETTE TOPページ</h1>
      <p className="text-gray-600 mt-2">
        ここに予約一覧やお知らせなどが表示されます。
      </p>
    </div>
  );
}
