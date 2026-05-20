# Demo 1 — Strict Boundary

## What this demo proves

A three-character change at a tool boundary — `.strict()` — turns silent agent hallucinations into loud, catchable failures.

## What the audience sees

Five framed acts in the terminal: the problem, a tool that swallows a typo and returns success, a tiny diff that adds a strict zod schema, the same input now caught at the boundary with a red error, and a one-paragraph lesson. The whole thing runs itself — the screen narrates.

## What to say BEFORE running

> "Agents fabricate arguments. Not occasionally — routinely. The question isn't whether your tools will be called with garbage. The question is whether they'll notice."

## How to run

1. From the Command Palette: **Tasks: Run Task → Demo 1 — Strict Boundary**.
2. Stand back. Let the framing carry it.
3. When the lesson appears, hold the silence for two beats before talking.

## What to say DURING

When the "BAD RUN" frame shows `processed task: undefined`:

> "The tool returned success. Nothing happened. The agent moves on. Three weeks later somebody's wondering why this task never ran."

When the "GOOD RUN" frame catches the typo:

> "Same input. Same agent. Same hallucination. Caught."

## What to say AFTER

> "We added this to every tool input in the production system. The next week we caught dozens of these. None of them shipped. Three characters."

## Total time

~45 seconds.

## If it breaks

Open `01-strict-boundary/tool-loose.ts` and `tool-strict.ts` side by side in the editor. Read the difference out loud — the `.strict()` is the whole point. Then describe what would have happened in each case.
