import { STOPWORDS, type Doc } from "./docs.js";

// Extract keywords from a query — lowercase, words only, no stop-words.
function keywords(query: string): string[] {
  const words = query.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return words.filter((w) => !STOPWORDS.has(w) && w.length > 1);
}

// Count overlapping occurrences of `needle` in `haystack`.
function count(haystack: string, needle: string): number {
  if (!needle) return 0;
  let n = 0;
  let i = 0;
  while ((i = haystack.indexOf(needle, i)) !== -1) {
    n++;
    i += needle.length;
  }
  return n;
}

export interface AgentResult {
  docId: string;
  score: number;
  snippet: string;
}

// The agent.
//
// One job: given a question and a bag of documents, pick the doc that
// best matches the question and quote a relevant sentence from it.
//
// Strategy: sum keyword occurrences across the doc text. Highest score wins.
// This is a real retrieval bias. Whatever talks about the words the most
// tends to win, regardless of whether it's the right answer.
export function ask(query: string, bag: Doc[]): AgentResult | null {
  if (bag.length === 0) return null;
  const ks = keywords(query);
  let best: { doc: Doc; score: number } | null = null;
  for (const d of bag) {
    const text = d.text.toLowerCase();
    const score = ks.reduce((acc, k) => acc + count(text, k), 0);
    if (!best || score > best.score) best = { doc: d, score };
  }
  if (!best) return null;
  // Snippet: the first sentence in the winning doc that contains any keyword.
  const sentences = best.doc.text.split(/(?<=[.!?])\s+/);
  const snippet =
    sentences.find((s) =>
      ks.some((k) => s.toLowerCase().includes(k)),
    ) ?? sentences[0] ?? best.doc.text;
  return { docId: best.doc.id, score: best.score, snippet: snippet.trim() };
}
