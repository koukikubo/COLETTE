"use client";

import ThemeSection from "../system/ThemeSection";
import LanguageSection from "../system/LanguageSection";
import AboutSection from "../system/AboutSection";
import { Suspense } from "react";
import SystemCommonSettingSkeleton from "../system/skeletons/SystemCommonSetting.skeleton";

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
