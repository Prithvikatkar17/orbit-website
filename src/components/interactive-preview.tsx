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
  Plus,
  Trash2,
  Database,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { CrosshairCorners, SectionHeader } from "./section-header";
import { PreviewTab, useWorkspace } from "./workspace-context";

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

function parseRupeesToPaise(raw: string): number | null {
  const cleaned = raw.trim();
  if (!cleaned) return null;
  const num = Number(cleaned);
  if (!Number.isFinite(num) || num <= 0) return null;
  return Math.round(num * 100);
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
  const { activeTab, setActiveTab, commandInputRef, setLastChord } =
    useWorkspace();

  // Tab 1: Expenses state
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [paymentFilter, setPaymentFilter] = useState<PaymentMode>("All");
  const [newTitle, setNewTitle] = useState("Filter Coffee");
  const [newAmount, setNewAmount] = useState("45.50");
  const [newCategory, setNewCategory] = useState<ExpenseCategory>("Food");
  const [newMode, setNewMode] = useState<Exclude<PaymentMode, "All">>("UPI");

  // Tab 2: Inbox state
  const [inboxItems, setInboxItems] = useState<InboxItem[]>(INITIAL_INBOX);
  const [triageBanner, setTriageBanner] = useState<string | null>(null);

  // Tab 3: Habit heatmap state
  const [habitCells, setHabitCells] = useState<boolean[]>(INITIAL_HABIT_GRID);

  // Tab 4: Command palette state
  const [cmdQuery, setCmdQuery] = useState("");
  const [cmdFeedback, setCmdFeedback] = useState<string | null>(null);

  // Live SQLite WAL query log drawer
  const [sqlDrawerOpen, setSqlDrawerOpen] = useState(true);
  const [sqlLog, setSqlLog] = useState(
    "SELECT id, title, paise, mode FROM expenses ORDER BY created_at DESC LIMIT 5; -- 0.09ms (WAL)"
  );

  const previewPaise = useMemo(() => parseRupeesToPaise(newAmount), [newAmount]);

  const filteredExpenses = useMemo(() => {
    if (paymentFilter === "All") return expenses;
    return expenses.filter((e) => e.mode === paymentFilter);
  }, [expenses, paymentFilter]);

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

  const monthlyBudgetPaise = 500000; // ₹5,000.00 demo cap
  const pacingPct = Math.min(
    100,
    Math.round((totalPaise / monthlyBudgetPaise) * 100)
  );

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title || !previewPaise) return;
    const item: ExpenseItem = {
      id: `e-${Date.now()}`,
      title,
      category: newCategory,
      mode: newMode,
      paise: previewPaise,
      time: "Just now",
    };
    setExpenses((prev) => [item, ...prev]);
    const safeSqlTitle = title.replace(/'/g, "''");
    setSqlLog(
      `INSERT INTO expenses (title, paise, mode) VALUES ('${safeSqlTitle}', ${previewPaise}, '${newMode}'); -- 0.08ms (WAL)`
    );
    setCmdFeedback(
      `Logged "${title}" (₹${formatINR(previewPaise)} · ${previewPaise} paise) in 0.08ms`
    );
    setNewTitle("");
    setNewAmount("");
  };

  const handleDeleteExpense = (item: ExpenseItem) => {
    setExpenses((prev) => prev.filter((e) => e.id !== item.id));
    setSqlLog(
      `DELETE FROM expenses WHERE id = '${item.id}'; -- 0.05ms (WAL)`
    );
  };

  const handleResetExpenses = () => {
    setExpenses(INITIAL_EXPENSES);
    setPaymentFilter("All");
    setSqlLog(
      "ROLLBACK TO SAVEPOINT demo_expenses; SELECT COUNT(*) FROM expenses; -- 0.07ms (WAL)"
    );
  };

  const handleTriage = (item: InboxItem, destination: string) => {
    setInboxItems((prev) => prev.filter((i) => i.id !== item.id));
    setTriageBanner(`Moved "${item.text}" → ${destination}`);
    setSqlLog(
      `UPDATE inbox SET status = 'triaged', target = '${destination.toLowerCase()}' WHERE id = '${item.id}'; -- 0.06ms (WAL)`
    );
  };

  const resetInbox = () => {
    setInboxItems(INITIAL_INBOX);
    setTriageBanner(null);
    setSqlLog("SELECT id, text, source FROM inbox WHERE status = 'open'; -- 0.04ms (WAL)");
  };

  const toggleHabitCell = (index: number) => {
    const nextVal = !habitCells[index];
    setHabitCells((prev) => {
      const next = [...prev];
      next[index] = nextVal;
      return next;
    });
    setSqlLog(
      `UPDATE habits SET completed = ${nextVal ? 1 : 0} WHERE day_idx = ${index}; -- 0.05ms (WAL)`
    );
  };

  // Fixed streak logic: if Day 84 (Today) is unchecked, count from Day 83 (Yesterday)
  const currentStreak = useMemo(() => {
    const lastIdx = habitCells.length - 1;
    let startIdx = lastIdx;
    if (!habitCells[lastIdx]) {
      if (lastIdx > 0 && habitCells[lastIdx - 1]) {
        startIdx = lastIdx - 1;
      } else {
        return 0;
      }
    }
    let streak = 0;
    for (let i = startIdx; i >= 0; i--) {
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
    setCmdFeedback(`Executed: ${cmd.label} (0.12ms)`);
    setLastChord({
      keys: cmd.shortcut === ">" ? "[⌘K]" : `[${cmd.shortcut}]`,
      detail: `${cmd.label} in 0.12ms`,
    });
    setSqlLog(
      `PRAGMA quick_check; -- Command '${cmd.label}' dispatched in 0.12ms (WAL)`
    );
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
      <SectionHeader
        indexLabel="[01 // INTERACTIVE_VAULT]"
        headingId="preview-heading"
        title="Click Around Before You Download"
        subtitle="An interactive preview of ORBIT's core modules—styled live with whichever theme and mode you selected above."
      />

      {/* Mock Desktop Window */}
      <div className="relative rounded-xl border border-border bg-surface">
        <CrosshairCorners />

        {/* Window Titlebar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border-b border-border bg-surface-elevated px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full border border-border bg-surface"
              aria-hidden="true"
            />
            <span
              className="h-2.5 w-2.5 rounded-full border border-border bg-surface"
              aria-hidden="true"
            />
            <span
              className="h-2.5 w-2.5 rounded-full border border-border bg-surface"
              aria-hidden="true"
            />
            <span className="ml-2 font-mono text-xs font-medium text-text-secondary">
              orbit.sqlite — 0ms local vault
            </span>
          </div>

          <div className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-text-secondary">
            WAL Mode · Offline Ready
          </div>
        </div>

        {/* Module Switcher Tabs */}
        <div
          role="tablist"
          aria-label="ORBIT workspace modules"
          className="flex flex-wrap gap-1 border-b border-border bg-surface px-3 py-2"
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
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-transparent bg-transparent text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                }`}
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
                <div className="rounded-lg border border-border bg-surface-elevated p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Filtered Total ({paymentFilter})
                  </div>
                  <div className="mt-1 font-mono text-3xl font-bold tracking-tight text-text-primary">
                    ₹{formatINR(totalPaise)}
                  </div>

                  {/* Monthly Budget Pacing Bar */}
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-text-secondary">
                      <span>Budget Pacing</span>
                      <span className="font-mono">
                        {pacingPct}% of ₹{formatINR(monthlyBudgetPaise)}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full border border-border bg-surface">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${pacingPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Category Breakdown Bars */}
                <div className="rounded-lg border border-border bg-surface p-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Category Breakdown
                  </h3>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => {
                      const amt = categoryTotals[cat];
                      const pct =
                        totalPaise > 0
                          ? Math.round((amt / totalPaise) * 100)
                          : 0;
                      return (
                        <div key={cat}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-text-primary">{cat}</span>
                            <span className="font-mono text-text-secondary">
                              ₹{formatINR(amt)} ({pct}%)
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                            <div
                              className="h-full bg-accent transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Quick-Add + Ledger */}
              <div className="space-y-4 lg:col-span-3">
                {/* Quick-Add Expense Form & Paise Inspector */}
                <form
                  onSubmit={handleAddExpense}
                  className="rounded-lg border border-border bg-surface-elevated p-3.5"
                >
                  <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                      Quick-Add Expense
                    </span>
                    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-text-primary">
                      {previewPaise !== null
                        ? `₹${formatINR(previewPaise)} → ${previewPaise} paise · IEEE-754 float-bug free`
                        : "Enter amount > 0 to inspect integer paise"}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-12">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Expense title (e.g. Filter Coffee)"
                      aria-label="Expense title"
                      className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent sm:col-span-4"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="₹ Amount"
                      aria-label="Expense amount in rupees"
                      className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-text-primary outline-none focus:border-accent sm:col-span-2"
                    />
                    <select
                      value={newCategory}
                      onChange={(e) =>
                        setNewCategory(e.target.value as ExpenseCategory)
                      }
                      aria-label="Expense category"
                      className="rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-text-primary outline-none focus:border-accent sm:col-span-3"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <select
                      value={newMode}
                      onChange={(e) =>
                        setNewMode(
                          e.target.value as Exclude<PaymentMode, "All">
                        )
                      }
                      aria-label="Payment mode"
                      className="rounded-md border border-border bg-surface px-2 py-1.5 font-mono text-xs text-text-primary outline-none focus:border-accent sm:col-span-2"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                    </select>
                    <button
                      type="submit"
                      disabled={!newTitle.trim() || previewPaise === null}
                      aria-label="Add expense"
                      className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-md border border-accent bg-accent px-2.5 py-1.5 text-xs font-semibold text-accent-fg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-1"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </form>

                {/* Ledger Header & Payment Mode Filter */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Recent Ledger
                    </span>
                    <button
                      type="button"
                      onClick={handleResetExpenses}
                      className="inline-flex cursor-pointer items-center gap-1 rounded border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
                    >
                      <RotateCcw className="h-3 w-3" aria-hidden="true" />
                      <span>Reset</span>
                    </button>
                  </div>
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
                            className={`cursor-pointer rounded border px-2.5 py-1 font-mono text-xs font-medium transition-colors ${
                              active
                                ? "border-accent bg-accent text-accent-fg"
                                : "border-border bg-surface-elevated text-text-primary hover:bg-surface-hover"
                            }`}
                          >
                            {mode}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Expense List */}
                <div className="divide-y divide-border rounded-lg border border-border bg-surface">
                  {filteredExpenses.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-text-secondary">
                      No expenses in this filter. Add one above or click Reset.
                    </div>
                  ) : (
                    filteredExpenses.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-text-primary">
                            {item.title}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-text-secondary">
                            <span>{item.category}</span>
                            <span>·</span>
                            <span className="font-mono">{item.mode}</span>
                            <span>·</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="font-mono text-sm font-semibold text-text-primary">
                            ₹{formatINR(item.paise)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteExpense(item)}
                            aria-label={`Delete ${item.title}`}
                            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-transparent text-text-secondary transition-colors hover:border-border hover:bg-surface-elevated hover:text-text-primary"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Inbox & One-Click Triage */}
          {activeTab === "inbox" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Inbox Queue ({inboxItems.length} remaining)
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Click any destination button to triage an item in one
                    keystroke or click.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetInbox}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-surface-elevated"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Demo Inbox</span>
                </button>
              </div>

              {triageBanner && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-lg border border-accent bg-surface-elevated px-3.5 py-2.5 text-xs font-medium text-text-primary"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  <span>{triageBanner}</span>
                </div>
              )}

              {inboxItems.length === 0 ? (
                <div className="rounded-lg border border-border bg-surface-elevated p-8 text-center">
                  <Sparkles
                    className="mx-auto mb-2 h-6 w-6 text-accent"
                    aria-hidden="true"
                  />
                  <div className="text-sm font-semibold text-text-primary">
                    Inbox Zero Achieved
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    Every captured thought has been routed. Hit Reset Demo Inbox
                    to test again.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border rounded-lg border border-border">
                  {inboxItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {item.text}
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] text-text-secondary">
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
                              className="inline-flex cursor-pointer items-center gap-1 rounded border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg"
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
                  <h3 className="text-sm font-semibold text-text-primary">
                    Deep Work &amp; Reading — 12-Week Grid
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Click any day cell to toggle completion. Unchecking Today
                    preserves your active streak from Yesterday.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-text-secondary">
                      Current Streak
                    </div>
                    <div className="font-mono text-base font-bold text-text-primary">
                      {currentStreak}d
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-text-secondary">
                      12-Wk Total
                    </div>
                    <div className="font-mono text-base font-bold text-text-primary">
                      {completedCount}/84
                    </div>
                  </div>
                </div>
              </div>

              {/* 12 columns x 7 rows */}
              <div className="overflow-x-auto rounded-lg border border-border bg-surface-elevated p-4">
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
                      className={`h-5 w-5 cursor-pointer rounded-[4px] border transition-transform hover:scale-110 sm:h-6 sm:w-6 ${
                        done
                          ? "border-accent bg-accent"
                          : "border-border bg-surface hover:bg-surface-hover"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. ⌘K Command Palette */}
          {activeTab === "command" && (
            <div className="mx-auto max-w-xl space-y-3">
              <div className="overflow-hidden rounded-lg border border-border bg-surface-elevated">
                <div className="flex items-center gap-2 border-b border-border bg-surface px-3.5 py-2.5">
                  <Search
                    className="h-4 w-4 shrink-0 text-text-secondary"
                    aria-hidden="true"
                  />
                  <input
                    ref={commandInputRef}
                    type="text"
                    value={cmdQuery}
                    onChange={(e) => setCmdQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && filteredCommands.length > 0) {
                        e.preventDefault();
                        executeCommand(filteredCommands[0]);
                      }
                    }}
                    placeholder="Type a command or chord (e.g. 'expense', 'g h')..."
                    aria-label="Filter ORBIT commands"
                    className="w-full bg-transparent text-sm text-text-primary outline-none"
                  />
                  <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                    ⌘K
                  </kbd>
                </div>

                <div className="divide-y divide-border">
                  {filteredCommands.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-text-secondary">
                      No matching commands. Try &ldquo;Log&rdquo; or &ldquo;g
                      e&rdquo;.
                    </div>
                  ) : (
                    filteredCommands.map((cmd) => (
                      <button
                        key={cmd.id}
                        type="button"
                        onClick={() => executeCommand(cmd)}
                        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-hover"
                      >
                        <div className="flex items-center gap-2.5">
                          <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                            {cmd.shortcut}
                          </kbd>
                          <span className="text-text-primary">{cmd.label}</span>
                        </div>
                        <span className="font-mono text-[11px] text-text-secondary">
                          {cmd.group}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Window Footer Bar: Persistent Command Toast + Live SQLite WAL Query Log Drawer */}
        <div className="rounded-b-xl border-t border-border bg-surface-elevated">
          {cmdFeedback && (
            <div
              role="status"
              className="flex items-center justify-between gap-2 border-b border-border bg-surface px-4 py-2 font-mono text-xs text-text-primary"
            >
              <span>✓ {cmdFeedback}</span>
              <button
                type="button"
                onClick={() => setCmdFeedback(null)}
                className="cursor-pointer text-[11px] text-text-secondary hover:text-text-primary"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="px-4 py-2">
            <button
              type="button"
              onClick={() => setSqlDrawerOpen((prev) => !prev)}
              aria-expanded={sqlDrawerOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-2 text-left font-mono text-[11px] text-text-secondary hover:text-text-primary"
            >
              <span className="inline-flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span className="font-semibold text-text-primary">
                  SQLite WAL Query Log
                </span>
              </span>
              {sqlDrawerOpen ? (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>

            {sqlDrawerOpen && (
              <div className="mt-1.5 overflow-x-auto rounded border border-border bg-surface px-3 py-2 font-mono text-xs text-text-primary">
                <span className="mr-2 select-none text-accent">sqlite&gt;</span>
                <span>{sqlLog}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
