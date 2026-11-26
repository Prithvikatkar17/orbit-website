"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useWorkspace } from "./workspace-context";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

export function KeyboardHud() {
  const { cycleTheme, toggleMode } = useTheme();
  const {
    setActiveTab,
    lastChord,
    setLastChord,
    scrollToPreview,
    openCommandPalette,
  } = useWorkspace();

  const [gArmed, setGArmed] = useState(false);
  const gTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearArmed = () => {
      setGArmed(false);
      if (gTimerRef.current) {
        clearTimeout(gTimerRef.current);
        gTimerRef.current = null;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K works anywhere
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        clearArmed();
        openCommandPalette();
        setLastChord({
          keys: "[⌘K]",
          detail: "Focused Command Palette in 0.1ms",
        });
        return;
      }

      if (isEditableTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      if (key === "/") {
        e.preventDefault();
        clearArmed();
        openCommandPalette();
        setLastChord({
          keys: "[/]",
          detail: "Focused Command Palette in 0.1ms",
        });
        return;
      }

      if (gArmed) {
        clearArmed();
        if (key === "e") {
          e.preventDefault();
          setActiveTab("expenses");
          scrollToPreview();
          setLastChord({
            keys: "[g] → [e]",
            detail: "Opened Expenses in 0.1ms",
          });
        } else if (key === "i") {
          e.preventDefault();
          setActiveTab("inbox");
          scrollToPreview();
          setLastChord({
            keys: "[g] → [i]",
            detail: "Opened Inbox Triage in 0.1ms",
          });
        } else if (key === "h") {
          e.preventDefault();
          setActiveTab("habits");
          scrollToPreview();
          setLastChord({
            keys: "[g] → [h]",
            detail: "Opened Habit Heatmap in 0.1ms",
          });
        } else if (key === "t") {
          e.preventDefault();
          const next = cycleTheme();
          setLastChord({
            keys: "[g] → [t]",
            detail: `Theme → ${next.name}`,
          });
        } else if (key === "m") {
          e.preventDefault();
          const nextMode = toggleMode();
          setLastChord({
            keys: "[g] → [m]",
            detail: `Mode → ${nextMode === "dark" ? "Dark" : "Light"}`,
          });
        }
        return;
      }

      if (key === "g") {
        setGArmed(true);
        if (gTimerRef.current) clearTimeout(gTimerRef.current);
        gTimerRef.current = setTimeout(() => {
          setGArmed(false);
          gTimerRef.current = null;
        }, 800);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (gTimerRef.current) clearTimeout(gTimerRef.current);
    };
  }, [
    gArmed,
    openCommandPalette,
    setActiveTab,
    scrollToPreview,
    setLastChord,
    cycleTheme,
    toggleMode,
  ]);

  return (
    <aside
      aria-label="Keyboard shortcut engine status"
      className="fixed bottom-4 right-4 z-50 hidden sm:block"
    >
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-text-primary"
      >
        <Terminal className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        {gArmed ? (
          <span>
            <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-[11px] font-semibold text-accent">
              g
            </kbd>{" "}
            <span className="text-text-secondary">
              → press e / i / h / t / m
            </span>
          </span>
        ) : lastChord ? (
          <span>
            <span className="font-semibold text-accent">{lastChord.keys}</span>{" "}
            <span className="text-text-secondary">· {lastChord.detail}</span>
          </span>
        ) : (
          <span className="text-text-secondary">
            Press{" "}
            <kbd className="rounded border border-border bg-surface-elevated px-1 py-0.5 text-[11px] text-text-primary">
              ⌘K
            </kbd>{" "}
            or{" "}
            <kbd className="rounded border border-border bg-surface-elevated px-1 py-0.5 text-[11px] text-text-primary">
              g+t
            </kbd>{" "}
            to test keyboard engine
          </span>
        )}
      </div>
    </aside>
  );
}
