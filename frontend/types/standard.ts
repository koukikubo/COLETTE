export type StandardListItem = {
  list_code: string;
  name: string;
  enabled: string;
};

export type GuestCountMap = Record<string, number>;

export type FetchStandardMastaParams = {
  query?: string;
  enabled?: string;
};

export type StandardCodeResponse = {
  base_code: string;
  name: string;
  lists: StandardListItem[];
};