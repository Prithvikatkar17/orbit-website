"use client";

import React, { useState } from "react";
import { Check, BookOpen, Sparkles, Terminal } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function FeaturesOverview() {
  const [miniCells, setMiniCells] = useState<boolean[]>([
    true, true, true, false, true, true, true,
    true, false, true, true, true, true, true,
  ]);

  const toggleCell = (idx: number) => {
    setMiniCells((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <span className="tactile-glass inline-block rounded-full px-4 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200">
            Your Daily Ritual
          </span>
          <h2
            id="features-heading"
            className="mt-4 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50"
          >
            Everything you need for a calmer day.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-600 sm:text-lg dark:text-stone-300">
            From Perihelion Focus tasks to Ex Libris expense ledgers and 180-day
            habit constellations—crafted to feel personal, never clinical.
          </p>
        </div>
      </ScrollReveal>

      {/* Spacious 2-Column Tactile Bento Grid */}
      <div className="grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2">
        {/* Card 1: Perihelion Focus & 1-Click Inbox */}
        <ScrollReveal delayMs={0}>
          <article className="tactile-glass flex h-full flex-col justify-between gap-8 rounded-[28px] p-8 sm:p-10">
            <div className="space-y-3 rounded-2xl border border-stone-200/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-stone-950/50">
              <div className="flex items-center gap-3 rounded-xl bg-[#FAF8F5] px-4 py-3 dark:bg-stone-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-stone-400 line-through">
                  Morning 5k run &amp; mobility
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl bg-[#FAF8F5] px-4 py-3 dark:bg-stone-900">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full border-2 border-amber-600/60" />
                  <span className="text-sm font-medium text-stone-800 dark:text-stone-100">
                    Finalize ORBIT v1.0 release notes
                  </span>
                </div>
                <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-medium text-amber-800 dark:text-amber-300">
                  Perihelion
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                Perihelion Focus &amp; 1-Click Inbox
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Capture stray thoughts in Inbox, then triage them in 0ms into
                prioritized Tasks, Calendar transit blocks, or your Personal
                Library.
              </p>
            </div>
          </article>
        </ScrollReveal>

        {/* Card 2: Living Star Constellations & 180-Day Heatmaps */}
        <ScrollReveal delayMs={80}>
          <article className="tactile-glass flex h-full flex-col justify-between gap-8 rounded-[28px] p-8 sm:p-10">
            <div className="rounded-2xl border border-stone-200/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-stone-950/50">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                  Orion · Deep Work (90m)
                </span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  20-day streak
                </span>
              </div>
              <div className="grid w-fit grid-cols-7 gap-2">
                {miniCells.map((on, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleCell(i)}
                    aria-pressed={on}
                    aria-label={`Habit day ${i + 1}`}
                    className={`h-6 w-6 cursor-pointer rounded-lg border transition-transform hover:scale-110 ${
                      on
                        ? "border-emerald-500 bg-emerald-500 shadow-[0_2px_10px_rgba(16,185,129,0.3)]"
                        : "border-stone-200 bg-stone-100 dark:border-white/10 dark:bg-white/5"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                Constellations &amp; 180-Day Heatmaps
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Watch habits light up Living Star Constellations (Lyra, Orion,
                Cassiopeia) on your dashboard and backfill past days on
                interactive 180-day heatmaps.
              </p>
            </div>
          </article>
        </ScrollReveal>

        {/* Card 3: Ex Libris ₹ Rupee Ledger */}
        <ScrollReveal delayMs={120}>
          <article className="tactile-glass flex h-full flex-col justify-between gap-8 rounded-[28px] p-8 sm:p-10">
            <div className="space-y-3 rounded-2xl border border-stone-200/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-stone-950/50">
              <div className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-4 py-3 dark:bg-stone-900">
                <div>
                  <div className="text-sm font-medium text-stone-800 dark:text-stone-100">
                    Cutting Chai &amp; bun maska
                  </div>
                  <div className="text-xs text-stone-500">UPI · Food</div>
                </div>
                <span className="font-mono text-sm font-semibold text-amber-700 dark:text-amber-400">
                  ₹45
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-4 py-3 dark:bg-stone-900">
                <div>
                  <div className="text-sm font-medium text-stone-800 dark:text-stone-100">
                    Metro Card top-up
                  </div>
                  <div className="text-xs text-stone-500">CARD · Travel</div>
                </div>
                <span className="font-mono text-sm font-semibold text-amber-700 dark:text-amber-400">
                  ₹420
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                Ex Libris ₹ Rupee Ledger
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Log UPI, Cash, and Card spends in three seconds with integer
                paise precision, monthly budget pacing, and one-click CSV
                exports.
              </p>
            </div>
          </article>
        </ScrollReveal>

        {/* Card 4: Personal Library & ⌘K Command Deck */}
        <ScrollReveal delayMs={160}>
          <article className="tactile-glass flex h-full flex-col justify-between gap-8 rounded-[28px] p-8 sm:p-10">
            <div className="space-y-3 rounded-2xl border border-stone-200/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-stone-950/50">
              <div className="flex items-center justify-between text-xs font-medium text-amber-700 dark:text-amber-400">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Library &amp; 60Hz Command Mode</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-[10px] text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200">
                  <Terminal className="h-2.5 w-2.5" />
                  <span>&gt; Log Expense</span>
                </span>
              </div>
              <blockquote className="font-serif text-base italic leading-relaxed text-stone-700 dark:text-stone-200">
                &ldquo;How we spend our days is, of course, how we spend our
                lives.&rdquo;
              </blockquote>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                <span>Chords: g d · g i · g t · g h · g e · g l</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                Personal Library &amp; ⌘K Command Deck
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Store quotes, markdown notes, and local attachments in your
                Library—and jump anywhere in milliseconds with{" "}
                <code className="font-mono text-sm">⌘K</code> or two-key{" "}
                <code className="font-mono text-sm">g</code>-chords.
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
