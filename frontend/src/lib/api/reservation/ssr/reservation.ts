import { ssrFetch } from "@/lib/api/ssrAuth";
import type { Reservation } from "@/types/reservation";

export async function fetchReservations(date: string): Promise<Reservation[]> {
  return ssrFetch<Reservation[]>("/reservations", {
    params: { date },
  });
}
