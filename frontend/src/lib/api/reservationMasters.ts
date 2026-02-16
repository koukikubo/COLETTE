/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Table } from "@/types/table";
import { apiClient } from "./base";
import { StandardListItem } from "@/types/standard";

export type ReservationMasters = {
  menu_types: StandardListItem[];
  tables: Table[];
  status: StandardListItem[];
  courses: StandardListItem[];
  menuTypes: StandardListItem[];
  allergies: StandardListItem[];
  purpose: StandardListItem[];
  cancel: StandardListItem[];
  guestTypes: StandardListItem[];
};
export async function fetchReservationMasters(): Promise<ReservationMasters> {
  const res = await apiClient.get<ReservationMasters>("/reservation_masters");
  return res.data;
}
