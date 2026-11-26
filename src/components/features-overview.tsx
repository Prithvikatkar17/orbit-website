"use client";

import React, { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

interface AppThemeSample {
  id: string;
  name: string;
  swatch: string;
  cardBg: string;
  cardBorder: string;
  accentColor: string;
  textPrimary: string;
  textMuted: string;
}

const APP_THEMES: AppThemeSample[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    swatch: "#f1f5f9",
    cardBg: "#12161f",
    cardBorder: "rgba(255,255,255,0.14)",
    accentColor: "#38bdf8",
    textPrimary: "#f8fafc",
    textMuted: "#94a3b8",
  },
  {
    id: "archivist",
    name: "Archivist",
    swatch: "#e07a5f",
    cardBg: "#211b17",
    cardBorder: "rgba(224,122,95,0.32)",
    accentColor: "#e07a5f",
    textPrimary: "#f5ece0",
    textMuted: "#c0af9c",
  },
  {
    id: "futuristic",
    name: "Futuristic",
    swatch: "#22d3ee",
    cardBg: "#0a1620",
    cardBorder: "rgba(34,211,238,0.32)",
    accentColor: "#22d3ee",
    textPrimary: "#ecfeff",
    textMuted: "#7dd3fc",
  },
  {
    id: "naturalist",
    name: "Naturalist",
    swatch: "#4ade80",
    cardBg: "#101d15",
    cardBorder: "rgba(74,222,128,0.32)",
    accentColor: "#4ade80",
    textPrimary: "#ecfdf5",
    textMuted: "#86efac",
  },
  {
    id: "midnight",
    name: "Midnight",
    swatch: "#818cf8",
    cardBg: "#111428",
    cardBorder: "rgba(129,140,248,0.32)",
    accentColor: "#818cf8",
    textPrimary: "#eef2ff",
    textMuted: "#a5b4fc",
  },
  {
    id: "solar",
    name: "Solar",
    swatch: "#f59e0b",
    cardBg: "#1f170c",
    cardBorder: "rgba(245,158,11,0.32)",
    accentColor: "#f59e0b",
    textPrimary: "#fef3c7",
    textMuted: "#fcd34d",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    swatch: "#a1a1aa",
    cardBg: "#111111",
    cardBorder: "rgba(255,255,255,0.24)",
    accentColor: "#ffffff",
    textPrimary: "#ffffff",
    textMuted: "#a1a1aa",
  },
];

function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

