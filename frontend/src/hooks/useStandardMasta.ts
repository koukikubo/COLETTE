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
  const [data, setData] = useState<StandardMasta[]>(initialData);

  const { loading, error, search, reset } =
    useSearch<StandardMasta>(async (params: Record<string, unknown>) => {
      const { query = "", enabled = "" } = params as StandardMastaSearchParams;
      const result = await fetchStandardMastaApi(query, enabled);
      setData(result);
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