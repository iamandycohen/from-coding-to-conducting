# Presentation Intelligence Brief

> Source: `/home/andycohen/code/Kajoo.V2`, branch `feature/KAJOO-4885`, merge-base `6185eaf2` (vs `origin/master`). 684 commits analyzed, 2026-03-25 → 2026-05-19. Uncommitted: 7 modified files in `apps/kajoo-web/components/compositions/chat/**` + 1 untracked test file in core-service (UI polish + a new controller helper test — not architecturally important for the talk).

---

## 1. Executive Summary

- **The codebase IS the talk.** It is literally a Sitecore XP → XM Cloud migration platform built around agents, MCP tools, and orchestration — not a side project that uses AI.
- **Two months on this branch produced 684 commits dominated by three tickets:** KAJOO-4885 (56), KAJOO-4939 (48), KAJOO-4935 (30) — all about *agent infrastructure*, not migration features. Every one of them is "make the agents more reliable / more deterministic / more bounded."
- **An explicit orchestrator-vs-executor split exists in code, prose, and lint:** `.github/ARCHITECTURE.md`, `.github/instructions/migration-orchestration.instructions.md`, and the 40 agent files in `.github/agents/` split into `Orchestrator - *`, sub-agents, and a hard-coded `<!-- pattern: A|B|C -->` marker.
- **A second-generation deterministic core was extracted mid-branch:** `scripts/1trk/` (zod-validated tracker.yaml CLI, nine ops, trace-able) — built on this branch in May 2026 specifically to take workflow logic *out of* the agent and put it in code. The commit story for this is the talk's spine.
- **Context shaping is treated as a budget, not a side effect.** Agent YAML carries `summarization.trigger.tokens`, `contextEditing.clearToolUses`, and `runLimit`. `.github/copilot-instructions.md` has a dedicated "Context Hygiene for High-Volume Tools" section (added 2026-05-14, `a755b4ed`).
- **The "push determinism down" doc literally exists:** `docs/AGENT-DATA-USAGE.md` — an inventory of every place an LLM still parses JSON by hand, marked as candidates for becoming typed tool calls.
- **Anti-hallucination defenses are explicit, not implied.** `apps/kajoo-mcp-server/src/tools/migrations/migration-work-decide.ts` uses `z.object(...).strict()` *specifically* because a single misnamed key (`via`) leaked into "8+ agent docs and skill files as 'an arg you can send' for years" (commit `132c40f0`).
- **For a Sitecore audience this is gold:** real XP→XMC migration code (SXA, Page Designs, Headless Services install, content serialization push/pull, Roslyn MVC analyzer) sitting under an agent layer — so demos are concrete Sitecore work, but the *story* is about how to build the layer above it.

---

## 2. Current Branch Summary

- **Branch:** `feature/KAJOO-4885`
- **Base branch:** `origin/master` (HEAD symbolic ref) — merge-base `6185eaf26ab8d0512cf56fa929213f0cc08529be`
- **Commits on branch:** 684
- **Files changed:** 13,109 (mostly `tests/fixtures/` — 11,055 files of analyzer fixtures; real code/docs changes ≈ 2,000)
- **Uncommitted:** 7 modified files (chat UI polish in `apps/kajoo-web/components/compositions/chat/`) + 1 untracked `artifacts.controller.helpers.test.ts`. No staged changes.
- **Major areas of change** (by file count, excluding fixtures):
  - `apps/kajoo-web/**` — 320 files (chat UI, HITL widgets)
  - `apps/kajoo-mcp-server/**` — 201 files (the tool surface)
  - `docs/mvc/**`, `docs/archive/**`, `docs/discovery/**`, `docs/proposals/**` — large doc footprint (heavy architecture journaling)
  - `packages/kajoo-runtime/**` (123), `packages/kajoo-sitecore/**` (121), `apps/sitecore-mcp-server/**` (121)
  - `.github/skills/**` (67), `.github/agents/**` (48), `tests/agent-contracts/**` (46) — *the agent layer itself*
  - `scripts/1trk/**` (32) — the deterministic tracker CLI born this branch

---

## 3. Evolution Timeline from Git History

Chronological — earliest first. Only inflection commits.

