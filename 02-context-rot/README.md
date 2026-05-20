# Demo 2 — Context Rot

## What this demo proves

Context is a budget, not a bucket. One agent given everything drifts confidently to the wrong answer. The fix isn't a smarter agent — it's an orchestrator that decides what each sub-agent gets to see.

## What the audience sees

Six framed acts in the terminal:

1. **The story** — an engineer asks: *"What is our production API endpoint?"* The correct answer lives in exactly one doc.
2. **Run 1 — lean context** — agent gets the canonical doc only. Right answer.
3. **Run 2 — stuffed context** — same agent, same question, full 10-doc corpus. An old v2 changelog out-scores the canonical doc because it mentions "production API" and "endpoint" many more times. Agent confidently returns a deprecated endpoint.
4. **The change** — show the orchestrator: 3 lines. Classify the query → filter to that topic → hand the sub-agent a fresh, narrow context.
5. **Run 3 — sub-agent** — same agent code, but the bag is now 2 topic-scoped docs instead of 10. Canonical wins. Right answer.
6. **The lesson** — *Conducting is also deciding what each agent gets to see.*

No live editing. No CI. The drift is real — emerges from a 15-line keyword-density scorer that mimics how real retrieval works.

## What to say BEFORE running

> "Slide 5 named four problems agents have. One of them was context rot — too little context and they guess, too much and they drift. This demo is the drift half. Same agent, same question, two different bags of docs. Watch what happens when we give it everything."

## How to run

1. From the Command Palette: **Tasks: Run Task → Demo 2 — Context Rot**.
2. Stand back.
3. When the lesson appears, hold the silence.

## What to say DURING

When Run 2 returns the wrong answer:

> "Same code. Same question. The bigger bag won the wrong fight. The old v2 changelog mentions 'production API endpoint' eleven times. The canonical doc mentions it once. The agent is doing exactly what it was told — finding the most relevant text. The pile of history just buried the answer."

When the orchestrator code appears:

> "Three lines. Classify. Filter. Delegate. The sub-agent runs the same code as the solo agent — it's just looking at two docs instead of ten."

When Run 3 lands right:

> "Same scorer. Fresh, narrow context. This is what sub-agents are actually for. Not parallelism. Not specialization. **Context hygiene.**"

## What to say AFTER

> "Context is a budget, not a bucket. One agent with everything drifts. Many small agents with scoped context don't. Conducting is also deciding what each agent gets to see."

## Total time

~75 seconds.

## File map

- `docs.ts` — the 10 docs (1 canonical, 1 neighbour, 6 historical/marketing/onboarding noise, 2 off-topic).
- `agent.ts` — `ask(query, bag)` — keyword-density retrieval. Real bias, written honestly.
- `orchestrator.ts` — `orchestrate(query, corpus)` — classify by keyword, filter to topic, delegate to a sub-agent on the scoped bag.
- `run.ts` — the narrator.

## If it breaks

Walk the audience through `agent.ts`: it counts keyword occurrences and picks the doc with the highest sum. That's the whole bias. Then walk `orchestrator.ts`: 3 substantive lines — classify, filter, delegate. The audience can read every line.

## Why this is honest

The drift is not hardcoded. The agent doesn't have a "be wrong on the stuffed run" branch. It does the same thing every time. The output changes because the *input* changed — and that's the whole point of the demo.
