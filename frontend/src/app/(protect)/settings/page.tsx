// // src/app/settings/page.tsx
// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";
// import { motion, useDragControls } from "framer-motion";
// import { ThemeToggle } from "@/components/blocks/theme-toggle";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { X, Minus, Maximize2, Globe, Info, GripVertical } from "lucide-react";

// export default function SettingsPage() {
//   const router = useRouter();
//   // ひとつのトグルで「通常サイズ ↔ 最小化」
//   const [minimized, setMinimized] = React.useState(false);
//   // タイトルバーだけドラッグ可
//   const dragControls = useDragControls();
//   const boundsRef = React.useRef<HTMLDivElement>(null);
//   const draggable = !minimized; // 最小化中はドラッグ無効
//   const handleClose = () => router.back();

//   return (
//     <div
//       ref={boundsRef}
//       className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//       onClick={handleClose}
//     >
//       <motion.div
//         role="dialog"
//         aria-label="設定"
//         onClick={(e) => e.stopPropagation()}
//         className={[
//           "fixed rounded-2xl border border-border/70 bg-card/90 text-foreground shadow-2xl",
//           minimized ? "bottom-6 right-6" : "left-1/2 top-24 -translate-x-1/2",
//           minimized ? "" : "overflow-hidden",
//         ].join(" ")}
//         drag={draggable}
//         dragControls={dragControls}
//         dragListener={false}
//         dragConstraints={boundsRef}
//         dragMomentum={false}
//         dragElastic={0.06}
//         style={{
//           width: minimized ? 320 : 720,
//           height: minimized ? 56 : "auto",
//         }}
//         transition={{ type: "spring", stiffness: 500, damping: 35 }}
//         layout
//       >
//         {/* タイトルバー：ここだけドラッグ可。操作ボタンはドラッグ抑止 */}
//         <div
//           className="flex items-center justify-between px-3 py-2 rounded-t-2xl border-b bg-background/80"
//           onPointerDown={(e) => {
//             if (!draggable) return;
//             if ((e.target as HTMLElement).closest("[data-window-action]"))
//               return;
//             dragControls.start(e);
//           }}
//         >
//           <div className="flex items-center gap-2">
//             <span className="text-sm">設定</span>
//             <GripVertical
//               className="ml-1 size-4 text-muted-foreground"
//               aria-hidden
//             />
//           </div>

//           <div className="flex items-center gap-1">
//             {/* 最小化 ↔ 復元（アイコンを切替） */}
//             <Button
//               data-window-action
//               variant="ghost"
//               size="icon"
//               className="size-7"
//               onPointerDown={(e) => e.stopPropagation()}
//               onClick={() => setMinimized((v) => !v)}
//               title={minimized ? "復元" : "最小化"}
//               aria-label={minimized ? "復元" : "最小化"}
//             >
//               {minimized ? (
//                 <Maximize2 className="size-4" />
//               ) : (
//                 <Minus className="size-4" />
//               )}
//             </Button>

//             {/* 閉じる */}
//             <Button
//               data-window-action
//               variant="ghost"
//               size="icon"
//               className="size-7"
//               onPointerDown={(e) => e.stopPropagation()}
//               onClick={handleClose}
//               title="閉じる"
//               aria-label="閉じる"
//             >
//               <X className="size-4" />
//             </Button>
//           </div>
//         </div>

//         {/* 最小化中は本文を非表示 */}
//         {!minimized && (
//           <div className="p-4 md:p-6">
//             <Card className="border-0 shadow-none bg-transparent">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-lg">Settings</CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 {/* Dark mode */}
//                 <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
//                   <div className="flex items-center justify-between">
//                     <Label className="font-medium">Dark mode</Label>
//                     <ThemeToggle />
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     アプリ全体の配色を切り替えます（ライト/ダーク）。
//                   </p>
//                 </section>

//                 {/* Language */}
//                 <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
//                   <div className="flex items-center gap-2">
//                     <Globe className="size-4" />
//                     <Label className="font-medium">Language</Label>
//                   </div>
//                   <div className="flex items-center justify-between rounded-md border px-3 py-2">
//                     <span className="text-sm">日本語</span>
//                     <span className="text-xs text-muted-foreground">固定</span>
//                   </div>
//                 </section>

//                 {/* About */}
//                 <section className="space-y-2 rounded-lg border bg-muted/5 p-3 md:p-4">
//                   <div className="flex items-center gap-2">
//                     <Info className="size-4" />
//                     <Label className="font-medium">About</Label>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     バージョン 1.0.0
//                   </p>
//                 </section>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
