import { runTaskLoose } from "./tool-loose.js";
import { runTaskStrict } from "./tool-strict.js";

// What the agent THOUGHT it was calling. The "k" is a hallucinated typo.
export const fabricated = { tasdkId: "abc-123" };

export function callLoose(): string {
  return runTaskLoose(fabricated);
}

export function callStrict(): string {
  return runTaskStrict(fabricated);
}
