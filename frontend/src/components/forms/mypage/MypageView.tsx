import Link from "next/link";
import type { Mypage } from "types/api";

export function MypageView({ mypage }: { mypage: Mypage | null }) {
  return (
    <div className="space-y-4">
      {mypage ? (
        <Link href="/mypage/edit">
          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            編集する
          </button>
        </Link>
      ) : (
        <Link href="/mypage/new">
          <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            新規登録
          </button>
        </Link>
      )}

      <Item label="姓" value={mypage?.family_name ?? ""} />
      <Item label="姓（カナ）" value={mypage?.family_name_kana ?? ""} />
      <Item label="名" value={mypage?.given_name ?? ""} />
      <Item label="名（カナ）" value={mypage?.given_name_kana ?? ""} />
      <Item label="ニックネーム" value={mypage?.nick_name ?? ""} />
      <Item label="役職" value={mypage?.position ?? ""} />
      <Item label="誕生日" value={mypage?.birthday ?? ""} />
      <Item label="出身地" value={String(mypage?.made_in ?? "")} />
      <Item label="電話番号" value={mypage?.phone ?? ""} />
    </div>
  );
}

/** ラベル＋読み取り専用表示（ダーク/ライトで見やすく） */
function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </div>
      <div
        className="rounded border border-gray-400 bg-white p-3 text-gray-900 
                    dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        {value || "-"}
      </div>
    </div>
  );
}
