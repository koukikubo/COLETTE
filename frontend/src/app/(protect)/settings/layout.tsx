import type { ReactNode } from "react";
import SettingsNav from "@/components/features/settings/layout/SettingsNav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full space-y-6 px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <SettingsNav />
        <div className="min-w-0 space-y-6">{children}</div>
      </div>
    </div>
  );
}
