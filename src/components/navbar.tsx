"use client";

import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { APP_URL, APP_VERSION } from "@/lib/config";

const NAV_LINKS = [
  { href: "#preview", label: "Workspace" },
  { href: "#architecture", label: "Architecture" },
  { href: "#editions", label: "Editions" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 mx-auto w-[calc(100%-2rem)] max-w-3xl">
      <div className="flex items-center justify-between gap-4 rounded-full border border-white/[0.14] bg-slate-900/65 px-5 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_50px_-15px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        {/* Left: Glowing ORBIT mark + wordmark + v1.0.0 glass badge */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.16] bg-white/[0.06] shadow-[0_0_18px_rgba(56,189,248,0.35)]">
            <svg
              width="18"
              height="18"
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
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="1.6"
              />
              <circle cx="14" cy="14" r="3" fill="#38bdf8" />
              <circle cx="21" cy="9.8" r="1.5" fill="#818cf8" />
            </svg>
          </span>
          <span className="text-sm font-bold tracking-tight text-white">
            ORBIT
          </span>
          <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium text-slate-300">
            {APP_VERSION}
          </span>
        </a>

        {/* Center: 3 Clean Nav Links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Sleek Pill CTA + Mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/[0.18] bg-white/[0.09] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-all hover:border-sky-400/40 hover:bg-white/[0.15] sm:inline-flex"
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
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-slate-200 transition-colors hover:bg-white/[0.12] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Glass Popover Menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile"
          className="mt-2 rounded-2xl border border-white/[0.14] bg-slate-900/90 p-3 shadow-2xl shadow-black/80 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
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
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/[0.18] bg-white/[0.1] px-4 py-2 text-xs font-semibold text-white"
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
