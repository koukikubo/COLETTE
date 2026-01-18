import type { ReactNode } from "react";
import SettingsNav from "@/components/settings/SettingsNav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <SettingsNav />
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
