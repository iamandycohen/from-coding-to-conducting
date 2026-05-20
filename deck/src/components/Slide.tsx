import React from "react";

export function Slide({
  children,
  className = "",
  hero = false,
}: {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
}) {
  return (
    <section
      className={`relative w-full h-full flex flex-col px-16 py-14 md:px-24 md:py-20 overflow-hidden ${
        hero ? "halo" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[color:var(--fg-soft)] uppercase tracking-[0.25em] text-sm md:text-base font-medium">
      {children}
    </div>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-6xl font-semibold leading-[1.08] tracking-tight">
      {children}
    </h2>
  );
}

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xl md:text-3xl text-[color:var(--fg-soft)] leading-snug max-w-5xl">
      {children}
    </p>
  );
}

export function Accent({
  children,
  color = "accent",
}: {
  children: React.ReactNode;
  color?: "accent" | "accent-2" | "accent-3" | "success" | "danger";
}) {
  const map: Record<string, string> = {
    accent: "text-[color:var(--accent)]",
    "accent-2": "text-[color:var(--accent-2)]",
    "accent-3": "text-[color:var(--accent-3)]",
    success: "text-[color:var(--success)]",
    danger: "text-[color:var(--danger)]",
  };
  return <span className={map[color]}>{children}</span>;
}

export function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-[color:var(--accent)] pl-6 md:pl-8 text-3xl md:text-5xl font-medium leading-snug max-w-5xl">
      {children}
    </blockquote>
  );
}

export function Card({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/70 backdrop-blur p-7 md:p-9 flex flex-col gap-3 min-h-[14rem]">
      <div className="numeral text-[color:var(--accent)] text-xl md:text-2xl">
        {num}
      </div>
      <div className="text-2xl md:text-3xl font-semibold leading-tight">
        {title}
      </div>
      <div className="text-base md:text-lg text-[color:var(--fg-soft)] leading-relaxed">
        {body}
      </div>
    </div>
  );
}

export function TerminalCue({
  command,
  label,
}: {
  command: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--accent)]/40 bg-black/60 p-8 md:p-10 max-w-4xl">
      <div className="text-sm uppercase tracking-[0.25em] text-[color:var(--fg-soft)] mb-4">
        {label}
      </div>
      <div className="font-mono text-2xl md:text-3xl flex items-center gap-3">
        <span className="text-[color:var(--success)]">❯</span>
        <span>{command}</span>
        <span className="inline-block w-3 h-7 bg-[color:var(--accent)] animate-pulse ml-1" />
      </div>
    </div>
  );
}

export function FootNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[color:var(--fg-soft)] text-base md:text-lg">
      {children}
    </div>
  );
}
