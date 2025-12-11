"use client";

import { useCallback, useState } from "react";
import { useSearch } from "./useSearch";
import { fetchStandardMasta as fetchStandardMastaApi } from "@/lib/api/Search";
import { StandardMasta } from "types/setting";

type StandardMastaSearchParams = {
  query?: string;
  enabled?: string;
};

export function useStandardMasta(initialData: StandardMasta[] = []) {
  // ← ⭐ 初期データを useState で保持
  const [data, setData] = useState<StandardMasta[]>(initialData);

  const { loading, error, search, reset } =
    useSearch<StandardMasta>(async (params: Record<string, unknown>) => {
      const { query = "", enabled = "" } = params as StandardMastaSearchParams;
      const result = await fetchStandardMastaApi(query, enabled);
      setData(result); // ← ⭐ 検索結果を state に反映
      return result;
    });

  const fetchStandardMasta = useCallback(
    (query = "", enabled = "") => {
      search({ query, enabled });
    },
    [search]
  );

  return { data, loading, error, fetchStandardMasta, reset };
}