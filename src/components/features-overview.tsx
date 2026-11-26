"use client";

import React, { useState } from "react";
import {
  IndianRupee,
  Flame,
  Inbox,
  CheckSquare,
  Calendar,
  BookOpen,
  Palette,
} from "lucide-react";
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
    cardBg: "#141821",
    cardBorder: "rgba(255,255,255,0.16)",
    accentColor: "#38bdf8",
    textPrimary: "#f8fafc",
    textMuted: "#94a3b8",
  },
  {
    id: "archivist",
    name: "Archivist",
    swatch: "#e07a5f",
    cardBg: "#231d18",
    cardBorder: "rgba(224,122,95,0.35)",
    accentColor: "#e07a5f",
    textPrimary: "#f5ece0",
    textMuted: "#c0af9c",
  },
  {
    id: "futuristic",
    name: "Futuristic",
    swatch: "#22d3ee",
    cardBg: "#0a1721",
    cardBorder: "rgba(34,211,238,0.35)",
    accentColor: "#22d3ee",
    textPrimary: "#ecfeff",
    textMuted: "#7dd3fc",
  },
  {
    id: "naturalist",
    name: "Naturalist",
    swatch: "#4ade80",
    cardBg: "#111f16",
    cardBorder: "rgba(74,222,128,0.35)",
    accentColor: "#4ade80",
    textPrimary: "#ecfdf5",
    textMuted: "#86efac",
  },
  {
    id: "midnight",
    name: "Midnight",
    swatch: "#818cf8",
    cardBg: "#12152a",
    cardBorder: "rgba(129,140,248,0.35)",
    accentColor: "#818cf8",
    textPrimary: "#eef2ff",
    textMuted: "#a5b4fc",
  },
  {
    id: "solar",
    name: "Solar",
    swatch: "#f59e0b",
    cardBg: "#21190d",
    cardBorder: "rgba(245,158,11,0.35)",
    accentColor: "#f59e0b",
    textPrimary: "#fef3c7",
    textMuted: "#fcd34d",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    swatch: "#a1a1aa",
    cardBg: "#121212",
    cardBorder: "rgba(255,255,255,0.28)",
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
    APP_THEMES[2]
  );

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* Ambient Color Pools */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 flex justify-around"
      >
        <div className="h-80 w-96 rounded-full bg-indigo-500/15 blur-[130px]" />
        <div className="h-80 w-96 rounded-full bg-emerald-500/12 blur-[130px]" />
      </div>

      <ScrollReveal>
        <div className="mb-14 text-center">
          <h2
            id="features-heading"
            className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Six Modules. One Cohesive Vault.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Every core daily workflow unified under one keyboard-first
            workspace.
          </p>
        </div>
      </ScrollReveal>

      {/* Asymmetric Mouse-Spotlight Bento Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Flagship 1 (col-span-2): Daily Expenses ₹ with Paise Precision */}
        <ScrollReveal delayMs={0} className="lg:col-span-2">
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card flex h-full flex-col justify-between rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-sky-400">
                <IndianRupee className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Daily Expenses (₹) with Paise Precision
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                Stored as exact integer paise in SQLite—zero floating-point
                drift. Filter instantly by UPI, Cash, or Card with monthly
                pacing bars.
              </p>
            </div>

            <div className="mt-6 grid gap-3 rounded-xl border border-white/[0.1] bg-slate-950/60 p-4 sm:grid-cols-2">
              <div>
                <div className="font-mono text-[11px] text-slate-400">
                  INTEGER_PAISE_CONVERSION
                </div>
                <div className="mt-1 font-mono text-sm text-slate-200">
                  ₹1,420.50 →{" "}
                  <span className="text-sky-400">142050 paise</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-1.5 flex justify-between font-mono text-[11px] text-slate-300">
                  <span>Monthly Pacing</span>
                  <span className="text-sky-400">25%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* Small Card 1: Inbox Triage */}
        <ScrollReveal delayMs={60}>
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card h-full rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-indigo-400">
              <Inbox className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white">Inbox Triage</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Capture thoughts, links, and voice notes without friction. Route
              any item to Tasks, Calendar, or Library in a single click.
            </p>
          </article>
        </ScrollReveal>

        {/* Small Card 2: Tasks & Focus */}
        <ScrollReveal delayMs={120}>
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card h-full rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-emerald-400">
              <CheckSquare className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Tasks &amp; Focus
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Keyboard-navigable task lists with crisp priorities and due
              dates—zero bloated Kanban boards or team-sprint noise.
            </p>
          </article>
        </ScrollReveal>

        {/* Small Card 3: Calendar */}
        <ScrollReveal delayMs={180}>
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card h-full rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-sky-400">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white">Calendar</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Time-block your day alongside your tasks and deadlines inside one
              fast, local-first timeline.
            </p>
          </article>
        </ScrollReveal>

        {/* Small Card 4: Personal Library */}
        <ScrollReveal delayMs={240}>
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card h-full rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-indigo-400">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Personal Library
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Archive articles, book notes, and technical references in an
              instant, full-text searchable local vault.
            </p>
          </article>
        </ScrollReveal>

        {/* Flagship 2 (col-span-2): Interactive 7 Built-in App Themes Bento Card */}
        <ScrollReveal delayMs={300} className="lg:col-span-2">
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card flex h-full flex-col justify-between gap-5 rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-sky-400">
                  <Palette className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  7 Built-in App Themes (Light &amp; Dark)
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                  Inside ORBIT, switch instantaneously between 7 crafted
                  palettes. Hover or click a swatch to preview the live mini
                  card:
                </p>
              </div>

              {/* 7 Glowing Swatches */}
              <div
                role="radiogroup"
                aria-label="Preview ORBIT app themes"
                className="flex shrink-0 flex-wrap gap-2"
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
                      className={`h-7 w-7 cursor-pointer rounded-full border transition-transform hover:scale-110 ${
                        active
                          ? "scale-110 border-white ring-2 ring-sky-400/60"
                          : "border-white/25"
                      }`}
                      style={{
                        backgroundColor: t.swatch,
                        boxShadow: active ? `0 0 14px ${t.swatch}` : undefined,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Live Re-Themed Mini App Preview Card */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 transition-colors duration-200"
              style={{
                backgroundColor: selectedTheme.cardBg,
                borderColor: selectedTheme.cardBorder,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded border"
                  style={{
                    borderColor: selectedTheme.accentColor,
                    backgroundColor: selectedTheme.accentColor,
                  }}
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
                    Theme: {selectedTheme.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span
                  className="rounded-md border px-2.5 py-1 font-semibold"
                  style={{
                    borderColor: selectedTheme.cardBorder,
                    color: selectedTheme.accentColor,
                  }}
                >
                  ₹45.50
                </span>
                <span
                  className="rounded-md border px-2.5 py-1"
                  style={{
                    borderColor: selectedTheme.cardBorder,
                    color: selectedTheme.textPrimary,
                  }}
                >
                  14d streak
                </span>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* Flagship 3 (col-span-1): Habit Heatmaps */}
        <ScrollReveal delayMs={360}>
          <article
            onMouseMove={handleSpotlightMove}
            className="spotlight-card flex h-full flex-col justify-between gap-5 rounded-2xl border border-white/[0.14] bg-slate-900/55 p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40"
          >
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-emerald-400">
                <Flame className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Habit Heatmaps
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                12-week contribution grids with forgiving streak logic that
                keeps Yesterday&apos;s streak intact.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="grid w-fit grid-cols-7 gap-1.5 rounded-xl border border-white/[0.1] bg-slate-950/60 p-3"
            >
              {[1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1].map((on, i) => (
                <span
                  key={i}
                  className={`h-4 w-4 rounded-[4px] border ${
                    on
                      ? "border-sky-400/70 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                      : "border-white/[0.14] bg-white/[0.06]"
                  }`}
                />
              ))}
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
