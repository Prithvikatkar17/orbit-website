import React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_URL, APP_VERSION, GITHUB_URL, RELEASES_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-white/50 backdrop-blur-md dark:border-white/10 dark:bg-stone-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm sm:flex-row sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
            ORBIT
          </span>
          <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600 dark:border-white/10 dark:bg-stone-900 dark:text-stone-300">
            {APP_VERSION}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Crafted by Prithvi Katkar · MIT Open Source
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium sm:text-sm">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stone-800 transition-colors hover:text-stone-950 dark:text-stone-200 dark:hover:text-white"
          >
            <span>Open Journal</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
          >
            <span>Windows Releases</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
