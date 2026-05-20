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
  // Act 1 — THE STORY
  section("THE STORY");
  info("Tracker state used to live inside the agent —");
  info("described in prose, interpreted every time.");
  info("It drifted. Different runs picked different");
  info("findings. State was never wrong, but it was");
  info("never the same twice.");
  raw("");
  info("So we pulled it out of the prompt and into");
  info("code. A deterministic CLI. Same input, same");
  info("output. Forever.");
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
      "A workflow described to an agent is",
      "still being interpreted.",
      "",
      "A workflow encoded in code is enforced.",
      "",
      "Both implementations are honest.",
      "Only one is reproducible.",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
