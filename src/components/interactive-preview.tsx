"use client";

import React, { useMemo, useState } from "react";
import {
  IndianRupee,
  Inbox,
  Grid3X3,
  Command,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";

type PreviewTab = "expenses" | "inbox" | "habits" | "command";
type PaymentMode = "All" | "UPI" | "Cash" | "Card";
type ExpenseCategory = "Food" | "Travel" | "Hostel/Bills" | "Study";

interface ExpenseItem {
  id: string;
  title: string;
  category: ExpenseCategory;
  mode: Exclude<PaymentMode, "All">;
  paise: number;
  time: string;
}

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "e1",
    title: "Campus Mess & Filter Coffee",
    category: "Food",
    mode: "UPI",
    paise: 18550,
    time: "Today, 09:15",
  },
  {
    id: "e2",
    title: "Metro Smart Card Top-up",
    category: "Travel",
    mode: "UPI",
    paise: 40000,
    time: "Today, 08:30",
  },
  {
    id: "e3",
    title: "Hostel Wi-Fi & Electricity Share",
    category: "Hostel/Bills",
    mode: "Card",
    paise: 54000,
    time: "Yesterday",
  },
  {
    id: "e4",
    title: "Systems Design Printout & Spiral",
    category: "Study",
    mode: "Cash",
    paise: 14500,
    time: "Yesterday",
  },
  {
    id: "e5",
    title: "Fresh Fruit & Midnight Maggi",
    category: "Food",
    mode: "UPI",
    paise: 15000,
    time: "2 days ago",
  },
];

const CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Travel",
  "Hostel/Bills",
  "Study",
];

