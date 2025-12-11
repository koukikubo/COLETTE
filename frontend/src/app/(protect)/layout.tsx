"use client";

export default function ReservationsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}

      {modal && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          <div className="pointer-events-auto">{modal}</div>
        </div>
      )}
    </div>
  );
}
