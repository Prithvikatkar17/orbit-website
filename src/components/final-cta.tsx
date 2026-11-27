import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";
import { ScrollReveal } from "./scroll-reveal";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <ScrollReveal>
        <div className="tactile-glass rounded-[32px] p-10 text-center sm:p-16">
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-2xl font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50"
          >
            Make space for a calmer daily routine.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-stone-600 sm:text-lg dark:text-stone-300">
            Start writing, planning, and tracking in seconds—completely free,
            completely private, and yours forever.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-7 py-4 text-base font-medium text-stone-50 shadow-[0_14px_30px_-6px_rgba(28,25,23,0.28)] transition-all hover:-translate-y-0.5 hover:bg-stone-800 sm:w-auto dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              <span>Open My Journal</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile-pill inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-medium text-stone-800 transition-all hover:-translate-y-0.5 sm:w-auto dark:text-stone-100"
            >
              <Download
                className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span>Download for Windows (.exe)</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
