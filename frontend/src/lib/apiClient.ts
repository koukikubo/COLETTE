// src/lib/apiClient.ts
import axios from "axios";

function getBaseURL() {
  const isServer = typeof window === "undefined";
  const internal = process.env.INTERNAL_API_URL; // 例: http://backend:3001/api/v1
  const publicUrl = process.env.NEXT_PUBLIC_API_URL; // 例: http://localhost:3001/api/v1
  return (
    (isServer ? internal ?? publicUrl : publicUrl) ??
    "http://backend:3001/api/v1"
  );
}

// ブラウザ用／SSR共通（ブラウザで使うときはこちらをそのまま使う）
export const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ★SSRで使うときは Cookie を手動で乗せたクライアントを作る
export function apiClientWithSsrCookies(cookieHeader: string) {
  return axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
      Cookie: cookieHeader, // ← これが重要
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export default apiClient;
