"use client";

import ThemeSection from "./sections/ThemeSection";
import LanguageSection from "./sections/LanguageSection";
import AboutSection from "./sections/AboutSection";
import { Suspense } from "react";
import SystemCommonSettingSkeleton from "./SystemCommonSetting.skeleton";

export default function SystemCommonSettings() {
  return (
    <Suspense fallback={<SystemCommonSettingSkeleton />}>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <ThemeSection />
          <LanguageSection />
        </div>
        <AboutSection />
      </div>
    </Suspense>
  );
}
