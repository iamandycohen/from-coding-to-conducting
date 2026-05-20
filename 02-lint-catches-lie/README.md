# Demo 2 — Lint Catches the Lie

## What this demo proves

The boundary defense isn't only at runtime. Agent prose — instructions, sub-agent files, skills — can lie about tool arguments too. A small lint at commit time stops that prose from ever shipping.

## What the audience sees

A sub-agent Markdown file on screen. A lint runs against it and prints a red error pointing at the bad line. The speaker fixes the file live in the editor. The lint runs again. Green. Then a framed lesson.

## What to say BEFORE running

> "Demo one was about runtime. The agent calls the tool and gets caught. But agents also generate prose — instructions, skill files, definitions of other agents. That prose says things like 'call this tool with these arguments.' What stops the prose from lying?"

## How to run

1. From the Command Palette: **Tasks: Run Task → Demo 2 — Lint Catches the Lie**.
2. The "BAD RUN" frame appears. Let it sit while you say the line below.
3. When prompted "Press Enter when fixed…" — **switch to the editor**, open `02-lint-catches-lie/demo-agent.md`, and delete the `"outcomeStatus": "shipped"` line. Move the value into `payload` if you want to be thorough. Save.
4. Return to the terminal. Press Enter. The lint reruns.
5. The lesson frame closes the demo.

## What to say DURING

When the bad lint fires:

> "Line 14. `outcomeStatus` is not a real argument. The agent invented it. And this file is checked into the repo — it teaches *other* agents to make the same mistake."

While editing the file:

> "Fix the prose. Same as fixing code."

## What to say AFTER

> "This is a lint. It runs in CI. Agent prose that references arguments that don't exist cannot land on master. The system defends itself from the agents that write it."

## Total time

~90 seconds (most of it is the live edit).

## If it breaks

If the terminal can't read the keypress, the demo still works — just narrate it: "Pretend I just fixed it." Then run `npm run demo:2` again after editing.

## Reset

After each rehearsal:

```bash
./02-lint-catches-lie/RESET.sh
```

This restores `demo-agent.md` to its intentionally-broken state.
