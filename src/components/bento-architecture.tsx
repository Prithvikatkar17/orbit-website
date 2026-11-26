"use client";

import React from "react";
import { Download } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const SAMPLE_CSV = `id,title,category,mode,paise,inr
e1,"Campus Mess & Filter Coffee",Food,UPI,18550,185.50
e2,"Metro Smart Card Top-up",Travel,UPI,40000,400.00
e3,"Hostel Wi-Fi & Electricity Share",Hostel/Bills,Card,54000,540.00
e4,"Systems Design Printout & Spiral",Study,Cash,14500,145.00
`;

export function BentoArchitecture() {
  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orbit-expenses-sample.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        {/* Left-Aligned 2-Column Editorial Split Header */}
        <ScrollReveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-3 font-mono text-xs tracking-wider text-slate-400">
                {"// ARCHITECTURE"}
              </div>
              <h2
                id="architecture-heading"
                className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
              >
                Engineered for{" "}
                <span className="font-serif font-normal italic text-sky-200/90">
                  local sovereignty.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                No remote sync queue, no telemetry SDKs, and no proprietary
                format lock-in. Your data stays a plain file on your disk.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Visual-First Engineering Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* 1. 0.14ms Local SQLite Speed */}
          <ScrollReveal delayMs={0}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.09] bg-white/[0.025] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-colors hover:border-white/[0.18]">
              <div className="mb-7 space-y-3 rounded-xl border border-white/[0.08] bg-[#0b0f19] p-4 font-mono text-xs">
                <div>
                  <div className="mb-1.5 flex justify-between text-slate-200">
                    <span>orbit.sqlite (WAL)</span>
                    <span className="text-sky-400">0.14ms</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.07]">
                    <div className="h-full w-[3%] rounded-full bg-sky-400" />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between text-slate-500">
                    <span>Cloud SaaS Workspace</span>
                    <span>380ms</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.07]">
                    <div className="h-full w-full rounded-full bg-white/15" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  0.14ms Local SQLite Speed
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Reads and writes hit a local SQLite WAL file or browser
                  IndexedDB directly—eliminating loading spinners forever.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 2. 100% Offline & Zero Telemetry */}
          <ScrollReveal delayMs={80}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.09] bg-white/[0.025] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-colors hover:border-white/[0.18]">
              <div className="mb-7 rounded-xl border border-white/[0.08] bg-[#0b0f19] p-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <span className="text-slate-400">Outbound Requests</span>
                  <span className="font-semibold text-emerald-400">0</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.06] py-2.5">
                  <span className="text-slate-400">Telemetry Trackers</span>
                  <span className="font-semibold text-emerald-400">0</span>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <span className="text-slate-400">Cloud Sync</span>
                  <span className="text-slate-300">Disabled</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  100% Offline &amp; Zero Telemetry
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  No analytics SDKs, no sign-in walls, and no background sync
                  daemons. Your notes and rupee ledger never leave your machine.
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* 3. True Data Ownership */}
          <ScrollReveal delayMs={160}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.09] bg-white/[0.025] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-colors hover:border-white/[0.18]">
              <div className="mb-7 space-y-3 rounded-xl border border-white/[0.08] bg-[#0b0f19] p-4">
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  <span className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-sky-300">
                    .sqlite
                  </span>
                  <span className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-slate-200">
                    .zip
                  </span>
                  <span className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-amber-300">
                    .csv
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadSampleCsv}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-sky-400/40 hover:bg-white/[0.09]"
                >
                  <Download
                    className="h-3.5 w-3.5 text-sky-400"
                    aria-hidden="true"
                  />
                  <span>Download Sample .CSV</span>
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  True Data Ownership
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Export your entire workspace anytime in open, durable
                  formats—no proprietary lock-in or paywalled exports.
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
