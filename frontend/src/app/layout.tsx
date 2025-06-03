// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "@/contexts/UserContext";

export const metadata = {
  title: "COLETTE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col h-screen">
        <UserProvider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-50">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