| Hash | Date | Subject | What changed | Why it matters | Theme |
|---|---|---|---|---|---|
| `5858362d` | 2026-03-03 (pre-base, on master) | `Merged PR 7955: XMC Headless SXA Conversion Tools & Agentic Agents` | Birth of `Orchestrator - SXA Conversion` and SXA sub-agents | The first place "orchestrator" became a code concept | Coding→Conducting |
| `c6995902` | 2026-02-05 (pre-base) | `KAJOO-4643 multi-agent orchestration for Code Migration` | First multi-agent split for code migration | Multi-agent split predates this branch | Coding→Conducting |
| `0dbd3029` | 2026-03-25 | `KAJOO-4762 Dynamic choice widget for agent chat (HITL)` | UI for human-in-the-loop choices in agent chats | HITL is a first-class UX, not an afterthought | Determined-not-disciplined |
| `67d43a33` | 2026-03-27 | `KAJOO-4815 Fix tool call state not updated after user rejects tool call in HITL` | Hardening HITL rejection path | Agents that "declare success too early" was a real bug | Determined-not-disciplined |
| `ef389dce` | 2026-04-01 | `feat(agent): enhance tool management with dynamic loading and searching` | Dynamic tool loading | Tool count grew; loading became a problem to solve | Tools as control surfaces |
| `569eda1d` | 2026-04-02 | `feat(tool-selection): semantic similarity scoring` | Tool search by embedding | Too many tools to fit in context — needs ranking | Context as resource constraint |
| `104301da` | 2026-04-12 | `KAJOO-4854 Unified migration initialization (migration-init) + workflow pipeline awareness` | `migration-init` MCP tool created | The "scaffold or resume" decision moved from agent into a typed tool | Deterministic vs agentic |
| `d6ad139e` | 2026-04-10 | `KAJOO-4778 Live Layout & Resolver Framework` | Resolver framework | Migration capability expansion | Migration |
| `eaea22f6` | 2026-05-13 | `docs(copilot-instructions): codify per-commit verification scope` | Per-commit verification rules | Agents stopped over-running tests; rules push that down to humans/agents alike | Determined-not-disciplined |
| `c1963175` | 2026-05-13 | `Fix instruction scope bugs and reduce global instructions to hard rules` | Instructions cleanup | Context bloat fix — globals shrank, scopes added | Context constraint |
| `a755b4ed` | 2026-05-14 | `docs(copilot): add context hygiene guidelines for high-volume tool calls` | New "Context Hygiene" section in copilot-instructions | Explicit rule: delegate big payloads to sub-agents | Context constraint |
| `8fe8cea2` | (mid-branch) | `KAJOO-4885 proposal 01 - inline component analysis envelope` | Inline analysis envelope on tool response | Tool boundary widened to remove a follow-up call | Tools as control surfaces |
| `0ab192fb` | mid-branch | `enrich MVC component analysis with field-type inference, controller source, and complexity classifier` | More structured analyzer output | Pushed inference *into* the tool, off the agent | Deterministic vs agentic |
| `8ccba172`–`6368f46a` | 2026-05-18 | `feat(1trk): add tracker.ts CLI with all nine Tier 2 ops` + `findings-schema with zod`, `row-patch.ts`, `closes-trailer.ts`, `bootstrap 2TRK workflow engine package` | **Built a deterministic tracker CLI in `scripts/1trk/`** | The single clearest "moved workflow out of agent into code" event on the branch | Deterministic vs agentic |
| `b5ffdf6d` | 2026-05-18 | `chore(agents): rename Kajoo orchestration agents/skills to 1TRK prefix and move local agents to .agents/` | Carved an agent namespace; moved working agents to local-only `.agents/` | Boundary management — public agents vs working agents | Orchestrator vs executor |
| `751e34e2` | 2026-05-18 | `docs(1trk): clarify context-isolation rationale for ORCH/TRACK split` | Doc explicitly says "ORCH and TRACK are separate so contexts don't fuse" | Crisp soundbite material | Context constraint |
| `f3c30e95` | 2026-05-18 | `feat(1trk): add .env.1trk auto-load + per-turn agent Diagnostics block` | Per-turn diagnostics block emitted by the agent | Observability of agent state | MCP debugging |
| `b8f51ba1` | 2026-05-18 | `feat(1trk): add opt-in CLI trace via TRK_TRACE_FILE for step 7 proof` | JSONL trace of every CLI dispatch | The "did the agent really call what it said?" check | MCP debugging |
| `132c40f0` | mid-branch | `feat(kajoo-mcp-server): reject unknown top-level keys on migration-work-decide` | `z.object(...).strict()` on tool input | Direct response to LLMs inventing `via:` arg from doc rot | Tools as control surfaces / Anti-hallucination |
| `b08b9cdc` | mid-branch | `lint(policies): add migration-work-* call-shape lint and fix producer skill` | New lint script `scripts/lint-agent-mcp-call-shapes.mjs` | Static analysis of agent prose against tool schemas | Tools as control surfaces |
| `fab1d327` | 2026-05-16 | `feat(agents): add Discussion Agent + handoff/brief flow for documented findings` | Split discuss/decide/execute into three subagents | The orchestrator/executor split is alive and evolving | Orchestrator vs executor |
| `03c2ed70` | 2026-05-16 | `feat(agents): add typed proposed_findings slot for Executor + Discussion returns` | Structured return for surfacing adjacent issues | Stops "while I'm here" tangent drift | Determined-not-disciplined |
| `3fa1f051` | 2026-05-17 | `feat(agents): wire post-run chat-analysis route + source_chat provenance` | Orchestrator can analyze its own past chats and surface findings | Self-reflection as a tooled workflow | MCP debugging |
| `8ccba172` | 2026-05-19 | `feat(mvc-helper-policy): helper-method handling policy with helper-pending deferral` | 7 new MVC-helper skills + a "helper-pending" escape hatch | Constraint pattern: when the agent doesn't know, it must *defer*, not improvise | Determined-not-disciplined |

---

## 4. Strongest Talk Themes Backed by the Codebase

### Theme 1 — AI reshaped the work, it did not remove it
- **Current code:** 40 agent files in `.github/agents/`, 47 skills in `.github/skills/`, 40 migration tools in `apps/kajoo-mcp-server/src/tools/migrations/`, a 47-line "Context Hygiene" rule, a separate deterministic CLI in `scripts/1trk/`, and a Roslyn MVC analyzer in `deps/roslyn-analyzer/` — none of this is "ask the LLM to do it."
- **Git history:** Of the top 3 tickets by commit volume on this branch (KAJOO-4885: 56, KAJOO-4939: 48, KAJOO-4935: 30), none are about new user-facing features. All three are agent reliability infrastructure.
- **Soundbite:** "I used to write code that ran. Now I write code that helps an agent decide what to run."

