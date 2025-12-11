export type Customer = {
  id: number;
  family_name: string;
  family_name_kana: string;
  given_name: string;
  given_name_kana: string;
  phone1: string;
  phone2: string;
  created_at: Date;
  birthday: Date | null;
  memo: string;
  email: string;
};

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
