"use client";

import React from "react";
import { ArrowUpRight, Download, ChevronRight } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      {/* Ambient Radial Spotlights + Perspective Grid Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="hero-grid-mask absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-0 h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute left-1/3 top-24 h-[360px] w-[540px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Glowing Eyebrow Pill */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Local-First Personal OS · 0ms SQLite &amp; IndexedDB</span>
        </div>

        {/* Gradient Metallic Headline */}
        <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-white via-white/95 to-white/55 bg-clip-text text-5xl font-bold leading-[1.06] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          Your Personal OS. Zero Cloud. Infinite Speed.
        </h1>

        {/* Clean, Punchy Subcopy */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Unify Inbox triage, Tasks, Habit heatmaps, Calendar, Library, and ₹
          INR paise-precision Expenses—living entirely on your device.
        </p>

        {/* Refined Dual CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-5px_rgba(255,255,255,0.35)] transition-all hover:bg-zinc-200 sm:w-auto"
          >
            <span>Try Live in Browser</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/[0.1] sm:w-auto"
          >
            <Download className="h-4 w-4 text-sky-400" aria-hidden="true" />
            <span>Download for Windows (.exe)</span>
          </a>
        </div>

        {/* Minimal One-Line Expandable SmartScreen Helper */}
        <div className="mx-auto mt-7 max-w-lg">
          <details className="orbit-accordion rounded-xl border border-white/[0.08] bg-white/[0.02] text-left backdrop-blur-md">
            <summary className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-zinc-400 transition-colors hover:text-zinc-200">
              <ChevronRight
                className="accordion-chevron h-3.5 w-3.5 shrink-0 text-zinc-500"
                aria-hidden="true"
              />
              <span>
                First time installing an unsigned open-source{" "}
                <code className="font-mono text-zinc-300">.exe</code>?
              </span>
            </summary>
            <div className="border-t border-white/[0.08] px-4 py-3 text-xs leading-relaxed text-zinc-400">
              ORBIT is independently built without a paid corporate certificate,
              so Windows SmartScreen may show{" "}
              <strong className="text-zinc-200">
                &ldquo;Windows protected your PC&rdquo;
              </strong>
              . Click{" "}
              <strong className="text-zinc-200">More info → Run anyway</strong>{" "}
              to launch cleanly, or run the zero-install Browser PWA.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