### Theme 2 — From coding to conducting
- **Current code:** `.github/ARCHITECTURE.md` defines a three-layer system (Orchestrators → Sub-agents → Skills). The orchestration rule is enforced by lint and by an HTML comment `<!-- pattern: A -->` / `B` / `C` in every orchestrator file — see `.github/agents/Orchestrator - SXA Conversion.agent.md` line ~58.
- **Git history:** `aa67570e` introduced an explicit Orchestrator + Tracker + Executor trio; `fab1d327` added a Discussion sub-agent; `b5ffdf6d` renamed everything to `1TRK *` and moved working agents to `.agents/`.
- **Soundbite:** "I don't write the steps anymore. I write who runs which step."

### Theme 3 — Context is a resource constraint
- **Current code:** Every orchestrator's frontmatter has explicit budgets:
  ```yaml
  middlewareConfig:
    summarization: { trigger: { tokens: 120000 }, keep: { fraction: 0.85 } }
    contextEditing:
      clearToolUses: { trigger: { fraction: 0.75 }, keep: { messages: 50 } }
  ```
  (`.github/agents/Orchestrator - SXA Conversion.agent.md` lines 40-58).
  `apps/kajoo-mcp-server/src/tools/migrations/migration-work-summary.ts` has a `verbosity: 'compact' | 'full'` knob that defaults to compact and explicitly drops markdown bodies the agent can rebuild.
  `apps/kajoo-mcp-server/src/tools/sandboxes/sandbox-validate-render.ts` ships with a docstring that says "Use this instead of curl + grep through sandbox-exec for component validation — it avoids returning the full page HTML which can be 100K+ characters."
- **Git history:** `a755b4ed` added the "Context Hygiene" section to copilot-instructions; `ac50b2bf` added the `verbosity` knob to summary; `751e34e2` documents that ORCH/TRACK are separate *to keep their contexts apart*.
- **Soundbite:** "Context is not just input. It is budget."

### Theme 4 — Agents are determined, not disciplined
- **Current code:** `.agents/agents/1TRK EXEC.agent.md` literally enforces "Step 0: verbatim quote of the finding row" and lists nine sequenced steps with refusal rules. `.github/instructions/migration-orchestration.instructions.md` §4 mandates exactly one `TASK_RESULT:` block per sub-agent turn with a fixed shape.
- **Git history:** `03c2ed70` added `proposed_findings[]` — a *structured escape valve* so an executor can mention adjacent problems instead of pursuing tangents. `8ccba172` added a `helper-pending` defer state so a sub-agent can't guess.
- **Soundbite:** "Agents are determined, not disciplined. You don't ask them to follow the rule — you remove the option to break it."

### Theme 5 — Ambiguity without tools becomes guesswork
- **Current code:** `migration-analyze-components` and the Roslyn analyzer at `deps/roslyn-analyzer/` replace "ask the LLM to read the C# project" with deterministic parsing. `migration-probe-target-code` replaces "guess what the target repo looks like" with a real probe.
- **Git history:** `0ab192fb` enriched MVC analysis with "field-type inference, controller source, and complexity classifier" — every word here is "stop guessing".
- **Soundbite:** "Agents do not solve ambiguity. Tools do."

### Theme 6 — Tools as control surfaces
- **Current code:** `migration-work-decide.ts` lines 14-29 wraps the input in `z.object(...).strict()` with a comment that explains why: "The MCP SDK wraps `inputSchema` in `z.object(...)` which by default silently strips unknown fields. That mask let `via` (a server-side provenance tag, not a caller input) leak into 8+ agent docs and skill files as 'an arg you can send' for years."
- **Git history:** `132c40f0` (reject unknown keys), `b08b9cdc` (added `scripts/lint-agent-mcp-call-shapes.mjs` to scan agent prose for bad keys).
- **Soundbite:** "Doc rot is real. The tool's schema is the only contract the agent can't talk past."

### Theme 7 — Orchestrator vs executor agents
- **Current code:** The split is explicit in three places — `.github/ARCHITECTURE.md §1`, `.github/instructions/migration-orchestration.instructions.md §2` (three orchestrator patterns A/B/C, sub-agent return contract), and the `1TRK ORCH` / `1TRK EXEC` / `1TRK TRACK` / `1TRK DISCUSS` quartet under `.agents/agents/`.
- **Git history:** `aa67570e` (original trio), `fab1d327` (Discussion added), `b5ffdf6d` (1TRK rename), `01fcc41d` ("EXEC pins canonical CLI flags + picks mechanical defaults"), `d65f748e` ("DISCUSS picks mechanical defaults instead of asking the user").
- **Soundbite:** "Orchestrators decide. Executors do. Mixing them is how agents drift."

