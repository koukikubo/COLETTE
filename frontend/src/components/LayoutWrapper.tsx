// frontend/src/components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "@/contexts/UserContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <UserProvider>
      <Header />
      <div className="flex flex-1">
        {!isAuthPage && <Sidebar />}
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </UserProvider>
  );
}
