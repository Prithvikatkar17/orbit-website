import React from "react";
import { Globe, Monitor, Check, ArrowUpRight, Download } from "lucide-react";
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
      <div className="mb-10 text-center">
        <h2
          id="compare-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          Browser PWA vs. Windows Desktop
        </h2>
        <p
          className="mx-auto mt-2 max-w-2xl text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Same keyboard-first workspace, same 7 themes, same local-first
          privacy—choose the storage engine that fits your workflow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Web / PWA Card */}
        <article
          className="flex flex-col justify-between rounded-xl border p-6"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                  style={{
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Web / PWA Edition
                  </h3>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    IndexedDB · Any Device
                  </p>
                </div>
              </div>
              <span
                className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: "var(--badge-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                No Install
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {WEB_FEATURES.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--accent)" }}
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--accent)",
                color: "var(--accent-fg)",
              }}
            >
              <span>Try in Browser</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>

        {/* Windows Desktop Card */}
        <article
          className="flex flex-col justify-between rounded-xl border p-6"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                  style={{
                    backgroundColor: "var(--surface-elevated)",
                    borderColor: "var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  <Monitor className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Windows Desktop Edition
                  </h3>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    orbit.sqlite (WAL) · .exe
                  </p>
                </div>
              </div>
              <span
                className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: "var(--badge-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Native Vault
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {DESKTOP_FEATURES.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--accent)" }}
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--surface-elevated)]"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
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
