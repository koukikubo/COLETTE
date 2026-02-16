import "./globals.css";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/features/settings/theme/theme-provider";
import { UserProvider } from "@/contexts/UserContext";
import { AppProviders } from "@/components/layout/AppProviders";
import { apiClientWithSsrCookies } from "@/lib/api/base";
import type { LoginResponse } from "types/api";

export const metadata = {
  title: "浅井顧客予約管理システム",
  description: "予約管理SaaS for salon",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

async function loadInitialUser(cookieHeader: string | undefined) {
  if (!cookieHeader) {
    return null;
  }

  const client = apiClientWithSsrCookies(cookieHeader);

  try {
    const { data } = await client.get<LoginResponse>("/auth/session", {
      withCredentials: true,
    });
    return data?.user ?? null;
  } catch (e: unknown) {
    if (e && typeof e === "object" && "isAxiosError" in e && e.isAxiosError) {
      const axiosError = e as {
        response?: {
          status?: number;
          data?: { message?: string };
        };
      };
      const status = axiosError.response?.status;
      if (status === 401 || status === 403) {
        return null;
      }
    }
    console.error("Failed to load current session", e);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieHeader = cookies().toString();
  const initialUser = await loadInitialUser(cookieHeader);

  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider initialUser={initialUser}>
            <AppProviders>{children}</AppProviders>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
