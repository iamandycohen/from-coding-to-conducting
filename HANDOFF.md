# Handoff — Build the SUG Minneapolis Talk Demos

> **Read this whole file before starting.** Then read `presentation-intelligence-brief.md` (in this folder) for the talk's themes and the underlying evidence.

You are an AI coding agent. Your job is to build a small, standalone VS Code workspace containing **three live demos** for a Sitecore User Group Minneapolis talk titled **"From Coding to Conducting: Building with Agentic Systems."**

The demos illustrate three concrete points from `presentation-intelligence-brief.md`. They will be run **live on stage, inside VS Code**, by a senior developer. They must be polished, isolated, reproducible, and honest — no smoke, no mirrors, no fake LLM output.

---

## 1. Context

- **Speaker:** senior dev at a Sitecore-focused consultancy; brand new to public speaking but deep technical fluency.
- **Audience:** mixed — Sitecore developers, architects, content strategists, a few marketers. Lean technical.
- **Venue:** Sitecore User Group Minneapolis. Likely 30-60 minutes total talk + Q&A.
- **Talk thesis:** AI didn't reduce the work; it reshaped it. The job moved up the stack — from writing code to building scaffolding for systems that decide what code to run.
- **Source repository the talk references:** `~/code/Kajoo.V2` (private, Sitecore XP→XM Cloud migration platform). The brief in this folder summarizes the evidence from that codebase. The **demos do NOT depend on that repo** — they are standalone, boiled-down versions of the same patterns.

The three demos correspond to three specific themes from the brief:

| Demo | Brief theme | Brief section reference |
|------|-------------|-------------------------|
| 1. Strict boundary | "Tools as control surfaces" + "Doc rot" | §4 Theme 6, §10 Demo A |
| 2. Lint catches the lie | Same theme, extended to commit-time defense | §10 Demo A (extended) |
| 3. Skill vs CLI | "Deterministic vs agentic" + "Orchestrator/executor split" | §4 Themes 7 & 8, §10 Demo B |

---

## 2. Where to build

Create a **new standalone workspace** at:

```
~/code/sug-2026-demos/
```

Initialize as a fresh git repo at the end (`git init`, initial commit). Do not push anywhere; the speaker will push it manually before the talk if they choose.

Do **not** modify `~/code/Kajoo.V2` in any way during this task.

---

## 3. What to build — complete spec

### 3.1 Workspace root

```
sug-2026-demos/
  README.md
  package.json
  tsconfig.json
  .gitignore
  .vscode/
    settings.json
    tasks.json
    extensions.json
  .github/
    chatmodes/
      Demo Picker - LLM Only.chatmode.md
      Demo Picker - CLI Wrapper.chatmode.md
  _lib/
    frame.ts
  01-strict-boundary/
    README.md
    tool-loose.ts
    tool-strict.ts
    call-with-typo.ts
    run.ts
  02-lint-catches-lie/
    README.md
    demo-agent.md
    demo-agent.fixed.md
    lint.ts
    run.ts
    RESET.sh
  03-skill-vs-cli/
    README.md
    tracker.demo.yaml
    rules.md
    picker.ts
    run-cli.ts
```

### 3.2 `package.json`

Minimal. Dependencies:
- `zod` — for the strict schema demo (use whatever recent stable; ^3.23 is fine)
- `picocolors` — terminal coloring
- `js-yaml` — to parse `tracker.demo.yaml`
- `tsx` — to run TypeScript directly (dev dep)
- `@types/js-yaml`, `@types/node` (dev deps)

Scripts:
```json
{
  "demo:1": "tsx 01-strict-boundary/run.ts",
  "demo:2": "tsx 02-lint-catches-lie/run.ts",
  "demo:3:cli": "tsx 03-skill-vs-cli/run-cli.ts"
}
```

Name: `sug-2026-demos`. Private: true. Type: `module`. Node engine: `>=20`.

