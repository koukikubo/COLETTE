import axios from "axios";

function getBaseURL() {
  const isServer = typeof window === "undefined";
  const internal = process.env.INTERNAL_API_URL;
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;

  const defaultServerBase =
    process.env.NODE_ENV === "production"
      ? "http://backend:3001/api/v1"
      : "http://localhost:3001/api/v1";

  const defaultClientBase = "http://localhost:3001/api/v1";

  return isServer
    ? internal ?? publicUrl ?? defaultServerBase
    : publicUrl ?? internal ?? defaultClientBase;
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export function apiClientWithSsrCookies(cookieHeader: string) {
  return axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
