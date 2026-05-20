import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  section,
  info,
  warn,
  fail,
  success,
  lesson,
  pause,
  raw,
  code,
} from "../_lib/frame.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET = resolve(HERE, "demo-agent.md");
const LINT = resolve(HERE, "lint.ts");
const TSX = resolve(HERE, "..", "node_modules", ".bin", "tsx");

function showFileWithLineNumbers(path: string): void {
  const text = readFileSync(path, "utf8");
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const ln = String(i + 1).padStart(2, " ");
    code(`${ln}  ${lines[i]}`);
  }
}

function runLint(): { code: number; out: string; err: string } {
  const result = spawnSync(TSX, [LINT, TARGET], { encoding: "utf8" });
  return {
    code: result.status ?? 0,
    out: result.stdout ?? "",
    err: result.stderr ?? "",
  };
}

function printLintOutput(r: { code: number; out: string; err: string }): void {
  for (const line of (r.err + r.out).split("\n")) {
    if (!line.trim()) continue;
    if (line.startsWith("✗")) {
      fail(line.slice(1).trim());
    } else if (line.startsWith("✓")) {
      success(line.slice(1).trim());
    } else {
      raw(line);
    }
  }
}

async function waitForEnter(prompt: string): Promise<void> {
  process.stdout.write("  " + prompt);
  await new Promise<void>((resolve) => {
    const onData = (): void => {
      process.stdin.off("data", onData);
      process.stdin.pause();
      resolve();
    };
    process.stdin.resume();
    process.stdin.once("data", onData);
  });
  console.log("");
}

async function main(): Promise<void> {
  // Act 1 — THE PROBLEM
  section("THE PROBLEM");
  info("Agents don't just call tools at runtime.");
  info("They also reference tools in prose — instructions,");
  info("sub-agent definitions, skill files. That prose can");
  info("name arguments that do not exist.");
  await pause();

  // Act 2 — THE BAD RUN
  section("THE BAD RUN");
  info("Here is a sub-agent file checked into the repo:");
  raw("");
  showFileWithLineNumbers(TARGET);
  raw("");
  info("Running the lint:");
  raw("");
  const bad = runLint();
  printLintOutput(bad);
  raw("");
  if (bad.code === 0) {
    warn("Expected lint to fail. It passed. Run RESET.sh.");
  } else {
    warn("The agent prose references an argument that does");
    warn("not exist on the real tool. This would have shipped.");
  }
  await pause(1200);

  // Act 3 — THE CHANGE
  section("THE CHANGE");
  info("Fix the agent file in VS Code.");
  info(`Open: 02-lint-catches-lie/demo-agent.md`);
  info("Remove the bad key. Move the value into payload.");
  raw("");
  await waitForEnter("Press Enter when fixed… ");

  // Act 4 — THE GOOD RUN
  section("THE GOOD RUN");
  info("Re-running the lint:");
  raw("");
  const good = runLint();
  printLintOutput(good);
  raw("");
  if (good.code === 0) {
    success("Agent prose matches the real tool surface.");
  } else {
    fail("Lint still failing. Check the file.");
  }
  await pause(1000);

  // Act 5 — THE LESSON
  lesson(
    [
      "This runs in CI. Agent prose that references",
      "arguments that don't exist cannot land on master.",
      "The system defends itself from the agents that",
      "write it.",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
