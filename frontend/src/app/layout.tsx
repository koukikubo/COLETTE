// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { UserProvider } from "@/contexts/UserContext";
import { AppProviders } from "@/components/layout/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <AppProviders>{children}</AppProviders>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
