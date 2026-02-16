import { useState, useEffect } from "react";
import { StandardListMasta } from "types/setting";
import { apiClient } from "@/lib/api/base";

export function useStandardListMasta(codeId: string) {
  const [lists, setLists] = useState<StandardListMasta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const calculateNextListCode = (): string => {
    if (lists.length === 0) return "1";

    const codes = lists.map((item) => {
      const num = parseInt(item.list_code, 10);
      return isNaN(num) ? 0 : num;
    });

    const maxCode = Math.max(...codes);
    return String(maxCode + 1);
  };

  useEffect(() => {
    if (!codeId) return;

    const fetchLists = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiClient.get<StandardListMasta[]>(
          `/setting/standard_code/standard_mastas/${codeId}/standard_list_mastas`
        );
        setLists(res.data);
      } catch (err) {
        setError(err as Error);
        console.error("選択肢コード取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [codeId]);

  return {
    lists,
    loading,
    error,
    nextListCode: calculateNextListCode(),
    refetch: () => {
      if (codeId) {
        const fetchLists = async () => {
          try {
            const res = await apiClient.get<StandardListMasta[]>(
              `/setting/standard_code/standard_mastas/${codeId}/standard_list_mastas`
            );
            setLists(res.data);
          } catch (err) {
            setError(err as Error);
          }
        };
        fetchLists();
      }
    },
  };
}
