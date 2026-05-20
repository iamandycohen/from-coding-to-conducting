import {
  COMMITS,
  MAX_CHARS,
  MAX_ITEMS,
  USER_FACING_CATEGORIES,
  type NoteItem,
} from "./data.js";
import { soloAgentNotes } from "./agent-solo.js";
import { check, conductedNotes } from "./pipeline.js";
import {
  code,
  fail,
  info,
  lesson,
  pause,
  raw,
  section,
  success,
  warn,
} from "../_lib/frame.js";

function printNotes(items: NoteItem[]): void {
  const order = [
    ...USER_FACING_CATEGORIES,
    ...Array.from(new Set(items.map((i) => i.category))).filter(
      (c) => !(USER_FACING_CATEGORIES as readonly string[]).includes(c),
    ),
  ];
  for (const cat of order) {
    const inCat = items.filter((i) => i.category === cat);
    if (inCat.length === 0) continue;
    code(`## ${cat}`);
    for (const it of inCat) code(`- ${it.text}`);
    code("");
  }
}

async function main(): Promise<void> {
  // Act 1 — THE STORY
  section("THE STORY");
  info("Engineering wants release notes for the sprint.");
  info(`${COMMITS.length} commits in. Out: at most ${MAX_ITEMS} items,`);
  info(`each ≤ ${MAX_CHARS} chars, grouped as Features /`);
  info("Fixes / Performance. No internal noise.");
  await pause();

  // Act 2 — THE BAD RUN
  section("THE BAD RUN — one agent, free-running");
  info("Prompt: 'summarize these commits as release notes.'");
  raw("");
  const solo = soloAgentNotes(COMMITS);
  printNotes(solo);
  const soloCheck = check(solo);
  for (const v of soloCheck.violations) fail(v);
  raw("");
  warn(`${soloCheck.violations.length} violations. These notes would ship.`);
  warn("Internal commits leaked. Duplicates. A one-line item");
  warn("that runs three lines. Nobody is going to read this.");
  await pause(1200);

  // Act 3 — THE CHANGE
  section("THE CHANGE — split into roles");
  info("Replace one agent with a small system:");
  raw("");
  code("orchestrator(commits)         // classify, drop internal");
  code("  → executor(category, list)  // dedupe, fit to width");
  code("    → checker(items)          // enforce constraints");
  raw("");
  info("Each role is small. Each role has one job.");
  info("The checker is the contract — and it runs on both.");
  await pause(1200);

  // Act 4 — THE GOOD RUN
  section("THE GOOD RUN — conducted");
  info(`Same ${COMMITS.length} commits. Through the pipeline:`);
  raw("");
  const good = conductedNotes(COMMITS);
  printNotes(good);
  const goodCheck = check(good);
  if (goodCheck.ok) {
    success("Checker passed. All constraints satisfied.");
  } else {
    for (const v of goodCheck.violations) fail(v);
  }
  await pause(1000);

  // Act 5 — THE LESSON
  lesson(
    [
      "One agent guesses.",
      "Roles + a checker compose.",
      "",
      "Conducting is deciding where the",
      "boundary goes — and putting the",
      "non-negotiable parts in code.",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
