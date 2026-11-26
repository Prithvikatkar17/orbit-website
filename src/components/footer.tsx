import React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_URL, APP_VERSION, GITHUB_URL, RELEASES_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-text-primary">
            ORBIT
          </span>
          <span className="rounded-full border border-border bg-badge-bg px-2 py-0.5 font-mono text-[11px] text-text-secondary">
            {APP_VERSION}
          </span>
          <span className="text-xs text-text-secondary">
            Local-first Personal OS
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium sm:text-sm">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-text-primary hover:underline"
          >
            <span>Live Web App</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary hover:underline"
          >
            <span>Windows Releases</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary hover:underline"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
