"use client";

import * as React from "react";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { LoginResponse } from "types/api";
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

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Hydration mismatch を避けるため CSR 後に描画
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await apiClient.post<LoginResponse>("/login", {
        user: { email, password },
      });
      setUser(data.user);
      router.push("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "ログインに失敗しました。";
        setError(message);
      } else {
        setError("予期しないエラーが発生しました。");
      }
    }
  };

  return (
    <div
      suppressHydrationWarning
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black/60 z-50",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してください。
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  パスワードをお忘れですか？
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Hydration差分を避ける: 常に<p>を描画 */}
            <p className="text-sm text-red-500 min-h-[1em]">
              {error || "\u00A0"}
            </p>

            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            アカウントをお持ちでない方は{" "}
            <a href="/auth/signup" className="underline">
              新規登録
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
