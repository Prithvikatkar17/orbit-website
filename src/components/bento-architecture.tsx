"use client";

import React from "react";
import { Gauge, ShieldCheck, HardDriveDownload, Download } from "lucide-react";
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
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <ScrollReveal>
        <div className="mb-14 text-center">
          <h2
            id="architecture-heading"
            className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Engineered for Local Sovereignty
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Zero cloud roundtrips, zero telemetry beacons, and zero lock-in.
          </p>
        </div>
      </ScrollReveal>

      {/* 3-Column Glass Engineering Showcase */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 1. 0.14ms Local SQLite Speed */}
        <ScrollReveal delayMs={0}>
          <article className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.14] bg-slate-900/55 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40">
            <div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-sky-400">
                <Gauge className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                0.14ms Local SQLite Speed
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Reads and writes hit a local SQLite WAL file or browser
                IndexedDB directly—eliminating loading spinners forever.
              </p>
            </div>

            <div className="mt-8 space-y-3 rounded-xl border border-white/[0.1] bg-slate-950/60 p-4 font-mono text-xs">
              <div>
                <div className="mb-1.5 flex justify-between text-slate-200">
                  <span>orbit.sqlite (WAL)</span>
                  <span className="text-sky-400">0.14ms</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.08]">
                  <div className="h-full w-[3%] rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-slate-400">
                  <span>Cloud SaaS Workspace</span>
                  <span>380ms</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.08]">
                  <div className="h-full w-full rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 2. 100% Offline & Zero Telemetry */}
        <ScrollReveal delayMs={80}>
          <article className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.14] bg-slate-900/55 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40">
            <div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-emerald-400">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                100% Offline &amp; Zero Telemetry
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                No analytics SDKs, no sign-in walls, and no background sync
                daemons. Your notes and rupee ledger never touch a remote
                server.
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.1] bg-slate-950/60 p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                <span className="text-slate-300">Outbound Requests</span>
                <span className="font-semibold text-emerald-400">0</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.08] py-2.5">
                <span className="text-slate-300">Telemetry Trackers</span>
                <span className="font-semibold text-emerald-400">0</span>
              </div>
              <div className="flex items-center justify-between pt-2.5">
                <span className="text-slate-300">Cloud Sync</span>
                <span className="text-slate-200">Disabled</span>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* 3. True Data Ownership */}
        <ScrollReveal delayMs={160}>
          <article className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.14] bg-slate-900/55 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors hover:border-sky-400/40">
            <div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-indigo-400">
                <HardDriveDownload className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                True Data Ownership
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Export your entire workspace anytime in open, durable formats—no
                proprietary lock-in or paywalled exports.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-3 py-1 text-sky-300">
                  .sqlite
                </span>
                <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-3 py-1 text-indigo-300">
                  .zip
                </span>
                <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-3 py-1 text-emerald-300">
                  .csv
                </span>
              </div>

              <button
                type="button"
                onClick={handleDownloadSampleCsv}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.07] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-sky-400/40 hover:bg-white/[0.12]"
              >
                <Download
                  className="h-3.5 w-3.5 text-sky-400"
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
