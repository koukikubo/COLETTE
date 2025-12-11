// src/lib/api/ssrAuth.ts
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClientWithSsrCookies } from "../api/Client";

/**
 * SSR環境でAPIを呼び出すための共通関数
 * - CookieをNext.jsサーバー側からRails APIへ引き継ぐ
 * - 認証エラー時に自動で/loginへリダイレクト
 */
export async function ssrFetch(path: string, options: RequestInit = {}) {
  // Next.js の SSR 環境で Cookie を取得
  const cookieHeader = cookies().toString();
  const client = apiClientWithSsrCookies(cookieHeader);

  try {
    // axios.request 形式でAPIを呼び出し
    const res = await client.request({
      url: path,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      method: (options.method as any) || "get",
      // fetchのbodyはstringやFormData型のため、axios用にJSON変換
      data:
        typeof options.body === "string"
          ? JSON.parse(options.body)
          : options.body,
      headers: {
        ...(options.headers || {}),
        Cookie: cookieHeader, // SSR経由でもCookieを送る
      },
      withCredentials: true, // Cookie送信を許可
    });

    return res.data; // axiosはres.dataに実データが入る
  } catch (err: unknown) {
    // 型安全なエラーハンドリング
    if (typeof err === "object" && err !== null) {
      const error = err as { response?: { status?: number } };

      if (error.response?.status === 401 || error.response?.status === 403) {
        redirect("/auth/login");
      }
    }

    // それ以外のエラーは上位でcatchできるように投げる
    throw err;
  }
}
