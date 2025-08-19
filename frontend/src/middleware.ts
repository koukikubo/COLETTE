// frontend/src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Railsの実際のセッションクッキー名に置き換えてください
const SESSION_KEY = "_colette_session"; // 例

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 認証不要なパスは除外
  if (
    pathname.startsWith("/auth") || // ログイン/新規登録など
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  // 認証が必要なパスだけチェック（実URLで）
  const needsAuth =
    pathname.startsWith("/mypage") || pathname.startsWith("/settings");

  if (!needsAuth) return NextResponse.next();

  const session = req.cookies.get(SESSION_KEY)?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon|assets).*)"], // もしくは "/:path*"
};
