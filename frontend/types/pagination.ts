export type PaginationMeta = {
  current_page: number;
  total_pages: number;
  total_count: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
