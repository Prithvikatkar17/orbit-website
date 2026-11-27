/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface WorldScreenshot {
  id: string;
  src: string;
  alt: string;
  pillLabel: string;
  title: string;
  subtitle: string;
  route: string;
  themeBadge: string;
  moduleBadge: string;
  accentHex: string;
  ambientPrimaryClass: string;
  ambientSecondaryClass: string;
}

const WORLDS: WorldScreenshot[] = [
  {
    id: "dashboard-midnight",
    src: "/screenshots/dashboard-midnight.png",
    alt: "ORBIT Dashboard in Midnight Observatory Dark theme showing Celestial Radar Dome and Living Star Constellation Habits",
    pillLabel: "🌙 Midnight",
    title: "Observatory Meridian",
    subtitle:
      "Dashboard, Celestial Radar Dome & Living Star Constellation Habits",
    route: "orbit.local/",
    themeBadge: "Midnight · Dark",
    moduleBadge: "Dashboard",
    accentHex: "#818cf8",
    ambientPrimaryClass: "bg-indigo-500/20",
    ambientSecondaryClass: "bg-amber-400/10",
  },
  {
    id: "expenses-archivist",
    src: "/screenshots/expenses-archivist.png",
    alt: "ORBIT Expenses in Archivist Ex Libris Light theme showing sunlit paper ledger and ₹ INR paise precision",
    pillLabel: "📜 Archivist",
    title: "Ex Libris Orbit",
    subtitle:
      "Sunlit Paper Ledger, 3-Second ₹ INR Quick Log & Monthly Budget Pacing",
    route: "orbit.local/expenses",
    themeBadge: "Archivist · Light",
    moduleBadge: "₹ Expenses",
    accentHex: "#1b4332",
    ambientPrimaryClass: "bg-emerald-800/15",
    ambientSecondaryClass: "bg-amber-500/15",
  },
  {
    id: "habits-naturalist",
    src: "/screenshots/habits-naturalist.png",
    alt: "ORBIT Habits in Naturalist 34°N Conservatory Dark theme showing botanical aesthetic and 180-day habit heatmaps",
    pillLabel: "🌿 Naturalist",
    title: "34°N Conservatory",
    subtitle:
      "Botanical Glasshouse & 180-Day Clickable Habit Ritual Heatmaps",
    route: "orbit.local/habits",
    themeBadge: "Naturalist · Dark",
    moduleBadge: "Habits",
    accentHex: "#10b981",
    ambientPrimaryClass: "bg-emerald-500/20",
    ambientSecondaryClass: "bg-teal-400/10",
  },
  {
    id: "command-futuristic",
    src: "/screenshots/command-futuristic.png",
    alt: "ORBIT Command Deck in Futuristic Dark theme showing ⌘K Telemetry and two-key g-chord navigation",
    pillLabel: "⚡ Futuristic",
    title: "SYS.SEARCH // 60Hz Realtime",
    subtitle:
      "Instant ⌘K Telemetry, `>` Command Mode & Two-Key g-Chord Navigation",
    route: "orbit.local/⌘K",
    themeBadge: "Futuristic · Dark",
    moduleBadge: "Command Mode",
    accentHex: "#00f0ff",
    ambientPrimaryClass: "bg-cyan-500/20",
    ambientSecondaryClass: "bg-sky-400/10",
  },
  {
    id: "library-solar",
    src: "/screenshots/library-solar.png",
    alt: "ORBIT Personal Library in Solar Warm Sand theme showing curated books, articles, and reading notes",
    pillLabel: "☀️ Solar",
    title: "Kinfolk Reading Room",
    subtitle:
      "Warm Alabaster & Terracotta Personal Library, Quotes & Book Highlights",
    route: "orbit.local/library",
    themeBadge: "Solar · Light",
    moduleBadge: "Library",
    accentHex: "#c86d51",
    ambientPrimaryClass: "bg-amber-500/20",
    ambientSecondaryClass: "bg-orange-400/15",
  },
  {
    id: "tasks-minimalist",
    src: "/screenshots/tasks-minimalist.png",
    alt: "ORBIT Tasks in Minimalist Crisp Daylight Slate theme showing Dieter Rams inspired task execution ledger",
    pillLabel: "⚪ Minimalist",
    title: "Architectural Ledger",
    subtitle:
      "Dieter Rams & Swiss Typography Task Execution with Signal-Orange Accents",
    route: "orbit.local/tasks",
    themeBadge: "Minimalist · Light",
    moduleBadge: "Tasks",
    accentHex: "#ff3b00",
    ambientPrimaryClass: "bg-orange-500/15",
    ambientSecondaryClass: "bg-stone-400/15",
  },
  {
    id: "insights-monochrome",
    src: "/screenshots/insights-monochrome.png",
    alt: "ORBIT Insights in Monochrome Pure Editorial B&W theme showing high-contrast personal analytics",
    pillLabel: "✒️ Monochrome",
    title: "Editorial Carbon",
    subtitle:
      "Pure Black & White High-Contrast Weekly Insights & Consistency Metrics",
    route: "orbit.local/insights",
    themeBadge: "Monochrome · Dark",
    moduleBadge: "Insights",
    accentHex: "#e5e5e5",
    ambientPrimaryClass: "bg-stone-500/20",
    ambientSecondaryClass: "bg-stone-300/10",
  },
];

