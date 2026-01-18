"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

export default function ReservationsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const modalSegment = useSelectedLayoutSegment("modal");

  return (
    <div className="relative overflow-x-hidden">
      {children}

      {modalSegment && modal && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          <div className="pointer-events-auto">{modal}</div>
        </div>
      )}
    </div>
  );
}