### Theme 8 — Deterministic vs agentic workflows
- **Current code:** `scripts/1trk/tracker.ts` is a TypeScript CLI with nine ops (`status`, `next`, `mark`, `apply-row-patch`, `reopen`, `add-finding`, `validate`, etc.), backed by a zod schema at `scripts/1trk/findings-schema.ts`. The `1TRK TRACK` agent's only job is to call this CLI.
- **Git history:** Built in 11 commits across 2026-05-18: `285e7567` bootstrap → `993914ef` schema → `6368f46a` tracker CLI → `aba31838` row-patch → `0af5faef` closes-trailer → `b8f51ba1` trace → `f3c30e95` dotenv → `a61654be` v2 migration. The build spec for this is the *deferred* finding `arch-tracker-extract-deterministic-core` (`d0d5cc5e`) — meaning the author wrote down "the agent is unreliable at this — extract a core" and then did it.
- **Soundbite:** "If the workflow must not improvise, don't leave it inside the agent."

### Theme 9 — Workflow inside an agent is still interpreted
- **Current code:** Even after the 1TRK extraction, agent files still carry workflow prose (e.g. `.github/agents/Orchestrator - SXA Conversion.agent.md` has step-by-step instructions in markdown). Compare with `scripts/1trk/tracker.ts` — that one cannot be misread.
- **Git history:** `docs/AGENT-DATA-USAGE.md` literally is "the working list for 'push determinism down' — every row here is a candidate for being replaced with a typed, deterministic tool call."
- **Soundbite:** "A workflow described to an agent is still being interpreted."

---

## 5. Architecture Patterns Found

| Pattern | Where in current code | Where in git history | Problem it solves | Tradeoff / failure mode |
|---|---|---|---|---|
| Orchestrator/executor split | `.github/instructions/migration-orchestration.instructions.md §2`; `.agents/agents/1TRK ORCH.agent.md`; `.agents/agents/1TRK EXEC.agent.md` | `aa67570e`, `fab1d327`, `b5ffdf6d` | Drift, scope creep | Orchestrator now needs its own state |
| Three orchestrator patterns (A loop / B sequential / C fan-out) | All `Orchestrator - *` agents declare `<!-- pattern: A -->`/B/C | covered by lint at `scripts/lint-agent-contracts.mjs` | Standardizes HITL ownership | Wrong-pattern declaration is a silent bug — covered by lint |
| Structured `TASK_RESULT` return | `migration-orchestration.instructions.md §4` | Pre-existing, reinforced via `03c2ed70` | Stops free-form sub-agent responses polluting orchestrator context | Sub-agent that crashes returns no block — handled by "no-result fallback" in §4 |
| Strict tool input schemas | `migration-work-decide.ts:14-29` | `132c40f0` | Doc-contagion / hallucinated args | Stricter schemas make agent error messages busier |
| Structured-escape-valve (`proposed_findings[]`) | `.agents/agents/1TRK EXEC.agent.md` "EVIDENCE shape" | `03c2ed70` | Tangent suppression without losing signal | `out_of_scope: true` cap of one per block |
| Verbosity-bounded tool responses | `migration-work-summary.ts` `verbosity: 'compact' \| 'full'` | `ac50b2bf` | Context bloat | Compact-by-default risks hiding fields the agent needs |
| Per-agent token middleware | YAML in every orchestrator (`summarization`, `contextEditing`, `runLimit: 100`) | `5858362d`, `d0efb418`, `8558ee0a` | Drift past token limits | Summarization can lose load-bearing detail |
| Deterministic state machine (1TRK) | `scripts/1trk/tracker.ts` + `findings-schema.ts` | `285e7567`→`a61654be` (May 18, 11 commits) | Tracker drift, status hallucination | Doubles maintenance — a real codebase now lives next to prose |
| Lint of agent prose against tool schemas | `scripts/lint-agent-mcp-call-shapes.mjs` | `b08b9cdc` | Doc rot inventing tool args | Limited to one tool family; widening is `P3.2b` (pending) |
| Code-side staged artifacts (agent-data) | `docs/AGENT-DATA-USAGE.md` | `31ca61e4` (`add agent-data MCP tools with 1 MiB caps`) | Inter-agent state transfer without re-loading into LLM | LLMs still parse JSON — flagged as next thing to type up |
| Chat-tree analysis as a tooled workflow | `.github/prompts/chat-tree-analysis.prompt.md`, `scripts/dump-chat.mjs`, `Kajoo Infra Diagnostics` agent | `3fa1f051`, `1d747474` | Debugging past agent runs without polluting current context | Requires direct Mongo access |
| Validation-probe pattern | `.github/skills/validation-probe-pattern/SKILL.md` referenced by every migration orchestrator at Step 0.5 | referenced in `.github/agents/SXA - Validation.agent.md`, `Content Migration - Validation` | Premature-success — orchestrator assumes work isn't done | Probes themselves can lie if the source schema is wrong |
| JIT heal / heal-on-read | `1384a49c`, `ec66a796`, `849aad23` | Stale schema versions in stored state | Forces consumer-side migration | Adds latency to every read |
| HITL ownership rule | `migration-orchestration.instructions.md §1` "Two-line litmus" | `0dbd3029`, `76b94847`, `67d43a33` | Mis-routed user prompts (sub-agent asks loop-scope question) | Litmus needs author discipline |

---

## 6. Defensive Patterns Against Agent Failure

