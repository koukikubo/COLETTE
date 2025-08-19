"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/forms/auth/LogoutView";

import {
  SettingsIcon as Settings,
  HelpCircleIcon as Help,
  SearchIcon as Search,
  User2,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // 認証状態
  const { user } = useUser();

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {!isCollapsed && (
        <SidebarHeader className="p-2 pb-0">
          <div className="rounded-md border bg-background shadow-sm overflow-hidden">
            <Calendar
              mode="single"
              className="p-0"
              locale={ja}
              weekStartsOn={1}
              formatters={{
                formatCaption: (month) =>
                  format(month, "yyyy M月", { locale: ja }),
                formatWeekdayName: (date) => format(date, "E", { locale: ja }),
                formatMonthDropdown: (date) =>
                  format(date, "M月", { locale: ja }),
              }}
            />
          </div>
        </SidebarHeader>
      )}

      {!isCollapsed && (
        <SidebarContent className="flex flex-1 flex-col">
          <div className="mt-auto pb-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/help">
                    <Help className="size-4" />
                    <span>Get Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/search">
                    <Search className="size-4" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      )}

      {/* 認証表示 */}
      <SidebarFooter>
        {isCollapsed ? (
          // 収納時：丸アイコン → 右にメニュー
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Account menu"
                className="mx-auto my-2 flex size-9 items-center justify-center rounded-lg bg-muted font-medium"
              >
                {user ? user.email?.[0]?.toUpperCase() ?? "U" : "?"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={8}
              className="w-64"
            >
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted font-medium">
                      {user.email?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        アカウント名
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {/* ★ マイページ */}
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2">
                      <User2 className="size-4" />
                      <span>Mypage</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/billing" className="flex items-center gap-2">
                      <CreditCard className="size-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/notifications"
                      className="flex items-center gap-2"
                    >
                      <Bell className="size-4" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <span className="flex w-full items-center gap-2">
                      <LogOut className="size-4" />
                      <LogoutButton />
                    </span>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-3 space-y-2">
                  <div className="text-sm text-muted-foreground">
                    ログインが必要です
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href="/auth/login">ログイン</Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      <Link href="/auth/signup">新規登録</Link>
                    </Button>
                  </div>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // 展開時：カード全体がトリガ
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-xl border p-3 text-left hover:bg-muted/50">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted font-medium">
                  {user ? user.email?.[0]?.toUpperCase() ?? "U" : "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {user ? "アカウント名" : "未ログイン"}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {user ? user.email : "ログインまたは新規登録"}
                  </div>
                </div>
                {!user && (
                  <div className="ml-auto flex shrink-0 gap-2">
                    <Button asChild size="sm">
                      <Link href="/auth/login">ログイン</Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                      <Link href="/auth/signup">新規登録</Link>
                    </Button>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={8}
              className="w-64"
            >
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted font-medium">
                      {user.email?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        アカウント名
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {/* ★ マイページ */}
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2">
                      <User2 className="size-4" />
                      <span>Mypage</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/billing" className="flex items-center gap-2">
                      <CreditCard className="size-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/notifications"
                      className="flex items-center gap-2"
                    >
                      <Bell className="size-4" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <span className="flex w-full items-center gap-2">
                      <LogOut className="size-4" />
                      <LogoutButton />
                    </span>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-3">
                  <div className="text-sm text-muted-foreground mb-2">
                    ログインが必要です
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild size="sm">
                      <Link href="/auth/login">ログイン</Link>
                    </Button>
                    <Button asChild size="sm" variant="secondary">
                      <Link href="/auth/signup">新規登録</Link>
                    </Button>
                  </div>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
