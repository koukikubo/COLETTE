import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClientWithSsrCookies } from "./base";

type SsrMethod = "get" | "post";

type SsrFetchOptions = {
  method?: SsrMethod;
  body?: unknown;
  headers?: Record<string, string>;
};

export async function ssrFetch(path: string, options: SsrFetchOptions = {}) {
  const cookieHeader = cookies().toString();
  const client = apiClientWithSsrCookies(cookieHeader);

  try {
    const res = await client.request({
      url: path,
      method: options.method ?? "get",
      data: options.body,
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
