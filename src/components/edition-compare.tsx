import React from "react";
import { Globe, Monitor, Check, ArrowUpRight, Download } from "lucide-react";
import { CrosshairCorners, SectionHeader } from "./section-header";
import { APP_URL, RELEASES_URL } from "@/lib/config";

const WEB_FEATURES = [
  "Zero install — launches instantly in any modern browser",
  "Works across Android, iOS, macOS, Linux, and Windows",
  "Stores everything locally in browser IndexedDB",
  "Installable as an offline-capable PWA on mobile & desktop",
  "Exports portable .zip and .json backups anytime",
];

const DESKTOP_FEATURES = [
  "Native Windows 10/11 (64-bit) desktop window",
  "Stores data in a real physical orbit.sqlite file on disk",
  "SQLite WAL mode for instant, crash-safe local writes",
  "Exports raw .sqlite snapshots plus .zip / .csv backups",
  "Zero background updaters, zero telemetry daemons",
];

export function EditionCompare() {
  return (
    <section
      id="compare"
      aria-labelledby="compare-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <SectionHeader
        indexLabel="[03 // STORAGE_ENGINES]"
        headingId="compare-heading"
        title="Browser PWA vs. Windows Desktop"
        subtitle="Same keyboard-first workspace, same 7 themes, same local-first privacy—choose the storage engine that fits your workflow."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Web / PWA Card */}
        <article className="relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6">
          <CrosshairCorners />
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Web / PWA Edition
                  </h3>
                  <p className="font-mono text-xs text-text-secondary">
                    IndexedDB · Any Device
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-border bg-badge-bg px-2.5 py-0.5 text-xs font-medium text-text-primary">
                No Install
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {WEB_FEATURES.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm text-text-secondary"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              <span>Try in Browser</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>

        {/* Windows Desktop Card */}
        <article className="relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6">
          <CrosshairCorners />
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-accent">
                  <Monitor className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Windows Desktop Edition
                  </h3>
                  <p className="font-mono text-xs text-text-secondary">
                    orbit.sqlite (WAL) · .exe
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-border bg-badge-bg px-2.5 py-0.5 text-xs font-medium text-text-primary">
                Native Vault
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {DESKTOP_FEATURES.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm text-text-secondary"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download .exe Installer</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
