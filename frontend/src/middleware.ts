// frontend/src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Basic認証を処理するmiddleware関数
export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1]; // ← "Basic xxxxx" の "xxxxx" 部分
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    const validUser = process.env.BASIC_AUTH_USER;
    const validPass = process.env.BASIC_AUTH_PASSWORD;

    if (user === validUser && pwd === validPass) {
      // 認証成功 → 通過
      return NextResponse.next();
    }
  }

  // 認証失敗 → 401 Unauthorized を返す
  return new NextResponse("認証が必要です", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// middleware の適用範囲（必要に応じて調整）
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