| Failure mode | Defensive pattern | Current code | Git evidence | Plain-language framing |
|---|---|---|---|---|
| Doc rot leading to invented tool args | Strict zod input + companion lint | `migration-work-decide.ts:14`, `scripts/lint-agent-mcp-call-shapes.mjs` | `132c40f0`, `b08b9cdc` | "The tool can't be talked past." |
| Tangent drift in executor | `proposed_findings[]` + tangent rule | `.agents/agents/1TRK EXEC.agent.md` | `03c2ed70`, `47b68842` | "You can flag it, you can't fix it in the same commit." |
| Premature success | Validation-probe at Step 0.5 + `TASK_RESULT: needs-redo` | `SXA - Validation.agent.md`, `migration-orchestration.instructions.md §4` | pattern referenced across migration orchestrators | "Before you start, prove the work isn't already done." |
| Context bloat from raw tool output | `verbosity: 'compact'`, snippet bounds in `sandbox-validate-render`, "delegate to subagent" rule | `migration-work-summary.ts:29`, `sandbox-validate-render.ts`, `copilot-instructions.md` "Context Hygiene" | `ac50b2bf`, `a755b4ed` | "Big payloads go to a sub-agent. The parent gets a sentence." |
| Improvising tracker state | Move it into a TypeScript CLI | `scripts/1trk/tracker.ts` | Eleven `feat(1trk)` commits on 2026-05-18 | "If the workflow must not improvise, don't leave it inside the agent." |
| Unverified "shipped" claim | `Closes: <id>` trailer + SHA reachability check | `.agents/agents/1TRK EXEC.agent.md` steps 7-8 | `0af5faef` | "The state machine refuses to mark shipped without a real SHA on the branch." |
| Mock-mode regression | Test-with-every-touch discipline + colocated tests | `.github/instructions/tool-testing-discipline.instructions.md` | `c92a98ce` | "Behavior change without a test is rejected at commit." |
| Customer-name leakage into LLM context | `.github/instructions/no-customer-references.instructions.md` + lint at `scripts/lint-no-customer-refs.mjs` | (lint script exists; see `yarn lint:policies`) | "Active surface vs archive — only the archive may name customers." |
| Trace loss (can't tell what an agent really did) | `TRK_TRACE_FILE` JSONL + per-turn Diagnostics block | `scripts/1trk/trace.ts`, `.agents/agents/1TRK ORCH.agent.md` | `b8f51ba1`, `f3c30e95` | "If you can't see what the agent did, you don't have an agent." |

---

## 7. Deterministic vs Agentic Boundary Analysis

| Workflow | Agentic part | Deterministic part | Why the boundary exists | Boundary strength | Evidence |
|---|---|---|---|---|---|
| Closing a finding ticket | EXEC agent reads row, plans the change | tracker.yaml mutation, `Closes:` trailer formatting, SHA reachability all go through `scripts/1trk/tracker.ts` | The author kept getting hallucinated status transitions | **Strong** — agent literally `tsx`-invokes the CLI | `.agents/agents/1TRK EXEC.agent.md` + `scripts/1trk/tracker.ts` |
| SXA conversion | Orchestrator decides phase order; sub-agents execute each phase | Validation probe at Step 0.5; tool calls into `serialization-push`, `run-powershell-script` | Mixing decision-making with execution caused drift between runs | **Medium** — Step 0.5 deterministic, phases still prose-driven | `.github/agents/Orchestrator - SXA Conversion.agent.md` |
| Migration work-state writes | Caller picks `kind`, `key`, `payload` shape | `migration-work-decide` validates against the kind's zod schema; `via:` is server-set | A leaked-doc field was passed by 8+ agent files | **Strong** — `.strict()` rejects unknown keys | `migration-work-decide.ts` |
| Component analysis | Agent decides which component to analyze | Roslyn analyzer (`deps/roslyn-analyzer/`) produces structured output; `migration-analyze-components` joins/enriches | LLMs are terrible at C# parsing | **Strong** | `b7a7eef5`, `0ab192fb`, `df5f5509` |
| Discovery synthesis | Agent reads pre-staged JSON | All staging done by Inngest job (`docs/AGENT-DATA-USAGE.md §3`) | Per-call generation was expensive and inconsistent | **Medium** — agent still parses JSON; AGENT-DATA-USAGE.md is the backlog | `docs/AGENT-DATA-USAGE.md` |
| Tracker "what is next" | LLM prioritizes from row data | TRACK subagent runs `scripts/1trk/tracker.ts next`, surfaces output | Author's intent: status counts must match git reality | **Strong** | `.agents/agents/1TRK TRACK.agent.md` |

**Workflow still living inside the agent (weak boundaries):**
- Orchestrator phase ordering in `Orchestrator - Content Migration` — still markdown prose, not a state machine.
- The "MVC helper" routing (7 new skills) — agent picks which helper skill to load. (`8ccba172`)
- Discussion brief authoring — `1TRK DISCUSS` runs a multi-turn dialogue that is wholly LLM-shaped.

---

## 8. MCP and Tooling Analysis

The full MCP server at `apps/kajoo-mcp-server/src/tools/` registers 40 migration tools, 9 sandbox tools, agent-data tools, memory tools, and the `kajoo/run-agent` / `discover-agents` family. Highlighted:

| Tool | Purpose | Input | Output shape | Helps with | Risk | Evidence |
|---|---|---|---|---|---|---|
| `migration-work-decide` | Append a typed decision to a work-kind store | `{kind, key, payload, expect?}` — `.strict()` | Per-kind validated structuredContent | Stops hallucinated keys, enforces schema per kind | Verbose error messages | `migration-work-decide.ts`, `132c40f0` |
| `migration-work-summary` | Whole-kind aggregate read with `verbosity` knob | `{kind, filter?, verbosity?}` | `{summary: {...}}` or `{ok:false, errorCode:'no-summary-adapter'}` | Bounds tool response size | Compact default may hide what an agent expects | `migration-work-summary.ts`, `ac50b2bf` |
| `migration-work-list-kinds` | Discovery — what work-kinds exist | `{}` | `{kinds: [...]}` | Resolves ambiguity about what's even available | None | `6eddbb84` |
| `migration-workflow-status` | Reads all phase artifacts and recomputes status from source | `{}` | `{migrationType, overallProgress, phases[], recommended[], warnings[], blockingReasons[]}` | Replaces "ask the LLM what's happening" with a probe | Rich payload — can still bloat context | `migration-workflow-status.ts`, `d485046c` |
| `sandbox-validate-render` | Validate component renders by CSS marker | `{pagePath, markers[], port?, snippetChars?, timeout?}` | `{found, snippet}` — bounded by `snippetChars` | Replaces "curl + grep through `sandbox-exec`" with a typed probe | None | `sandbox-validate-render.ts` |
| `migration-analyze-components` (MVC adapter) | Roslyn-driven analysis of .NET MVC | `{...}` | Structured `{rendering, controllerActions, fieldTypes, complexity, frameworkSignature, ...}` | LLMs can't reliably parse C# | Heuristics version drift — tracked via `heuristicsVersion` stamp | `4f5ab351`, `b7a7eef5`, `0ab192fb`, `742eb1aa` |
| `migration-checkpoint-*` | Filesystem snapshots between sandbox runs | varies | `{checkpointId, files, diff}` | "Undo button" between sub-agent attempts | Disk pressure | `migration-checkpoint-create.ts` |
| `agent-data-*` (list/read/write/delete) | Inter-agent staged-state store, 1 MiB cap | `{path, ...}` | JSON content | Passes large state between sub-agents without re-loading into LLM | LLM still parses the JSON — push-determinism-down backlog | `31ca61e4`, `docs/AGENT-DATA-USAGE.md` |
| `dev-server-*` / `dev-server-diagnose` | Per-workspace dev server lifecycle and health | `{}` / `{mode}` | `{status, logsTail, port}` | Replaces "is my server up?" guessing | None | `apps/kajoo-mcp-server/src/tools/sandboxes/dev-server-*.ts` |
| `scripts/1trk/tracker.ts` (CLI, not MCP) | The deterministic core | nine ops via argv | JSON on stdout, `{error: {code, message}}` on stderr | Removes tracker state from the agent's interpretation | Separate codebase to maintain | `scripts/1trk/` |
| `dump-chat.mjs` + chat-tree-analysis prompt | Pull a chat tree from Mongo and analyze it | `chatId, outputDir?` | Files in `docs/chats/chat-analysis-<id>/` | Post-hoc debugging of past agent runs | Direct Mongo access, sensitive data risk | `scripts/dump-chat.mjs`, `.github/prompts/chat-tree-analysis.prompt.md` |

---

## 9. Migration Workflow Analysis

- **What's being migrated:** Sitecore XP (MVC and JSS Headless) → SitecoreAI / XM Cloud. Specifically: components/renderings, page designs, templates, content items, resolver C# → TypeScript adapters, styles, presentation details, and SXA conversion (tenants, sites, modules).
- **Agentic parts:**
  - Component-by-component translation (`Code Migration - Components`, `Code Migration - MVC Components`)
  - Edge-case troubleshooting (skills like `sitecore-component-troubleshooting-nothing-renders`)
  - Discussion / planning briefs
- **Deterministic parts:**
  - Roslyn MVC analyzer (`deps/roslyn-analyzer/`)
  - `migration-init` (clone, scaffold, push) — runs as a typed Inngest job
  - Serialization push/pull (`serialization-push`, `serialization-pull`)
  - Headless Services install + SPE-1322 patch (Phase 0)
  - Validation probes (Step 0.5 in every migration orchestrator)
- **Tools involved:** `migration-init`, `migration-set-connectors`, `migration-workflow-status`, `migration-analyze-components`, `migration-analyze-layout`, `migration-analyze-styles`, `migration-probe-target-code`, `serialization-push/pull`, `install-package`, `install-spe-1322-patch`, `run-powershell-script`, `graphql-query`, `sandbox-*` family, `migration-checkpoint-*` family.
- **Validation:** Pre-existence probe (`SXA - Validation`, `Content Migration - Validation`), `sandbox-validate-render` per-component, `migration-workflow-status.blockingReasons[]` (`d485046c`).
- **Ambiguity surfaces:**
  - Razor view → React/TSX translation (especially MVC helpers — see `8ccba172` "helper-pending deferral")
  - Customer-specific Glass Mapper conventions (`sitecore-mvc-glass-mapper/SKILL.md`)
  - Controller-query-vs-inline-Edge-fetch routing (`daea7b46`, `90384b0f`)
- **What would make a great demo:** the MVC analyzer output → component-conversion sub-agent → `sandbox-validate-render` round-trip for a single rendering. Concrete Sitecore work, ends in green HTML.

---

## 10. Demo Candidates

### Demo A — "Tools as control surfaces: the `.strict()` story" (LOW risk)
- **Show:** Pull up `migration-work-decide.ts` lines 14-29 in VS Code. Read the comment aloud. Show the lint script at `scripts/lint-agent-mcp-call-shapes.mjs`.
- **Why:** Concrete proof of "doc rot is a real failure mode" with a concrete defense.
- **Commits:** `132c40f0`, `b08b9cdc`.
- **2-min track:** "This started as a missing field check. Now it's the only contract the agent can't talk past. The lint script reads agent prose and rejects PR-able doc that disagrees with the tool's schema."
- **What could go wrong:** Nothing — this is static reading.
- **Fallback:** Just show the comment.

### Demo B — "Orchestrator/executor split in five minutes" (LOW risk)
- **Show:** Open `.agents/agents/1TRK ORCH.agent.md` (the routing table). Then `.agents/agents/1TRK EXEC.agent.md` (the nine-step sequence + EVIDENCE shape). Then `scripts/1trk/tracker.ts`.
- **Why:** Live anatomy of conducting vs coding.
- **Commits:** `aa67570e` → `b5ffdf6d` → the May 18 1trk burst.
- **2-min track:** "ORCH routes. EXEC executes one finding and stops. TRACK is the deterministic state machine. The agents call the CLI; the CLI never calls the agent."
- **Risk:** None — file reading.

### Demo C — "Context budget in YAML" (LOW risk)
- **Show:** `.github/agents/Orchestrator - SXA Conversion.agent.md` frontmatter lines 40-58 with `summarization.trigger.tokens: 120000` and `contextEditing.clearToolUses.trigger.fraction: 0.75`. Then `.github/copilot-instructions.md` "Context Hygiene" section.
- **Why:** Makes "context is budget" tangible.
- **Commits:** `a755b4ed`, `5858362d`.
- **2-min track:** "Every orchestrator carries its own token budget — and a rule that any high-volume tool call must go to a sub-agent first."

### Demo D — "MVC analyzer to React in one demo" (MEDIUM risk)
- **Show:** Run `migration-analyze-components` against a small MVC rendering in a workspace, then call the `Code Migration - MVC Components` agent to translate it, then `sandbox-validate-render` to confirm.
- **Why:** Real Sitecore content. Real React output. End-to-end agent-plus-tools.
- **Risk:** Workspace + dev-server dependencies. Recommend recording it ahead and playing as a screencast.
- **Fallback:** Show the analyzer JSON output and the converted component side-by-side, no live run.

### Demo E — "Chat-tree analysis: debugging an agent run after the fact" (MEDIUM risk)
- **Show:** Run `scripts/dump-chat.mjs` against a real `chatId` (already 20+ in `docs/chats/`); open the resulting `analysis-summary.md`.
- **Why:** Concrete answer to "how do you debug an agent?"
- **Risk:** Requires Mongo, must not expose user data in slides — pre-redact.
- **Fallback:** Show one of the existing `docs/chats/chat-analysis-*` folders.

---

## 11. Concrete Examples of "AI Reshaped the Work"

1. **The 1TRK CLI was built to remove a job from the agent.** Eleven commits on 2026-05-18 (`scripts/1trk/`) — the author identified "the agent keeps hallucinating tracker status" and extracted it into typed code. One sentence: "We rebuilt the project tracker in TypeScript because asking the agent to keep state was unreliable."
2. **`migration-work-decide` got a `.strict()` schema specifically to catch invented args.** `migration-work-decide.ts:14-29` — comment explicitly names the failure: an undocumented field leaked into "8+ agent docs and skill files as 'an arg you can send' for years." One sentence: "The tool's input schema is now the only source of truth — doc rot can't make the agent invent fields."
3. **Sub-agent return contract was standardized to a single `TASK_RESULT:` block.** `.github/instructions/migration-orchestration.instructions.md §4`. Before this, every sub-agent had its own marker (`PUSH_STATUS`, `VALIDATION_STATUS`, etc.). One sentence: "All sub-agents now answer in the same shape so the orchestrator's parse code is uniform."
4. **An entire `proposed_findings[]` slot exists so executors can flag adjacent issues without pursuing them.** `03c2ed70`. One sentence: "If an executor sees something else broken, it files a follow-up instead of fixing it in the same commit."
5. **`sandbox-validate-render` exists to avoid returning 100K+ chars of HTML to the agent.** `sandbox-validate-render.ts` docstring is explicit. One sentence: "We wrote a tool whose only purpose is to keep the agent's context from blowing up."
6. **The Roslyn MVC analyzer is a C# project that runs *for* the agent.** `deps/roslyn-analyzer/`. One sentence: "LLMs can't reliably parse C#, so we wrote a real parser and let the agent read the JSON."
7. **`docs/AGENT-DATA-USAGE.md` is a backlog of agent JSON-parsing that needs to become a typed tool call.** Whole document. One sentence: "We literally keep a list of places where the agent is still doing parser work that belongs in code."
8. **Per-agent `runLimit: 100` / `summarization.trigger.tokens` was added to every orchestrator.** `.github/agents/Orchestrator - SXA Conversion.agent.md`. One sentence: "We treat each agent like a budgeted process: tokens, turn count, context-edit thresholds."

---

## 12. Risks, Gaps, and Things Not to Claim

- **Don't claim "the agents are fully autonomous."** HITL is everywhere (Continue/Redo/Skip/Stop, brief decisions, phase boundaries). The system is opinionated about *when* the human is in the loop.
- **Don't claim "we removed all prompts."** Workflow still lives in markdown for many orchestrators — the `arch-tracker-extract-deterministic-core` finding is *deferred*, not shipped. Sub-agents like `1TRK DISCUSS` are inherently LLM-shaped.
- **Don't claim "tools eliminated drift."** They reduced it. The lint script (`scripts/lint-agent-mcp-call-shapes.mjs`) explicitly notes it covers one tool family — "P3.2b widens scope" (still pending).
- **Don't promise a live `migration-init` demo.** It's an Inngest background job taking 2-5 minutes. Don't burn talk time waiting for it.
- **Don't show real customer names.** `.github/instructions/no-customer-references.instructions.md` is a hard repo rule. The archive folder is exempt but should not be on screen.
- **Don't claim "context never bloats."** The 11,055 fixture files on this branch are a real example of bloat in a different sense — the diff against master is 13K files. Be honest about scale.
- **Don't dramatize chat-tree analysis as a polished product.** It's a few scripts + a prompt + a Mongo URI hardcoded to `localhost:27018`. Powerful, but ops-grade.
- **Don't oversell the deterministic CLI.** It's brand new (May 18). It runs alongside the prose-driven agents — it didn't replace them.

---

## 13. Best Lines for the Presentation

1. "Context is not just input. It is budget."
2. "Agents do not solve ambiguity. Tools do."
3. "Agents are determined, not disciplined."
4. "If the workflow must not improvise, don't leave it inside the agent."
5. "A workflow described to an agent is still being interpreted."
6. "Orchestrators decide. Executors do. Mixing them is how drift happens."
7. "Doc rot is real. The tool's schema is the only contract the agent can't talk past."
8. "Big payloads go to a sub-agent. The parent gets a sentence."
9. "I used to write code that ran. Now I write code that helps an agent decide what to run."
10. "Every tool I wrote is a control surface — the more autonomy I give, the sharper its edges have to be."

---

## 14. Files I Should Open During Prep

| # | File | Why | Theme | Live demo? |
|---|---|---|---|---|
| 1 | `.github/instructions/migration-orchestration.instructions.md` | The canonical orchestrator-vs-executor rule — §1 HITL litmus, §2 three patterns, §4 TASK_RESULT contract | Conducting; Orchestrator/Executor | **Demo** |
| 2 | `apps/kajoo-mcp-server/src/tools/migrations/migration-work-decide.ts` lines 14-29 | The `.strict()` comment — the perfect "doc rot" story | Tools as control surfaces | **Demo** |
| 3 | `.github/copilot-instructions.md` ("Context Hygiene" section) | Explicit context-budget rules at the top of the repo | Context as constraint | **Demo** |
| 4 | `.github/agents/Orchestrator - SXA Conversion.agent.md` frontmatter | The token/summarization/clearToolUses budgets | Context as constraint | **Demo** |
| 5 | `.agents/agents/1TRK EXEC.agent.md` | The nine-step playbook + EVIDENCE shape — best concrete "executor" example | Determined-not-disciplined | **Demo** |
| 6 | `scripts/1trk/tracker.ts` | The deterministic core, born this branch on 2026-05-18 | Deterministic vs agentic | **Demo** |
| 7 | `docs/AGENT-DATA-USAGE.md` | The "push determinism down" backlog | Reshaped work / Workflow-still-interpreted | Prep only |
| 8 | `apps/kajoo-mcp-server/src/tools/sandboxes/sandbox-validate-render.ts` docstring | "Avoid returning 100K+ chars of HTML" — perfect Sitecore-flavored context story | Context constraint; ambiguity→tools | **Demo** |
| 9 | `scripts/lint-agent-mcp-call-shapes.mjs` | The static analysis of agent prose vs tool schemas | Tools as control surfaces | **Demo** |
| 10 | `.github/ARCHITECTURE.md` (first 100 lines) | The three-layer diagram and Skills-vs-Agents table | Conducting | **Demo** |

Bonus (pick one for the migration demo): `apps/kajoo-mcp-server/src/tools/migrations/migration-analyze-components.ts` + `.github/agents/Code Migration - MVC Components.agent.md`.

---

## 15. Commit Story I Can Tell

- **At first, the work focused on** making chat agentic at all: HITL widgets, dynamic tool loading, semantic tool selection — the agent UX (late March 2026, `0dbd3029`, `ef389dce`, `569eda1d`).
- **Then the need for control showed up as** unified migration init, the resolver framework, and workflow-status tools — moving "which step now?" out of the prompt and into typed MCP tools (April 2026, `104301da`, `d6ad139e`).
- **The code then added** an explicit orchestrator/executor architecture, a strict `migration-work-*` API, structured `TASK_RESULT:` returns, validation probes at Step 0.5, and context-hygiene rules — every one a defense against a specific failure mode the agents had shown (May 2026, `aa67570e`, `132c40f0`, `a755b4ed`).
- **Finally, in one focused week,** the workflow logic itself got extracted into a deterministic TypeScript CLI (`scripts/1trk/`) with zod-validated state, opt-in tracing, and a tiny agent quartet that calls it. The repo's own findings tracker is now the cleanest example in the codebase of "move it out of the prompt" (May 18, 2026 — eleven commits in one day).
- **This supports the talk because** every theme — context is budget, ambiguity needs tools, orchestrator vs executor, determined not disciplined — has a dated commit and a file path behind it. The story is not "we discovered AI." The story is "we discovered that the work moves up a layer, and we have the receipts."