function formatINR(paise: number): string {
  return (paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

interface InboxItem {
  id: string;
  text: string;
  source: string;
}

const INITIAL_INBOX: InboxItem[] = [
  {
    id: "i1",
    text: "Submit DBMS assignment PDF before 11:59 PM",
    source: "Quick Capture",
  },
  {
    id: "i2",
    text: "Dentist follow-up next Tuesday at 4:30 PM",
    source: "Voice Note",
  },
  {
    id: "i3",
    text: "Read SQLite WAL mode internals & pragma benchmarks",
    source: "Web Clip",
  },
  {
    id: "i4",
    text: "Split ₹540 hostel Wi-Fi bill with Aarav",
    source: "Quick Capture",
  },
];

// Deterministic 12x7 (84 days) initial habit pattern
const INITIAL_HABIT_GRID: boolean[] = Array.from({ length: 84 }, (_, idx) => {
  if (idx >= 77) return true; // active 7-day streak at the end
  return (idx * 7 + (idx % 5)) % 3 !== 0;
});

interface PaletteCommand {
  id: string;
  shortcut: string;
  label: string;
  group: string;
  targetTab?: PreviewTab;
}

const PALETTE_COMMANDS: PaletteCommand[] = [
  {
    id: "c1",
    shortcut: ">",
    label: "Log Expense (₹ INR)",
    group: "Actions",
    targetTab: "expenses",
  },
  {
    id: "c2",
    shortcut: ">",
    label: "New Task",
    group: "Actions",
    targetTab: "inbox",
  },
  {
    id: "c3",
    shortcut: "g e",
    label: "Go to Expenses",
    group: "Navigation",
    targetTab: "expenses",
  },
  {
    id: "c4",
    shortcut: "g h",
    label: "Go to Habits",
    group: "Navigation",
    targetTab: "habits",
  },
  {
    id: "c5",
    shortcut: "g i",
    label: "Go to Inbox Triage",
    group: "Navigation",
    targetTab: "inbox",
  },
  {
    id: "c6",
    shortcut: ">",
    label: "Export .sqlite Snapshot",
    group: "Vault",
  },
];

export function InteractivePreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("expenses");

  // Tab 1: Expenses state
  const [paymentFilter, setPaymentFilter] = useState<PaymentMode>("All");

  // Tab 2: Inbox state
  const [inboxItems, setInboxItems] = useState<InboxItem[]>(INITIAL_INBOX);
  const [triageBanner, setTriageBanner] = useState<string | null>(null);

  // Tab 3: Habit heatmap state
  const [habitCells, setHabitCells] = useState<boolean[]>(INITIAL_HABIT_GRID);

  // Tab 4: Command palette state
  const [cmdQuery, setCmdQuery] = useState("");
  const [cmdFeedback, setCmdFeedback] = useState<string | null>(null);

  const filteredExpenses = useMemo(() => {
    if (paymentFilter === "All") return INITIAL_EXPENSES;
    return INITIAL_EXPENSES.filter((e) => e.mode === paymentFilter);
  }, [paymentFilter]);

  const totalPaise = useMemo(
    () => filteredExpenses.reduce((sum, item) => sum + item.paise, 0),
    [filteredExpenses]
  );

  const categoryTotals = useMemo(() => {
    const map: Record<ExpenseCategory, number> = {
      Food: 0,
      Travel: 0,
      "Hostel/Bills": 0,
      Study: 0,
    };
    for (const item of filteredExpenses) {
      map[item.category] += item.paise;
    }
    return map;
  }, [filteredExpenses]);

  const monthlyBudgetPaise = 500000; // ₹5,000.00 demo weekly/monthly cap
  const pacingPct = Math.min(
    100,
    Math.round((totalPaise / monthlyBudgetPaise) * 100)
  );

  const handleTriage = (item: InboxItem, destination: string) => {
    setInboxItems((prev) => prev.filter((i) => i.id !== item.id));
    setTriageBanner(`Moved "${item.text}" → ${destination}`);
  };

  const resetInbox = () => {
    setInboxItems(INITIAL_INBOX);
    setTriageBanner(null);
  };

  const toggleHabitCell = (index: number) => {
    setHabitCells((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = habitCells.length - 1; i >= 0; i--) {
      if (habitCells[i]) streak++;
      else break;
    }
    return streak;
  }, [habitCells]);

  const completedCount = useMemo(
    () => habitCells.filter(Boolean).length,
    [habitCells]
  );

  const filteredCommands = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    if (!q) return PALETTE_COMMANDS;
    return PALETTE_COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.shortcut.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [cmdQuery]);

  const executeCommand = (cmd: PaletteCommand) => {
    setCmdFeedback(`Executed: ${cmd.label}`);
    if (cmd.targetTab) {
      setActiveTab(cmd.targetTab);
    }
  };

  const tabs: {
    id: PreviewTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "expenses",
      label: "Daily Expenses (₹)",
      icon: <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    {
      id: "inbox",
      label: "Inbox Triage",
      icon: <Inbox className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    {
      id: "habits",
      label: "Habit Heatmap",
      icon: <Grid3X3 className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    {
      id: "command",
      label: "⌘K Palette",
      icon: <Command className="h-3.5 w-3.5" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="preview"
      aria-labelledby="preview-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="mb-8 text-center">
        <h2
          id="preview-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          Click Around Before You Download
        </h2>
        <p
          className="mx-auto mt-2 max-w-2xl text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          An interactive preview of ORBIT&apos;s core modules—styled live with
          whichever theme and mode you selected above.
        </p>
      </div>

      {/* Mock Desktop Window */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Window Titlebar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5"
          style={{
            backgroundColor: "var(--surface-elevated)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              aria-hidden="true"
            />
            <span
              className="h-2.5 w-2.5 rounded-full border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              aria-hidden="true"
            />
            <span
              className="h-2.5 w-2.5 rounded-full border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              aria-hidden="true"
            />
            <span
              className="ml-2 font-mono text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              orbit.sqlite — 0ms local vault
            </span>
          </div>

          <div
            className="rounded border px-2 py-0.5 font-mono text-[11px]"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            Offline Ready
          </div>
        </div>

        {/* Module Switcher Tabs */}
        <div
          role="tablist"
          aria-label="ORBIT workspace modules"
          className="flex flex-wrap gap-1 border-b px-3 py-2"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {tabs.map((t) => {
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(t.id)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: isSelected
                    ? "var(--accent)"
                    : "transparent",
                  borderColor: isSelected ? "var(--accent)" : "transparent",
                  color: isSelected
                    ? "var(--accent-fg)"
                    : "var(--text-secondary)",
                }}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Body */}
        <div className="p-4 sm:p-6">
          {/* 1. Daily Expenses (₹) */}
          {activeTab === "expenses" && (
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Left summary & category breakdown */}
              <div className="space-y-5 lg:col-span-2">
                <div
                  className="rounded-lg border p-4"
                  style={{
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Filtered Total ({paymentFilter})
                  </div>
                  <div
                    className="mt-1 font-mono text-3xl font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ₹{formatINR(totalPaise)}
                  </div>

                  {/* Monthly Budget Pacing Bar */}
                  <div className="mt-4">
                    <div
                      className="mb-1.5 flex items-center justify-between text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span>Budget Pacing</span>
                      <span className="font-mono">
                        {pacingPct}% of ₹{formatINR(monthlyBudgetPaise)}
                      </span>
                    </div>
                    <div
                      className="h-2 w-full overflow-hidden rounded-full border"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${pacingPct}%`,
                          backgroundColor: "var(--accent)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Category Breakdown Bars */}
                <div
                  className="rounded-lg border p-4"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h3
                    className="mb-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Category Breakdown
                  </h3>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => {
                      const amt = categoryTotals[cat];
                      const pct =
                        totalPaise > 0 ? Math.round((amt / totalPaise) * 100) : 0;
                      return (
                        <div key={cat}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span style={{ color: "var(--text-primary)" }}>
                              {cat}
                            </span>
                            <span
                              className="font-mono"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              ₹{formatINR(amt)} ({pct}%)
                            </span>
                          </div>
                          <div
                            className="h-1.5 w-full overflow-hidden rounded-full"
                            style={{ backgroundColor: "var(--surface-elevated)" }}
                          >
                            <div
                              className="h-full transition-all duration-300"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: "var(--accent)",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right ledger + payment mode filter */}
              <div className="lg:col-span-3">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Recent Ledger (Paise Precision)
                  </span>
                  <div
                    role="group"
                    aria-label="Filter by payment mode"
                    className="flex flex-wrap gap-1"
                  >
                    {(["All", "UPI", "Cash", "Card"] as PaymentMode[]).map(
                      (mode) => {
                        const active = paymentFilter === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setPaymentFilter(mode)}
                            className="cursor-pointer rounded border px-2.5 py-1 font-mono text-xs font-medium transition-colors"
                            style={{
                              backgroundColor: active
                                ? "var(--accent)"
                                : "var(--surface-elevated)",
                              borderColor: active
                                ? "var(--accent)"
                                : "var(--border)",
                              color: active
                                ? "var(--accent-fg)"
                                : "var(--text-primary)",
                            }}
                          >
                            {mode}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div
                  className="divide-y rounded-lg border"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--surface)",
                  }}
                >
                  {filteredExpenses.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="min-w-0">
                        <div
                          className="truncate text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="mt-0.5 flex items-center gap-2 text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span>{item.category}</span>
                          <span>·</span>
                          <span className="font-mono">{item.mode}</span>
                          <span>·</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <div
                        className="shrink-0 font-mono text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        ₹{formatINR(item.paise)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Inbox & One-Click Triage */}
          {activeTab === "inbox" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Inbox Queue ({inboxItems.length} remaining)
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Click any destination button to triage an item in one
                    keystroke or click.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetInbox}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-[var(--surface-elevated)]"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Demo Inbox</span>
                </button>
              </div>

              {triageBanner && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--accent)",
                    color: "var(--text-primary)",
                  }}
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--success)" }}
                    aria-hidden="true"
                  />
                  <span>{triageBanner}</span>
                </div>
              )}

              {inboxItems.length === 0 ? (
                <div
                  className="rounded-lg border p-8 text-center"
                  style={{
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Sparkles
                    className="mx-auto mb-2 h-6 w-6"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Inbox Zero Achieved
                  </div>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Every captured thought has been routed. Hit Reset Demo Inbox
                    to test again.
                  </p>
                </div>
              ) : (
                <div
                  className="divide-y rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  {inboxItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.text}
                        </div>
                        <div
                          className="mt-0.5 font-mono text-[11px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Source: {item.source}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-1.5">
                        {(["Task", "Calendar", "Library"] as const).map(
                          (dest) => (
                            <button
                              key={dest}
                              type="button"
                              onClick={() => handleTriage(item, dest)}
                              className="inline-flex cursor-pointer items-center gap-1 rounded border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
                              style={{
                                backgroundColor: "var(--surface-elevated)",
                                borderColor: "var(--border)",
                                color: "var(--text-primary)",
                              }}
                            >
                              <ArrowRight
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              <span>{dest}</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Habit Heatmap */}
          {activeTab === "habits" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Deep Work &amp; Reading — 12-Week Grid
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Click any day cell to toggle completion and watch your
                    streak update live.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="rounded-lg border px-3 py-1.5 text-center"
                    style={{
                      backgroundColor: "var(--surface-elevated)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-wider"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Current Streak
                    </div>
                    <div
                      className="font-mono text-base font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {currentStreak}d
                    </div>
                  </div>
                  <div
                    className="rounded-lg border px-3 py-1.5 text-center"
                    style={{
                      backgroundColor: "var(--surface-elevated)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-wider"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      12-Wk Total
                    </div>
                    <div
                      className="font-mono text-base font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {completedCount}/84
                    </div>
                  </div>
                </div>
              </div>

              {/* 12 columns x 7 rows */}
              <div
                className="overflow-x-auto rounded-lg border p-4"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="grid w-fit grid-flow-col grid-rows-7 gap-1.5"
                  role="grid"
                  aria-label="12-week habit completion grid"
                >
                  {habitCells.map((done, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleHabitCell(idx)}
                      aria-pressed={done}
                      aria-label={`Day ${idx + 1}: ${
                        done ? "Completed" : "Incomplete"
                      }`}
                      className="h-5 w-5 cursor-pointer rounded-[4px] border transition-transform hover:scale-110 sm:h-6 sm:w-6"
                      style={{
                        backgroundColor: done
                          ? "var(--accent)"
                          : "var(--surface)",
                        borderColor: done
                          ? "var(--accent)"
                          : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. ⌘K Command Palette */}
          {activeTab === "command" && (
            <div className="mx-auto max-w-xl space-y-3">
              <div
                className="overflow-hidden rounded-lg border"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="flex items-center gap-2 border-b px-3.5 py-2.5"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Search
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--text-secondary)" }}
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={cmdQuery}
                    onChange={(e) => setCmdQuery(e.target.value)}
                    placeholder="Type a command or chord (e.g. 'expense', 'g h')..."
                    aria-label="Filter ORBIT commands"
                    className="w-full bg-transparent text-sm outline-none"
                    style={{ color: "var(--text-primary)" }}
                  />
                  <kbd
                    className="rounded border px-1.5 py-0.5 font-mono text-[10px]"
                    style={{
                      backgroundColor: "var(--surface-elevated)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ⌘K
                  </kbd>
                </div>

                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {filteredCommands.length === 0 ? (
                    <div
                      className="px-4 py-6 text-center text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      No matching commands. Try &ldquo;Log&rdquo; or &ldquo;g
                      e&rdquo;.
                    </div>
                  ) : (
                    filteredCommands.map((cmd) => (
                      <button
                        key={cmd.id}
                        type="button"
                        onClick={() => executeCommand(cmd)}
                        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--surface-hover)]"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <kbd
                            className="rounded border px-1.5 py-0.5 font-mono text-[11px] font-semibold"
                            style={{
                              backgroundColor: "var(--surface)",
                              borderColor: "var(--border)",
                              color: "var(--accent)",
                            }}
                          >
                            {cmd.shortcut}
                          </kbd>
                          <span style={{ color: "var(--text-primary)" }}>
                            {cmd.label}
                          </span>
                        </div>
                        <span
                          className="font-mono text-[11px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {cmd.group}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {cmdFeedback && (
                <div
                  role="status"
                  className="rounded-md border px-3 py-2 font-mono text-xs"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--accent)",
                    color: "var(--text-primary)",
                  }}
                >
                  ✓ {cmdFeedback}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
