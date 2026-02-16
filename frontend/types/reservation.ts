import type { Table } from "@/types/table";

export type Reservation = {
  status_code: string;
  menu_type_code: string;
  course_code: string;
  purpose_code: string;
  cancel_reason_code: string;
  allergy_codes: string[];
  id: number;
  customer_name: string;
  contact_phone?: string | null;
  start_at: string;
  end_at: string;
  guest_count: number;
  tables: Table[];
  memo?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type CreateReservationPayload = {
  customer_name: string;
  contact_phone: string | null;
  start_at: string;
  end_at: string;
  guest_count: number;
  guest_counts: Record<string, number>;
  status_code: string;
  menu_type_code: string | null;
  course_code: string | null;
  allergy_code: string | null;
  memo?: string | null;
  purpose_code: string | null;
  cancel_reason_code: string | null;

  table_ids: number[];
};
