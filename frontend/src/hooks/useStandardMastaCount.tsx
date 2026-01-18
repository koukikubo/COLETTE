"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/base";
import { StandardMasta } from "@/types/setting";

export function useStandardMastaCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await apiClient.get<StandardMasta>(
        "/setting/standard_code/standard_mastas/count"
      );
      setCount(res.data.count); // APIから取得
    };

    fetchCount();
  }, []);

  return count; // ← useStandardMastaCount() で実行できる
}
