"use client";
import { useCallback, useRef, useState } from "react";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useSearch<T>(
  fetcher: (params: Record<string, unknown>) => Promise<T[]>
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const reset = () => {
    setData([]);
    setError(null); // ← エラーも消す
  };

  const search = useCallback(
    async (params: Record<string, unknown> = {}) => {
      if (loadingRef.current) return; // ← 多重実行回避

      loadingRef.current = true;

      try {
        setLoading(true);
        setError(null); // ← エラーメッセージを毎回クリア
        const res = await fetcher(params);
        setData(res);
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [fetcher]
  );

  return { data, loading, error, search, reset };
}
