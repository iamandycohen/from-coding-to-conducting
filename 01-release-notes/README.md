# Demo 1 — Release Notes

## What this demo proves

One free-running agent guesses. Three small roles plus a checker compose. Same input — twenty-ish commits — produces messy noise in the first case and a clean shippable artifact in the second. This is conducting in 60 seconds.

## What the audience sees

Five framed acts in the terminal:

1. **The story** — engineering wants release notes. Constraints: ≤ 8 items, ≤ 80 chars each, three user-facing categories, no internal noise.
2. **The bad run** — one agent, free-running. Output sprawls to 17 items across 7 invented categories, includes internal commits, has an item that runs three terminal lines. Checker prints six red violations.
3. **The change** — replace the one agent with `orchestrator → executor → checker`. Three lines, each with one job.
4. **The good run** — same commits, same checker. Eight items, three categories, all under width. Checker green.
5. **The lesson** — *Conducting is deciding where the boundary goes — and putting the non-negotiable parts in code.*

No live editing. No CI. No defensive coding tricks. Just the boundary itself, demonstrated.

## What to say BEFORE running

> "Engineering wants release notes from the sprint's commits. They've given us hard constraints — max items, max length, three categories, no internal noise. The first time we did this, we handed the whole job to one agent. Watch what happens."

## How to run

1. From the Command Palette: **Tasks: Run Task → Demo 1 — Release Notes**.
2. Stand back. The framing carries it.
3. When the lesson appears, hold the silence.

## What to say DURING

When the bad run prints the violations:

> "Six violations. Nothing is *wrong* with what the agent did — it summarized everything. That's the problem. Without a boundary, an agent does its whole job *and yours too*."

When the change frame appears:

> "Three roles. Each one small. The orchestrator decides what gets considered. The executor handles one category at a time. The checker is the contract — it runs on both runs, and it doesn't care whose work it is."

When the good run lands clean:

> "Same twenty commits. Same checker. The work didn't get smarter — the *shape* got smaller. Each piece does one job, and the boundaries between them are where reliability lives."

## What to say AFTER

> "One agent guesses. Roles plus a checker compose. Conducting is deciding where the boundary goes — and putting the non-negotiable parts in code."

## Total time

~60 seconds.

## File map

- `data.ts` — the 17 commits and the constraints (`MAX_ITEMS`, `MAX_CHARS`, allowed categories).
- `agent-solo.ts` — the one-shot agent. Plausible, polite, no boundary.
- `pipeline.ts` — `orchestrate()`, `executeCategory()`, `check()`, `conductedNotes()`. Read all four out loud if asked — none is more than 20 lines.
- `run.ts` — the narrator.

## If it breaks

Open `pipeline.ts`. Read the three functions in order. The point is the *shape*: classify, do, verify. The exact implementations are placeholders for whatever your real domain needs.
