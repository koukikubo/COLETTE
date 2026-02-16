"use client";

import { createContext, useContext, useState } from "react";

export type User = {
  id: number;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserProviderProps = {
  children: React.ReactNode;
  initialUser?: User | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser は UserProvider 内で使ってください");
  return context;
}
