"use client";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r p-4 space-y-4">
      <div className="font-semibold text-gray-700">お知らせ</div>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>臨時休業について</li>
        <li>仕込みについて</li>
        <li>予約について</li>
      </ul>

      <div className="mt-6 space-y-2">
        <button className="w-full text-left bg-gray-100 p-2 rounded">
          メニューランキング
        </button>
        <button className="w-full text-left bg-gray-100 p-2 rounded">
          スタッフバースデイ
        </button>
        <button className="w-full text-left bg-gray-100 p-2 rounded">
          目標と成果
        </button>
        <button className="w-full text-left bg-gray-100 p-2 rounded">
          顧客ランキング
        </button>
      </div>
    </aside>
  );
}
