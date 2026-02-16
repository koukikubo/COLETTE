export type Mypage = {
  id?: number;
  family_name: string;
  family_name_kana: string;
  given_name: string;
  given_name_kana: string;
  nick_name: string;
  position: string;
  birthday: string;
  made_in: string;
  phone: string;
};

export type MypageResponse = {
  user: {
    id: number;
    email: string;
  } | null;
  mypage: Mypage | null;
};
