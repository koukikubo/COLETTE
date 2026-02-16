"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Table = {
  id: number;
  code: string; // "T1" / "C1" など
  name: string; // "テーブル1" / "カウンター1" など
  enabled: boolean;
};

type TableLinkRule = {
  id: string; // フロント用の一時ID
  base_table_id: number | null; // 主テーブル
  linked_table_ids: number[]; // 連結テーブル（複数）
  note?: string;
};

const uid = () => Math.random().toString(36).slice(2);

export default function TableLinksSetting() {
  /**
   * 本来はAPIから取るが、まずUI確認用にダミーデータでOK
   * 後で fetchTables() に差し替えれば完成
   */
  const tables: Table[] = useMemo(
    () => [
      { id: 1, code: "C1", name: "カウンター1", enabled: true },
      { id: 2, code: "C2", name: "カウンター2", enabled: true },
      { id: 3, code: "C3", name: "カウンター3", enabled: true },
      { id: 4, code: "T1", name: "テーブル1", enabled: true },
      { id: 5, code: "T2", name: "テーブル2", enabled: true },
      { id: 6, code: "T3", name: "テーブル3", enabled: true },
    ],
    [],
  );

  const enabledTables = useMemo(
    () => tables.filter((t) => t.enabled),
    [tables],
  );

  const [rules, setRules] = useState<TableLinkRule[]>([
    {
      id: uid(),
      base_table_id: 4, // T1
      linked_table_ids: [5], // T2
      note: "T1+T2 で4名対応",
    },
  ]);

  const [saving, setSaving] = useState(false);

  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { id: uid(), base_table_id: null, linked_table_ids: [], note: "" },
    ]);
  };

  const removeRule = (id: string) => {
    const ok = confirm("この連結ルールを削除しますか？");
    if (!ok) return;
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRule = (id: string, patch: Partial<TableLinkRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const toggleLinkedTable = (ruleId: string, tableId: number) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== ruleId) return r;
        const exists = r.linked_table_ids.includes(tableId);
        return {
          ...r,
          linked_table_ids: exists
            ? r.linked_table_ids.filter((x) => x !== tableId)
            : [...r.linked_table_ids, tableId],
        };
      }),
    );
  };

  const getTableLabel = (id: number | null) => {
    if (!id) return "未選択";
    const t = enabledTables.find((x) => x.id === id);
    return t ? `${t.code} / ${t.name}` : "不明";
  };

  const handleSave = async () => {
    const invalid = rules.some(
      (r) => !r.base_table_id || r.linked_table_ids.length === 0,
    );
    if (invalid) {
      alert("主テーブルと連結テーブルを選択してください。");
      return;
    }

    const self = rules.some(
      (r) => r.base_table_id && r.linked_table_ids.includes(r.base_table_id),
    );
    if (self) {
      alert("主テーブルと同じテーブルを連結に含めることはできません。");
      return;
    }

    try {
      setSaving(true);

      // 本来はここでAPIへPOST/PUTする
      // await apiClient.post("/table_links", { rules: ... })

      console.log("SAVE rules:", rules);
      alert("保存（ダミー）しました。consoleを確認してください。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">テーブル連結設定</h1>
        <div className="text-sm text-muted-foreground">
          予約時に複数席を同時に確保できるよう、連結ルールを登録します。
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" onClick={addRule}>
          ルール追加
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "保存中…" : "保存"}
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map((rule, idx) => (
          <div key={rule.id} className="rounded border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">ルール {idx + 1}</div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeRule(rule.id)}
              >
                削除
              </Button>
            </div>

            {/* 主テーブル */}
            <div className="space-y-2">
              <div className="text-sm">主テーブル</div>
              <Select
                value={rule.base_table_id ? String(rule.base_table_id) : ""}
                onValueChange={(v) =>
                  updateRule(rule.id, { base_table_id: Number(v) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="主テーブルを選択" />
                </SelectTrigger>
                <SelectContent>
                  {enabledTables.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.code} / {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground">
                現在: {getTableLabel(rule.base_table_id)}
              </div>
            </div>

            {/* 連結テーブル（複数選択） */}
            <div className="space-y-2">
              <div className="text-sm">連結テーブル（複数選択）</div>

              <div className="flex flex-wrap gap-2">
                {enabledTables
                  .filter((t) => t.id !== rule.base_table_id) // 主テーブルは除外
                  .map((t) => {
                    const active = rule.linked_table_ids.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleLinkedTable(rule.id, t.id)}
                        className={[
                          "text-xs rounded border px-3 py-1 transition-colors",
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-accent",
                        ].join(" ")}
                      >
                        {t.code}
                      </button>
                    );
                  })}
              </div>

              <div className="text-xs text-muted-foreground">
                選択中:
                {rule.linked_table_ids.length
                  ? rule.linked_table_ids
                      .map((id) => enabledTables.find((t) => t.id === id))
                      .filter(Boolean)
                      .map((t) => `${t!.code}`)
                      .join(" + ")
                  : "なし"}
              </div>
            </div>

            {/* メモ */}
            <div className="space-y-2">
              <div className="text-sm">メモ</div>
              <Input
                placeholder="例：T1 + T2 で 4名対応"
                value={rule.note ?? ""}
                onChange={(e) => updateRule(rule.id, { note: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
