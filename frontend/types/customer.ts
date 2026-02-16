// DB / APIレスポンス用
export type Customer = {
  id: number;
  family_name: string;
  family_name_kana: string;
  given_name: string;
  given_name_kana: string;
  phone1: string;
  phone2: string;
  created_at: string;
  birthday: string | null;
  memo: string;
  email: string;
};
// UIフォーム用
export type CustomerFormState = {
  family_name: string;
  family_name_kana: string;
  given_name: string;
  given_name_kana: string;
  phone1: string;
  phone2: string;
  email: string;
  birthday: Date | undefined;
  memo: string;
};
// TOP画面
export type Stats = {
  total: number;
  today: number;
  vip?: number;
};
// 表示用詳細画面用
export type CustomerDetail = Customer & {
  created_at: string;
  updated_at: string;
};
// API送信用
export type CreateCustomerPayload = {
  family_name: string;
  family_name_kana: string;
  given_name: string;
  given_name_kana: string;
  phone1: string;
  phone2: string;
  email: string;
  memo: string;
  birthday: string | null; // ← APIはstring
};
