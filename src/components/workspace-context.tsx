"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";

export type PreviewTab = "expenses" | "inbox" | "habits" | "command";

export interface ChordHudState {
  keys: string;
  detail: string;
}

interface WorkspaceContextValue {
  activeTab: PreviewTab;
  setActiveTab: (tab: PreviewTab) => void;
  commandInputRef: React.RefObject<HTMLInputElement | null>;
  lastChord: ChordHudState | null;
  setLastChord: (chord: ChordHudState | null) => void;
  scrollToPreview: () => void;
  openCommandPalette: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<PreviewTab>("expenses");
  const [lastChord, setLastChord] = useState<ChordHudState | null>(null);
  const commandInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToPreview = useCallback(() => {
    const el = document.getElementById("preview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openCommandPalette = useCallback(() => {
    setActiveTab("command");
    scrollToPreview();
    requestAnimationFrame(() => {
      setTimeout(() => {
        commandInputRef.current?.focus();
      }, 120);
    });
  }, [scrollToPreview]);

  return (
    <WorkspaceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        commandInputRef,
        lastChord,
        setLastChord,
        scrollToPreview,
        openCommandPalette,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return ctx;
}