### 3.3 `tsconfig.json`

Standard Node ESM TypeScript config. Strict mode on. Target ES2022. Module NodeNext. Resolution NodeNext. No emit (tsx handles execution).

### 3.4 `.vscode/settings.json`

Workspace-scoped settings for stage readability:
- `editor.fontSize: 18`
- `terminal.integrated.fontSize: 18`
- `editor.minimap.enabled: false`
- `workbench.colorTheme: "Default Dark+"` (high contrast for projector)
- `editor.renderWhitespace: "none"`
- `editor.wordWrap: "on"`
- `breadcrumbs.enabled: false`

### 3.5 `.vscode/tasks.json`

Three tasks, one per demo, with `presentation.clear: true` and `presentation.focus: true` so each launch gives a clean terminal:

```json
{
  "version": "2.0.0",
  "tasks": [
    { "label": "Demo 1 — Strict Boundary", "type": "shell", "command": "npm run demo:1", "presentation": { "clear": true, "focus": true, "panel": "dedicated" }, "problemMatcher": [] },
    { "label": "Demo 2 — Lint Catches the Lie", "type": "shell", "command": "npm run demo:2", "presentation": { "clear": true, "focus": true, "panel": "dedicated" }, "problemMatcher": [] },
    { "label": "Demo 3 — CLI Engine", "type": "shell", "command": "npm run demo:3:cli", "presentation": { "clear": true, "focus": true, "panel": "dedicated" }, "problemMatcher": [] }
  ]
}
```

### 3.6 `.vscode/extensions.json`

