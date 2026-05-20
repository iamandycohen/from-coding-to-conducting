# Speaker cheat sheet

One-glance reference for stage. Don't read this aloud — these are *triggers*.

---

## Opening (slides 1–3)

> "I want to start with two scenes. In one, you walk up to an ATM. You don't tell it how to count cash. You tell it what you want. In the other, you go in for an MRI. Highly trained operator, but a machine is doing the actual reading."

> "Those are the two poles. **Conducting** is the third thing. You're not coding the cells. You're not pushing buttons. You're shaping a system of agents and deterministic tools so that the right thing happens, reliably, at scale."

> "And here's the pull on all of us…" → click to slide 3.

---

## Demo 1 transition (slide 6 → 7)

> "We're going to look at three real failures and three small defenses. The first one is the smallest. Three characters."

(Run `npm run demo:1`. Don't talk over the framing.)

After lesson lands:

> "Doc rot is real. The tool schema is the contract the agent cannot talk past."

---

## Demo 2 transition (slide 9 → 10)

> "Runtime is good. But by then the lie has shipped — it's checked into your agent files, copied across sub-agents, read by future agents as fact. The system has to defend itself from the agents that write it."

(Run `npm run demo:2`. Live-edit the file when prompted.)

After lesson:

> "Agent prose that lies about a tool cannot land on master."

---

## Demo 3 transition (slide 13 → 14)

> "Two engines. Same rules. Same tracker. One reads the rules in English. One reads them in TypeScript. Watch which one drifts."

(Switch to **Demo Picker - LLM Only**. Ask "what's next?" 3 times. Get variance.)

(Run `npm run demo:3:cli`. Get the same answer 3 times.)

> "A workflow described to an agent is still being interpreted. A workflow encoded in code is enforced."

---

## Sitecore moment (slide 17)

> "Same shape applies to your stack. Author intent goes in at the top, gets routed by agents, executed by Sitecore MCP tools, validated by deterministic checks, lands as content. Every boundary in that pipeline is a place where you can choose — autonomy or determinism."

---

## Closer (slide 18, memorize)

> "The new craft is deciding where autonomy belongs, where determinism belongs, and how the boundary between them is enforced. That's conducting."

(Two-beat silence. Then click to thanks.)

---

## Ten soundbites (drop whenever they fit)

1. "Three characters: `.strict()`."
2. "Doc rot is real."
3. "The tool schema is the contract the agent cannot talk past."
4. "The system defends itself from the agents that write it."
5. "Agent prose that lies about a tool cannot land on master."
6. "A workflow described is still being interpreted. A workflow encoded is enforced."
7. "Smaller agents. Stricter boundaries. More deterministic tools."
8. "Autonomy where it pays. Determinism where it must."
9. "You're not coding the cells. You're conducting the orchestra."
10. "The new craft is deciding where the boundary goes."

---

## If someone asks "is this real?"

Yes. The proof strip on slide 4 has the numbers. The runbook has the file paths. The portable demos are distilled — they remove project-specific noise so the shape is visible in 45 seconds. The full thing is in `feature/KAJOO-4885`.

## If someone asks "what stack?"

VS Code agent customization (custom modes, instruction files, skills, MCP servers) + a 40-tool MCP server we built in-house + a deterministic TypeScript CLI for state. Everything is in code; nothing is in prompt-only.

## If someone asks "did the agents actually write this?"

Mostly yes. 684 commits over 8 weeks. The orchestrator/executor pattern. I'm the conductor. The repo is the proof.