export function FeaturesOverview() {
  const [selectedTheme, setSelectedTheme] = useState<AppThemeSample>(
    APP_THEMES[0]
  );
  const [miniHabit, setMiniHabit] = useState<boolean[]>([
    true, true, false, true, true, true, true,
    false, true, true, true, false, true, true,
    true, true, true, false, true, true, true,
  ]);

  const toggleMiniCell = (i: number) => {
    setMiniHabit((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-28 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        {/* Left-Aligned 2-Column Editorial Split Header */}
        <ScrollReveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-3 font-mono text-xs tracking-wider text-slate-400">
                {"// WORKSPACE_MODULES"}
              </div>
              <h2
                id="features-heading"
                className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
              >
                Six tools that actually{" "}
                <span className="font-serif font-normal italic text-sky-200/90">
                  belong together.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Stop paying for five separate cloud subscriptions just to track
                tasks, habits, reading notes, and daily expenses. Every module
                reads from the same local vault.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Visual-First Bento Grid (No Icon-in-a-Box Clichés) */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* 1. Daily Expenses (₹) — col-span-2 */}
          <ScrollReveal delayMs={0} className="lg:col-span-2">
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              {/* Top Visual Stage */}
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-slate-400">
                    LEDGER · INTEGER PAISE
                  </span>
                  <span className="rounded border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 font-mono text-[11px] text-amber-300">
                    ₹185.50 → 18550 paise
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs">
                    <span className="text-slate-200">
                      Campus Mess &amp; Filter Coffee{" "}
                      <span className="ml-1.5 font-mono text-[10px] text-slate-500">
                        UPI
                      </span>
                    </span>
                    <span className="font-mono font-semibold text-amber-300">
                      ₹185.50
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs">
                    <span className="text-slate-200">
                      Metro Smart Card Top-up{" "}
                      <span className="ml-1.5 font-mono text-[10px] text-slate-500">
                        UPI
                      </span>
                    </span>
                    <span className="font-mono font-semibold text-amber-300">
                      ₹400.00
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="w-[45%] bg-amber-300/80" />
                  <div className="w-[30%] bg-sky-400/80" />
                  <div className="w-[25%] bg-slate-500/80" />
                </div>
              </div>

              {/* Bottom 30% Copy */}
              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  Daily Expenses (₹) with Paise Precision
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  Stored as exact integer paise in SQLite—zero IEEE-754
                  floating-point drift. Filter by UPI, Cash, or Card in 0ms.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 2. Inbox Triage — col-span-1 */}
          <ScrollReveal delayMs={60}>
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              <div className="space-y-2 overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
                  <div className="truncate text-xs font-medium text-slate-200">
                    Submit DBMS assignment PDF
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                    <span className="rounded border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-sky-300">
                      [T] Task
                    </span>
                    <span className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-slate-400">
                      [C] Calendar
                    </span>
                    <span className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-slate-400">
                      [L] Library
                    </span>
                  </div>
                </div>
                <div className="bento-canvas-fade rounded-lg border border-white/[0.05] bg-white/[0.015] p-2.5 text-xs text-slate-500">
                  Read SQLite WAL internals...
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  Inbox Triage
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  Dump thoughts fast, then route every item to Tasks, Calendar,
                  or Library in one keystroke.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 3. Tasks & Focus — col-span-1 */}
          <ScrollReveal delayMs={100}>
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              <div className="space-y-2 overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4">
                <div className="flex items-center justify-between gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-xs">
                  <span className="truncate font-medium text-slate-100">
                    Ship static Cloudflare build
                  </span>
                  <kbd className="shrink-0 rounded border border-white/[0.12] bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-sky-300">
                    ⌘Enter
                  </kbd>
                </div>
                <div className="bento-canvas-fade flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
                  <span className="truncate">Write WAL backup script</span>
                  <span className="shrink-0 font-mono text-[10px] text-slate-500">
                    P1
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  Tasks &amp; Focus
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  Keyboard-navigable checklists with crisp priorities—no bloated
                  Kanban boards.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 4. Calendar — col-span-1 */}
          <ScrollReveal delayMs={140}>
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              <div className="space-y-2 overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4 font-mono text-xs">
                <div className="flex items-center gap-2.5 rounded-lg border border-sky-400/25 bg-sky-400/10 px-3 py-2 text-sky-200">
                  <span className="text-sky-400">09:00</span>
                  <span>— Deep Work</span>
                </div>
                <div className="bento-canvas-fade flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-slate-400">
                  <span className="text-slate-500">14:30</span>
                  <span>— Systems Lab</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">Calendar</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  Time-block your day alongside your tasks inside a single
                  local-first timeline.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 5. Personal Library — col-span-1 */}
          <ScrollReveal delayMs={180}>
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4 font-mono text-[11px] leading-relaxed">
                <div className="font-semibold text-slate-200">
                  # SQLite WAL Internals
                </div>
                <div className="mt-1 text-slate-400">
                  PRAGMA journal_mode = WAL;
                </div>
                <div className="bento-canvas-fade text-slate-500">
                  Concurrent readers never block writers.
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  Personal Library
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  Archive articles, book notes, and references in an instant
                  full-text searchable vault.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 6. 7 Built-in App Themes — col-span-2 */}
          <ScrollReveal delayMs={220} className="lg:col-span-2">
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              <div className="space-y-4 overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-slate-400">
                    LIVE_THEME_PREVIEW · {selectedTheme.name.toUpperCase()}
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Preview ORBIT app themes"
                    className="flex flex-wrap gap-2"
                  >
                    {APP_THEMES.map((t) => {
                      const active = selectedTheme.id === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          aria-label={t.name}
                          title={t.name}
                          onMouseEnter={() => setSelectedTheme(t)}
                          onClick={() => setSelectedTheme(t)}
                          className={`h-6 w-6 cursor-pointer rounded-full border transition-transform hover:scale-110 ${
                            active
                              ? "scale-110 border-white ring-2 ring-sky-400/50"
                              : "border-white/25"
                          }`}
                          style={{ backgroundColor: t.swatch }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Live Re-Themed Mini App Card */}
                <div
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 transition-colors duration-200"
                  style={{
                    backgroundColor: selectedTheme.cardBg,
                    borderColor: selectedTheme.cardBorder,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: selectedTheme.accentColor }}
                    />
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{ color: selectedTheme.textPrimary }}
                      >
                        Ship ORBIT v1.0.0 Static Site
                      </div>
                      <div
                        className="font-mono text-[11px]"
                        style={{ color: selectedTheme.textMuted }}
                      >
                        Palette: {selectedTheme.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className="rounded border px-2 py-0.5 font-semibold"
                      style={{
                        borderColor: selectedTheme.cardBorder,
                        color: selectedTheme.accentColor,
                      }}
                    >
                      ₹45.50
                    </span>
                    <span
                      className="rounded border px-2 py-0.5"
                      style={{
                        borderColor: selectedTheme.cardBorder,
                        color: selectedTheme.textPrimary,
                      }}
                    >
                      14d streak
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  7 Built-in App Themes (Light &amp; Dark)
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  Inside the app, switch instantaneously between 7 crafted
                  palettes—from warm Archivist paper to high-contrast
                  Monochrome.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 7. Habit Heatmaps (Interactive) — col-span-1 */}
          <ScrollReveal delayMs={260}>
            <article
              onMouseMove={handleSpotlightMove}
              className="spotlight-card flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/[0.18]"
            >
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#060911]/80 p-4">
                <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span>CLICK CELLS TO TOGGLE</span>
                  <span className="text-emerald-400">
                    {miniHabit.filter(Boolean).length}/21
                  </span>
                </div>
                <div className="grid w-fit grid-cols-7 gap-1.5">
                  {miniHabit.map((on, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleMiniCell(i)}
                      aria-pressed={on}
                      aria-label={`Habit cell ${i + 1}`}
                      className={`h-5 w-5 cursor-pointer rounded-[4px] border transition-transform hover:scale-110 ${
                        on
                          ? "border-emerald-400/60 bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                          : "border-white/[0.09] bg-white/[0.04]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  Habit Heatmaps
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  12-week contribution grids with forgiving streak logic that
                  keeps Yesterday&apos;s streak intact.
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
