// Twenty commits from a fictional sprint. Realistic shape: a mix of
// user-facing work and internal plumbing, with a couple of near-duplicates
// and one subject that ran long because the author was venting.

export type CommitType =
  | "feat"
  | "fix"
  | "perf"
  | "chore"
  | "refactor"
  | "test"
  | "docs";

export interface Commit {
  sha: string;
  type: CommitType;
  scope: string;
  subject: string;
}

export const COMMITS: Commit[] = [
  { sha: "a1b2c3d", type: "feat",     scope: "auth",          subject: "add OAuth login with Google" },
  { sha: "b2c3d4e", type: "feat",     scope: "auth",          subject: "support Google sign-in on the marketing site" },
  { sha: "c3d4e5f", type: "fix",      scope: "billing",       subject: "stop charging cancelled subscriptions on the day of cancellation in some timezones" },
  { sha: "d4e5f6a", type: "perf",     scope: "search",        subject: "cache search results for 60s" },
  { sha: "e5f6a7b", type: "chore",    scope: "ci",            subject: "bump CI runner to ubuntu-24.04" },
  { sha: "f6a7b8c", type: "fix",      scope: "ui",            subject: "dark mode toggle now persists across sessions" },
  { sha: "a7b8c9d", type: "refactor", scope: "core",          subject: "extract date utilities to shared package" },
  { sha: "c9d0e1f", type: "fix",      scope: "billing",       subject: "correct tax calculation for EU customers" },
  { sha: "d0e1f2a", type: "test",     scope: "auth",          subject: "add e2e tests for OAuth flow" },
  { sha: "e1f2a3b", type: "feat",     scope: "search",        subject: "add filters by date range and status" },
  { sha: "f2a3b4c", type: "docs",     scope: "readme",        subject: "update setup instructions" },
  { sha: "a3b4c5d", type: "fix",      scope: "search",        subject: "fix off-by-one in pagination" },
  { sha: "b4c5d6e", type: "perf",     scope: "dashboard",     subject: "lazy-load chart components" },
  { sha: "c5d6e7f", type: "feat",     scope: "notifications", subject: "add Slack integration" },
  { sha: "d6e7f8a", type: "chore",    scope: "deps",          subject: "upgrade React 18 to 19" },
  { sha: "a9b0c1d", type: "refactor", scope: "core",          subject: "rename UserService to AccountsService" },
  { sha: "b0c1d2e", type: "fix",      scope: "ui",            subject: "form validation errors now visible on mobile" },
];

// The constraints engineering set for the release notes.
export const MAX_ITEMS = 8;
export const MAX_CHARS = 80;
export const USER_FACING_CATEGORIES = ["Features", "Fixes", "Performance"] as const;
export type UserFacingCategory = (typeof USER_FACING_CATEGORIES)[number];

// Which commit types map to which user-facing category.
// Everything else (chore/test/docs/refactor) is INTERNAL and never ships.
export const TYPE_TO_CATEGORY: Partial<Record<CommitType, UserFacingCategory>> = {
  feat: "Features",
  fix: "Fixes",
  perf: "Performance",
};

export const INTERNAL_TYPES = new Set<CommitType>(["chore", "test", "docs", "refactor"]);

export interface NoteItem {
  category: string;
  text: string;
}
