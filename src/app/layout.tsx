import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WorkspaceProvider } from "@/components/workspace-context";

export const metadata: Metadata = {
  title: "ORBIT — Your Personal OS, Living Entirely on Your Device",
  description:
    "100% local-first personal OS unifying Inbox triage, Tasks, Habit heatmaps, Calendar, Personal Library, and Daily Expenses (₹ INR paise precision) with 0ms offline speed.",
};

const FOUC_SCRIPT = `
try {
  var cs = localStorage.getItem("color-scheme");
  var mode = cs === "light" || cs === "dark" ? cs : "light dark";
  var meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute("content", mode);
  document.documentElement.style.colorScheme = mode;
  document.documentElement.dataset.colorScheme = mode;
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
    <html
      lang="en"
      data-theme="minimalist"
      data-color-scheme="light dark"
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <WorkspaceProvider>{children}</WorkspaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
