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
      id="editions"
      aria-labelledby="editions-heading"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mb-14 text-center">
        <h2
          id="editions-heading"
          className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
        >
          Choose Your Local Engine
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-400">
          Identical keyboard-first workspace and privacy guarantees—built for
          both instant browser access and native desktop storage.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Web / PWA Edition */}
        <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sky-400">
                  <Globe className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Web / PWA Edition
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    IndexedDB · Any Device
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-zinc-300">
                No Install
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              {WEB_FEATURES.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                    aria-hidden="true"
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:bg-zinc-200"
            >
              <span>Try Live in Browser</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </article>

        {/* Windows Desktop Edition (Glowing Top Specular Border) */}
        <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sky-400/25 bg-gradient-to-b from-sky-400/[0.06] to-white/[0.02] p-8 shadow-[0_0_60px_-20px_rgba(56,189,248,0.25)] backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
          />

          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-400">
                  <Monitor className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Windows Desktop Edition
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    orbit.sqlite (WAL) · .exe
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
                Native Vault
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              {DESKTOP_FEATURES.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                    aria-hidden="true"
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:bg-white/[0.14]"
            >
              <Download className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <span>Download for Windows (.exe)</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
