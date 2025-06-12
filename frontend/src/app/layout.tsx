import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "COLETTE",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
