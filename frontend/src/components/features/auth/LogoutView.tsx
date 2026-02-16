"use client";

import { apiClient } from "@/lib/api/base";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await apiClient.delete("/auth/logout");
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      ログアウト
    </button>
  );
}
