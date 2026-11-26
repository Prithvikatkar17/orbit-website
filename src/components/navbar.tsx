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
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left: Custom geometric ORBIT SVG mark + wordmark + v1.0.0 pill */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
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
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[11px] font-medium"
            style={{
              backgroundColor: "var(--badge-bg)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {APP_VERSION}
          </span>
        </a>

        {/* Center: Smooth-scroll links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--surface-elevated)]"
              style={{ color: "var(--text-secondary)" }}
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
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border transition-colors hover:bg-[var(--surface-elevated)]"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
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
            className="hidden items-center gap-1.5 rounded-md border px-3.5 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90 sm:inline-flex"
            style={{
              backgroundColor: "var(--accent)",
              borderColor: "var(--accent)",
              color: "var(--accent-fg)",
            }}
          >
            <span>Try in Browser</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border md:hidden"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer (solid surface, crisp 1px border, zero blur) */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile"
          className="border-t px-4 py-3 md:hidden"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-[var(--surface-elevated)]"
                  style={{ color: "var(--text-primary)" }}
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
                className="flex w-full items-center justify-center gap-1.5 rounded-md border px-3.5 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--accent)",
                  color: "var(--accent-fg)",
                }}
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
