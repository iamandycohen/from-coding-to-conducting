import { readFileSync } from "node:fs";
import yaml from "js-yaml";

type Finding = {
  id: string;
  status: string;
  sizing: "S" | "M" | "L";
  blocked: boolean;
};

type Tracker = { findings: Finding[] };

const SIZE_RANK: Record<string, number> = { S: 0, M: 1, L: 2 };

export function pickNext(yamlPath: string): string {
  const raw = readFileSync(yamlPath, "utf8");
  const data = yaml.load(raw) as Tracker;
  const candidates = data.findings
    .map((f, idx) => ({ f, idx }))
    .filter(({ f }) => f.status === "planned")
    .filter(({ f }) => f.blocked !== true)
    .sort((a, b) => {
      const sizeDiff = (SIZE_RANK[a.f.sizing] ?? 99) - (SIZE_RANK[b.f.sizing] ?? 99);
      if (sizeDiff !== 0) return sizeDiff;
      return a.idx - b.idx; // tie-break: insertion order
    });

  const first = candidates[0];
  if (!first) throw new Error("no eligible finding");
  return first.f.id;
}
