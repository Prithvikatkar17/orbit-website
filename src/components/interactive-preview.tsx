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
} from "lucide-react";

type PreviewTab = "expenses" | "inbox" | "habits" | "command";
type PaymentMode = "All" | "UPI" | "Cash" | "Card";

interface ExpenseItem {
  id: string;
  title: string;
  category: string;
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

const INITIAL_HABIT_GRID: boolean[] = Array.from({ length: 84 }, (_, idx) => {
  if (idx >= 77) return true;
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

  // Expenses
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [paymentFilter, setPaymentFilter] = useState<PaymentMode>("All");
  const [newTitle, setNewTitle] = useState("Filter Coffee");
  const [newAmount, setNewAmount] = useState("45.50");

  // Inbox
  const [inboxItems, setInboxItems] = useState<InboxItem[]>(INITIAL_INBOX);
  const [triageBanner, setTriageBanner] = useState<string | null>(null);

  // Habits
  const [habitCells, setHabitCells] = useState<boolean[]>(INITIAL_HABIT_GRID);

  // Command palette
  const [cmdQuery, setCmdQuery] = useState("");
  const [cmdFeedback, setCmdFeedback] = useState<string | null>(null);

  // Minimal 1-line SQLite ticker
  const [sqlLog, setSqlLog] = useState(
    "SELECT id, title, paise, mode FROM expenses ORDER BY created_at DESC LIMIT 4; -- 0.08ms (WAL)"
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

  const monthlyBudgetPaise = 500000;
  const pacingPct = Math.min(
    100,
    Math.round((totalPaise / monthlyBudgetPaise) * 100)
  );

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title || !previewPaise) return;
    const mode: Exclude<PaymentMode, "All"> =
      paymentFilter === "All" ? "UPI" : paymentFilter;
    const item: ExpenseItem = {
      id: `e-${Date.now()}`,
      title,
      category: "Quick Add",
      mode,
      paise: previewPaise,
      time: "Just now",
    };
    setExpenses((prev) => [item, ...prev]);
    const safeTitle = title.replace(/'/g, "''");
    setSqlLog(
      `INSERT INTO expenses (title, paise, mode) VALUES ('${safeTitle}', ${previewPaise}, '${mode}'); -- 0.08ms (WAL)`
    );
    setCmdFeedback(
      `Logged "${title}" (₹${formatINR(previewPaise)} · ${previewPaise} paise)`
    );
    setNewTitle("");
    setNewAmount("");
  };

  const handleDeleteExpense = (item: ExpenseItem) => {
    setExpenses((prev) => prev.filter((e) => e.id !== item.id));
    setSqlLog(`DELETE FROM expenses WHERE id = '${item.id}'; -- 0.05ms (WAL)`);
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
    setSqlLog(
      "SELECT id, text, source FROM inbox WHERE status = 'open'; -- 0.04ms (WAL)"
    );
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

  // Preserve Yesterday's streak if Today (Day 84) is unchecked
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
    setSqlLog(
      `PRAGMA quick_check; -- Command '${cmd.label}' dispatched in 0.12ms (WAL)`
    );
    if (cmd.targetTab) {
      setActiveTab(cmd.targetTab);
    }
  };

  const navItems: {
    id: PreviewTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "expenses",
      label: "Daily Expenses (₹)",
      icon: <IndianRupee className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "inbox",
      label: "Inbox Triage",
      icon: <Inbox className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "habits",
      label: "Habit Heatmap",
      icon: <Grid3X3 className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: "command",
      label: "⌘K Command Palette",
      icon: <Command className="h-4 w-4" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="preview"
      aria-labelledby="preview-heading"
      className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pb-32"
    >
      <h2 id="preview-heading" className="sr-only">
        Interactive ORBIT Workspace Preview
      </h2>

      {/* Top Specular Highlight Line */}
      <div
        aria-hidden="true"
        className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
      />

      {/* Double-layered Frosted Glass Bezel */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2 shadow-[0_25px_100px_-20px_rgba(56,189,248,0.18)] backdrop-blur-2xl sm:p-3">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#09090e]/90">
          {/* App Window Titlebar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-xs text-zinc-400">
                ORBIT Workspace
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>orbit.sqlite · WAL · 0.08ms</span>
            </div>
          </div>

          {/* OS Sidebar + Main Stage */}
          <div className="grid md:grid-cols-[220px_1fr]">
            {/* Left Glass Sidebar */}
            <aside className="border-b border-white/[0.08] bg-white/[0.02] p-3 md:border-b-0 md:border-r">
              <div
                role="tablist"
                aria-label="ORBIT workspace modules"
                className="flex gap-1.5 overflow-x-auto md:flex-col"
              >
                {navItems.map((item) => {
                  const selected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                        selected
                          ? "border border-white/15 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                          : "border border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                      }`}
                    >
                      <span
                        className={selected ? "text-sky-400" : "text-zinc-500"}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 hidden rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 md:block">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Engine Status
                </div>
                <div className="mt-1.5 flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>0ms Local Vault</span>
                </div>
              </div>
            </aside>

            {/* Main Interactive Stage */}
            <div className="min-h-[420px] p-5 sm:p-7">
              {/* 1. Daily Expenses (₹) */}
              {activeTab === "expenses" && (
                <div className="space-y-6">
                  {/* 3 Glass Stat Cards */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs font-medium text-zinc-400">
                        Monthly Spend ({paymentFilter})
                      </div>
                      <div className="mt-1.5 font-mono text-2xl font-bold tracking-tight text-white">
                        ₹{formatINR(totalPaise)}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                        <span>Budget Pacing</span>
                        <span className="font-mono text-sky-400">
                          {pacingPct}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-300"
                          style={{ width: `${pacingPct}%` }}
                        />
                      </div>
                      <div className="mt-2 font-mono text-[11px] text-zinc-500">
                        Cap: ₹{formatINR(monthlyBudgetPaise)}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs font-medium text-zinc-400">
                        Payment Mode Filter
                      </div>
                      <div
                        role="group"
                        aria-label="Filter by payment mode"
                        className="mt-2.5 flex flex-wrap gap-1.5"
                      >
                        {(["All", "UPI", "Cash", "Card"] as PaymentMode[]).map(
                          (mode) => {
                            const active = paymentFilter === mode;
                            return (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => setPaymentFilter(mode)}
                                className={`cursor-pointer rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                                  active
                                    ? "border-sky-400/50 bg-sky-400/15 text-sky-300"
                                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.07] hover:text-white"
                                }`}
                              >
                                {mode}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clean 1-Line Quick-Add Expense Bar */}
                  <form
                    onSubmit={handleAddExpense}
                    className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:flex-row sm:items-center"
                  >
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Expense title (e.g. Filter Coffee)"
                      aria-label="Expense title"
                      className="flex-1 rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-sky-400/60"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="₹ Amount"
                      aria-label="Expense amount in rupees"
                      className="w-full rounded-lg bg-white/[0.04] px-3 py-2 font-mono text-xs text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-sky-400/60 sm:w-28"
                    />
                    {previewPaise !== null && (
                      <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-sky-300">
                        {previewPaise} paise
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={!newTitle.trim() || previewPaise === null}
                      className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Add</span>
                    </button>
                  </form>

                  {/* Spacious Transaction List */}
                  <div className="divide-y divide-white/[0.06] rounded-xl border border-white/10 bg-white/[0.02]">
                    {filteredExpenses.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 px-4 py-3.5"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-zinc-100">
                            {item.title}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500">
                            <span>{item.category}</span>
                            <span>·</span>
                            <span className="font-mono text-zinc-400">
                              {item.mode}
                            </span>
                            <span>·</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="font-mono text-sm font-semibold text-white">
                            ₹{formatINR(item.paise)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteExpense(item)}
                            aria-label={`Delete ${item.title}`}
                            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Inbox Triage */}
              {activeTab === "inbox" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Inbox Queue ({inboxItems.length} remaining)
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Route any captured thought in one click.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetInbox}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Reset Inbox</span>
                    </button>
                  </div>

                  {triageBanner && (
                    <div
                      role="status"
                      className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs font-medium text-emerald-200"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{triageBanner}</span>
                    </div>
                  )}

                  {inboxItems.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-10 text-center">
                      <Sparkles
                        className="mx-auto mb-2.5 h-6 w-6 text-sky-400"
                        aria-hidden="true"
                      />
                      <div className="text-sm font-semibold text-white">
                        Inbox Zero Achieved
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">
                        Hit Reset Inbox above to replay the triage flow.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {inboxItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.05] sm:flex-row sm:items-center"
                        >
                          <div>
                            <div className="text-sm font-medium text-zinc-100">
                              {item.text}
                            </div>
                            <div className="mt-0.5 font-mono text-[11px] text-zinc-500">
                              {item.source}
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-wrap gap-1.5">
                            {(["Task", "Calendar", "Library"] as const).map(
                              (dest) => (
                                <button
                                  key={dest}
                                  type="button"
                                  onClick={() => handleTriage(item, dest)}
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-zinc-200 transition-all hover:border-sky-400/40 hover:bg-sky-400/15 hover:text-sky-200"
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
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Deep Work &amp; Reading — 12-Week Grid
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Click any cell to toggle completion. Yesterday&apos;s
                        streak stays intact if Today is open.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                          Streak
                        </div>
                        <div className="font-mono text-xl font-bold text-sky-400">
                          {currentStreak}d
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center">
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                          12-Wk Total
                        </div>
                        <div className="font-mono text-xl font-bold text-white">
                          {completedCount}/84
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <div
                      className="grid w-fit grid-flow-col grid-rows-7 gap-2"
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
                          className={`h-5 w-5 cursor-pointer rounded-[5px] border transition-all hover:scale-110 sm:h-6 sm:w-6 ${
                            done
                              ? "border-sky-400/60 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.09]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ⌘K Command Palette (Centered Floating Glass Modal) */}
              {activeTab === "command" && (
                <div className="flex min-h-[340px] items-center justify-center">
                  <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/75 shadow-2xl shadow-black/70 backdrop-blur-xl">
                    <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
                      <Search
                        className="h-4 w-4 shrink-0 text-zinc-400"
                        aria-hidden="true"
                      />
                      <input
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
                        className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                      />
                      <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                        ⌘K
                      </kbd>
                    </div>

                    <div className="divide-y divide-white/[0.06]">
                      {filteredCommands.length === 0 ? (
                        <div className="px-4 py-6 text-center text-xs text-zinc-500">
                          No matching commands.
                        </div>
                      ) : (
                        filteredCommands.map((cmd) => (
                          <button
                            key={cmd.id}
                            type="button"
                            onClick={() => executeCommand(cmd)}
                            className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.06]"
                          >
                            <div className="flex items-center gap-2.5">
                              <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-sky-400">
                                {cmd.shortcut}
                              </kbd>
                              <span className="text-zinc-100">{cmd.label}</span>
                            </div>
                            <span className="font-mono text-[11px] text-zinc-500">
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
          </div>

          {/* Ultra-Minimal 1-Line SQLite Query Ticker + Persistent Command Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-white/[0.02] px-4 py-2.5 font-mono text-[11px]">
            <div className="min-w-0 truncate text-zinc-400">
              <span className="mr-2 text-sky-400">sqlite&gt;</span>
              <span>{sqlLog}</span>
            </div>
            {cmdFeedback && (
              <div
                role="status"
                className="shrink-0 text-emerald-400"
              >
                ✓ {cmdFeedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
