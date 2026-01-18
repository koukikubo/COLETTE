"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { createShopInfo, fetchShopInfo, updateShopInfo } from "@/lib/api/shop";

interface ShopInfo {
  id?: number;
  shop_name: string;
  phone: string;
  address: string;
  business_hours: string;
  holiday: string;
  notes?: string;
}

export default function ShopInfoSettingView() {
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchShopInfo();
        setShopInfo(data);
      } catch (e) {
        console.error("店舗情報取得エラー:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async () => {
    if (!shopInfo) return;

    try {
      setSaving(true);
      if (shopInfo.id) {
        await updateShopInfo(shopInfo);
      } else {
        await createShopInfo(shopInfo);
      }

      alert("店舗情報を保存しました。");
    } catch (e) {
      console.error("保存エラー:", e);
      alert("保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !shopInfo) {
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

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "保存中..." : "登録"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
