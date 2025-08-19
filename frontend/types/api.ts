// Auth Type
export type SignupRequest = {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
};

export type LoginRequest = {
  user: {
    email: string;
    password: string;
  };
};

export type LoginResponse = {
  user: {
    id: number;
    email: string;
  };
};

export type SignupResponse = {
  user: {
    id: number;
    email: string;
  };
};

// Mypage Type
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
