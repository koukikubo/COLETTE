"use client";

import { useState } from "react";
import SystemSettingDialog from "@/components/settings/dialogs/SystemSettingDialog";

export default function SettingsPage() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return <SystemSettingDialog open={open} onClose={handleClose} />;
}
