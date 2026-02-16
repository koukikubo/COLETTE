import { Mypage } from "@/types/mypages";
import { apiClient } from "../../base";

export async function createMypage(payload: Mypage) {
  return apiClient.post("/mypage/mypages", { mypage: payload });
}

export async function updateMypage(id: number, payload: Mypage) {
  const res = await apiClient.put(`/mypage/mypages/${id}`, {
    mypage: payload,
  });
  return res.data;
}
