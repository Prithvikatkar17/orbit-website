"use client";

import React from "react";
import { ArrowUpRight, Download, ChevronRight } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
      {/* Focused Ambient Cobalt/Sky Spotlight + Perspective Grid Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="hero-grid-mask absolute inset-0 opacity-75" />
        <div className="absolute left-1/2 top-0 h-[440px] w-[760px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-sky-400/12 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Clean Brushed-Titanium Eyebrow Pill */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-wide">
            LOCAL-FIRST PERSONAL OS · SQLITE WAL &amp; INDEXEDDB
          </span>
        </div>

        {/* Editorial Contrast Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-6xl lg:text-[4.25rem]">
          Your personal life doesn&apos;t belong on a{" "}
          <span className="font-serif font-normal italic text-sky-200/90">
            slow cloud server.
          </span>
        </h1>

        {/* Opinionated Maker Subcopy */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Notion takes 4 seconds to load a daily checklist. ORBIT runs in{" "}
          <span className="font-mono text-slate-100">0.1ms</span> directly from
          a local SQLite file on your machine—unifying your Inbox, Tasks, Habit
          Heatmaps, Library, and Daily{" "}
          <span className="font-mono text-amber-300">₹ INR</span> Expenses with
          zero subscriptions.
        </p>

        {/* Refined Dual CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-50 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_-8px_rgba(248,250,252,0.45)] transition-all hover:bg-slate-200 sm:w-auto"
          >
            <span>Try Live in Browser</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-lg transition-all hover:border-sky-400/40 hover:bg-white/[0.09] sm:w-auto"
          >
            <Download className="h-4 w-4 text-sky-400" aria-hidden="true" />
            <span>Download for Windows (.exe)</span>
          </a>
        </div>

        {/* Minimal Expandable SmartScreen Note */}
        <div className="mx-auto mt-7 max-w-lg">
          <details className="orbit-accordion rounded-xl border border-white/[0.09] bg-white/[0.03] text-left backdrop-blur-md">
            <summary className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-slate-400 transition-colors hover:text-slate-200">
              <ChevronRight
                className="accordion-chevron h-3.5 w-3.5 shrink-0 text-slate-500"
                aria-hidden="true"
              />
              <span>
                First time installing an unsigned open-source{" "}
                <code className="font-mono text-slate-300">.exe</code>?
              </span>
            </summary>
            <div className="border-t border-white/[0.08] px-4 py-3 text-xs leading-relaxed text-slate-300">
              ORBIT is independently built without a paid corporate certificate,
              so Windows SmartScreen may show{" "}
              <strong className="text-slate-100">
                &ldquo;Windows protected your PC&rdquo;
              </strong>
              . Click{" "}
              <strong className="text-slate-100">
                More info → Run anyway
              </strong>{" "}
              to launch cleanly, or run the zero-install Browser PWA.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
