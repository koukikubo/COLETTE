"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import SiteHeader from "@/components/layout/header";
import { SettingsProvider } from "../../contexts/SettingsContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)sidebar_state=(true|false)/);
    setSidebarOpen(m?.[1] === "true");
  }, []);

  return (
    <SidebarProvider
      defaultOpen={sidebarOpen}
      style={
        {
          "--sidebar-width": "17rem",
          "--sidebar-width-mobile": "17rem",
        } as React.CSSProperties
      }
    >
      <SettingsProvider>
        <AppSidebar />

        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SettingsProvider>
    </SidebarProvider>
  );
}
