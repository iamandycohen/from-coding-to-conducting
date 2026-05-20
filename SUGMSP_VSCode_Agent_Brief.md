# SUGMSP Presentation Build Brief for VS Code Agent

## Purpose

Help prepare a Sitecore User Group Minneapolis presentation for tomorrow.

The talk title is:

**From Coding to Conducting: Building with Agentic Systems**

The goal is not to create a generic AI hype deck. The goal is to show what two years of AI-driven development has actually taught me by using my own codebase as evidence.

This should feel like a field report from production AI work. It should be practical, opinionated, and grounded in real patterns from the repo.

## Audience

The audience is mostly Sitecore developers, architects, and technical leaders, with some marketers and content strategists in the room.

Do not over-dilute the technical language. Use real terms like MCP, orchestrator, executor, context, and deterministic workflow. Define each term once in plain language, then use the real term.

The room can handle technical depth, but every technical point needs a delivery or business implication.

Example:

- Technical point: agents need tools to resolve ambiguity.
- Delivery implication: AI can accelerate migration only when it can inspect and validate real system state.

## Core Thesis

AI has not reduced the work of software development. It has reshaped it.

The work moved up a layer:

- from writing every line of code to directing systems that write, inspect, migrate, validate, and debug
- from implementation to orchestration
- from raw productivity to control, context, and trust
- from asking whether AI can do something to deciding where autonomy belongs

The one-line version:

**Agents are powerful enough to change the work, but not reliable enough to leave unscaffolded.**

## Opening Framing

Use the ATM and MRI analogies as fear-of-change analogies, not behavior analogies.

The ATM analogy is about the fear that automation removes the job. The better framing:

> When ATMs arrived, people thought bank tellers were done. The work did not disappear. The role changed.

The MRI analogy is about powerful tools creating new work:

> My uncle described a similar moment in medicine with MRI. Some people saw it as a threat to existing expertise. But the tool did not remove the need for expertise. It increased the value of people who could interpret, validate, and act on what the tool revealed.

Then connect to AI:

> That is what AI feels like in software right now. It does not remove the work. It changes the shape of the work.

Then land the title:

> I am still in code every day. I just do not write it the same way anymore. I am conducting agents, tools, workflows, and validation paths.

Use this phrase if useful:

> ATMs are the fear story. MRIs are the workload story. Conducting is the role I ended up in.

## Repo Evidence to Anchor the Talk

Use the codebase as the proof layer.

Key facts to include in speaker notes and possibly one slide:

- Branch: `feature/KAJOO-4885`
- 684 commits analyzed from 2026-03-25 to 2026-05-19
- 40 agent files
- 47 skills
- 40 migration tools
- deterministic `scripts/1trk` CLI extracted mid-branch
- real Sitecore XP to XM Cloud migration work underneath the agent layer
- `apps/kajoo-mcp-server` contains the MCP tool surface
- `.github/agents` and `.github/skills` show the agent and skill layer
- `scripts/1trk` shows deterministic workflow extraction
- `deps/roslyn-analyzer` supports deterministic MVC analysis for Sitecore migration

Do not put commit hashes on slides unless there is a small speaker note field. Use commit hashes in speaker notes for proof if a technical attendee asks.

## What Not to Do

Do not create a ten-slide generic deck.

Do not end with all demos. Put demos in the middle where attention is strongest.

Do not make this a Kajoo vendor pitch. Kajoo Agentic is the concrete demo environment, but the talk is about patterns and lessons.

Do not say or imply:

- agents are fully autonomous
- prompts have been eliminated
- tools eliminated drift
- context never bloats
- the deterministic CLI replaced all agent workflows
- the system is complete or perfect

The honest framing is better:

> The codebase grew defenses around the agents.

## Final Deck Shape

Use six slides plus two or three demo slots.

### Slide 1: From Coding to Conducting

Title:

**From Coding to Conducting**

Subtitle:

**Building with Agentic Systems in the Real World**

Visual:

A conductor facing four sections:

- Orchestrators
- Executors
- MCP tools
- Deterministic workflows

Talk track:

