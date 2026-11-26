"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

export type OrbitThemeId =
  | "minimalist"
  | "archivist"
  | "futuristic"
  | "naturalist"
  | "midnight"
  | "solar"
  | "monochrome";

export type ColorMode = "light dark" | "light" | "dark";

export interface OrbitThemeMeta {
  id: OrbitThemeId;
  name: string;
  tagline: string;
  swatchLight: string;
  swatchDark: string;
}

export const ORBIT_THEMES: OrbitThemeMeta[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "Crisp neutral slate",
    swatchLight: "#111318",
    swatchDark: "#f2f4f8",
  },
  {
    id: "archivist",
    name: "Archivist",
    tagline: "Warm paper & ink",
    swatchLight: "#9a3412",
    swatchDark: "#e07a5f",
  },
  {
    id: "futuristic",
    name: "Futuristic",
    tagline: "Cyan terminal",
    swatchLight: "#0284c7",
    swatchDark: "#22d3ee",
  },
  {
    id: "naturalist",
    name: "Naturalist",
    tagline: "Sage & forest",
    swatchLight: "#245c36",
    swatchDark: "#6ee79a",
  },
  {
    id: "midnight",
    name: "Midnight",
    tagline: "Obsidian & indigo",
    swatchLight: "#4338ca",
    swatchDark: "#818cf8",
  },
  {
    id: "solar",
    name: "Solar",
    tagline: "Warm amber & sand",
    swatchLight: "#b45309",
    swatchDark: "#f59e0b",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    tagline: "Pure editorial B&W",
    swatchLight: "#000000",
    swatchDark: "#ffffff",
  },
];

interface ThemeContextValue {
  theme: OrbitThemeId;
  setTheme: (theme: OrbitThemeId) => void;
  cycleTheme: () => OrbitThemeMeta;
  mode: ColorMode;
  resolvedMode: "light" | "dark";
  toggleMode: () => "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_CHANGE_EVENT = "orbit-theme-sync";

function isValidTheme(value: string | null): value is OrbitThemeId {
  return ORBIT_THEMES.some((t) => t.id === value);
}

function getSystemDarkSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeSystemDark(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getThemeSnapshot(): OrbitThemeId {
  try {
    const stored = localStorage.getItem("orbit-theme");
    return isValidTheme(stored) ? stored : "minimalist";
  } catch {
    return "minimalist";
  }
}

function getModeSnapshot(): ColorMode {
  try {
    const stored = localStorage.getItem("color-scheme");
    return stored === "light" || stored === "dark" ? stored : "light dark";
  } catch {
    return "light dark";
  }
}

function applyThemeToDom(theme: OrbitThemeId, mode: ColorMode) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.colorScheme = mode;
  document.documentElement.style.colorScheme = mode;
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.setAttribute("content", mode);
  }
}

function subscribeThemeStore(callback: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === "orbit-theme" || e.key === "color-scheme") {
      applyThemeToDom(getThemeSnapshot(), getModeSnapshot());
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemDark = useSyncExternalStore(
    subscribeSystemDark,
    getSystemDarkSnapshot,
    () => false
  );

  const theme = useSyncExternalStore<OrbitThemeId>(
    subscribeThemeStore,
    getThemeSnapshot,
    () => "minimalist"
  );

  const mode = useSyncExternalStore<ColorMode>(
    subscribeThemeStore,
    getModeSnapshot,
    () => "light dark"
  );

  const resolvedMode: "light" | "dark" =
    mode === "light"
      ? "light"
      : mode === "dark"
      ? "dark"
      : systemDark
      ? "dark"
      : "light";

  const setTheme = useCallback(
    (nextTheme: OrbitThemeId) => {
      try {
        localStorage.setItem("orbit-theme", nextTheme);
      } catch {
        // Ignore
      }
      applyThemeToDom(nextTheme, mode);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    },
    [mode]
  );

  const cycleTheme = useCallback(() => {
    const idx = ORBIT_THEMES.findIndex((t) => t.id === theme);
    const next = ORBIT_THEMES[(idx + 1) % ORBIT_THEMES.length];
    setTheme(next.id);
    return next;
  }, [theme, setTheme]);

  const toggleMode = useCallback((): "light" | "dark" => {
    const currentlyDark = resolvedMode === "dark";
    const target: "light" | "dark" = currentlyDark ? "light" : "dark";
    const sysDark = getSystemDarkSnapshot();
    const matchesSystem = (target === "dark") === sysDark;
    const nextMode: ColorMode = matchesSystem ? "light dark" : target;

    try {
      if (matchesSystem) {
        localStorage.removeItem("color-scheme");
      } else {
        localStorage.setItem("color-scheme", target);
      }
    } catch {
      // Ignore
    }
    applyThemeToDom(theme, nextMode);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    return target;
  }, [resolvedMode, theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        mode,
        resolvedMode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
