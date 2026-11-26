"use client";

import React, { useState } from "react";
import {
  ShieldOff,
  Keyboard,
  Cpu,
  HardDriveDownload,
  Download,
  FileCode2,
} from "lucide-react";
import { CrosshairCorners, SectionHeader } from "./section-header";
import { useTheme } from "./theme-provider";
import { useWorkspace } from "./workspace-context";

const SAMPLE_SCHEMA = `CREATE TABLE expenses (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  category   TEXT NOT NULL,
  mode       TEXT CHECK (mode IN ('UPI','Cash','Card')),
  paise      INTEGER NOT NULL, -- exact integer INR paise
  created_at INTEGER NOT NULL
) STRICT;`;

const SAMPLE_CSV = `id,title,category,mode,paise,inr
e1,"Campus Mess & Filter Coffee",Food,UPI,18550,185.50
e2,"Metro Smart Card Top-up",Travel,UPI,40000,400.00
e3,"Hostel Wi-Fi & Electricity Share",Hostel/Bills,Card,54000,540.00
e4,"Systems Design Printout & Spiral",Study,Cash,14500,145.00
`;

export function BentoArchitecture() {
  const { cycleTheme } = useTheme();
  const { setActiveTab, scrollToPreview, openCommandPalette, setLastChord } =
    useWorkspace();
  const [showSchema, setShowSchema] = useState(false);

  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orbit-expenses-sample.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <SectionHeader
        indexLabel="[04 // SOVEREIGN_ARCHITECTURE]"
        headingId="privacy-heading"
        title="Privacy & Architecture by Default"
        subtitle="Engineered for permanence, speed, and complete user sovereignty."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Card 1: Zero Telemetry + Network Inspector */}
        <article className="relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6">
          <CrosshairCorners />
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent">
                <ShieldOff className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-border bg-badge-bg px-2.5 py-0.5 font-mono text-[11px] font-medium text-text-secondary">
                100% Offline
              </span>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              Zero Telemetry
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              No analytics SDKs, no crash-reporting beacons, no sign-in walls,
              and no background sync servers. Your notes, habits, and rupee
              ledger never leave your machine.
            </p>
          </div>

          <div className="mt-5 rounded-lg border border-border bg-surface-elevated px-3 py-2 font-mono text-[11px] text-text-primary">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Outbound Requests: <strong>0</strong> | Trackers:{" "}
            <strong>0</strong> | Cloud Sync: <strong>Disabled</strong>
          </div>
        </article>

        {/* Card 2: Keyboard-First Speed + Interactive Keycaps */}
        <article className="relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6">
          <CrosshairCorners />
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent">
                <Keyboard className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-border bg-badge-bg px-2.5 py-0.5 font-mono text-[11px] font-medium text-text-secondary">
                Vim-Inspired
              </span>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              Keyboard-First Speed (⌘K &amp; g chords)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Jump anywhere with two-key chords or hit ⌘K to log an expense,
              capture a task, or export a backup. Click any keycap below to
              test it live:
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab("expenses");
                scrollToPreview();
                setLastChord({
                  keys: "[g] → [e]",
                  detail: "Opened Expenses in 0.1ms",
                });
              }}
              className="cursor-pointer rounded border border-border bg-surface-elevated px-2.5 py-1.5 text-text-primary transition-colors hover:border-accent hover:bg-surface-hover"
            >
              <kbd className="font-semibold text-accent">g</kbd> +{" "}
              <kbd className="font-semibold text-accent">e</kbd>{" "}
              <span className="text-text-secondary">Expenses</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("habits");
                scrollToPreview();
                setLastChord({
                  keys: "[g] → [h]",
                  detail: "Opened Habit Heatmap in 0.1ms",
                });
              }}
              className="cursor-pointer rounded border border-border bg-surface-elevated px-2.5 py-1.5 text-text-primary transition-colors hover:border-accent hover:bg-surface-hover"
            >
              <kbd className="font-semibold text-accent">g</kbd> +{" "}
              <kbd className="font-semibold text-accent">h</kbd>{" "}
              <span className="text-text-secondary">Habits</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const next = cycleTheme();
                setLastChord({
                  keys: "[g] → [t]",
                  detail: `Theme → ${next.name}`,
                });
              }}
              className="cursor-pointer rounded border border-border bg-surface-elevated px-2.5 py-1.5 text-text-primary transition-colors hover:border-accent hover:bg-surface-hover"
            >
              <kbd className="font-semibold text-accent">g</kbd> +{" "}
              <kbd className="font-semibold text-accent">t</kbd>{" "}
              <span className="text-text-secondary">Cycle Theme</span>
            </button>
            <button
              type="button"
              onClick={() => {
                openCommandPalette();
                setLastChord({
                  keys: "[⌘K]",
                  detail: "Focused Command Palette in 0.1ms",
                });
              }}
              className="cursor-pointer rounded border border-border bg-surface-elevated px-2.5 py-1.5 text-text-primary transition-colors hover:border-accent hover:bg-surface-hover"
            >
              <kbd className="font-semibold text-accent">⌘K</kbd>{" "}
              <span className="text-text-secondary">Palette</span>
            </button>
          </div>
        </article>

        {/* Card 3: Zero GPU Blur Tax & 0ms Latency */}
        <article className="relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6">
          <CrosshairCorners />
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent">
                <Cpu className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-border bg-badge-bg px-2.5 py-0.5 font-mono text-[11px] font-medium text-text-secondary">
                0ms Crisp UI
              </span>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              Zero GPU Blur Tax
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Zero backdrop-filter glassmorphism. Every surface uses solid
              semantic tokens, crisp 1px borders, and high-contrast typography
              so older laptops and phones stay cool and instant.
            </p>
          </div>

          <div className="mt-5 space-y-2.5 rounded-lg border border-border bg-surface-elevated p-3 font-mono text-[11px]">
            <div>
              <div className="mb-1 flex justify-between text-text-primary">
                <span>orbit.sqlite (Local WAL)</span>
                <span className="font-semibold text-accent">0.14ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface">
                <div className="h-full w-[2%] rounded-full bg-accent" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-text-secondary">
                <span>Typical Cloud Workspace</span>
                <span>380ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface">
                <div className="h-full w-full rounded-full bg-border" />
              </div>
            </div>
          </div>
        </article>

        {/* Card 4: Portable Data Vault + Interactive File Tree */}
        <article className="relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6">
          <CrosshairCorners />
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent">
                <HardDriveDownload className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-border bg-badge-bg px-2.5 py-0.5 font-mono text-[11px] font-medium text-text-secondary">
                You Own It
              </span>
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              Portable Data Vault (.sqlite / .zip / .csv)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              No proprietary lock-in. Export your entire workspace as a standard
              SQLite database snapshot, a structured .zip archive, or .csv
              spreadsheets whenever you want.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-lg border border-border bg-surface-elevated p-3 font-mono text-xs text-text-primary">
              <div className="text-text-secondary">~/ORBIT-Vault/</div>
              <div className="pl-3">├── orbit.sqlite</div>
              <div className="pl-3">├── expenses-2025.csv</div>
              <div className="pl-3">└── notes-backup.zip</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownloadSampleCsv}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-surface-hover"
              >
                <Download className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>Download Sample .CSV</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSchema((prev) => !prev)}
                aria-expanded={showSchema}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-surface-hover"
              >
                <FileCode2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>{showSchema ? "Hide Schema" : "Inspect Schema"}</span>
              </button>
            </div>

            {showSchema && (
              <pre className="overflow-x-auto rounded-lg border border-border bg-surface-elevated p-3 font-mono text-[11px] leading-relaxed text-text-primary">
                {SAMPLE_SCHEMA}
              </pre>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
