# SUG Minneapolis 2026 — Live Demos

> Three small, self-contained demos for the talk **"From Coding to Conducting: Building with Agentic Systems."**

Each demo runs in the integrated terminal and narrates itself on screen. Run them in order during the talk.

## What this is

Three concrete patterns, distilled from a real production codebase (a Sitecore XP → XM Cloud migration platform built around agents and MCP tools), boiled down so each one fits on a single screen:

1. **Strict Boundary** — A three-character change at a tool's input schema catches agent hallucinations the instant they happen.
2. **Lint Catches the Lie** — Agent prose (instructions, sub-agent files) can reference tool arguments that don't exist. A small CI lint stops that prose from shipping.
3. **Skill vs CLI** — When the rules of a workflow live in English, an LLM interprets them and the answer drifts. When the same rules live in TypeScript, a function executes them and the answer is the same every time.

## Prerequisites

- Node 20 or newer
- VS Code with the GitHub Copilot Chat extension

## First-time setup

```bash
cd ~/code/sug-2026-demos
npm install
code .
```

Verify everything works:

```bash
npm run demo:1
npm run demo:2   # press Enter at the prompt to skip the live-edit beat
npm run demo:3:cli
```

In VS Code, verify the chat customization files are visible:

- Open the chat panel, click the agent picker — **Demo Picker - LLM Only** should appear (from [.github/agents/demo-picker-llm.agent.md](.github/agents/demo-picker-llm.agent.md)).
- In a chat, type `/` — the **demo-picker-cli** skill should appear in the list (from [.github/skills/demo-picker-cli/SKILL.md](.github/skills/demo-picker-cli/SKILL.md)).

## Pre-talk checklist

- [ ] Open this workspace in VS Code on the presentation laptop.
- [ ] Run `npm install`.
- [ ] Run all three demos once to warm up Node and tsx.
- [ ] Run `./02-lint-catches-lie/RESET.sh` to make sure Demo 2 is in its broken-on-purpose state.
- [ ] Enable Zen Mode: `Cmd+K Z` / `Ctrl+K Z`.
- [ ] Disable Copilot inline suggestions (the autocomplete ghost text reads as "AI helping you" — wrong story for this talk).
- [ ] Set integrated terminal font size if 18 isn't right for the projector (`terminal.integrated.fontSize` in [.vscode/settings.json](.vscode/settings.json)).
- [ ] Open the chat panel and confirm the agent picker shows **Demo Picker - LLM Only**.
- [ ] Type `/` in a chat and confirm **demo-picker-cli** is listed.

## Run order during the talk

**Demo 1 → Demo 2 → Demo 3.** This is the arc:

- Demo 1 shows the runtime defense.
- Demo 2 shows the same defense moved to commit time.
- Demo 3 zooms out: the whole question of whether an LLM should be interpreting the rules at all.

Each demo is wrapped as a VS Code task. Run it from the Command Palette: **Tasks: Run Task → Demo N — …**

## Fallback if something breaks

| Demo | If it breaks |
|------|-------------|
| 1 | Open [01-strict-boundary/tool-loose.ts](01-strict-boundary/tool-loose.ts) and [01-strict-boundary/tool-strict.ts](01-strict-boundary/tool-strict.ts) side by side. Read the diff aloud. |
| 2 | If the keypress doesn't register, just narrate "pretend I fixed it" and re-run `npm run demo:2`. Reset with `./02-lint-catches-lie/RESET.sh`. |
| 3 | If the LLM converges on the same answer, name it: "Lucky — *the reason it can converge is the same reason it can drift.*" Then proceed to the CLI side. |

## Honesty disclosure

This is a boiled-down version of patterns from a real production codebase. The real version has dozens of tools using the same `.strict()` pattern, the same lint running in CI, and the same orchestrator/executor split. The demos here trim it to the bone so the point fits on one screen.

## Layout

```
.
├── _lib/frame.ts                                  # shared visual framing
├── 01-strict-boundary/                            # Demo 1
├── 02-lint-catches-lie/                           # Demo 2
├── 03-skill-vs-cli/                               # Demo 3
├── deck/                                          # the slide deck (Next.js)
├── .github/
│   ├── agents/demo-picker-llm.agent.md            # LLM-driven picker
│   └── skills/demo-picker-cli/SKILL.md            # CLI-wrapping skill
└── .vscode/                                       # tasks + stage-friendly settings
```

## The slide deck

The actual deck for the talk lives in [deck/](deck/) — a small Next.js app with keyboard nav, gradient hero slides, and server-rendered code highlighting. From the workspace root:

```bash
cd deck
npm install
npm run dev
```

Then press `f` to go fullscreen. See [deck/README.md](deck/README.md) for everything else.

For the underlying research, see [presentation-intelligence-brief.md](presentation-intelligence-brief.md). For per-demo presenter scripts, open the `README.md` in each numbered folder.
