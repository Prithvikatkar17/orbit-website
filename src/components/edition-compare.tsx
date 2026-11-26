import React from "react";
import { Check, ArrowUpRight, Download } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";
import { ScrollReveal } from "./scroll-reveal";

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
      className="scroll-mt-28 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        {/* Left-Aligned 2-Column Editorial Split Header */}
        <ScrollReveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-3 font-mono text-xs tracking-wider text-slate-400">
                {"// EDITIONS"}
              </div>
              <h2
                id="editions-heading"
                className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
              >
                Choose your{" "}
                <span className="font-serif font-normal italic text-sky-200/90">
                  storage engine.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Same keyboard-first workspace and privacy guarantees—built for
                both zero-install browser access and native desktop disk
                storage.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Web / PWA Edition */}
          <ScrollReveal delayMs={0}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-colors hover:border-white/[0.18]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-50">
                      Web / PWA Edition
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">
                      IndexedDB · Any Device
                    </p>
                  </div>
                  <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-slate-300">
                    No Install
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {WEB_FEATURES.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200"
                >
                  <span>Try Live in Browser</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          </ScrollReveal>

          {/* Windows Desktop Edition */}
          <ScrollReveal delayMs={100}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-sky-400/25 bg-white/[0.03] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-colors hover:border-sky-400/45">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
              />

              <div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-50">
                      Windows Desktop Edition
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">
                      orbit.sqlite (WAL) · .exe
                    </p>
                  </div>
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-mono text-[11px] text-sky-300">
                    Native Vault
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {DESKTOP_FEATURES.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all hover:border-sky-400/40 hover:bg-white/[0.12]"
                >
                  <Download
                    className="h-4 w-4 text-sky-400"
                    aria-hidden="true"
                  />
                  <span>Download for Windows (.exe)</span>
                </a>
              </div>
            </article>
          </ScrollReveal>
        </div>

        {/* Honest Maker Note: Why two editions? */}
        <ScrollReveal delayMs={160}>
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
            <div className="mb-2 font-mono text-xs text-sky-300">
              {"// WHY_TWO_EDITIONS?"}
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Browsers are unbeatable for trying an app in 0 seconds on a phone
              or work laptop, but browser storage can be evicted if you clear
              site data. That&apos;s why ORBIT ships both: an instant{" "}
              <strong className="text-slate-100">IndexedDB Web PWA</strong> for
              zero-friction access anywhere, and a{" "}
              <strong className="text-slate-100">
                native Windows <code className="font-mono">.exe</code>
              </strong>{" "}
              that writes directly to a physical{" "}
              <code className="font-mono text-slate-200">orbit.sqlite</code>{" "}
              file on your SSD—so you can back it up with Git, Syncthing, or a
              USB drive.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