> Every time a powerful new tool shows up, people ask what jobs it will replace. ATMs created that fear in banking. MRI created that fear in medicine. In both cases, the work did not disappear. It moved. AI is doing the same thing to software development.
>
> I am still in code every day. I just do not write it the same way anymore. I am conducting agents, tools, workflows, and validation paths.

Speaker note:

Use ATM for fear of change. Use MRI for new tool creates new interpretation and demand. Use conducting as the operating model.

### Slide 2: The Work Moved Up a Layer

Title:

**The work did not disappear. It moved up a layer.**

Visual:

Before and after split screen.

Left side:

**Before**

- application code
- direct implementation
- tests
- deploy

Right side:

**After**

- agent files
- skills
- MCP tools
- schemas
- validators
- deterministic workflow code
- migration probes

Bottom line:

**I used to write code that ran. Now I write code that helps agents decide what to run.**

Speaker note proof:

Use the 684 commits, 40 agent files, 47 skills, 40 migration tools, and `scripts/1trk` CLI as evidence.

### Slide 3: Agents Need Scaffolding

Title:

**Agents need scaffolding.**

Use one slide with four failure modes. Do not split this into four separate slides.

Four quadrants:

1. **Determined, not disciplined**
   - agents optimize for completion
   - they can lower the bar to declare success

2. **Ambiguity becomes guesswork**
   - unless tools can reduce it
   - ambiguity without tools creates confident guesses

3. **Context becomes budget**
   - too little context causes guessing
   - too much context causes drift

4. **Workflow is interpreted**
   - prose workflows can be reinterpreted
   - deterministic code enforces what must not drift

Bottom line:

**The failure mode is not that agents stop. It is that they keep going.**

Talk track:

> This is the slide that explains the last two years. Agents are useful because they keep going. They are risky for the same reason. They will work around ambiguity, missing context, and vague workflow unless you build scaffolding around them.

Speaker note evidence:

Use examples from `proposed_findings[]`, `helper-pending`, context hygiene rules, strict schemas, and deterministic tracker extraction.

### Slide 4: Orchestrators, Executors, Tools

Title:

**Conducting means separating the roles.**

Define the roles:

- **Orchestrator:** decides what should happen next
- **Executor:** performs one bounded task
- **MCP tool:** gives the agent facts or actions
- **Deterministic workflow:** handles what must not drift

Bottom line:

**Orchestrators decide. Executors do. Tools keep them honest.**

Visual:

Hub and spoke:

- center: Orchestrator
- spokes: Executor agents
- under each executor: MCP tools
- bottom layer: deterministic state, validation, schemas

Talk track:

> The conductor does not play every note. The conductor decides who plays, when they enter, and when something is off. That is what orchestration is in an agentic system.

Speaker note evidence:

Open these files during prep:

- `.github/instructions/migration-orchestration.instructions.md`
- `.agents/agents/1TRK ORCH.agent.md`
- `.agents/agents/1TRK EXEC.agent.md`
- `scripts/1trk/tracker.ts`

## Demo Slot 1: The Strict Schema Story

Place this demo after Slide 4.

Demo title:

**The tool boundary that stopped an agent from inventing inputs**

Frame it as a failure story:

> Here is where the agent embarrassed me.

Show:

- `apps/kajoo-mcp-server/src/tools/migrations/migration-work-decide.ts`
- the `.strict()` schema
- the comment explaining the leaked `via` argument
- `scripts/lint-agent-mcp-call-shapes.mjs`

Talk track:

> An internal provenance field leaked into agent docs as something the agent could send. The fix was not another paragraph of instructions. The fix was a strict schema and a lint rule that checks agent prose against tool contracts.

Point:

**Doc rot is real. The tool schema is the contract the agent cannot talk past.**

Demo risk:

Low. Static code reading only.

Fallback:

Show the comment and explain the failure.

### Slide 5: When to Leave the Agent in Charge

Title:

**The question is not: Can AI do this?**

Second line:

**The question is: Should this part be allowed to improvise?**

Two columns:

**Leave it agentic when:**

