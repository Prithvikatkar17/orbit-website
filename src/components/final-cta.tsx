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
        <div className="relative overflow-hidden rounded-3xl border border-sky-400/25 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/90 p-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_25px_80px_-20px_rgba(56,189,248,0.25)] backdrop-blur-2xl sm:p-16">
          {/* Radiant Cyan/Indigo Aurora Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-emerald-500/15 blur-[110px]"
          />

          <h2
            id="final-cta-heading"
            className="mx-auto max-w-3xl bg-gradient-to-b from-white via-white/95 to-slate-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            Ready to Move Your Life Off the Cloud?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
            Start in your browser in 0 seconds, or install the native Windows
            SQLite vault. Free, open-source, and yours forever.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_-5px_rgba(255,255,255,0.45)] transition-all hover:bg-slate-200 sm:w-auto"
            >
              <span>Launch Web App</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.07] px-7 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition-all hover:border-sky-400/40 hover:bg-white/[0.12] sm:w-auto"
            >
              <Download className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <span>Download Windows .exe</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-slate-400">
            <span>0ms Offline Speed</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>₹ INR Paise Precision</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>MIT Open Source</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
