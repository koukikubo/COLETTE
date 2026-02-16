import { Notification } from "@/types/notification";
import { PaginatedResponse } from "@/types/pagination";
import { ssrFetch } from "@/lib/api/ssrAuth";

export async function fetchNotifications(
  page = 1,
  perPage = 10,
): Promise<PaginatedResponse<Notification>> {
  return ssrFetch<PaginatedResponse<Notification>>(
    `/notifications?page=${page}&per_page=${perPage}`,
  );
}

export async function fetchNotification(id: string): Promise<Notification> {
  return ssrFetch<Notification>(`/notifications/${id}`);
}
