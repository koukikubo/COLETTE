"use client";

import { useState } from "react";
import router from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
          confirm_success_url: "http://localhost:8000/auth/confirmed",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.errors?.full_messages?.join(", ") || "登録に失敗しました"
        );
      }
      // ✅ 成功したら success フラグを true に
      setSignupSuccess(true);
      router.push("/auth/confirmed");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">新規登録</h1>

      {signupSuccess ? (
        <p className="text-green-600 mt-4">
          登録が完了しました。メールを確認し、認証リンクをクリックしてください。
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="パスワード（確認）"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            登録
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      )}
    </div>
  );
}
