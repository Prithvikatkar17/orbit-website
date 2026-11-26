import React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_URL, APP_VERSION, GITHUB_URL, RELEASES_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer
      className="mt-12 border-t"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className="font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            ORBIT
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[11px]"
            style={{
              backgroundColor: "var(--badge-bg)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {APP_VERSION}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Local-first Personal OS
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium sm:text-sm">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            <span>Live Web App</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>Windows Releases</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
