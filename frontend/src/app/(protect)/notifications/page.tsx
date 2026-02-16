import Link from "next/link";
import { fetchNotifications } from "@/lib/api/notification/ssr/notifications";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "@/lib/pagination/getPaginationRange";

type Props = {
  searchParams: { page?: string };
};

export default async function NotificationsPage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? "1");
  const { data: notifications, meta } = await fetchNotifications(page, 10);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-6 text-xl font-semibold">大事なお知らせ</h1>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Link key={n.id} href={`/notifications/${n.id}`} className="block">
            <Card
              className="
                bg-muted/40 dark:bg-slate-800/60
                border border-border
                transition
                hover:bg-muted/60 dark:hover:bg-slate-700/60
              "
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">お知らせ</Badge>
                    <h2 className="font-medium leading-snug">{n.title}</h2>
                  </div>

                  <p className="shrink-0 text-xs text-muted-foreground">
                    {new Date(n.created_at)
                      .toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                      })
                      .replace(" ", " ")
                      .replace(":", "時")
                      .concat("分")}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {n.body}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {meta.total_pages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {/* 前へ */}
            <PaginationItem>
              <PaginationPrevious
                href={`/notifications?page=${page - 1}`}
                aria-disabled={page === 1}
              />
            </PaginationItem>

            {/* ページ番号 */}
            {getPaginationRange(page, meta.total_pages).map((item, index) =>
              item === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={`/notifications?page=${item}`}
                    isActive={page === item}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            {/* 次へ */}
            <PaginationItem>
              <PaginationNext
                href={`/notifications?page=${page + 1}`}
                aria-disabled={page === meta.total_pages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
