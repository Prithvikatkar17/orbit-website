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
        <div className="hero-grid-mask absolute inset-0 opacity-75" />
        <div className="absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-sky-500/20 blur-[130px]" />
        <div className="absolute left-1/3 top-24 h-[380px] w-[580px] -translate-x-1/2 rounded-full bg-indigo-500/18 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Glowing Eyebrow Pill with Border-Beam */}
        <div className="border-beam mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] backdrop-blur-md">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Local-First Personal OS · 0ms SQLite &amp; IndexedDB</span>
        </div>

        {/* Gradient Metallic Headline */}
        <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-white via-white/95 to-slate-300/75 bg-clip-text text-5xl font-bold leading-[1.06] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          Your Personal OS. Zero Cloud. Infinite Speed.
        </h1>

        {/* Clean, Punchy Subcopy */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Unify Inbox triage, Tasks, Habit heatmaps, Calendar, Library, and ₹
          INR paise-precision Expenses—living entirely on your device.
        </p>

        {/* Refined Dual CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] transition-all hover:bg-slate-200 sm:w-auto"
          >
            <span>Try Live in Browser</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] backdrop-blur-lg transition-all hover:border-sky-400/40 hover:bg-white/[0.11] sm:w-auto"
          >
            <Download className="h-4 w-4 text-sky-400" aria-hidden="true" />
            <span>Download for Windows (.exe)</span>
          </a>
        </div>

        {/* Minimal One-Line Expandable SmartScreen Helper */}
        <div className="mx-auto mt-7 max-w-lg">
          <details className="orbit-accordion rounded-xl border border-white/[0.14] bg-slate-900/55 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <summary className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-slate-300 transition-colors hover:text-white">
              <ChevronRight
                className="accordion-chevron h-3.5 w-3.5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <span>
                First time installing an unsigned open-source{" "}
                <code className="font-mono text-slate-200">.exe</code>?
              </span>
            </summary>
            <div className="border-t border-white/[0.1] px-4 py-3 text-xs leading-relaxed text-slate-300">
              ORBIT is independently built without a paid corporate certificate,
              so Windows SmartScreen may show{" "}
              <strong className="text-white">
                &ldquo;Windows protected your PC&rdquo;
              </strong>
              . Click{" "}
              <strong className="text-white">More info → Run anyway</strong> to
              launch cleanly, or run the zero-install Browser PWA.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