- interpretation matters
- multiple paths are valid
- MCP tools can reduce ambiguity
- a human can review the result

**Make it deterministic when:**

- the sequence is known
- state must be correct
- compliance matters
- the workflow must not drift

Bottom line:

**If the workflow must not improvise, do not leave it inside the agent.**

Talk track:

> Agents are not bad at ambiguity. They are bad at ambiguity without tools. Once a workflow becomes known, repeatable, or high risk, the job is to move it out of the prompt and into code.

Speaker note evidence:

Use `scripts/1trk/tracker.ts` as the clearest example of moving workflow state out of agent interpretation and into deterministic TypeScript.

## Demo Slot 2: Orchestrator, Executor, Tracker

Place this demo after Slide 5.

Demo title:

**Where autonomy ends and code takes over**

Show:

- `.agents/agents/1TRK ORCH.agent.md`
- `.agents/agents/1TRK EXEC.agent.md`
- `scripts/1trk/tracker.ts`

Talk track:

> ORCH routes. EXEC handles one bounded finding. TRACK owns state through a deterministic CLI. The agent can decide what to attempt, but it does not get to hallucinate tracker state.

Point:

**A workflow described to an agent is still being interpreted. A workflow encoded in code is enforced.**

Demo risk:

Low. Static file reading.

Fallback:

Show a screenshot or pre-opened tabs.

### Slide 6: What This Means for Sitecore Teams

Title:

**AI can accelerate Sitecore migration, but only with scaffolding.**

Visual:

Simple migration pipeline:

Sitecore XP / MVC / SXA -> Analyze -> Agent-assisted conversion -> Validate -> XM Cloud

Guardrails underneath:

- MCP tools
- context boundaries
- validation probes
- deterministic workflows
- human review

Bottom lines:

**The new craft is deciding where autonomy belongs.**

**The job did not get easier. It got more important.**

Talk track:

> For Sitecore teams, this matters because migration is full of ambiguity: legacy MVC, Razor views, SXA patterns, content structure, presentation details. AI helps when it has tools that make the work knowable. It hurts when it is guessing.

## Optional Demo Slot 3: Sitecore Migration with Tools

Only use this if time is good or if it can be shown safely as a recording.

Demo title:

**Agents do not solve ambiguity. Tools do.**

Show side by side:

- MVC analyzer output
- generated React component
- `sandbox-validate-render` result

Preferred flow:

1. Run or show `migration-analyze-components` against a small MVC rendering.
2. Show how the agent uses that structured output.
3. Show `sandbox-validate-render` confirming the result.

Point:

**Do not ask the agent to guess what the legacy Sitecore MVC code does. Give it an analyzer.**

Demo risk:

Medium. Workspace and dev server dependencies can break live.

Fallback:

Show analyzer JSON output, converted component, and validation result side by side. Do not live-run the full flow unless already tested.

## Visual Style

Make the deck feel like a field report, not a vendor pitch.

Style guidance:

- one big claim per slide
- minimal text
- high contrast
- simple diagrams
- code appears only as proof
- no busy AI brain graphics
- no stock futuristic imagery
- no long code screenshots

Use a tiny proof strip at the bottom of technical slides:

Example:

> Proof: `migration-work-decide.ts`, `.strict()`, `scripts/lint-agent-mcp-call-shapes.mjs`, commits `132c40f0` and `b08b9cdc`

Do not put large commit tables on slides.

## Terminology Rules

Use real vocabulary, but define once.

- **MCP:** the way agents call tools
- **Deterministic:** steps that must run the same way every time
- **Context:** the agent's working material and budget
- **Agent drift:** the AI starts solving a slightly different problem
- **Strict input contract:** a schema that rejects unexpected arguments

Do not replace MCP with vague language after defining it. The audience can handle the real term.

## Key Soundbites

Use these throughout the deck and speaker notes.

