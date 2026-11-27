"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  IndianRupee,
  Inbox,
  Plus,
  RotateCcw,
  Sparkles,
  Stars,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

type PaymentMode = "UPI" | "Cash" | "Card";

interface SpendEntry {
  id: string;
  label: string;
  paise: number;
  mode: PaymentMode;
}

interface ConstellationHabit {
  id: string;
  constellation: string;
  name: string;
  streak: number;
  doneToday: boolean;
}

interface InboxThought {
  id: string;
  text: string;
  triagedTo?: "Tasks" | "Calendar" | "Library";
}

const INITIAL_SPENDS: SpendEntry[] = [
  { id: "s1", label: "Cutting Chai", paise: 4500, mode: "UPI" },
  { id: "s2", label: "Metro Card", paise: 42000, mode: "Card" },
  { id: "s3", label: "Technical Book", paise: 125000, mode: "UPI" },
];

const INITIAL_CONSTELLATIONS: ConstellationHabit[] = [
  { id: "c1", constellation: "LYRA", name: "Zero Sugar & Hydration", streak: 12, doneToday: true },
  { id: "c2", constellation: "ORION", name: "Deep Work (90m)", streak: 20, doneToday: false },
  { id: "c3", constellation: "CASSIOPEIA", name: "Evening Reading", streak: 9, doneToday: false },
];

const INITIAL_INBOX: InboxThought[] = [
  { id: "i1", text: "Review weekly ₹ expense ledger" },
  { id: "i2", text: "Deep Work Sprint: Architecture" },
  { id: "i3", text: "Chapter 4: Designing Data-Intensive Apps" },
];

const MODULE_CHORDS = [
  { name: "Home", chord: "g d" },
  { name: "Inbox", chord: "g i" },
  { name: "Tasks", chord: "g t" },
  { name: "Calendar", chord: "g c" },
  { name: "Habits", chord: "g h" },
  { name: "Expenses", chord: "g e" },
  { name: "Library", chord: "g l" },
  { name: "Insights", chord: "⌘ K" },
];

function formatINR(paise: number): string {
  const rupees = paise / 100;
  const hasPaise = paise % 100 !== 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}

