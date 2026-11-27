"use client";

import React from "react";
import { ArrowUpRight, Download, ChevronRight } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="px-4 pb-10 pt-32 sm:px-6 sm:pb-14 sm:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        {/* Warm Eyebrow Pill with Soft Amber Sun Dot */}
        <div className="tactile-glass mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-200">
          <span
            className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            aria-hidden="true"
          />
          <span>
            Your Personal Observatory, Notebook &amp; Life OS — 100% On Your
            Device
          </span>
        </div>

        {/* Soulful Fraunces Headline */}
        <h1 className="mx-auto max-w-3xl font-serif text-5xl font-medium leading-[1.08] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl dark:text-stone-50">
          A quiet, private space for your{" "}
          <span className="italic text-amber-700 dark:text-amber-400">
            daily life.
          </span>
        </h1>

        {/* Human Subcopy */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl dark:text-stone-300">
          ORBIT adapts to your mindset—from a{" "}
          <strong className="font-medium text-stone-900 dark:text-stone-100">
            sunlit archival notebook (Ex Libris)
          </strong>{" "}
          for your morning{" "}
          <span className="font-mono font-medium text-amber-700 dark:text-amber-400">
            ₹
          </span>{" "}
          expenses and reading notes, to a{" "}
          <strong className="font-medium text-stone-900 dark:text-stone-100">
            celestial observatory (Midnight)
          </strong>{" "}
          where your habits form Living Star Constellations and your top tasks
          sit in Perihelion Focus.
        </p>

        {/* Tactile 3D CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-7 py-4 text-base font-medium text-stone-50 shadow-[0_14px_30px_-6px_rgba(28,25,23,0.28),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-stone-800 sm:w-auto dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            <span>Start in Browser — Free</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-glass inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-medium text-stone-800 transition-all hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto dark:text-stone-100 dark:hover:bg-stone-800/80"
          >
            <Download
              className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
              aria-hidden="true"
            />
            <span>Download for Windows (.exe)</span>
          </a>
        </div>

        {/* Friendly Expandable SmartScreen Note */}
        <div className="mx-auto mt-7 max-w-lg">
          <details className="orbit-accordion tactile-glass rounded-2xl text-left">
            <summary className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-300 dark:hover:text-white">
              <ChevronRight
                className="accordion-chevron h-3.5 w-3.5 shrink-0 text-stone-400"
                aria-hidden="true"
              />
              <span>
                First time opening an independent Windows{" "}
                <code className="font-mono">.exe</code>?
              </span>
            </summary>
            <div className="border-t border-stone-200/70 px-5 py-3.5 text-xs leading-relaxed text-stone-600 dark:border-white/10 dark:text-stone-300">
              Because ORBIT is independently crafted without a paid corporate
              certificate, Windows may ask once before opening. Just click{" "}
              <strong className="text-stone-900 dark:text-white">
                More info → Run anyway
              </strong>
              , or enjoy the instant Browser edition with zero installation.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
