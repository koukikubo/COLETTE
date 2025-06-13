// frontend/contexts/UserContext.tsx
"use client";
import { getAuthTokens } from "@/lib/auth";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type StaffMember = {
  id: number;
  family_name: string;
  family_name_kana: string;
  given_name: string;
  given_name_kana: string;
  nick_name: string;
  position: string;
  birthday: string;
  made_in: number;
  phone: string;
  image_url: string | null;
};

export type User = {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  staff_member: StaffMember | null;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔽 ログイン状態確認して user をセット
  useEffect(() => {
    const { accessToken, client, uid } = getAuthTokens();

    if (accessToken && client && uid) {
      fetch("http://localhost:3001/api/v1/current/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("認証失敗");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
