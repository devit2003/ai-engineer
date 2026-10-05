import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Devit AI Engineer OS",
  description: "Command center perjalanan 90 hari menuju AI Engineer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full bg-background text-foreground">
        <Sidebar />
        <div className="flex min-h-full flex-1 flex-col">
          <main className="flex-1 px-4 pb-20 pt-6 md:px-8 md:pb-8 md:pt-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
