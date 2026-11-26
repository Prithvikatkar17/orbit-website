import React from "react";
import { ShieldOff, Keyboard, Cpu, HardDriveDownload } from "lucide-react";

const BENTO_CARDS = [
  {
    title: "Zero Telemetry",
    badge: "100% Offline",
    description:
      "No analytics SDKs, no crash-reporting beacons, no sign-in walls, and no background sync servers. Your notes, habits, and rupee ledger never leave your machine.",
    icon: ShieldOff,
  },
  {
    title: "Keyboard-First Speed (⌘K & g chords)",
    badge: "Vim-Inspired",
    description:
      "Jump anywhere with two-key chords (g e for Expenses, g h for Habits, g i for Inbox) or hit ⌘K to log an expense, capture a task, or export a backup without touching the mouse.",
    icon: Keyboard,
  },
  {
    title: "Zero GPU Blur Tax",
    badge: "0ms Crisp UI",
    description:
      "Zero backdrop-filter glassmorphism. Every surface uses solid semantic tokens, crisp 1px borders, and high-contrast typography so older laptops and phones stay cool and instant.",
    icon: Cpu,
  },
  {
    title: "Portable Data Vault (.sqlite / .zip / .csv)",
    badge: "You Own It",
    description:
      "No proprietary lock-in. Export your entire workspace as a standard SQLite database snapshot, a structured .zip archive, or .csv spreadsheets whenever you want.",
    icon: HardDriveDownload,
  },
];

export function BentoArchitecture() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="mb-10 text-center">
        <h2
          id="privacy-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          Privacy &amp; Architecture by Default
        </h2>
        <p
          className="mx-auto mt-2 max-w-2xl text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Engineered for permanence, speed, and complete user sovereignty.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {BENTO_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="flex flex-col justify-between rounded-xl border p-6"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: "var(--surface-elevated)",
                      borderColor: "var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium"
                    style={{
                      backgroundColor: "var(--badge-bg)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {card.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
