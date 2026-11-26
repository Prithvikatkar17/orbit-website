import React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_URL, APP_VERSION, GITHUB_URL, RELEASES_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.12] bg-[#070a12]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-white">ORBIT</span>
          <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-0.5 font-mono text-[11px] text-slate-300">
            {APP_VERSION}
          </span>
          <span className="text-xs text-slate-400">
            Local-first Personal OS
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium sm:text-sm">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-200 transition-colors hover:text-white"
          >
            <span>Live Web App</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-white"
          >
            <span>Windows Releases</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-white"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
