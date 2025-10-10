"use client";
import { createContext, useContext, useState } from "react";
import SystemSettingDialog from "@/components/settings/SystemSettingDialog";

const SettingsContext = createContext({
  openSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSettings = () => setIsOpen(true);
  const closeSettings = () => setIsOpen(false);

  return (
    <SettingsContext.Provider value={{ openSettings }}>
      {children}
      {isOpen && <SystemSettingDialog onClose={closeSettings} open={isOpen} />}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
