// The "loose" tool. No schema. It trusts whatever the agent hands it.
// This is what most hand-written MCP tools look like before someone gets bitten.

type LooseInput = { taskId: string };

export function runTaskLoose(input: unknown): string {
  const cast = input as LooseInput;
  return `processed task: ${cast.taskId}`;
}
