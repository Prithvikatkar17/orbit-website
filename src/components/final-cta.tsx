import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { APP_URL, RELEASES_URL } from "@/lib/config";
import { ScrollReveal } from "./scroll-reveal";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.025] p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/12 blur-[120px]"
            />

            <h2
              id="final-cta-heading"
              className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl"
            >
              Ready to move your life{" "}
              <span className="font-serif font-normal italic text-sky-200/90">
                off the cloud?
              </span>
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-50 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_-8px_rgba(248,250,252,0.45)] transition-all hover:bg-slate-200 sm:w-auto"
              >
                <span>Launch Web App</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all hover:border-sky-400/40 hover:bg-white/[0.11] sm:w-auto"
              >
                <Download
                  className="h-4 w-4 text-sky-400"
                  aria-hidden="true"
                />
                <span>Download Windows .exe</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-slate-400">
              <span>0ms Offline Speed</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-amber-300/90">₹ INR Paise Precision</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>MIT Open Source</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
