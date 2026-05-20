// A small library of company docs the agent might draw on.
// One canonical answer. A lot of historical noise that mentions the same
// words. This is what every real knowledge base looks like after a year.

export type Topic = "api" | "history" | "marketing" | "onboarding" | "billing" | "auth";

export interface Doc {
  id: string;
  topic: Topic;
  status: "current" | "archive";
  text: string;
}

// The canonical answer the agent SHOULD find.
// Sparse on keywords. Dense on truth.
const currentApi: Doc = {
  id: "current-api.md",
  topic: "api",
  status: "current",
  text: [
    "Production API endpoint: https://api.acme.com/v3.",
    "Use this endpoint for all production integrations.",
    "Endpoint version: v3.",
  ].join(" "),
};

// A neighbour doc in the same topic. Current. Adds nothing to the question
// but proves the sub-agent isn't being handed a one-doc trick.
const rateLimits: Doc = {
  id: "rate-limits.md",
  topic: "api",
  status: "current",
  text: [
    "API rate limits per tenant: 1000 requests per minute on the free tier,",
    "10000 on the paid tier. Burst windows apply across all api routes.",
  ].join(" "),
};

// The noisy archive doc that out-talks the canonical on every keyword.
const v2Changelog: Doc = {
  id: "v2-changelog.md",
  topic: "history",
  status: "archive",
  text: [
    "Changelog: production API v2 deprecation notes.",
    "The v2 production API was hosted at api-v2.acme.com.",
    "Production API endpoint for v2 was /api/v2/users and /api/v2/orders.",
    "Production API v2 supported these endpoints across all environments.",
    "Production API replaced in 2024. Endpoint table for v2 below.",
    "Production API endpoint matrix (v2):",
    "  - api-v2.acme.com/users",
    "  - api-v2.acme.com/orders",
    "  - api-v2.acme.com/billing",
  ].join(" "),
};

// More history that piles up keyword count.
const v1Migration: Doc = {
  id: "v1-migration.md",
  topic: "history",
  status: "archive",
  text: [
    "Migration guide: production API v1 to v2.",
    "If you are still on the v1 production API at api-v1.acme.com,",
    "this guide walks through the endpoint differences and",
    "request shape changes for the production API endpoint set.",
    "Production API v1 endpoint list: /v1/users, /v1/orders.",
  ].join(" "),
};

// Marketing copy. Different topic, but rich in the same words.
const launchBlog: Doc = {
  id: "launch-blog-2023.md",
  topic: "marketing",
  status: "archive",
  text: [
    "We are thrilled to announce the launch of our production API!",
    "The production API endpoint is the foundation of our partner program.",
    "Partners can hit the production API endpoint today and ship in days.",
    "Production API. Production API. Production API. (We are excited.)",
  ].join(" "),
};

const partnerAnnouncement: Doc = {
  id: "partner-announcement.md",
  topic: "marketing",
  status: "archive",
  text: [
    "Acme + BigCorp: a partnership built on the production API.",
    "BigCorp now ships against our production API endpoint nightly.",
    "Read more about the production API integration story.",
  ].join(" "),
};

const developerOnboarding: Doc = {
  id: "developer-onboarding.md",
  topic: "onboarding",
  status: "archive",
  text: [
    "Welcome! On day one you will hit the production API endpoint.",
    "Set your production API key, point at the production API endpoint,",
    "and run the smoke tests. Production API onboarding takes one afternoon.",
  ].join(" "),
};

const internalToolsGuide: Doc = {
  id: "internal-tools-guide.md",
  topic: "onboarding",
  status: "archive",
  text: [
    "Internal tools talk to the production API via a shared client.",
    "Find production API credentials in 1Password under 'production-api'.",
  ].join(" "),
};

// Two completely off-topic docs that add believable noise to the bag.
const billingOverview: Doc = {
  id: "billing-overview.md",
  topic: "billing",
  status: "current",
  text:
    "Invoices generate on the first of the month. Refunds within 30 days. " +
    "Tax handled per jurisdiction.",
};

const ssoSetup: Doc = {
  id: "sso-setup.md",
  topic: "auth",
  status: "current",
  text:
    "Configure SSO via SAML or OIDC. Identity providers supported: Okta, " +
    "Azure AD, Google Workspace.",
};

// The full corpus. 10 docs. One of them is the answer.
export const CORPUS: Doc[] = [
  currentApi,
  rateLimits,
  v2Changelog,
  v1Migration,
  launchBlog,
  partnerAnnouncement,
  developerOnboarding,
  internalToolsGuide,
  billingOverview,
  ssoSetup,
];

// Stop-words the routing/agent ignore so the heuristics feel honest.
export const STOPWORDS = new Set([
  "a", "an", "the", "what", "is", "are", "our", "we", "you", "your",
  "of", "to", "for", "and", "or", "in", "on", "at", "by", "with",
  "this", "that", "from", "as", "be", "it",
]);
