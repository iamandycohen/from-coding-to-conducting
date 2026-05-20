import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  section,
  info,
  success,
  lesson,
  pause,
  raw,
  code,
} from "../_lib/frame.js";
import { pickNext } from "./picker.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const TRACKER = resolve(HERE, "tracker.demo.yaml");
const PICKER = resolve(HERE, "picker.ts");

async function main(): Promise<void> {
  // Act 1 — THE PROBLEM
  section("THE PROBLEM");
  info("Same rules. Same tracker. Two engines.");
  info("One reads the rules in English (an LLM).");
  info("One reads them in TypeScript (a function).");
  info("Watch which one drifts.");
  await pause();

  // Act 2 — THE LLM ENGINE (instructions for the speaker)
  section("THE LLM ENGINE");
  info("Switch to the custom agent:");
  info("  → Demo Picker - LLM Only");
  info("Ask three times: \"what's next?\"");
  info("Watch the answers. Watch for variance.");
  raw("");
  info("(Speaker runs the agent live in VS Code now.)");
  await pause(1500);

  // Act 3 — THE CHANGE
  section("THE CHANGE");
  info("Replace English with a function:");
  raw("");
  const pickerSource = readFileSync(PICKER, "utf8");
  for (const line of pickerSource.split("\n")) {
    code(line);
  }
  raw("");
  await pause(1500);

  // Act 4 — THE CLI ENGINE
  section("THE CLI ENGINE");
  info("Same tracker. Same rules. Three runs:");
  raw("");
  for (let i = 1; i <= 3; i++) {
    const next = pickNext(TRACKER);
    success(`run ${i}: ${next}`);
    await pause(400);
  }
  raw("");
  info("Three runs. One answer. Every time.");
  await pause(1000);

  // Act 5 — THE LESSON
  lesson(
    [
      "Same rules. Same tracker file. The only thing",
      "that changed is whether a language model",
      "interpreted the rules in English, or a function",
      "executed them in code.",
      "",
      "The agents got smaller. The system got reliable.",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
