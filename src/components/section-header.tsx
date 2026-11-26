import React from "react";

interface SectionHeaderProps {
  indexLabel: string;
  headingId: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({
  indexLabel,
  headingId,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <div className="mb-2.5 inline-block rounded border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wider text-text-secondary">
        {indexLabel}
      </div>
      <h2
        id={headingId}
        className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-text-secondary sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

export function CrosshairCorners() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1.5 -top-2.5 select-none font-mono text-xs text-border"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1.5 -top-2.5 select-none font-mono text-xs text-border"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2.5 -left-1.5 select-none font-mono text-xs text-border"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2.5 -right-1.5 select-none font-mono text-xs text-border"
      >
        +
      </span>
    </>
  );
}
