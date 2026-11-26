import React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_URL, GITHUB_URL, RELEASES_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#06080e]">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-10 text-sm sm:px-6 lg:flex-row lg:items-center">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold tracking-tight text-slate-50">
              ORBIT
            </span>
            <span className="text-xs text-slate-400">
              Engineered by Prithvi Katkar
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            build: v1.0.0-stable · target: x86_64-pc-windows-msvc &amp;
            wasm32/idb · license: MIT
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium sm:text-sm">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-200 transition-colors hover:text-white"
          >
            <span>Live Web App</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-sky-400"
              aria-hidden="true"
            />
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
          >
            <span>Windows Releases</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
