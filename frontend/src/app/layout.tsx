import "./globals.css";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/settings/theme/theme-provider";
import { UserProvider } from "@/contexts/UserContext";
import { AppProviders } from "@/components/layout/AppProviders";

async function loadInitialUser(cookieHeader: string | undefined) {
  if (!cookieHeader) {
    return null;
  }

  const apiBase =
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api/v1";

  try {
    const response = await fetch(`${apiBase}/session`, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.user ?? null;
  } catch (error) {
    console.error("Failed to load current session", error);
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
