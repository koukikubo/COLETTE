import { Notification } from "@/types/notification";
import { PaginatedResponse } from "@/types/pagination";
import { ssrFetch } from "@/lib/api/ssrAuth";

export async function fetchNotifications(
  page: number,
  per = 10,
): Promise<PaginatedResponse<Notification>> {
  return ssrFetch<PaginatedResponse<Notification>>(
    `/notifications?page=${page}&per=${per}`,
  );
}
