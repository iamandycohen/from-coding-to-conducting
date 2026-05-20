import { ask, type AgentResult } from "./agent.js";
import { STOPWORDS, type Doc, type Topic } from "./docs.js";

// A tiny deterministic router. Maps query words to a topic.
// Real systems do this with classifiers or embeddings. The idea is the same:
// decide where the question belongs before deciding who answers it.
const ROUTING: Record<string, Topic> = {
  api: "api",
  endpoint: "api",
  rate: "api",
  limit: "api",
  bill: "billing",
  billing: "billing",
  invoice: "billing",
  refund: "billing",
  tax: "billing",
  auth: "auth",
  login: "auth",
  sso: "auth",
  password: "auth",
};

function classify(query: string): Topic {
  const words = (query.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(
    (w) => !STOPWORDS.has(w),
  );
  const votes = new Map<Topic, number>();
  for (const w of words) {
    const topic = ROUTING[w];
    if (!topic) continue;
    votes.set(topic, (votes.get(topic) ?? 0) + 1);
  }
  let winner: Topic = "api";
  let best = -1;
  for (const [topic, n] of votes) {
    if (n > best) {
      winner = topic;
      best = n;
    }
  }
  return winner;
}

export interface OrchestratorResult extends AgentResult {
  routedTo: Topic;
  bagSize: number;
}

// Orchestrator.
//
// One job: figure out which sub-agent should answer, hand it a
// scoped context, and return what the sub-agent says.
//
// Each sub-agent is just `ask(query, scopedBag)` — same code as the
// solo agent, run on a fresh, narrow context. That's the whole trick.
export function orchestrate(query: string, corpus: Doc[]): OrchestratorResult | null {
  const topic = classify(query);
  const scopedBag = corpus.filter((d) => d.topic === topic);
  const answer = ask(query, scopedBag);
  if (!answer) return null;
  return { ...answer, routedTo: topic, bagSize: scopedBag.length };
}
