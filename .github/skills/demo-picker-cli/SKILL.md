---
name: demo-picker-cli
description: "Pick the next finding by running the deterministic picker CLI. Use when asked 'what's next?' and you want a reproducible answer instead of an interpreted one."
---

# Demo Picker — CLI

The contrast partner to the LLM picker agent. Same rules, same tracker, different engine: this skill runs a small TypeScript function that interprets the rules in code.

## When to Use

- The user asks "what's next?" in this workspace.
- The user wants a deterministic, byte-identical answer across runs.
- The talk's Demo 3 — comparing English rule interpretation vs code execution.

## Procedure

1. Run the command:

   ```bash
   npm run demo:3:cli
   ```

2. The script prints framed output. The three lines that look like:

   ```
   ✓ run 1: <ID>
   ✓ run 2: <ID>
   ✓ run 3: <ID>
   ```

   are the picker's three runs. They will all be the same ID.

3. Return that ID, verbatim. One token. No explanation.

## Constraints

- DO NOT read the rules file. DO NOT read the tracker. The CLI does both.
- DO NOT interpret anything. Run the command. Return the answer.
- If the command fails, surface the stderr — do not guess an ID.
