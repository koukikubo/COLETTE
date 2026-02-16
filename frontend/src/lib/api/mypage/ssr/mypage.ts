import type { Mypage, MypageResponse } from "types/mypages";
import { ssrFetch } from "../../ssrAuth";

export async function fetchMypageById(id: string): Promise<Mypage | null> {
  const res = await ssrFetch<Mypage>(`/mypage/mypages/${id}`);
  return res ?? null;
}

export async function fetchMyMypage(): Promise<Mypage | null> {
  const res = await ssrFetch<MypageResponse>("/mypage/mypages/me");
  return res.mypage ?? null;
}

export async function fetchMypage(id: string): Promise<Mypage | null> {
  const res = await ssrFetch<Mypage>(`/mypage/mypages/${id}`);
  return res ?? null;
}
