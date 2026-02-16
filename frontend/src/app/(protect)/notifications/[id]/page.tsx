import Link from "next/link";
import { fetchNotification } from "@/lib/api/notification/ssr/notifications";
import { Notification } from "@/types/notification";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: { id: string };
};

export default async function NotificationDetailPage({ params }: Props) {
  const notification: Notification = await fetchNotification(params.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Link
        href="/notifications"
        className="mb-6 inline-block text-sm text-muted-foreground hover:underline"
      >
        ← お知らせ一覧に戻る
      </Link>

      <Card className="bg-muted/40 dark:bg-slate-800/60 border border-border">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-semibold leading-snug">
              {notification.title}
            </h1>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap leading-relaxed text-sm text-foreground/90">
            {notification.body}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            投稿時間：
            {new Date(notification.created_at)
              .toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })
              .replace(/\//g, "/")
              .replace(",", "")
              .replace(" ", " ")
              .replace(":", "時")
              .concat("分")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
