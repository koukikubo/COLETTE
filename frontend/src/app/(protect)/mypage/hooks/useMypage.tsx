// frontend/src/app/mypage/hooks/useMypage.tsx
"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { useUser } from "@/contexts/UserContext";
import type { Mypage } from "types/api";

interface MypageResponse {
  user: {
    id: number;
    email: string;
  } | null;
  mypage: Mypage | null;
}

// axios を使った共通 fetcher（Cookie 認証付き）
const fetcher = async (url: string) => {
  const { data } = await apiClient.get<MypageResponse>(url);
  return data?.mypage ?? null;
};

export function useMypage() {
  const router = useRouter();
  const { user } = useUser(); // 認証状態を Context から取得

  // SWR を使ったデータ取得
  const { data, error, isLoading, mutate } = useSWR<Mypage | null>(
    user ? "/mypages/me" : null, // user が存在する時だけ API を叩く
    fetcher,
    {
      shouldRetryOnError: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        // 認証エラー（401）の場合はログインページへ遷移
        if (err?.response?.status === 401) router.push("/auth/login");
      },
    }
  );

  return {
    mypage: data ?? null,
    loading: isLoading,
    error,

    // マイページ作成
    async create(payload: Mypage) {
      await apiClient.post("/mypages", { mypage: payload });
      await mutate(); // 作成後にキャッシュを更新
    },

    // マイページ更新
    async update(id: number, payload: Partial<Mypage>) {
      await apiClient.patch(`/mypages/${id}`, { mypage: payload });
      await mutate(); // 更新後にキャッシュを更新
    },

    // 手動再取得
    async refresh() {
      await mutate();
    },
  };
}
