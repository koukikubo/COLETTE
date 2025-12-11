"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/Client";

interface ShopInfo {
  id?: number;
  shop_name: string;
  phone: string;
  address: string;
  business_hours: string;
  holiday: string;
  tax_mode: string;
  notes?: string;
}

export default function ShopInfoSettingView() {
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    shop_name: "",
    phone: "",
    address: "",
    business_hours: "",
    holiday: "",
    tax_mode: "内税",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 店舗情報を取得
  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const res = await apiClient.get<ShopInfo>("/setting/shop/shop_info");
        setShopInfo(res.data);
      } catch (error) {
        console.error("店舗情報取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopInfo();
  }, []);

  const handleSubmit = async () => {
    try {
      setSaving(true);
      if (shopInfo.id) {
        // 更新
        await apiClient.put("/setting/shop/shop_info", {
          shop_info: shopInfo,
        });
      } else {
        // 新規作成
        await apiClient.post("/setting/shop/shop_info", {
          shop_info: shopInfo,
        });
      }
      alert("店舗情報を保存しました。");
    } catch (error) {
      console.error("保存エラー:", error);
      alert("保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">読み込み中...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>店舗情報設定</CardTitle>
        <p className="text-sm text-muted-foreground">
          店舗で表示される基本情報や税設定を更新します。
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 店舗名 */}
        <div>
          <Label>店舗名</Label>
          <Input
            value={shopInfo.shop_name}
            onChange={(e) =>
              setShopInfo({ ...shopInfo, shop_name: e.target.value })
            }
          />
        </div>

        {/* 電話番号 */}
        <div>
          <Label>電話番号</Label>
          <Input
            value={shopInfo.phone}
            onChange={(e) =>
              setShopInfo({ ...shopInfo, phone: e.target.value })
            }
          />
        </div>

        {/* 住所 */}
        <div>
          <Label>住所</Label>
          <Input
            value={shopInfo.address}
            onChange={(e) =>
              setShopInfo({ ...shopInfo, address: e.target.value })
            }
          />
        </div>

        {/* 営業時間 */}
        <div>
          <Label>営業時間</Label>
          <Input
            value={shopInfo.business_hours}
            onChange={(e) =>
              setShopInfo({ ...shopInfo, business_hours: e.target.value })
            }
          />
        </div>

        {/* 定休日 */}
        <div>
          <Label>定休日</Label>
          <Input
            value={shopInfo.holiday}
            onChange={(e) =>
              setShopInfo({ ...shopInfo, holiday: e.target.value })
            }
          />
        </div>

        {/* 税設定 */}
        <div>
          <Label>税設定</Label>
          <Select
            value={shopInfo.tax_mode}
            onValueChange={(value) =>
              setShopInfo({ ...shopInfo, tax_mode: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="内税">内税</SelectItem>
              <SelectItem value="外税">外税</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "保存中..." : "登録"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