export function InteractivePreview() {
  const [spends, setSpends] = useState<SpendEntry[]>(INITIAL_SPENDS);
  const [spendLabel, setSpendLabel] = useState("");
  const [spendAmount, setSpendAmount] = useState("");
  const [spendMode, setSpendMode] = useState<PaymentMode>("UPI");

  const [habits, setHabits] = useState<ConstellationHabit[]>(INITIAL_CONSTELLATIONS);
  const [inbox, setInbox] = useState<InboxThought[]>(INITIAL_INBOX);

  const monthlyBudgetPaise = 1500000; // ₹15,000
  const baseMonthPaise = 142000; // ₹1,420 earlier in month
  const totalMonthPaise = useMemo(
    () => baseMonthPaise + spends.reduce((acc, s) => acc + s.paise, 0),
    [spends]
  );
  const budgetPercent = Math.min(
    100,
    Math.round((totalMonthPaise / monthlyBudgetPaise) * 100)
  );

  function addSpend(label: string, rupees: number, mode: PaymentMode) {
    const paise = Math.round(rupees * 100);
    if (!label.trim() || paise <= 0) return;
    setSpends((prev) => [
      { id: `${Date.now()}`, label: label.trim(), paise, mode },
      ...prev.slice(0, 3),
    ]);
  }

  function handleCustomSpendSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = parseFloat(spendAmount);
    if (!spendLabel.trim() || Number.isNaN(num) || num <= 0) return;
    addSpend(spendLabel, num, spendMode);
    setSpendLabel("");
    setSpendAmount("");
  }

  function toggleConstellation(id: string) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              doneToday: !h.doneToday,
              streak: h.doneToday ? Math.max(0, h.streak - 1) : h.streak + 1,
            }
          : h
      )
    );
  }

  function triageItem(id: string, target: "Tasks" | "Calendar" | "Library") {
    setInbox((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, triagedTo: target } : item
      )
    );
  }

  function resetSandbox() {
    setSpends(INITIAL_SPENDS);
    setHabits(INITIAL_CONSTELLATIONS);
    setInbox(INITIAL_INBOX);
    setSpendLabel("");
    setSpendAmount("");
  }

  const completedHabitsCount = habits.filter((h) => h.doneToday).length;

  return (
    <section
      id="sandbox"
      aria-labelledby="sandbox-heading"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20"
    >
      <ScrollReveal>
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 text-xs font-medium text-stone-700 shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Interactive Live Sandbox</span>
            </div>
            <h2
              id="sandbox-heading"
              className="mt-3 font-serif text-2xl font-medium tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50"
            >
              Try the 0ms Local Engine Live
            </h2>
            <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-300">
              Zero network roundtrips—test ORBIT&apos;s integer-paise expense
              ledger, Star Constellation habits, and 1-click Inbox triage right
              here.
            </p>
          </div>

          <button
            type="button"
            onClick={resetSandbox}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer shrink-0 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Sandbox</span>
          </button>
        </div>
      </ScrollReveal>

      {/* 3-Card Live Engine Workbench */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Widget 1: ₹ INR Expense Engine */}
        <ScrollReveal delayMs={0}>
          <div
            className="flex h-full flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    ₹ INR Expense Pacing
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {formatINR(totalMonthPaise)} / ₹15,000
                </span>
              </div>

              {/* Monthly Allowance Bar */}
              <div className="space-y-1.5">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100 border border-stone-200 dark:bg-stone-950 dark:border-stone-800">
                  <div
                    className="h-full bg-emerald-700 transition-all duration-300 dark:bg-emerald-500"
                    style={{ width: `${budgetPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 dark:text-stone-400">
                  <span>{budgetPercent}% of monthly allowance</span>
                  <span>0ms integer paise</span>
                </div>
              </div>

              {/* 1-Tap Preset Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Chai", rupees: 45, mode: "UPI" as const },
                  { label: "Metro", rupees: 60, mode: "Card" as const },
                  { label: "Groceries", rupees: 320, mode: "UPI" as const },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => addSpend(preset.label, preset.rupees, preset.mode)}
                    className="inline-flex min-h-[34px] items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200 dark:hover:bg-stone-800"
                  >
                    <Plus className="h-3 w-3 text-amber-600" />
                    <span>{preset.label}</span>
                    <span className="font-mono text-[11px] text-stone-500">
                      ₹{preset.rupees}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Form */}
              <form onSubmit={handleCustomSpendSubmit} className="flex gap-1.5">
                <input
                  type="text"
                  value={spendLabel}
                  onChange={(e) => setSpendLabel(e.target.value)}
                  placeholder="Item (e.g. Lunch)"
                  className="min-w-0 flex-1 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                />
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  placeholder="₹"
                  className="w-16 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5 text-xs font-mono text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                />
                <select
                  aria-label="Payment mode"
                  value={spendMode}
                  onChange={(e) => setSpendMode(e.target.value as PaymentMode)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-1.5 py-1.5 text-[11px] font-semibold text-stone-700 focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
                >
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                </select>
                <button
                  type="submit"
                  className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-stone-50 hover:bg-stone-800 cursor-pointer dark:bg-stone-100 dark:text-stone-900"
                >
                  Log
                </button>
              </form>
            </div>

            {/* Latest 3 Entries */}
            <div className="mt-4 space-y-1.5 border-t border-stone-200 pt-3 dark:border-stone-800">
              {spends.slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate font-medium text-stone-800 dark:text-stone-200">
                      {s.label}
                    </span>
                    <span className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                      {s.mode}
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 shrink-0">
                    {formatINR(s.paise)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Widget 2: Living Star Constellation Habits */}
        <ScrollReveal delayMs={60}>
          <div
            className="flex h-full flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <Stars className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Living Star Constellations
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                  {completedHabitsCount}/{habits.length} Aligned
                </span>
              </div>

              <div className="space-y-2.5">
                {habits.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] font-semibold tracking-wider text-indigo-600 dark:text-indigo-400">
                        {h.constellation} · {h.streak} NIGHTS
                      </div>
                      <div className="truncate text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {h.name}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleConstellation(h.id)}
                      aria-pressed={h.doneToday}
                      aria-label={`Toggle ${h.name}`}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
                        h.doneToday
                          ? "border-indigo-500 bg-indigo-600 text-white shadow-sm"
                          : "border-stone-300 bg-white text-stone-600 hover:border-indigo-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                      }`}
                    >
                      <Plus
                        className={`h-4 w-4 transition-transform ${
                          h.doneToday ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 border-t border-stone-200 pt-3 text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-400">
              In Midnight Observatory, habits light up Lyra, Orion &amp;
              Cassiopeia nodes; in Conservatory, they fill 180-day heatmaps.
            </p>
          </div>
        </ScrollReveal>

        {/* Widget 3: One-Click Inbox Triage */}
        <ScrollReveal delayMs={120}>
          <div
            className="flex h-full flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    1-Click Inbox Triage
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                  {inbox.filter((i) => !i.triagedTo).length} pending
                </span>
              </div>

              <div className="space-y-2.5">
                {inbox.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-medium ${
                          item.triagedTo
                            ? "text-stone-400 line-through"
                            : "text-stone-800 dark:text-stone-100"
                        }`}
                      >
                        {item.text}
                      </span>
                      {item.triagedTo && (
                        <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                          → {item.triagedTo}
                        </span>
                      )}
                    </div>

                    {!item.triagedTo && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => triageItem(item.id, "Tasks")}
                          className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 cursor-pointer dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
                        >
                          <CheckSquare className="h-3 w-3 text-amber-600" />
                          <span>Tasks</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => triageItem(item.id, "Calendar")}
                          className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 cursor-pointer dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
                        >
                          <Calendar className="h-3 w-3 text-indigo-600" />
                          <span>Calendar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => triageItem(item.id, "Library")}
                          className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 cursor-pointer dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
                        >
                          <BookOpen className="h-3 w-3 text-emerald-600" />
                          <span>Library</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 border-t border-stone-200 pt-3 text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-400">
              Every triage writes optimistically to IndexedDB in 0ms and queues
              SQLite sync in the background.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Real Sidebar Modules & Navigation Chords Reference Strip */}
      <ScrollReveal delayMs={160}>
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900"
          style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
        >
          <span className="mr-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Real Modules &amp; Chords:
          </span>
          {MODULE_CHORDS.map((mod) => (
            <span
              key={mod.name}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
            >
              <span className="font-medium">{mod.name}</span>
              <kbd className="rounded bg-stone-200/80 px-1.5 py-0.5 font-mono text-[10px] font-bold text-stone-800 dark:bg-stone-800 dark:text-amber-300">
                {mod.chord}
              </kbd>
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
