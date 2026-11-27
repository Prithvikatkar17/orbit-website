import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORBIT — A quiet, private space for your daily life",
  description:
    "Your personal diary, planner, habit tracker, library, and daily ₹ expense notebook—living entirely on your device.",
};

const MODE_INIT_SCRIPT = `
try {
  var m = localStorage.getItem("orbit-daylight-mode");
  if (m === "dark") {
    document.documentElement.dataset.mode = "dark";
  } else {
    document.documentElement.dataset.mode = "light";
  }
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
      data-mode="light"
      className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: MODE_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-stone-900 antialiased selection:bg-amber-200/70 selection:text-stone-900 dark:bg-[#141312] dark:text-stone-100 dark:selection:bg-amber-500/30 dark:selection:text-stone-100">
        {/* Soft Morning-Sunlight Ambient Washes */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-orange-400/10 blur-[120px] dark:bg-amber-500/10" />
          <div className="absolute right-0 top-1/4 h-[460px] w-[460px] rounded-full bg-sky-400/8 blur-[120px] dark:bg-sky-500/8" />
          <div className="absolute bottom-0 left-1/3 h-[440px] w-[520px] rounded-full bg-emerald-400/8 blur-[120px] dark:bg-emerald-500/8" />
        </div>
        {children}
      </body>
    </html>
  );
}
