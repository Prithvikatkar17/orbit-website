"use client";

import React from "react";
import {
  ArrowUpRight,
  Download,
  ChevronRight,
  ShieldCheck,
  Palette,
} from "lucide-react";
import { ORBIT_THEMES, useTheme } from "./theme-provider";
import { CrosshairCorners } from "./section-header";
import { APP_URL, RELEASES_URL } from "@/lib/config";

export function Hero() {
  const { theme, setTheme, resolvedMode } = useTheme();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-medium tracking-wide text-text-secondary">
          <span
            className="h-2 w-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span>100% Local-First · Zero Cloud · Zero Subscriptions</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Your Personal OS, Living Entirely on Your Device.
        </h1>

        {/* Subcopy */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          ORBIT unifies Inbox triage, Tasks, Habit heatmaps, Calendar, Personal
          Library, and Daily Expenses (
          <span className="font-mono font-semibold text-text-primary">₹</span>{" "}
          INR paise precision) with 0ms offline speed—no account, no telemetry,
          no monthly fee.
        </p>

        {/* Interactive 7-Theme Switcher Bar */}
        <div className="relative mx-auto mt-8 rounded-xl border border-border bg-surface p-3">
          <CrosshairCorners />
          <div className="mb-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-text-secondary">
            <Palette className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Test ORBIT&apos;s 7 live themes right here:</span>
          </div>
          <div
            role="radiogroup"
            aria-label="ORBIT theme personality"
            className="flex flex-wrap items-center justify-center gap-1.5"
          >
            {ORBIT_THEMES.map((item) => {
              const active = theme === item.id;
              const swatch =
                resolvedMode === "dark" ? item.swatchDark : item.swatchLight;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTheme(item.id)}
                  title={`${item.name} — ${item.tagline}`}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-border bg-surface-elevated text-text-primary hover:bg-surface-hover"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                      active ? "border-accent-fg" : "border-border"
                    }`}
                    style={{ backgroundColor: swatch }}
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Action Buttons */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Primary: Try Live in Browser */}
          <div className="flex flex-col items-stretch">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent bg-accent px-5 py-3.5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              <span>Try Live in Browser (No Install)</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-2 text-xs text-text-secondary">
              Works instantly on phone, Mac, or any browser · Offline IndexedDB
            </p>
          </div>

          {/* Secondary: Download for Windows */}
          <div className="flex flex-col items-stretch">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-elevated"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download for Windows (.exe)</span>
            </a>
            <p className="mt-2 text-xs text-text-secondary">
              Windows 10/11 (64-bit) · Native{" "}
              <code className="font-mono">orbit.sqlite</code> vault
            </p>
          </div>
        </div>

        {/* Honest SmartScreen Helper Accordion */}
        <div className="mx-auto mt-6 max-w-xl text-left">
          <details className="orbit-accordion rounded-lg border border-border bg-surface">
            <summary className="flex items-center gap-2 px-4 py-3 text-xs font-medium text-text-primary transition-colors hover:bg-surface-elevated sm:text-sm">
              <ChevronRight
                className="accordion-chevron h-4 w-4 shrink-0 text-text-secondary"
                aria-hidden="true"
              />
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>
                First time installing an open-source{" "}
                <code className="font-mono">.exe</code>?
              </span>
            </summary>
            <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-text-secondary sm:text-sm">
              Because ORBIT is independently built and open-source without a
              paid corporate EV code-signing certificate, Windows SmartScreen
              may show{" "}
              <strong className="text-text-primary">
                &ldquo;Windows protected your PC&rdquo;
              </strong>{" "}
              on first launch. Click{" "}
              <strong className="text-text-primary">
                More info → Run anyway
              </strong>{" "}
              to launch the installer cleanly, or use the Browser PWA with zero
              installation.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
