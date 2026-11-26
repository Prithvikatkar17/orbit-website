import React from "react";
import {
  Inbox,
  CheckSquare,
  Flame,
  Calendar,
  BookOpen,
  IndianRupee,
} from "lucide-react";

const MODULES = [
  {
    title: "Inbox Triage",
    description:
      "Capture thoughts, links, and quick notes without friction. Route any item to Tasks, Calendar, or Library in one click.",
    icon: Inbox,
  },
  {
    title: "Tasks & Focus",
    description:
      "Clean, keyboard-navigable task lists with priorities and due dates—no bloated Kanban boards or team-sprint noise.",
    icon: CheckSquare,
  },
  {
    title: "Habit Heatmaps",
    description:
      "12-week contribution grids and live streak counters that reward daily consistency without nagging push notifications.",
    icon: Flame,
  },
  {
    title: "Calendar",
    description:
      "Time-block your day alongside your tasks and deadlines in a single local-first timeline.",
    icon: Calendar,
  },
  {
    title: "Personal Library",
    description:
      "Archive articles, book notes, and technical references in a fast, searchable local vault.",
    icon: BookOpen,
  },
  {
    title: "Daily Expenses (₹)",
    description:
      "Built-in INR paise-precision ledger with UPI, Cash, and Card filters, category breakdowns, and monthly budget pacing.",
    icon: IndianRupee,
  },
];

export function FeaturesOverview() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="mb-10 text-center">
        <h2
          id="features-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          Six Essential Modules. One Cohesive Vault.
        </h2>
        <p
          className="mx-auto mt-2 max-w-2xl text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Everything you need to run your day—unified under one keyboard-first
          interface with 0ms local reads.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <article
              key={mod.title}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  borderColor: "var(--border)",
                  color: "var(--accent)",
                }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {mod.title}
              </h3>
              <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {mod.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
