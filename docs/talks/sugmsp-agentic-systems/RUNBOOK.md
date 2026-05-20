# SUG MSP — Runbook

**Title:** From Coding to Conducting — Orchestrating Agentic Systems in VS Code
**Speaker:** Andy Cohen · iamandycohen.com
**Length:** ~30 min talk + 5 min Q&A

---

## Pre-flight (5 min before)

```bash
cd ~/code/sug-2026-demos
npm run reset                  # restores Demo 2 to broken state
cd deck && npm run dev         # port 3004
```

Open browser to `http://localhost:3004`. Press `f` for fullscreen.

Open a second VS Code window in `~/code/sug-2026-demos` for the demo terminals. Pin three terminal tabs:

1. `npm run demo:1`
2. `npm run demo:2`
3. `npm run demo:3:cli`

Switch your VS Code Copilot to the **Demo Picker - LLM Only** agent for Demo 3.

---

## Slide → action map

| # | Slide | Action |
|---|---|---|
| 1 | Title | Read it. Pause. |
| 2 | ATM / MRI / Conducting | Three cards. Land "conducting." |
| 3 | The Pull | One line. Hold the silence. |
| 4 | Before / After | Read both columns. Point at the proof strip. |
| 5 | Scaffolding (4 quadrant) | Walk all four corners. |
| 6 | Roles | Name each role once. Don't overstay. |
| **7-8-9** | **DEMO 1** | Run `npm run demo:1`. Don't talk over the framing. |
| **10-11-12** | **DEMO 2** | Run `npm run demo:2`. Edit `demo-agent.md` live when prompted. |
| 13 | Decision frame | Read both halves. |
| **14-15-16** | **DEMO 3** | Run LLM agent 3× live. Then `npm run demo:3:cli`. |
| 17 | Sitecore pipeline | "Same shape applies to your stack." |
| 18 | Closer | Read the quote. Let it sit. |
| 19 | Thanks | Q&A. |

---

## Demo files to keep open in editor (proof, if asked)

The portable demos in this repo are **distilled** from the real production system. If someone wants to see the real thing, these are the paths to mention:

- `apps/kajoo-mcp-server/src/tools/migrations/migration-work-decide.ts` — the real strict-schema tool
- `scripts/lint-agent-mcp-call-shapes.mjs` — the real CI lint
- `.agents/agents/1TRK ORCH.agent.md` — the real orchestrator
- `.agents/agents/1TRK EXEC.agent.md` — the real executor
- `scripts/1trk/tracker.ts` — the real deterministic CLI

Branch: `feature/KAJOO-4885` · 684 commits · 40 agent files · 47 skills · 40 migration tools.

If the real repo isn't on the laptop, point at the portable versions in this repo:

- `01-strict-boundary/tool-strict.ts`
- `02-lint-catches-lie/lint.ts`
- `03-skill-vs-cli/picker.ts`

---

## Reset between rehearsals

```bash
npm run reset
```

Demos 1 and 3 are self-contained — they don't mutate files. Only Demo 2 is reset.

---

## If something breaks

- **Dev server died:** `cd deck && npm run dev`
- **Demo 1 weird output:** `cd ~/code/sug-2026-demos && npm install`
- **Demo 2 lint passed when it shouldn't:** `npm run reset`
- **Demo 3 LLM agent missing:** Fall back to reading `03-skill-vs-cli/rules.md` aloud, then `npm run demo:3:cli`.

---

## Closing line (memorize)

> "The new craft is deciding where autonomy belongs, where determinism belongs, and how the boundary between them is enforced. That's conducting."
