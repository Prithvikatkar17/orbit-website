"use client";

import React from "react";
import { Download } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const SAMPLE_CSV = `date,description,payment_method,amount_inr
2025-02-26,"Morning Filter Coffee",UPI,45.00
2025-02-26,"Metro Card Top-up",UPI,400.00
2025-02-25,"Fresh Fruit & Groceries",Cash,280.00
2025-02-24,"Paperback Book from Blossom",Card,450.00
`;

export function BentoArchitecture() {
  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orbit-daily-expenses-sample.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="why-local"
      aria-labelledby="why-local-heading"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <span className="tactile-glass inline-block rounded-full px-4 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200">
            Private by Design
          </span>
          <h2
            id="why-local-heading"
            className="mt-4 font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50"
          >
            Why it lives on your device.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-600 sm:text-lg dark:text-stone-300">
            Your daily reflections and personal finances belong to you—not on a
            company&apos;s remote server.
          </p>
        </div>
      </ScrollReveal>

      {/* 2 Wide, Serene Glass Cards */}
      <div className="grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2">
        {/* Card 1: Private Like a Paper Diary */}
        <ScrollReveal delayMs={0}>
          <article className="tactile-glass flex h-full flex-col justify-between rounded-[28px] p-8 sm:p-10">
            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                Private Like a Paper Diary
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                No accounts to create, no cloud servers reading your journal,
                and no monthly subscriptions. Your thoughts, habits, and
                finances stay 100% yours.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="tactile-pill rounded-full px-3.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200">
                No Sign-up Required
              </span>
              <span className="tactile-pill rounded-full px-3.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200">
                Zero Tracking
              </span>
              <span className="tactile-pill rounded-full px-3.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200">
                Zero Subscriptions
              </span>
            </div>
          </article>
        </ScrollReveal>

        {/* Card 2: Instant Offline Speed & Yours Forever */}
        <ScrollReveal delayMs={80}>
          <article className="tactile-glass flex h-full flex-col justify-between rounded-[28px] p-8 sm:p-10">
            <div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-50">
                Instant Offline Speed &amp; Yours Forever
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                Opens instantaneously even on a flight without Wi-Fi, and lets
                you export your entire diary anytime as standard files (
                <code className="font-mono text-sm">.sqlite</code>,{" "}
                <code className="font-mono text-sm">.csv</code>,{" "}
                <code className="font-mono text-sm">.zip</code>) you can keep
                for decades.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="tactile-pill rounded-full px-3 py-1 font-mono text-xs text-stone-700 dark:text-stone-200">
                  .sqlite
                </span>
                <span className="tactile-pill rounded-full px-3 py-1 font-mono text-xs text-stone-700 dark:text-stone-200">
                  .csv
                </span>
                <span className="tactile-pill rounded-full px-3 py-1 font-mono text-xs text-stone-700 dark:text-stone-200">
                  .zip
                </span>
              </div>

              <button
                type="button"
                onClick={handleDownloadSampleCsv}
                className="tactile-pill inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-stone-800 transition-transform hover:-translate-y-0.5 dark:text-stone-100"
              >
                <Download
                  className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
                <span>Download Sample .CSV</span>
              </button>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
