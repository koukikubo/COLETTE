"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
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
import LogoutButton from "@/components/View/auth/LogoutView";

import { FaUserCog, FaCalendarCheck, FaBullseye, FaUser } from "react-icons/fa";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ⭐ Popover import（全て使用）
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AccountMenuItems({ user }: { user: any }) {
  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <div className="flex size-9 items-center justify-center rounded-full bg-muted font-medium">
          {user.email?.[0]?.toUpperCase() ?? "U"}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">アカウント名</div>
          <div className="truncate text-xs text-muted-foreground">
            {user.email}
          </div>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/mypage" className="flex items-center gap-2">
          <FaUser />
          <span>マイページ</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <span className="flex w-full items-center ">
          <RiLogoutBoxLine />
          <LogoutButton />
        </span>
      </DropdownMenuItem>
    </>
  );
}

function GuestMenuItems() {
  return (
    <div className="p-3 space-y-2">
      <div className="text-sm text-muted-foreground">ログインが必要です</div>
      <div className="flex gap-2">
        <Button asChild size="sm" className="flex-1">
          <Link href="/auth/login">ログイン</Link>
        </Button>
        <Button asChild variant="secondary" size="sm" className="flex-1">
          <Link href="/auth/signup">新規登録</Link>
        </Button>
      </div>
    </div>
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { user } = useUser();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {/* カレンダー */}
      {!isCollapsed && (
        <SidebarHeader className="p-2 pb-0">
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <div className="rounded-md border bg-background shadow-sm overflow-hidden cursor-pointer">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (!date) return;
                    setSelectedDate(date);
                    setOpenPopover(true);
                  }}
                  className="p-0"
                  locale={ja}
                  weekStartsOn={1}
                  formatters={{
                    formatCaption: (month) =>
                      format(month, "yyyy M月", { locale: ja }),
                    formatWeekdayName: (date) =>
                      format(date, "E", { locale: ja }),
                  }}
                />
              </div>
            </PopoverTrigger>

            {/* ⭐ 選択肢 */}
            <PopoverContent className="space-y-2 w-48">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (!selectedDate) return;
                  const formatted = format(selectedDate, "yyyy-MM-dd");
                  router.push(`/reservations?date=${formatted}`);
                  setOpenPopover(false);
                }}
              >
                一覧を見る
              </Button>

              <Button
                className="w-full"
                onClick={() => {
                  if (!selectedDate) return;
                  const formatted = format(selectedDate, "yyyy-MM-dd");
                  router.push(`/reservations/new?date=${formatted}`);
                  setOpenPopover(false);
                }}
              >
                予約登録
              </Button>
            </PopoverContent>
          </Popover>
        </SidebarHeader>
      )}

      {/* ===== 以下は元のコードそのまま ===== */}
      <div className="px-2 mt-4 flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <FaHome className="size-5" />
                {!isCollapsed && <span>ホーム</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/customers" className="flex items-center gap-2">
                <FaUserCog className="size-5" />
                {!isCollapsed && <span>顧客管理</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/reservations" className="flex items-center gap-2">
                <FaCalendarCheck className="size-5" />
                {!isCollapsed && <span>予約管理</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenuItem className="list-none">
          <SidebarMenuButton asChild>
            <Link href="/budget" className="flex items-center gap-2">
              <FaBullseye className="size-5" />
              {!isCollapsed && <span>予算目標</span>}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="list-none">
          <SidebarMenuButton asChild>
            <Link href="/notifications" className="flex items-center gap-2">
              <IoIosNotifications />
              <span>お知らせ</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>

      <SidebarFooter
        className={`flex flex-col justify-between px-3 pb-4 h-full 
          ${isCollapsed ? "items-center" : "items-start"}`}
      >
        <div
          className={`flex flex-col gap-4 ${
            isCollapsed ? "items-center" : "items-start"
          }`}
        >
          <Link href="/search" className="flex items-center gap-2">
            <IoSearch className="size-5" />
            {!isCollapsed && <span>検索</span>}
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 hover:underline"
          >
            <IoSettingsOutline className="size-5" />
            {!isCollapsed && <span>設定</span>}
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* そのまま */}
            <button
              aria-label="Account menu"
              className={`hover:bg-muted/50 ${
                isCollapsed
                  ? "flex items-center justify-center size-12 rounded-full"
                  : "flex items-center gap-3 w-full px-3 py-2 rounded-xl border text-left"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-full bg-muted font-medium 
                  ${isCollapsed ? "size-9" : "size-10"}`}
              >
                {user ? user.email?.[0]?.toUpperCase() ?? "U" : "?"}
              </div>

              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {user ? "アカウント名" : "未ログイン"}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {user ? user.email : "ログインまたは新規登録"}
                  </div>
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
            {user ? <AccountMenuItems user={user} /> : <GuestMenuItems />}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
