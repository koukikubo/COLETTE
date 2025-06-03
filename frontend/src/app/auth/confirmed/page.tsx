// src/app/auth/confirmed/page.tsx
"use client";
import { useSearchParams } from "next/navigation";

export default function ConfirmedPage() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("account_confirmation_success") === "true";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">メール認証結果</h1>
        {isSuccess ? (
          <>
            <p className="text-green-600 mb-4">メール認証が完了しました。</p>
            <a
              href="/auth/signin"
              className="text-blue-500 underline hover:text-blue-700"
            >
              ログイン画面へ
            </a>
          </>
        ) : (
          <>
            <p className="text-red-600 mb-4">メール認証に失敗しました。</p>
            <a
              href="/auth/signup"
              className="text-blue-500 underline hover:text-blue-700"
            >
              再度登録する
            </a>
          </>
        )}
      </div>
    </div>
  );
}
