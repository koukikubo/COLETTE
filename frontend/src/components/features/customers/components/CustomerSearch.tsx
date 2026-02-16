"use client";
import { useCustomerSearch } from "@/hooks/useCustomerSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function CustomerSearch() {
  const { data, loading, error, search, reset } = useCustomerSearch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("last4");

  const handleSearch = () => {
    search({
      name,
      phone,
      phone_type: phoneType,
    });
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setPhoneType("下４桁");
    reset();
  };

  return (
    <Card className="shadow-md border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          🔍 顧客検索条件
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* 検索フォーム本体 */}
        <div className="flex flex-wrap gap-4 items-end">
          {/* 顧客名 */}
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              顧客名
            </label>
            <Input
              placeholder="名前を入力してください"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-48"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              電話番号
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="番号を入力"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-36"
              />
              <select
                value={phoneType}
                onChange={(e) => setPhoneType(e.target.value)}
                className="border rounded-md px-2 text-sm h-9"
              >
                <option value="last4">下4桁</option>
                <option value="area">市外局番</option>
              </select>
            </div>
          </div>

          {/* 検索ボタン */}
          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              検索
            </Button>
            <Button variant="outline" onClick={handleReset}>
              リセット
            </Button>
          </div>
        </div>

        {/* 検索結果 */}
        <div className="mt-2">
          {loading && <p>検索中...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && data.length > 0 && (
            <Table className="w-full text-sm border-t">
              <TableHeader>
                <TableRow>
                  <TableHead>氏名</TableHead>
                  <TableHead>電話番号1</TableHead>
                  <TableHead>電話番号2</TableHead>
                  <TableHead>登録日</TableHead>
                  <TableHead>生年月日</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <Link
                        href={`/customers/${c.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {`${c.family_name} ${c.given_name}`}
                      </Link>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {c.phone1}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {c.phone2}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(c.created_at).toLocaleDateString("ja-JP")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {c.birthday
                        ? new Date(c.birthday).toLocaleDateString("ja-JP")
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
