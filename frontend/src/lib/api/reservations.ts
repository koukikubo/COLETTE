import type {
  CreateReservationPayload,
  Reservation,
} from "@/types/reservation";
import { apiClient } from "./base";

/** 予約一覧取得 */
export async function fetchReservations(date: string): Promise<Reservation[]> {
  const res = await apiClient.get<Reservation[]>("/reservations", {
    params: { date },
  });
  return res.data;
}
/** 予約詳細取得 */
export async function fetchReservation(id: number): Promise<Reservation> {
  const res = await apiClient.get<Reservation>(`/reservations/${id}`);
  return res.data;
}

/** 予約更新 */
export async function updateReservation(
  id: number,
  payload: CreateReservationPayload,
): Promise<Reservation> {
  const res = await apiClient.patch<Reservation>(`/reservations/${id}`, {
    reservation: payload,
  });
  return res.data;
}

export async function deleteReservation(id: number): Promise<void> {
  await apiClient.delete(`/reservations/${id}`);
}

/** 予約作成 */
export async function createReservation(
  payload: CreateReservationPayload,
): Promise<Reservation> {
  const res = await apiClient.post<Reservation>("/reservations", {
    reservation: payload,
  });

  return res.data;
}
