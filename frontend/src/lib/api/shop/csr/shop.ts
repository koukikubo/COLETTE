import { apiClient } from "@/lib/api/base";
import { ShopInfo } from "@/types/shop";

export async function fetchShopInfo(): Promise<ShopInfo> {
  const res = await apiClient.get<ShopInfo>("/setting/shop/shop_info");
  return res.data;
}

export async function createShopInfo(shopInfo: ShopInfo): Promise<void> {
  await apiClient.post("/setting/shop/shop_info", {
    shop_info: shopInfo,
  });
}

export async function updateShopInfo(shopInfo: ShopInfo): Promise<void> {
  await apiClient.put("/setting/shop/shop_info", {
    shop_info: shopInfo,
  });
}
