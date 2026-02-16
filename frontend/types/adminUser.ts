export type AdminUser = {
  id: number;
  email: string;
  role: "staff" | "manager" | "owner";
  start_on: string | null;
  end_on: string | null;
  suspended: boolean;
};

export type AdminUserRow = {
  id: number;
  email: string;
  name: string | null;
  role: "staff" | "manager" | "owner";
  suspended: boolean;
  start_on: string | null;
  end_on: string | null;
};

// 権限について
// - staff: 担当者（売上確認、顧客管理、予約管理、スタッフ管理が可能）
// - manager: 店舗管理者（上記に加えて、メニュー管理、テーブル管理、設定変更が可能）
// - owner: オーナー（全ての権限を持つ）
