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
import { APP_URL, RELEASES_URL } from "@/lib/config";

export function Hero() {
  const { theme, setTheme, resolvedMode } = useTheme();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium tracking-wide"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
            aria-hidden="true"
          />
          <span>100% Local-First · Zero Cloud · Zero Subscriptions</span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ color: "var(--text-primary)", lineHeight: 1.08 }}
        >
          Your Personal OS, Living Entirely on Your Device.
        </h1>

        {/* Subcopy */}
        <p
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          ORBIT unifies Inbox triage, Tasks, Habit heatmaps, Calendar, Personal
          Library, and Daily Expenses (<span className="font-mono font-semibold">₹</span>{" "}
          INR paise precision) with 0ms offline speed—no account, no telemetry,
          no monthly fee.
        </p>

        {/* Interactive 7-Theme Switcher Bar */}
        <div
          className="mx-auto mt-8 rounded-xl border p-3"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mb-2.5 flex items-center justify-center gap-1.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
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
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: active
                      ? "var(--accent)"
                      : "var(--surface-elevated)",
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    color: active ? "var(--accent-fg)" : "var(--text-primary)",
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full border"
                    style={{
                      backgroundColor: swatch,
                      borderColor: active
                        ? "var(--accent-fg)"
                        : "var(--border)",
                    }}
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
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                borderColor: "var(--accent)",
                color: "var(--accent-fg)",
              }}
            >
              <span>Try Live in Browser (No Install)</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Works instantly on phone, Mac, or any browser · Offline IndexedDB
            </p>
          </div>

          {/* Secondary: Download for Windows */}
          <div className="flex flex-col items-stretch">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-[var(--surface-elevated)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download for Windows (.exe)</span>
            </a>
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Windows 10/11 (64-bit) · Native{" "}
              <code className="font-mono">orbit.sqlite</code> vault
            </p>
          </div>
        </div>

        {/* Honest SmartScreen Helper Accordion */}
        <div className="mx-auto mt-6 max-w-xl text-left">
          <details
            className="orbit-accordion rounded-lg border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <summary
              className="flex items-center gap-2 px-4 py-3 text-xs font-medium sm:text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              <ChevronRight
                className="accordion-chevron h-4 w-4 shrink-0"
                style={{ color: "var(--text-secondary)" }}
                aria-hidden="true"
              />
              <ShieldCheck
                className="h-4 w-4 shrink-0"
                style={{ color: "var(--accent)" }}
                aria-hidden="true"
              />
              <span>
                First time installing an open-source{" "}
                <code className="font-mono">.exe</code>?
              </span>
            </summary>
            <div
              className="border-t px-4 py-3 text-xs leading-relaxed sm:text-sm"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              Because ORBIT is independently built and open-source without a
              paid corporate EV code-signing certificate, Windows SmartScreen
              may show{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                &ldquo;Windows protected your PC&rdquo;
              </strong>{" "}
              on first launch. Click{" "}
              <strong style={{ color: "var(--text-primary)" }}>
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
