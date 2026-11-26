"use client";

import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { APP_URL, APP_VERSION } from "@/lib/config";

const NAV_LINKS = [
  { href: "#preview", label: "Workspace" },
  { href: "#features", label: "Modules" },
  { href: "#architecture", label: "Architecture" },
  { href: "#editions", label: "Editions" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 mx-auto w-[calc(100%-2rem)] max-w-3xl">
      <div className="flex items-center justify-between gap-4 rounded-full border border-white/[0.09] bg-zinc-950/70 px-5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Left: ORBIT mark + wordmark + version */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-50"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.05]">
            <svg
              width="17"
              height="17"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <ellipse
                cx="14"
                cy="14"
                rx="9.5"
                ry="4.5"
                transform="rotate(-30 14 14)"
                stroke="rgba(248,250,252,0.75)"
                strokeWidth="1.6"
              />
              <circle cx="14" cy="14" r="3" fill="#38bdf8" />
              <circle cx="21" cy="9.8" r="1.4" fill="#f8fafc" />
            </svg>
          </span>
          <span className="text-sm font-bold tracking-tight text-slate-50">
            ORBIT
          </span>
          <span className="rounded-full border border-white/[0.09] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-medium text-slate-400">
            {APP_VERSION}
          </span>
        </a>

        {/* Center: Clean Nav Links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Pill CTA + Mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-all hover:border-sky-400/40 hover:bg-white/[0.13] sm:inline-flex"
          >
            <span>Launch Web App</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.05] text-slate-200 transition-colors hover:bg-white/[0.1] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile"
          className="mt-2 rounded-2xl border border-white/[0.09] bg-zinc-950/90 p-3 shadow-2xl shadow-black/80 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.09] px-4 py-2 text-xs font-semibold text-white"
              >
                <span>Launch Web App</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