Recommend `github.copilot-chat` (needed for demo 3's chat agents).

### 3.7 `_lib/frame.ts` — shared visual primitives

Picocolors-based section framing. Exports:

- `section(title: string)` — prints a cyan-bordered header
- `info(line: string)` — dim white, no icon
- `warn(line: string)` — yellow `⚠ ` prefix
- `fail(line: string)` — red `✗ ` prefix, line in red
- `success(line: string)` — green `✓ ` prefix
- `lesson(text: string)` — final framed "THE LESSON" block in bold
- `pause(ms = 800)` — optional `await pause()` between acts so the audience can read

Width: 56 chars. Sections always have a blank line before and after. Pad title with two spaces left.

Example output:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  THE PROBLEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Agents fabricate arguments. Tools that accept
  anything will silently swallow the lie.
```

### 3.8 Demo 1 — `01-strict-boundary/`

**Point:** show what happens when a tool's input schema isn't strict, then show the three-character fix.

Files:

- `tool-loose.ts` — exports `runTask(input: unknown)`. Uses `z.object({ taskId: z.string() })` without `.strict()`. Parses and returns `processed task: ${parsed.taskId}`. (When called with `{ tasdkId: "abc-123" }`, will print `processed task: undefined`.)
- `tool-strict.ts` — same but `z.object({...}).strict()`. Throws `ZodError` on unknown keys.
- `call-with-typo.ts` — defines the fabricated input `const fabricated = { tasdkId: "abc-123" }`. Exports a `callLoose()` and `callStrict()` function.
- `run.ts` — the five-act narrator:
  1. **THE PROBLEM**: prints framed explanation.
  2. **THE BAD RUN**: shows the input, calls loose tool, prints `success: "processed task: undefined"`, prints a yellow warning "The tool returned success. The work did not happen."
  3. **THE CHANGE**: shows the diff (use simple `-` / `+` lines), highlights `.strict()`.
  4. **THE GOOD RUN**: shows the input, calls strict tool inside try/catch, catches ZodError, prints red `✗ Unrecognized key(s) in object: 'tasdkId'`, then green "The lie was caught at the boundary."
  5. **THE LESSON**: bolded — "Three characters. Every tool input in the production system now does this. We caught dozens of hallucinations the next week. None of them shipped."

  Between acts, `await pause(800)` so the room can read.

- `README.md` — presenter script. See §4 for the format.

### 3.9 Demo 2 — `02-lint-catches-lie/`

**Point:** the defense isn't just at runtime. It's at commit time. A lint script catches an agent prose file that references a tool argument that doesn't exist.

Files:

- `demo-agent.md` — a small Markdown file shaped like an agent prompt. Contains a section that calls a `migration-work-decide` tool with arguments including a fabricated field `outcomeStatus`. (Define this as if it's the real argument the agent thinks exists.) See template below.
- `demo-agent.fixed.md` — corrected version with the right argument name (`outcome.status` or similar). Used by `RESET.sh`.
- `lint.ts` — a ~50-line lint script. It:
  1. Defines an inline "tool schema registry" with the real allowed argument names for `migration-work-decide` (mock: `["kind", "key", "payload", "expect"]`).
  2. Scans the target Markdown file for code-fence blocks calling that tool.
  3. Extracts JSON-like arguments from those blocks.
  4. Reports any unknown top-level keys as a lint error with line numbers.
  5. Exits 1 on any error, 0 on success.
  Do NOT use a real Markdown parser — line-by-line regex is fine and easier to follow on stage.
- `run.ts` — the five-act narrator:
  1. **THE PROBLEM**: explains "agent prose can reference tool args that don't exist."
  2. **THE BAD RUN**: shows the offending lines in `demo-agent.md` (cat them with line numbers), runs `lint.ts` on it, captures and prints the red error.
  3. **THE CHANGE**: prints "Fix the agent file (live, in VS Code)" — *the speaker actually edits the file in VS Code at this point*. The script `await`s a stdin keypress before continuing. (Use `process.stdin.once('data', ...)` with raw mode, or simpler: prompt "Press Enter when fixed".)
  4. **THE GOOD RUN**: re-runs `lint.ts`, prints green success.
  5. **THE LESSON**: "This runs in CI. Agent prose that references arguments that don't exist cannot land on master. The system defends itself from the agents that write it."
- `RESET.sh` — `cp demo-agent.fixed.md demo-agent.md` — restores the broken state so the demo can be rehearsed repeatedly.
- `README.md` — presenter script.

Template for `demo-agent.md` (intentionally broken — the lint should catch `outcomeStatus`):

````markdown
# Sub-agent: Finding Closer

You close one finding at a time. When done, record the result.

## Recording the outcome

Call the `migration-work-decide` tool with:

```json
{
  "kind": "finding",
  "key": "abc-123",
  "payload": { "shipped": true },
  "outcomeStatus": "shipped"
}
```

This marks the finding as closed.
````

The `outcomeStatus` field is the bug. The real tool only accepts `kind`, `key`, `payload`, `expect`. The fixed version drops `outcomeStatus` and moves the value into `payload.status` or similar.

### 3.10 Demo 3 — `03-skill-vs-cli/`

**Point:** same rules, two engines — one interprets English (LLM), one executes TypeScript. Watch the LLM drift, watch the CLI stay still.

Files:

- `tracker.demo.yaml` — five findings, rigged so the "next" decision has a real tie:

  ```yaml
  findings:
    - id: A-fix-button-styling
      status: planned
      sizing: S
      blocked: false
    - id: B-rename-fields
      status: planned
      sizing: S
      blocked: false
    - id: C-extract-helper
      status: planned
      sizing: M
      blocked: false
    - id: D-remove-dead-code
      status: planned
      sizing: S
      blocked: true
    - id: E-doc-cleanup
      status: shipped
      sizing: S
      blocked: false
  ```

- `rules.md` — three rules in plain English. Deliberately omits a tiebreaker:

  ```markdown
  # Pick the next finding

  Given a tracker, return one finding ID.

  Rules, in order:
  1. Only consider findings with status `planned`.
  2. Exclude any finding where `blocked: true`.
  3. Prefer the smallest sizing (S before M before L).
  ```

  A and B are a real tie under these rules. The CLI tiebreaks on insertion order; the LLM has to invent something.

- `picker.ts` — deterministic engine, ~25 lines. Loads tracker, filters by rule 1, filters by rule 2, sorts by sizing rank, breaks ties on insertion order, returns the first ID. Exported as `pickNext(yamlPath: string): string`.

- `run-cli.ts` — the framed narrator:
  1. **THE PROBLEM** frame: explains "when rules live in English, interpretation drifts. We're going to show both engines."
  2. **THE LLM ENGINE** frame: prints instructions — "Switch chat mode to `Demo Picker - LLM Only`. Ask: 'what's next?'. Repeat three times. Watch for variance."
  3. **THE CHANGE** frame: shows the picker.ts code (cat it with syntax-ish highlighting via picocolors).
  4. **THE CLI ENGINE** frame: calls `pickNext()` three times in a loop, printing each result. Same every time.
  5. **THE LESSON**: bolded — "Same rules. Same tracker file. The only thing that changed is whether a language model interpreted the rules in English, or a function executed them in code. The agents got smaller. The system got reliable."

- `README.md` — presenter script. Must include the exact chat-mode switch keystrokes and what to say while running the LLM agent three times.

### 3.11 Chat-mode agents — `.github/chatmodes/`

Two custom VS Code chat-mode files. These follow the modern VS Code chat customization format. Each file has YAML frontmatter + a body prompt.

**`Demo Picker - LLM Only.chatmode.md`:**

```markdown
---
description: Pick the next finding from a tracker using natural language rules.
tools:
  - readFile
---

You are a finding picker.

Read the rules at `03-skill-vs-cli/rules.md` and the tracker at `03-skill-vs-cli/tracker.demo.yaml`. Apply the rules. Return exactly one finding ID and nothing else. No explanation, no prose, no bullet points. Just the ID.
```

**`Demo Picker - CLI Wrapper.chatmode.md`:**

```markdown
---
description: Pick the next finding by running the deterministic picker CLI.
tools:
  - runInTerminal
---

You are a finding picker. You have one job: run the command below and return its output verbatim.

Command: `npm run demo:3:cli`

Do not reason about the tracker. Do not interpret the rules. Run the command, return the last line of its output (which is the finding ID).
```

If VS Code's chat-mode tool naming differs from `readFile`/`runInTerminal` at build time, use whatever the current convention is. The point is: agent 1 has only file reading; agent 2 has only terminal execution.

### 3.12 `README.md` (top-level)

Must include:

1. **What this is** — one paragraph, the talk + the three demos.
2. **Prerequisites** — Node 20+, VS Code with Copilot Chat extension.
3. **First-time setup** — `npm install`, open in VS Code, verify the two chat modes appear in the chat mode picker.
4. **Pre-talk checklist** — concrete actions to do *before* presenting:
   - Open this workspace in VS Code
   - Run `npm install`
   - Run all three demos once to warm up Node/tsx
   - Enable Zen Mode (`Cmd+K Z` / `Ctrl+K Z`)
   - Disable Copilot inline suggestions
   - Set integrated terminal to your zoom of choice
   - Test the chat-mode picker shows the two demo modes
5. **Run order during the talk** — Demo 1 → Demo 2 → Demo 3. Why.
6. **Fallback if something breaks** — for each demo, what to do.
7. **Honesty disclosure** — short note: "This is a boiled-down version of patterns from a real production codebase. The real version has 80 tools, the same `.strict()` pattern, the same lint, the same orchestrator/executor split. We cut it down so it fits on one screen."

### 3.13 `.gitignore`

`node_modules/`, `dist/`, `.DS_Store`, `*.log`.

---

## 4. Presenter README format (per-demo)

Each demo's `README.md` is a stage script, not a setup doc. Format:

```markdown
# Demo N — [Title]

## What this demo proves

[One sentence.]

## What the audience sees

[2-4 sentences describing the screen flow.]

## What to say BEFORE running

> [Verbatim opener — quote-block formatted so the speaker can read it directly.]

## How to run

1. [Step]
2. [Step]
3. [Step]

## What to say DURING

[Optional. If there's a beat that needs narration mid-run, put it here with the trigger.]

## What to say AFTER

> [Verbatim close — quote-block.]

## Total time

~N seconds.

## If it breaks

[Concrete fallback. Be specific. "Show the file in the editor and read the comment aloud" beats "show the static version."]
```

Write each of the three presenter READMEs in this format. Use the verbatim quotes from `presentation-intelligence-brief.md` §13 ("Best Lines") where they fit naturally.

---

## 5. Building order

1. Scaffold the workspace root (`package.json`, `tsconfig.json`, `.gitignore`, `.vscode/*`).
2. Run `npm install`.
3. Build `_lib/frame.ts` first — every demo uses it. Hand-verify the colored output by running a quick scratch script.
4. Build Demo 1 (`01-strict-boundary/`). Test end-to-end. The "bad run" must visibly print `processed task: undefined` — that's the gasp moment.
5. Build Demo 2 (`02-lint-catches-lie/`). Test end-to-end including the interactive pause.
6. Build Demo 3 (`03-skill-vs-cli/`). Test the CLI side end-to-end. The LLM side will be tested by the speaker in VS Code separately.
7. Build the chat-mode files. Open the workspace in a fresh VS Code window and confirm both modes appear in the chat mode picker.
8. Write the top-level `README.md` and all three presenter READMEs.
9. `git init`, initial commit titled `chore: initial demo scaffolding for SUG Minneapolis talk`.

After each demo: run it end-to-end and watch the output. If something doesn't print cleanly or the framing is misaligned, fix it before moving on. The visual polish is part of the brief.

---

## 6. Things to get right

- **No fakery.** The LLM in Demo 3 is a real LLM call (through Copilot's chat mode). The variance is real. If it happens to converge on the same answer, the speaker handles that verbally — see §10 Demo B fallback in the brief.
- **Self-narrating.** Every demo's run.ts prints what it's doing at each step. If the speaker stumbles on words, the screen still tells the story.
- **Reproducible.** A fresh clone + `npm install` should work. No global tools required besides Node and VS Code.
- **Reset-able.** Demo 2 modifies a file as part of the demo. `RESET.sh` puts it back.
- **No customer names anywhere.** Pure synthetic content. No reference to the real Kajoo.V2 repo by path or by customer-identifiable feature names.

---

## 7. Out of scope

- Do not create slides. The talk markdown is the speaker's own work and is not in this folder.
- Do not modify `~/code/Kajoo.V2`.
- Do not publish the demo repo anywhere. The speaker will do that manually.
- Do not add CI workflows. These demos are run locally only.
- Do not add tests for the demo code itself. The demos *are* the test — running them is the verification.

---

## 8. Reference

`presentation-intelligence-brief.md` in this folder is the research dossier for the talk. Read it for:
- Section 4 (Strongest Talk Themes) — what each demo is reinforcing
- Section 6 (Defensive Patterns) — the language to use in the lesson frames
- Section 10 (Demo Candidates) — the original demo selection and risk ratings
- Section 13 (Best Lines) — verbatim soundbites for the lesson frames and presenter READMEs

Do not copy the brief into demo files. Reference it in the top-level README only.

---

## 9. When you're done

Print a final summary to the speaker:
1. Confirm the workspace path (`~/code/sug-2026-demos/`).
2. List the three demos and what each proves.
3. Confirm `npm install` succeeded and all three demos run cleanly.
4. Confirm the two chat-mode agents appear in VS Code's chat mode picker.
5. Point at the top-level README's pre-talk checklist.

That's it. Build it cleanly, test it end-to-end, and hand it off to the speaker.
