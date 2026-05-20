# Demo 3 — Skill vs CLI

## What this demo proves

When the rules of a workflow live in English, an LLM interprets them — and the interpretation drifts. When the same rules live in TypeScript, a function executes them — and three runs return the same answer. Same rules, two engines.

## What the audience sees

The framed narrator explains the setup, then the speaker switches to a custom chat mode and runs an LLM agent three times against the same prompt. The answers vary (usually). Then back to the terminal: the picker function's source is shown on screen, followed by three identical CLI runs. Then the lesson.

## What to say BEFORE running

> "Two engines. Same rules. Same data. One reads the rules as English. One reads them as code. Watch what happens to consistency."

## How to run

1. From the Command Palette: **Tasks: Run Task → Demo 3 — CLI Engine**.
2. The "THE LLM ENGINE" frame appears with instructions.
3. **Switch to the chat panel.** Use the agent picker and select the custom agent **Demo Picker - LLM Only**.
4. Send the message: `what's next?`
5. Note the answer.
6. Click **New chat** (so the next answer is fresh, not influenced by the previous turn).
7. Switch back to **Demo Picker - LLM Only**. Send `what's next?` Note the answer.
8. Repeat once more. Three runs total.
9. **Optional bonus beat:** in a new chat with the default agent, type `/demo-picker-cli` to invoke the skill. It runs the CLI and returns the ID. Same answer, every time.
10. Return to the terminal. The script is paused on the CLI frame — let it run. It prints the picker source, then three identical answers.

## What to say DURING

While the LLM runs:

> "Same prompt. Same rules. Same tracker. Three times. Watch the variance."

If the LLM happens to give the same answer all three times:

> "Look at that — it converged. Lucky. The reason it can converge is also the reason it can drift. We can't tell which way it'll go on any given run. That's the problem."

When the picker source appears:

> "Twenty-five lines. Three filters and a sort. The English version is shorter, but the English version doesn't run."

## What to say AFTER

> "Same rules. Same tracker. The only thing that changed is whether a language model interpreted the rules in English, or a function executed them in code. The agents got smaller. The system got reliable."

## Total time

~3 minutes (the LLM side is the long part).

## If it breaks

- **Agent or skill isn't visible:** open the chat picker manually and verify `.github/agents/demo-picker-llm.agent.md` and `.github/skills/demo-picker-cli/SKILL.md` exist. Reload the VS Code window. If still not, just open the agent file and read the prompt aloud — the talking point lands without the live LLM call.
- **LLM converges on the same answer all three times:** see the line above. It's a feature of the talk, not a failure.
- **CLI errors out:** run `npm install` again and re-run the task.
