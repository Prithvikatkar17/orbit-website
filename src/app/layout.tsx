import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORBIT — Your Personal OS. Zero Cloud. Infinite Speed.",
  description:
    "100% local-first personal OS unifying Inbox triage, Tasks, Habit heatmaps, Calendar, Personal Library, and Daily Expenses (₹ INR paise precision) with 0ms SQLite & IndexedDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-100">
        {children}
      </body>
    </html>
  );
}
