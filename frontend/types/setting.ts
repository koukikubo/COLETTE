export type StandardMasta = {
  id: number;
  base_code: string;
  name: string;
  enabled: boolean;
  remarks: string | null;
  created_at?: string;
  updated_at?: string;
  count: number;
};

export type StandardListMasta = {
  id: number;
  list_code: string;
  name: string;
  enabled: boolean;
  standard_masta_id: number;
  remarks: string | null;
};
