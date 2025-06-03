"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAuthTokens } from "@/lib/auth";
import { useUser } from "@/contexts/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  // 入力値の状態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロード防止
    setError(""); // エラー初期化

    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.errors?.join("、") || "ログインに失敗しました");
      }
      // ヘッダーからトークン取得
      const accessToken = res.headers.get("access-token")!;
      const client = res.headers.get("client")!;
      const uid = res.headers.get("uid")!;

      // localStorage に保存
      saveAuthTokens(accessToken, client, uid);
      const userRes = await fetch("http://localhost:3001/api/v1/current/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });
      if (!userRes.ok) throw new Error("ユーザー情報の取得に失敗しました");
      const user = await userRes.json();

      // Contextに保存
      setUser(user);

      // TOPページへ遷移
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期せぬエラーが発生しました");
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-center">ログイン</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
