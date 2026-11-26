import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "ORBIT — Your Personal OS, Living Entirely on Your Device",
  description:
    "100% local-first personal OS unifying Inbox triage, Tasks, Habit heatmaps, Calendar, Personal Library, and Daily Expenses (₹ INR paise precision) with 0ms offline speed.",
};

const FOUC_SCRIPT = `
try {
  var cs = localStorage.getItem("color-scheme");
  var meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute("content", cs === "light" || cs === "dark" ? cs : "light dark");
  var th = localStorage.getItem("orbit-theme");
  var valid = ["minimalist","archivist","futuristic","naturalist","midnight","solar","monochrome"];
  document.documentElement.dataset.theme = valid.indexOf(th) !== -1 ? th : "minimalist";
} catch (e) {}
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="minimalist" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
