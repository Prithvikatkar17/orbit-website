import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORBIT — Local-First Personal OS",
  description:
    "Your personal life doesn't belong on a slow cloud server. ORBIT runs in 0.1ms directly from a local SQLite file—unifying Inbox, Tasks, Habit Heatmaps, Library, and Daily ₹ INR Expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-screen bg-[#080b12] text-[#f8fafc] antialiased selection:bg-sky-400/25 selection:text-sky-100">
        <div
          aria-hidden="true"
          className="film-grain pointer-events-none fixed inset-0 z-[100]"
        />
        {children}
      </body>
    </html>
  );
}