1. Context is not just input. It is budget.
2. Agents do not solve ambiguity. Tools do.
3. Agents are determined, not disciplined.
4. If the workflow must not improvise, do not leave it inside the agent.
5. A workflow described to an agent is still being interpreted.
6. Orchestrators decide. Executors do. Mixing them is how drift happens.
7. Doc rot is real. The tool schema is the only contract the agent cannot talk past.
8. Big payloads go to a sub-agent. The parent gets a sentence.
9. I used to write code that ran. Now I write code that helps an agent decide what to run.
10. Every tool is a control surface. The more autonomy I give, the sharper its edges have to be.

## Files to Open During Prep

Prioritize these files for screenshots, speaker notes, and demo tabs.

| Priority | File | Why |
|---|---|---|
| 1 | `.github/instructions/migration-orchestration.instructions.md` | Canonical orchestrator versus executor rule, HITL ownership, sub-agent return contract |
| 2 | `apps/kajoo-mcp-server/src/tools/migrations/migration-work-decide.ts` | The `.strict()` failure story and tool boundary proof |
| 3 | `scripts/lint-agent-mcp-call-shapes.mjs` | Static analysis of agent prose against tool schemas |
| 4 | `.agents/agents/1TRK ORCH.agent.md` | Orchestrator routing example |
| 5 | `.agents/agents/1TRK EXEC.agent.md` | Executor bounded task example |
| 6 | `scripts/1trk/tracker.ts` | Deterministic workflow core |
| 7 | `.github/copilot-instructions.md` | Context hygiene section |
| 8 | `.github/agents/Orchestrator - SXA Conversion.agent.md` | Token budget and context editing settings |
| 9 | `apps/kajoo-mcp-server/src/tools/sandboxes/sandbox-validate-render.ts` | Bounded validation response that avoids huge HTML payloads |
| 10 | `.github/ARCHITECTURE.md` | Three-layer architecture: orchestrators, sub-agents, skills |
| Bonus | `apps/kajoo-mcp-server/src/tools/migrations/migration-analyze-components.ts` | MVC analyzer and Sitecore migration proof |
| Bonus | `.github/agents/Code Migration - MVC Components.agent.md` | Migration agent example |

## Speaker Notes Proof Points

Use these in notes, not necessarily on slides.

- The branch had 684 commits analyzed.
- The work concentrated around agent infrastructure, reliability, determinism, and boundaries.
- The explicit orchestrator versus executor split exists in code, prose, and lint.
- `scripts/1trk` was built as a deterministic state machine because workflow state inside agents can drift.
- Context hygiene is explicit in agent configuration and repo instructions.
- The `.strict()` story is a concrete anti-hallucination defense.
- Sitecore migration is the practical use case: XP, MVC, SXA, rendering conversion, serialization, validation, and XM Cloud.

## Risks and Claims to Avoid

Avoid overstating the system.

Do not claim:

- agents are fully autonomous
- everything is deterministic now
- prompts are gone
- drift is solved
- context bloat is solved
- the 1TRK CLI replaced all agent workflows
- chat-tree analysis is a polished product
- a live migration-init demo is safe to run on stage

Better phrasing:

- tools reduced drift
- deterministic workflows moved high-risk steps out of agent interpretation
- context is managed, not solved
- agents still need human review
- the system is a set of defenses, not magic

## Build Tasks for the VS Code Agent

Please help me prepare the presentation package.

Create or update files for:

1. A six-slide deck outline with slide titles, on-slide text, visual descriptions, and speaker notes.
2. A short demo runbook for the two low-risk demos and one optional Sitecore migration demo.
3. A list of exact file paths and line ranges to open in VS Code during the talk.
4. A one-page speaker cheat sheet with the opening, transitions, key soundbites, and closing.
5. Optional: simple Mermaid diagrams for orchestrator/executor/tools and agentic versus deterministic boundary.

Rules:

- Do not modify application source code.
- It is okay to create presentation prep files under a new folder such as `docs/talks/sugmsp-agentic-systems/`.
- Keep the deck to six slides plus demos.
- Keep commit hashes in speaker notes, not main slides.
- No customer names on slides or in notes.
- Do not make this sound like a vendor pitch.
- Keep the tone technical, honest, and human.

## Desired Closing

Close with these two lines:

> The new craft is deciding where autonomy belongs.
>
> The job did not get easier. It got more important.
