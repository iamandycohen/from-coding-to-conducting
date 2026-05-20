import { ZodError } from "zod";
import {
  section,
  info,
  warn,
  fail,
  success,
  lesson,
  pause,
  raw,
  diffMinus,
  diffPlus,
  code,
} from "../_lib/frame.js";
import { callLoose, callStrict, fabricated } from "./call-with-typo.js";

async function main(): Promise<void> {
  // Act 1 — THE PROBLEM
  section("THE PROBLEM");
  info("Agents fabricate arguments. Tools that accept");
  info("anything will silently swallow the lie.");
  await pause();

  // Act 2 — THE BAD RUN
  section("THE BAD RUN");
  info("Agent calls the tool with this input:");
  raw("");
  code(JSON.stringify(fabricated));
  raw("");
  info("Tool definition: no schema — trusts what it gets.");
  await pause(600);

  const looseResult = callLoose();
  raw("");
  success(`returned: "${looseResult}"`);
  raw("");
  warn("The tool returned success. The work did not happen.");
  await pause(1200);

  // Act 3 — THE CHANGE
  section("THE CHANGE");
  info("Add a schema. Make it strict.");
  raw("");
  diffMinus("function runTask(input: unknown) {");
  diffMinus("  const cast = input as { taskId: string };");
  diffMinus("  return `processed task: ${cast.taskId}`;");
  diffMinus("}");
  diffPlus("const Input = z.object({ taskId: z.string() }).strict();");
  diffPlus("function runTask(input: unknown) {");
  diffPlus("  const parsed = Input.parse(input);");
  diffPlus("  return `processed task: ${parsed.taskId}`;");
  diffPlus("}");
  raw("");
  info("The important part: .strict()");
  await pause();

  // Act 4 — THE GOOD RUN
  section("THE GOOD RUN");
  info("Same fabricated input:");
  raw("");
  code(JSON.stringify(fabricated));
  raw("");
  await pause(600);

  try {
    const result = callStrict();
    success(`returned: "${result}"`);
  } catch (err) {
    if (err instanceof ZodError) {
      const issue = err.issues[0];
      const keys =
        issue && "keys" in issue && Array.isArray((issue as { keys?: unknown }).keys)
          ? ((issue as { keys: string[] }).keys.map((k) => `'${k}'`).join(", "))
          : "'tasdkId'";
      fail(`Unrecognized key(s) in object: ${keys}`);
    } else {
      fail(String(err));
    }
  }
  raw("");
  success("The lie was caught at the boundary.");
  await pause(1000);

  // Act 5 — THE LESSON
  lesson(
    [
      "Three characters. Every tool input in the",
      "production system now does this. We caught",
      "dozens of hallucinations the next week.",
      "None of them shipped.",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
