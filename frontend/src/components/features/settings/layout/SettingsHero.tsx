import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export default function SettingsHero({
  title,
  description,
  badge = "アップデート",
  action,
}: {
  title: string;
  description: string;
  badge?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card className="overflow-hidden border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 text-white shadow-lg">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Badge className="w-fit bg-white/20 text-white hover:bg-white/30">
            <Sparkles className="mr-1 size-3" /> {badge}
          </Badge>
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
            <p className="text-sm text-white/80 md:text-base">{description}</p>
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </CardContent>
    </Card>
  );
}
