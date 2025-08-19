"use client";

import apiClient from "@/lib/apiClient";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await apiClient.delete("/logout");
      window.location.href = "/";
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
