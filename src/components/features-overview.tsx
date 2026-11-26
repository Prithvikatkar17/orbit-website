"use client";

import React from "react";
import {
  IndianRupee,
  Flame,
  Inbox,
  CheckSquare,
  Calendar,
  BookOpen,
} from "lucide-react";

function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

export function FeaturesOverview() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mb-14 text-center">
        <h2
          id="features-heading"
          className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
        >
          Six Modules. One Cohesive Vault.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-400">
          Every core daily workflow unified under one keyboard-first workspace.
        </p>
      </div>

      {/* Asymmetric 6-Card Mouse-Spotlight Bento Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Flagship 1 (col-span-2): Daily Expenses ₹ with Paise Precision */}
        <article
          onMouseMove={handleSpotlightMove}
          className="spotlight-card flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl lg:col-span-2"
        >
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sky-400">
              <IndianRupee className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              Daily Expenses (₹) with Paise Precision
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              Stored as exact integer paise in SQLite—zero floating-point drift.
              Filter instantly by UPI, Cash, or Card with monthly pacing bars.
            </p>
          </div>

          {/* Mini UI Preview */}
          <div className="mt-6 grid gap-3 rounded-xl border border-white/[0.08] bg-black/40 p-4 sm:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] text-zinc-500">
                INTEGER_PAISE_CONVERSION
              </div>
              <div className="mt-1 font-mono text-sm text-zinc-200">
                ₹1,420.50 → <span className="text-sky-400">142050 paise</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-1.5 flex justify-between font-mono text-[11px] text-zinc-400">
                <span>Monthly Pacing</span>
                <span className="text-sky-400">25%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
              </div>
            </div>
          </div>
        </article>

        {/* Small Card 1: Inbox Triage */}
        <article
          onMouseMove={handleSpotlightMove}
          className="spotlight-card rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-indigo-400">
            <Inbox className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-white">Inbox Triage</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Capture thoughts, links, and voice notes without friction. Route any
            item to Tasks, Calendar, or Library in a single click.
          </p>
        </article>

        {/* Small Card 2: Tasks & Focus */}
        <article
          onMouseMove={handleSpotlightMove}
          className="spotlight-card rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-400">
            <CheckSquare className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-white">Tasks &amp; Focus</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Keyboard-navigable task lists with crisp priorities and due
            dates—zero bloated Kanban boards or team-sprint noise.
          </p>
        </article>

        {/* Small Card 3: Calendar */}
        <article
          onMouseMove={handleSpotlightMove}
          className="spotlight-card rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sky-400">
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-white">Calendar</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Time-block your day alongside your tasks and deadlines inside one
            fast, local-first timeline.
          </p>
        </article>

        {/* Small Card 4: Personal Library */}
        <article
          onMouseMove={handleSpotlightMove}
          className="spotlight-card rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-indigo-400">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-white">Personal Library</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Archive articles, book notes, and technical references in an
            instant, full-text searchable local vault.
          </p>
        </article>

        {/* Flagship 2 (col-span-3 on lg so it anchors cleanly, or col-span-2 + wait: 2+1 + 1+1+1 = 6; let's make Habit Heatmaps lg:col-span-3 or reorder to 2+1, 1+2!) */}
        <article
          onMouseMove={handleSpotlightMove}
          className="spotlight-card flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl sm:flex-row sm:items-center lg:col-span-3"
        >
          <div className="max-w-xl">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-400">
              <Flame className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              Habit Heatmaps &amp; Smart Streaks
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              12-week contribution grids with glowing completion cells and
              forgiving streak logic that preserves Yesterday&apos;s streak
              while Today is still in progress.
            </p>
          </div>

          {/* Mini Glowing Heatmap Preview */}
          <div
            aria-hidden="true"
            className="grid shrink-0 grid-cols-7 gap-1.5 rounded-xl border border-white/[0.08] bg-black/40 p-3.5"
          >
            {[
              1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
            ].map((on, i) => (
              <span
                key={i}
                className={`h-4 w-4 rounded-[4px] border ${
                  on
                    ? "border-sky-400/60 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.35)]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
