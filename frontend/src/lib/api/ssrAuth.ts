/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClientWithSsrCookies } from "./base";

type SsrMethod = "get" | "post";

type SsrFetchOptions = {
  method?: SsrMethod;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
};

export async function ssrFetch<T>(
  path: string,
  options: SsrFetchOptions = {},
): Promise<T> {
  const cookieHeader = cookies().toString();
  const client = apiClientWithSsrCookies(cookieHeader);

  try {
    const res = await client.request<T>({
      url: path,
      method: options.method ?? "get",
      data: options.body,
      params: options.params,
      headers: {
        ...(options.headers ?? {}),
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null) {
      const error = err as { response?: { status?: number } };

      if (error.response?.status === 401 || error.response?.status === 403) {
        redirect("/auth/login");
      }
    }
    throw err;
  }
}
