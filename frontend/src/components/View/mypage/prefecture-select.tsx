"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PREFECTURES } from "@/constants/prefectures";

type Props = {
  /** 現在値（例: "東京都"） */
  value: string;
  /** 値が変わったときに呼ばれる */
  onChange: (value: string) => void;
  /** 原生 required を効かせたい時は true（hidden と同期します） */
  required?: boolean;
  /** ラベル文言を差し替えたい場合に */
  label?: string;
  /** trigger に渡す追加クラス */
  className?: string;
};

export function PrefectureSelect({
  value,
  onChange,
  required,
  label = "出身地",
  className,
}: Props) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 ${
            className ?? ""
          }`}
        >
          <SelectValue placeholder="都道府県を選択" />
        </SelectTrigger>
        <SelectContent>
          {PREFECTURES.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Radix Select は required が効かないので hidden と同期して原生バリデーション */}
      {required && (
        <input type="hidden" name="made_in" value={value} required />
      )}
    </div>
  );
}
