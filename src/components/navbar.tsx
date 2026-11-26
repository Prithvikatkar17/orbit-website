"use client";

import React, { useState } from "react";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { APP_URL, APP_VERSION } from "@/lib/config";

const NAV_LINKS = [
  { href: "#preview", label: "Preview" },
  { href: "#features", label: "Features" },
  { href: "#compare", label: "Browser vs. Desktop" },
  { href: "#privacy", label: "Privacy" },
];

export function Navbar() {
  const { resolvedMode, toggleMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left: Custom geometric ORBIT SVG mark + wordmark + v1.0.0 pill */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-text-primary"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect
              x="1.5"
              y="1.5"
              width="25"
              height="25"
              rx="6"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <ellipse
              cx="14"
              cy="14"
              rx="8.5"
              ry="4.2"
              transform="rotate(-30 14 14)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="14" cy="14" r="2.75" fill="var(--accent)" />
            <circle cx="20.2" cy="10.4" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-base font-bold tracking-tight">ORBIT</span>
          <span className="rounded-full border border-border bg-badge-bg px-2 py-0.5 font-mono text-[11px] font-medium text-text-secondary">
            {APP_VERSION}
          </span>
        </a>

        {/* Center: Smooth-scroll links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Light/Dark toggle + Try in Browser CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMode}
            aria-label={
              resolvedMode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              resolvedMode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:bg-surface-elevated"
          >
            {resolvedMode === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-accent bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <span>Try in Browser</span>
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
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:bg-surface-elevated md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile"
          className="border-t border-border bg-surface px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-elevated"
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
                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-accent bg-accent px-3.5 py-2 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
              >
                <span>Try in Browser</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
