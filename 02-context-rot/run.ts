import { CORPUS } from "./docs.js";
import { ask } from "./agent.js";
import { orchestrate } from "./orchestrator.js";
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

const QUERY = "What is our production API endpoint?";
const TRUTH = "https://api.acme.com/v3";

function verdict(snippet: string): "right" | "wrong" {
  return snippet.includes("api.acme.com/v3") ? "right" : "wrong";
}

async function main(): Promise<void> {
  // Act 1 — THE STORY
  section("THE STORY");
  info("An engineer asks the assistant:");
  raw("");
  code(`Q: ${QUERY}`);
  raw("");
  info(`The correct answer is: ${TRUTH}`);
  info("It is in exactly one doc. The other nine talk");
  info("about the same words but the wrong answers.");
  await pause();

  // Act 2 — LEAN CONTEXT
  section("RUN 1 — lean context");
  info("Hand the agent only the canonical doc.");
  raw("");
  const leanBag = CORPUS.filter((d) => d.id === "current-api.md");
  code(`bag (${leanBag.length}): ${leanBag.map((d) => d.id).join(", ")}`);
  raw("");
  const leanAnswer = ask(QUERY, leanBag);
  if (!leanAnswer) {
    fail("agent returned nothing");
  } else {
    code(`from ${leanAnswer.docId}: "${leanAnswer.snippet}"`);
    if (verdict(leanAnswer.snippet) === "right") {
      success("correct");
    } else {
      fail("wrong");
    }
  }
  await pause(1000);

  // Act 3 — STUFFED CONTEXT
  section("RUN 2 — stuffed context");
  info("Same question, same agent. Hand it the whole corpus.");
  raw("");
  code(`bag (${CORPUS.length}): all docs`);
  raw("");
  const stuffedAnswer = ask(QUERY, CORPUS);
  if (!stuffedAnswer) {
    fail("agent returned nothing");
  } else {
    code(`from ${stuffedAnswer.docId} (score ${stuffedAnswer.score}):`);
    code(`  "${stuffedAnswer.snippet}"`);
    if (verdict(stuffedAnswer.snippet) === "right") {
      success("correct");
    } else {
      fail("wrong");
      warn("Same code. Same question. The bigger bag won the wrong fight.");
      warn("Old changelogs talk about 'production API endpoint' more often");
      warn("than the one doc that has the actual current answer.");
    }
  }
  await pause(1200);

  // Act 4 — THE FIX
  section("THE FIX — orchestrator + sub-agents");
  info("Don't give one agent everything. Route by topic.");
  raw("");
  code("orchestrate(query, corpus):");
  code('  topic     = classify(query)            // "api"');
  code("  scopedBag = corpus.filter(topic)       // 2 docs, not 10");
  code("  return ask(query, scopedBag)           // sub-agent runs lean");
  raw("");
  info("Same agent. Same scorer. Fresh, narrow context.");
  await pause(1000);

  // Act 5 — THE GOOD RUN
  section("RUN 3 — sub-agent (scoped context)");
  const routed = orchestrate(QUERY, CORPUS);
  if (!routed) {
    fail("orchestrator returned nothing");
  } else {
    code(`routed to: ${routed.routedTo}`);
    code(`scoped bag (${routed.bagSize}): only this topic's docs`);
    raw("");
    code(`from ${routed.docId} (score ${routed.score}):`);
    code(`  "${routed.snippet}"`);
    if (verdict(routed.snippet) === "right") {
      success("correct");
    } else {
      fail("wrong");
    }
  }
  await pause(1000);

  // Act 6 — THE LESSON
  lesson(
    [
      "Context is a budget, not a bucket.",
      "",
      "One agent with everything drifts.",
      "Many small agents with scoped context don't.",
      "",
      "Conducting is also deciding",
      "what each agent gets to see.",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
