// frontend/src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 認証不要パスはスルー
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  // ★ ここでCookieを見て弾かない。判定は各ページのSSRでAPIに聞いてやる
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon|assets).*)"],
};