export function ScreenshotGallery() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const maxTranslateRef = useRef<number>(0);

  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeIndex = Math.min(6, Math.floor(progress * 7));
  const activeWorld = WORLDS[activeIndex];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const measureTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    maxTranslateRef.current = Math.max(0, track.scrollWidth - window.innerWidth);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    measureTrack();
    let rafId = 0;

    const updateScroll = () => {
      rafId = 0;
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const rect = outer.getBoundingClientRect();
      const scrollable = outer.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const raw = -rect.top / scrollable;
      const clamped = Math.max(0, Math.min(1, raw));

      track.style.transform = `translate3d(-${clamped * maxTranslateRef.current}px, 0, 0)`;
      setProgress(clamped);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    const onResize = () => {
      measureTrack();
      updateScroll();
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, measureTrack]);

  const scrollToWorld = (index: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const scrollable = outer.offsetHeight - window.innerHeight;
    const targetProgress = index / (WORLDS.length - 1);
    const targetScrollY = outerTop + targetProgress * scrollable;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % WORLDS.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + WORLDS.length) % WORLDS.length
        );
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const lightboxWorld = lightboxIndex !== null ? WORLDS[lightboxIndex] : null;

  return (
    <section
      id="screenshots"
      aria-labelledby="screenshots-heading"
      className="scroll-mt-24 pb-16 sm:pb-24"
    >
      {/* Desktop Sticky Vertical-to-Horizontal Scroll Track */}
      {!reducedMotion && (
        <div ref={outerRef} className="relative hidden h-[380vh] md:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            {/* Dynamic Ambient Backlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
              <div
                className={`absolute left-1/4 top-1/4 h-80 w-80 rounded-full blur-[120px] transition-colors duration-700 ${activeWorld.ambientPrimaryClass}`}
              />
              <div
                className={`absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full blur-[120px] transition-colors duration-700 ${activeWorld.ambientSecondaryClass}`}
              />
            </div>

            {/* Header + 7-Theme Progress Bar Pill Strip */}
            <div className="mx-auto mb-6 w-full max-w-6xl px-6">
              <div className="mb-4 text-center">
                <h2
                  id="screenshots-heading"
                  className="font-serif text-3xl font-medium tracking-tight text-stone-900 lg:text-4xl dark:text-stone-50"
                >
                  Seven atmospheric worlds. One calm vault.
                </h2>
                <p className="mx-auto mt-1.5 max-w-xl text-sm text-stone-600 dark:text-stone-300">
                  Scroll down to glide through all 7 real ORBIT themes at 2×
                  Retina—or click any theme pill to jump directly.
                </p>
              </div>

              <div className="mx-auto max-w-4xl">
                <div
                  role="tablist"
                  aria-label="7 Themes of ORBIT"
                  className="flex flex-wrap items-center justify-center gap-2"
                >
                  {WORLDS.map((w, idx) => {
                    const active = idx === activeIndex;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => scrollToWorld(idx)}
                        className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                          active
                            ? "bg-stone-900 text-stone-50 shadow-md dark:bg-stone-100 dark:text-stone-900"
                            : "tactile-pill text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
                        }`}
                      >
                        {w.pillLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Thin Progress Bar */}
                <div className="mx-auto mt-3 h-1 max-w-md overflow-hidden rounded-full bg-stone-200/80 dark:bg-white/10">
                  <div
                    className="h-full rounded-full transition-[background-color] duration-500"
                    style={{
                      width: `${Math.max(4, progress * 100)}%`,
                      backgroundColor: activeWorld.accentHex,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Horizontal Flex Track */}
            <div
              ref={trackRef}
              style={{ willChange: "transform" }}
              className="flex items-center gap-10 pl-[calc((100vw-min(78vw,980px))/2)] pr-[calc((100vw-min(78vw,980px))/2)]"
            >
              {WORLDS.map((world, idx) => {
                const isCentered = idx === activeIndex;
                return (
                  <div
                    key={world.id}
                    className={`w-[78vw] max-w-[980px] shrink-0 transition-all duration-300 ${
                      isCentered
                        ? "scale-100 opacity-100"
                        : "scale-[0.96] opacity-75"
                    }`}
                  >
                    <div className="tactile-glass overflow-hidden rounded-[28px] p-2.5 shadow-[0_32px_90px_-20px_rgba(28,25,23,0.18)] sm:p-3.5 dark:shadow-[0_32px_90px_-20px_rgba(0,0,0,0.65)]">
                      <div className="overflow-hidden rounded-[20px] border border-stone-200/70 bg-stone-950 dark:border-white/10">
                        {/* Window Chrome */}
                        <div className="flex items-center justify-between border-b border-stone-200/70 bg-stone-100/90 px-4 py-2 text-xs dark:border-white/10 dark:bg-stone-900/90">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                            <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                            <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                            <span className="ml-2 font-mono text-[11px] text-stone-500 dark:text-stone-400">
                              {world.route}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-[11px] font-medium text-stone-700 dark:bg-white/10 dark:text-stone-200">
                              {world.themeBadge}
                            </span>
                            <button
                              type="button"
                              onClick={() => setLightboxIndex(idx)}
                              aria-label={`Zoom ${world.title}`}
                              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
                            >
                              <Maximize2
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              <span>Zoom</span>
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setLightboxIndex(idx)}
                          aria-label={`Open ${world.title} in full-screen lightbox`}
                          className="block w-full cursor-zoom-in overflow-hidden text-left"
                        >
                          <img
                            src={world.src}
                            alt={world.alt}
                            className="aspect-[16/10] w-full object-cover object-top"
                          />
                        </button>
                      </div>

                      {/* Caption Bar */}
                      <div className="flex items-center justify-between gap-4 px-3 pb-1 pt-3">
                        <div>
                          <div className="font-serif text-base font-medium text-stone-900 dark:text-stone-50">
                            {world.title}
                          </div>
                          <div className="text-xs text-stone-600 dark:text-stone-300">
                            {world.subtitle}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-stone-700 dark:border-white/10 dark:bg-stone-800/80 dark:text-stone-200">
                          {world.moduleBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile / Reduced-Motion Native Snap Carousel Fallback */}
      <div className={`${reducedMotion ? "block" : "block md:hidden"} px-4`}>
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <h2
            id={reducedMotion ? "screenshots-heading" : undefined}
            className="font-serif text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50"
          >
            Seven atmospheric worlds. One calm vault.
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            Swipe sideways to inspect all 7 real ORBIT themes.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {WORLDS.map((world, idx) => (
            <div
              key={world.id}
              className="w-[88vw] max-w-[640px] shrink-0 snap-center"
            >
              <div className="tactile-glass overflow-hidden rounded-3xl p-2.5">
                <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-950 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Zoom ${world.title}`}
                    className="block w-full cursor-zoom-in"
                  >
                    <img
                      src={world.src}
                      alt={world.alt}
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
                  <div className="min-w-0">
                    <div className="truncate font-serif text-sm font-medium text-stone-900 dark:text-stone-50">
                      {world.title}
                    </div>
                    <div className="truncate text-xs text-stone-600 dark:text-stone-300">
                      {world.themeBadge}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-stone-700 dark:border-white/10 dark:bg-stone-800 dark:text-stone-200">
                    {world.moduleBadge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen 2× Retina Lightbox */}
      {lightboxWorld && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxWorld.title} screenshot`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-stone-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-stone-200">
              <div>
                <div className="font-serif text-base font-medium text-white">
                  {lightboxWorld.title}
                </div>
                <div className="text-xs text-stone-400">
                  {lightboxWorld.themeBadge} · {lightboxWorld.route}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + WORLDS.length) % WORLDS.length
                    )
                  }
                  aria-label="Previous theme screenshot"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % WORLDS.length)
                  }
                  aria-label="Next theme screenshot"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close lightbox"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <img
              src={lightboxWorld.src}
              alt={lightboxWorld.alt}
              className="max-h-[82vh] w-full object-contain bg-stone-950"
            />
          </div>
        </div>
      )}
    </section>
  );
}
