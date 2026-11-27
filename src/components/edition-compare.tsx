import React from "react";
import { Check, ArrowUpRight, Download } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";
import { ScrollReveal } from "./scroll-reveal";

const WEB_FEATURES = [
  "Opens immediately in any browser—no installation needed",
  "Works on iPhone, Android, Mac, Linux, and Windows",
  "Saves your diary safely in your browser offline",
  "Export a portable backup file anytime in one click",
];

const DESKTOP_FEATURES = [
  "Dedicated Windows 10/11 desktop app",
  "Saves your entire sanctuary as a single file on your PC",
  "Fast, reliable, and works completely without internet",
  "Easy backups you can copy to any USB drive or folder",
];

export function EditionCompare() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <span className="tactile-glass inline-block rounded-full px-4 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200">
            Two Ways to Start
          </span>
          <h2
            id="download-heading"
            className="mt-4 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50"
          >
            Use it in your browser, or keep it on your desktop.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-600 sm:text-lg dark:text-stone-300">
            Both editions are completely free, private, and offline-ready.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2">
        {/* Browser PWA Edition */}
        <ScrollReveal delayMs={0}>
          <article className="tactile-glass flex h-full flex-col justify-between rounded-[28px] p-8 sm:p-10">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                  Browser Edition
                </h3>
                <span className="tactile-pill rounded-full px-3 py-1 text-xs font-medium text-stone-700 dark:text-stone-200">
                  Instant
                </span>
              </div>
              <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
                Try it right now on any phone or computer
              </p>

              <ul className="mt-8 space-y-4">
                {WEB_FEATURES.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-sm text-stone-700 sm:text-base dark:text-stone-300"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-6 py-4 text-base font-medium text-stone-50 shadow-[0_14px_30px_-6px_rgba(28,25,23,0.28)] transition-all hover:-translate-y-0.5 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                <span>Open in Browser</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </ScrollReveal>

        {/* Windows Desktop App */}
        <ScrollReveal delayMs={80}>
          <article className="tactile-glass flex h-full flex-col justify-between rounded-[28px] p-8 sm:p-10">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                  Windows Desktop App
                </h3>
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-300">
                  Native Vault
                </span>
              </div>
              <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
                For your daily morning routine on Windows 10 &amp; 11
              </p>

              <ul className="mt-8 space-y-4">
                {DESKTOP_FEATURES.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-sm text-stone-700 sm:text-base dark:text-stone-300"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
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
                className="tactile-pill inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-medium text-stone-900 transition-all hover:-translate-y-0.5 dark:text-stone-100"
              >
                <Download
                  className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span>Download for Windows (.exe)</span>
              </a>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
