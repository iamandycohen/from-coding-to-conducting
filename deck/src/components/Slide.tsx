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

export function ProofStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 pt-4 border-t border-[color:var(--border)] text-xs md:text-sm text-[color:var(--fg-soft)] font-mono opacity-70 truncate">
      Proof: {children}
    </div>
  );
}

export function Author({
  name,
  url,
  event,
}: {
  name: string;
  url: string;
  event: string;
}) {
  return (
    <div className="mt-auto flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[color:var(--fg-soft)] text-base md:text-lg">
      <span className="text-[color:var(--fg)] text-lg md:text-xl font-medium">
        {name}
      </span>
      <span className="opacity-30">·</span>
      <a
        href={`https://${url}`}
        className="hover:text-[color:var(--accent)] transition-colors"
      >
        {url}
      </a>
      <span className="opacity-30">·</span>
      <span className="numeral">{event}</span>
    </div>
  );
}

export function Quadrant({
  items,
}: {
  items: {
    eyebrow: string;
    title: string;
    body: string;
    color?: "accent" | "accent-2" | "accent-3" | "danger";
  }[];
}) {
  const colorMap: Record<string, string> = {
    accent: "border-[color:var(--accent)]/40 text-[color:var(--accent)]",
    "accent-2":
      "border-[color:var(--accent-2)]/40 text-[color:var(--accent-2)]",
    "accent-3":
      "border-[color:var(--accent-3)]/40 text-[color:var(--accent-3)]",
    danger: "border-[color:var(--danger)]/40 text-[color:var(--danger)]",
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full max-w-7xl">
      {items.map((it, i) => {
        const cls = colorMap[it.color ?? "accent"];
        const [borderCls, textCls] = cls.split(" ");
        return (
          <div
            key={i}
            className={`rounded-2xl border ${borderCls} bg-[color:var(--bg-soft)]/60 p-6 md:p-7 flex flex-col gap-3`}
          >
            <div
              className={`uppercase tracking-widest text-xs ${textCls} font-mono`}
            >
              {it.eyebrow}
            </div>
            <div className="text-xl md:text-2xl font-semibold leading-snug">
              {it.title}
            </div>
            <div className="text-sm md:text-base text-[color:var(--fg-soft)] leading-relaxed">
              {it.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TwoCol({
  left,
  right,
}: {
  left: { eyebrow: string; lines: React.ReactNode[] };
  right: { eyebrow: string; lines: React.ReactNode[] };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-7xl">
      <div className="rounded-2xl border border-[color:var(--accent-2)]/40 bg-[color:var(--bg-soft)]/60 p-7 md:p-9 flex flex-col gap-4">
        <div className="uppercase tracking-widest text-xs text-[color:var(--accent-2)] font-mono">
          {left.eyebrow}
        </div>
        <ul className="space-y-3 text-lg md:text-xl leading-snug">
          {left.lines.map((l, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[color:var(--accent-2)] mt-1">—</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-[color:var(--accent)]/40 bg-[color:var(--bg-soft)]/60 p-7 md:p-9 flex flex-col gap-4">
        <div className="uppercase tracking-widest text-xs text-[color:var(--accent)] font-mono">
          {right.eyebrow}
        </div>
        <ul className="space-y-3 text-lg md:text-xl leading-snug">
          {right.lines.map((l, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[color:var(--accent)] mt-1">—</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RolesDiagram() {
  const roles = [
    {
      label: "Orchestrator",
      sub: "decides what should happen next",
      color: "var(--accent-2)",
    },
    {
      label: "Executor",
      sub: "performs one bounded task",
      color: "var(--accent)",
    },
    {
      label: "MCP tool",
      sub: "gives the agent facts or actions",
      color: "var(--accent-3)",
    },
    {
      label: "Deterministic workflow",
      sub: "handles what must not drift",
      color: "var(--success)",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 w-full max-w-7xl">
      {roles.map((r, i) => (
        <div
          key={i}
          className="rounded-2xl bg-[color:var(--bg-soft)]/60 p-5 md:p-6 flex flex-col gap-2 border"
          style={{ borderColor: `color-mix(in srgb, ${r.color} 40%, transparent)` }}
        >
          <div
            className="uppercase tracking-widest text-xs font-mono"
            style={{ color: r.color }}
          >
            {i === 3 ? "code" : "agent"}
          </div>
          <div className="text-xl md:text-2xl font-semibold leading-tight">
            {r.label}
          </div>
          <div className="text-sm md:text-base text-[color:var(--fg-soft)] leading-relaxed">
            {r.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Demo narration primitives
// ─────────────────────────────────────────────────────────────

export function Panel({
  eyebrow,
  title,
  children,
  accent = "neutral",
  mono = false,
  className = "",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  accent?: "neutral" | "danger" | "success" | "accent" | "accent-2" | "accent-3";
  mono?: boolean;
  className?: string;
}) {
  const borderMap: Record<string, string> = {
    neutral: "border-[color:var(--border)]",
    danger: "border-[color:var(--danger)]/50",
    success: "border-[color:var(--success)]/50",
    accent: "border-[color:var(--accent)]/40",
    "accent-2": "border-[color:var(--accent-2)]/40",
    "accent-3": "border-[color:var(--accent-3)]/40",
  };
  const eyeColorMap: Record<string, string> = {
    neutral: "text-[color:var(--fg-soft)]",
    danger: "text-[color:var(--danger)]",
    success: "text-[color:var(--success)]",
    accent: "text-[color:var(--accent)]",
    "accent-2": "text-[color:var(--accent-2)]",
    "accent-3": "text-[color:var(--accent-3)]",
  };
  return (
    <div
      className={`rounded-2xl border ${borderMap[accent]} bg-[color:var(--bg-soft)]/60 p-6 md:p-7 flex flex-col gap-3 ${className}`}
    >
      {eyebrow && (
        <div
          className={`uppercase tracking-widest text-xs font-mono ${eyeColorMap[accent]}`}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div className="text-lg md:text-xl font-semibold leading-snug">
          {title}
        </div>
      )}
      <div
        className={
          mono
            ? "font-mono text-sm md:text-base text-[color:var(--fg)]/90 leading-relaxed whitespace-pre-wrap"
            : "text-base md:text-lg text-[color:var(--fg-soft)] leading-relaxed"
        }
      >
        {children}
      </div>
    </div>
  );
}

export function Pill({
  variant = "neutral",
  children,
}: {
  variant?: "violation" | "check" | "neutral" | "danger" | "success";
  children: React.ReactNode;
}) {
  const map: Record<string, { ring: string; text: string; mark: string }> = {
    violation: {
      ring: "border-[color:var(--danger)]/60 bg-[color:var(--danger)]/10",
      text: "text-[color:var(--danger)]",
      mark: "✗",
    },
    danger: {
      ring: "border-[color:var(--danger)]/60 bg-[color:var(--danger)]/10",
      text: "text-[color:var(--danger)]",
      mark: "",
    },
    check: {
      ring: "border-[color:var(--success)]/60 bg-[color:var(--success)]/10",
      text: "text-[color:var(--success)]",
      mark: "✓",
    },
    success: {
      ring: "border-[color:var(--success)]/60 bg-[color:var(--success)]/10",
      text: "text-[color:var(--success)]",
      mark: "",
    },
    neutral: {
      ring: "border-[color:var(--border)] bg-[color:var(--bg-soft)]/40",
      text: "text-[color:var(--fg-soft)]",
      mark: "",
    },
  };
  const v = map[variant];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm md:text-base font-medium ${v.ring} ${v.text}`}
    >
      {v.mark && <span className="font-bold">{v.mark}</span>}
      <span>{children}</span>
    </span>
  );
}

export function PillRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>{children}</div>
  );
}

export function ScoreRow({
  label,
  score,
  max,
  variant = "neutral",
  note,
}: {
  label: string;
  score: number;
  max: number;
  variant?: "winner-wrong" | "winner-right" | "neutral";
  note?: string;
}) {
  const pct = Math.max(2, Math.round((score / max) * 100));
  const colorMap = {
    "winner-wrong": "bg-[color:var(--danger)]",
    "winner-right": "bg-[color:var(--success)]",
    neutral: "bg-[color:var(--fg-soft)]/40",
  };
  const labelColor = {
    "winner-wrong": "text-[color:var(--danger)]",
    "winner-right": "text-[color:var(--success)]",
    neutral: "text-[color:var(--fg-soft)]",
  };
  return (
    <div className="grid grid-cols-[12rem_1fr_auto] items-center gap-4">
      <div className={`font-mono text-sm md:text-base ${labelColor[variant]}`}>
        {label}
      </div>
      <div className="h-3 rounded-full bg-[color:var(--bg-soft)]/80 overflow-hidden border border-[color:var(--border)]">
        <div
          className={`h-full ${colorMap[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div
        className={`font-mono text-sm md:text-base tabular-nums w-16 text-right ${labelColor[variant]}`}
      >
        {score}
        {note && (
          <span className="ml-2 text-xs uppercase tracking-widest opacity-70">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

export function DocChip({
  id,
  topic,
  highlight = "neutral",
}: {
  id: string;
  topic: string;
  highlight?: "neutral" | "danger" | "success" | "dim";
}) {
  const map = {
    neutral: "border-[color:var(--border)] text-[color:var(--fg)]",
    danger:
      "border-[color:var(--danger)]/60 bg-[color:var(--danger)]/10 text-[color:var(--danger)]",
    success:
      "border-[color:var(--success)]/60 bg-[color:var(--success)]/10 text-[color:var(--success)]",
    dim: "border-[color:var(--border)] opacity-40 text-[color:var(--fg-soft)]",
  };
  return (
    <div
      className={`rounded-xl border px-4 py-3 flex flex-col gap-1 ${map[highlight]}`}
    >
      <div className="font-mono text-sm md:text-base">{id}</div>
      <div className="text-xs uppercase tracking-widest text-[color:var(--fg-soft)]">
        {topic}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Context decay primitives — visualize what happens to a
// system prompt as tool output dominates context across turns.
// ─────────────────────────────────────────────────────────────

export type ContextSegmentKind =
  | "instructions"
  | "conversation"
  | "tool-output"
  | "summarized"
  | "free";

const CTX_COLOR: Record<ContextSegmentKind, string> = {
  instructions: "bg-[color:var(--accent)]",
  conversation: "bg-[color:var(--accent-2)]",
  "tool-output": "bg-[color:var(--accent-3)]",
  summarized:
    "bg-[repeating-linear-gradient(45deg,_var(--fg-soft)_0,_var(--fg-soft)_4px,_transparent_4px,_transparent_8px)] opacity-50",
  free: "bg-[color:var(--bg-soft)]/40",
};

const CTX_LABEL: Record<ContextSegmentKind, string> = {
  instructions: "instructions",
  conversation: "conversation",
  "tool-output": "tool output",
  summarized: "[summarized]",
  free: "free",
};

export function ContextBar({
  turn,
  segments,
  note,
  noteVariant = "neutral",
  warn = false,
}: {
  turn: number;
  segments: { kind: ContextSegmentKind; pct: number }[];
  note?: string;
  noteVariant?: "neutral" | "danger" | "success" | "dim";
  warn?: boolean;
}) {
  const noteColor =
    noteVariant === "danger"
      ? "text-[color:var(--danger)]"
      : noteVariant === "success"
        ? "text-[color:var(--success)]"
        : noteVariant === "dim"
          ? "text-[color:var(--fg-soft)]/60"
          : "text-[color:var(--fg)]";
  return (
    <div className="grid grid-cols-[5rem_1fr_22rem] items-center gap-4">
      <div className="font-mono text-xs md:text-sm uppercase tracking-widest text-[color:var(--fg-soft)]">
        turn {turn}
      </div>
      <div className="h-6 md:h-7 rounded-md border border-[color:var(--border)] overflow-hidden flex">
        {segments.map((s, i) => (
          <div
            key={i}
            className={`${CTX_COLOR[s.kind]} h-full`}
            style={{ width: `${s.pct}%` }}
            title={CTX_LABEL[s.kind]}
          />
        ))}
      </div>
      <div
        className={`text-sm md:text-base font-mono leading-snug ${noteColor}`}
      >
        {warn && <span className="text-[color:var(--danger)] mr-2">⚠</span>}
        {note}
      </div>
    </div>
  );
}

export function ContextLegend() {
  const items: { kind: ContextSegmentKind; label: string }[] = [
    { kind: "instructions", label: "instructions" },
    { kind: "conversation", label: "conversation" },
    { kind: "tool-output", label: "tool output" },
    { kind: "summarized", label: "[summarized]" },
    { kind: "free", label: "free" },
  ];
  return (
    <div className="flex flex-wrap gap-4 text-sm text-[color:var(--fg-soft)]">
      {items.map((i) => (
        <div key={i.kind} className="flex items-center gap-2">
          <span
            className={`inline-block w-4 h-4 rounded-sm border border-[color:var(--border)] ${CTX_COLOR[i.kind]}`}
          />
          <span className="font-mono">{i.label}</span>
        </div>
      ))}
    </div>
  );
}
