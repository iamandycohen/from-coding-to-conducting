import {
  COMMITS,
  INTERNAL_TYPES,
  MAX_CHARS,
  MAX_ITEMS,
  TYPE_TO_CATEGORY,
  USER_FACING_CATEGORIES,
  type Commit,
  type NoteItem,
  type UserFacingCategory,
} from "./data.js";

// ORCHESTRATOR
// Decides shape. Drops internal commits. Classifies the rest.
// No prose. No summarization. Just routing.
export function orchestrate(commits: Commit[]): Map<UserFacingCategory, Commit[]> {
  const byCategory = new Map<UserFacingCategory, Commit[]>();
  for (const cat of USER_FACING_CATEGORIES) byCategory.set(cat, []);
  for (const c of commits) {
    if (INTERNAL_TYPES.has(c.type)) continue;
    const cat = TYPE_TO_CATEGORY[c.type];
    if (!cat) continue;
    byCategory.get(cat)!.push(c);
  }
  return byCategory;
}

// EXECUTOR
// Per category: dedupe near-duplicates by scope, fit to MAX_CHARS.
// One job, narrowly scoped. Deterministic.
export function executeCategory(
  category: UserFacingCategory,
  commits: Commit[],
): NoteItem[] {
  const seen = new Set<string>();
  const out: NoteItem[] = [];
  for (const c of commits) {
    if (seen.has(c.scope)) continue;
    seen.add(c.scope);
    const text =
      c.subject.length > MAX_CHARS
        ? c.subject.slice(0, MAX_CHARS - 1).trimEnd() + "…"
        : c.subject;
    out.push({ category, text });
  }
  return out;
}

// CHECKER
// The non-negotiable constraints. Runs against any candidate notes —
// solo or conducted — and reports every violation.
export interface CheckResult {
  ok: boolean;
  violations: string[];
}

export function check(items: NoteItem[]): CheckResult {
  const violations: string[] = [];

  if (items.length > MAX_ITEMS) {
    violations.push(`too many items: ${items.length} (max ${MAX_ITEMS})`);
  }

  const allowed = new Set<string>(USER_FACING_CATEGORIES);
  const badCategories = new Set<string>();
  for (const it of items) {
    if (!allowed.has(it.category)) badCategories.add(it.category);
  }
  for (const c of badCategories) {
    violations.push(`non-user-facing category leaked: "${c}"`);
  }

  for (const it of items) {
    if (it.text.length > MAX_CHARS) {
      violations.push(
        `item over ${MAX_CHARS} chars (${it.text.length}): "${it.text.slice(0, 48)}…"`,
      );
    }
  }

  const seenKeys = new Map<string, string>();
  for (const it of items) {
    const key = `${it.category}|${it.text.toLowerCase().split(" ").slice(0, 3).join(" ")}`;
    if (seenKeys.has(key)) {
      violations.push(`near-duplicate in ${it.category}: "${it.text}"`);
    }
    seenKeys.set(key, it.text);
  }

  return { ok: violations.length === 0, violations };
}

// CONDUCTED PIPELINE
// orchestrator → executor (per category) → cap to MAX_ITEMS.
// The checker is what enforces correctness; this just composes the work.
export function conductedNotes(commits: Commit[] = COMMITS): NoteItem[] {
  const byCategory = orchestrate(commits);
  const items: NoteItem[] = [];
  for (const cat of USER_FACING_CATEGORIES) {
    items.push(...executeCategory(cat, byCategory.get(cat) ?? []));
  }
  return items.slice(0, MAX_ITEMS);
}
