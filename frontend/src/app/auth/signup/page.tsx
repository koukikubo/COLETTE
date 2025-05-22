"use client"; // クライアントコンポーネントであることを宣言

import { useState } from "react"; // Reactの状態管理用フック
import { useRouter } from "next/navigation"; // ページ遷移に使用するNext.jsのrouter

export default function SignupPage() {
  const router = useRouter(); // ページ遷移のためのrouterを初期化

  // ユーザー入力の状態をuseStateで管理
  const [email, setEmail] = useState(""); // メールアドレス
  const [password, setPassword] = useState(""); // パスワード
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // パスワード確認
  const [error, setError] = useState(""); // エラーメッセージ表示用

  // 登録ボタンクリック時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信時のページリロードを防ぐ
    setError(""); // エラー初期化

    try {
      const res = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST", // POSTでユーザー作成APIに送信
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
          confirm_success_url: "http://localhost:8000/confirm", // 仮URL
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.errors?.full_messages?.join(", ") || "登録に失敗しました"
        );
      }

      // 成功時はログインページへ遷移
      router.push("/auth/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // 型安全にエラーメッセージを取得
      } else {
        setError("予期せぬエラーが発生しました"); // fallback用のメッセージ
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            パスワード（確認）
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border rounded"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          登録
        </button>
      </form>
    </div>
  );
}
