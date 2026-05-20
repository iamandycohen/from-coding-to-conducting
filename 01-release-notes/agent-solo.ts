import { COMMITS, type Commit, type NoteItem } from "./data.js";

// A single free-running agent. One prompt: "summarize these commits as
// release notes, grouped by category."
//
// What it does (and this is the typical failure shape):
//   - invents categories beyond what was asked for
//   - includes internal commits (the user didn't say *don't*)
//   - copies subjects verbatim — even the long one
//   - doesn't notice near-duplicates
//
// No malice. No bug. Just an agent doing exactly what an agent does
// when there's no boundary telling it where to stop.
export function soloAgentNotes(commits: Commit[] = COMMITS): NoteItem[] {
  const items: NoteItem[] = [];
  for (const c of commits) {
    let category = "Other";
    if (c.type === "feat")          category = "Features";
    else if (c.type === "fix")      category = "Fixes";
    else if (c.type === "perf")     category = "Performance";
    else if (c.type === "refactor") category = "Improvements";
    else if (c.type === "chore")    category = "Maintenance";
    else if (c.type === "test")     category = "Quality";
    else if (c.type === "docs")     category = "Documentation";
    items.push({ category, text: c.subject });
  }
  return items;
}
