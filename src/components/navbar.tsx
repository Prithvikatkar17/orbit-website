"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";
import { APP_URL } from "@/lib/config";

const NAV_LINKS = [
  { href: "#sanctuary", label: "Daily Flow" },
  { href: "#why-local", label: "Why Local" },
  { href: "#download", label: "Download" },
];

const MODE_EVENT = "orbit-daylight-mode-change";

function getModeSnapshot(): "light" | "dark" {
  try {
    return localStorage.getItem("orbit-daylight-mode") === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function subscribeMode(cb: () => void): () => void {
  window.addEventListener(MODE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(MODE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mode = useSyncExternalStore<"light" | "dark">(
    subscribeMode,
    getModeSnapshot,
    () => "light"
  );

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.mode = next;
    try {
      localStorage.setItem("orbit-daylight-mode", next);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(MODE_EVENT));
  };

  return (
    <header className="fixed inset-x-0 top-5 z-50 mx-auto w-[calc(100%-2rem)] max-w-4xl">
      <div className="flex items-center justify-between gap-4 rounded-full border border-white/90 bg-white/75 px-6 py-3 shadow-[0_12px_32px_rgba(28,25,23,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-stone-900/75 dark:shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        {/* Left: Warm ORBIT emblem + wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-stone-900 dark:text-stone-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-stone-800">
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
                stroke="currentColor"
                strokeOpacity="0.45"
                strokeWidth="1.6"
              />
              <circle cx="14" cy="14" r="3.2" fill="#D97706" />
              <circle cx="21" cy="9.8" r="1.5" fill="#059669" />
            </svg>
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            ORBIT
          </span>
        </a>

        {/* Center: 3 Friendly Links */}
        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-900/5 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Day/Night Toggle Pill + Open My Journal CTA */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleMode}
            aria-label={
              mode === "dark" ? "Switch to Daylight mode" : "Switch to Cozy Night mode"
            }
            title={
              mode === "dark" ? "Switch to Daylight mode" : "Switch to Cozy Night mode"
            }
            className="tactile-pill inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-stone-700 transition-transform hover:scale-105 dark:text-stone-200"
          >
            {mode === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-stone-700" aria-hidden="true" />
            )}
          </button>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-stone-50 shadow-[0_6px_16px_rgba(28,25,23,0.2)] transition-all hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white sm:inline-flex"
          >
            <span>Open My Journal</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="tactile-pill inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-stone-700 md:hidden dark:text-stone-200"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Frosted Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile"
          className="tactile-glass mt-2.5 rounded-3xl p-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-900/5 dark:text-stone-200 dark:hover:bg-white/10"
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
                className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-stone-50 dark:bg-stone-100 dark:text-stone-900"
              >
                <span>Open My Journal</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
