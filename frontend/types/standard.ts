export type StandardMasta = {
  id: number;
  base_code: string;
  name: string;
  enabled: boolean;
  remarks: string | null;
  created_at?: string;
  updated_at?: string;
};

export type StandardListItem = {
  list_code: string;
  name: string;
  enabled: boolean;
};

export type StandardListMasta = {
  id: number;
  standard_masta_id: number;
  list_code: string;
  name: string;
  enabled: boolean;
  remarks: string | null;
  created_at?: string;
  updated_at?: string;
};

export type GuestCountMap = Record<string, number>;

export type FetchStandardMastaParams = {
  query?: string;
  enabled?: boolean;
  page?: number;
  per?: number;
};

export type StandardCodeResponse = {
  base_code: string;
  name: string;
  lists: StandardListItem[];
};
