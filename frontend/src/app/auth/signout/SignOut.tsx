"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { clearAuthTokens } from "@/lib/auth";

export default function LogOut() {
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokens();
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <button onClick={handleLogout} className="text-gray-500 hover:underline">
      ログアウト
    </button>
  );
}
