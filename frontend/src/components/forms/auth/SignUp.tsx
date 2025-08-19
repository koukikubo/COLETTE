"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SignupResponse } from "types/api";
import apiClient from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await apiClient.post<SignupResponse>("/signup", {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      alert("新規登録が完了しました。ログインしてください。");
      router.push("/auth/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const messages = err.response?.data?.errors?.full_messages;
        setError(messages?.join(", ") || "登録に失敗しました");
      } else {
        setError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black/60 z-50",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">新規登録</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力して登録してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">パスワード（確認）</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              登録
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            すでにアカウントをお持ちの方は{" "}
            <a href="/auth/login" className="underline">
              ログイン
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
