import { z } from "zod";

const StrictInput = z
  .object({
    taskId: z.string(),
  })
  .strict();

export function runTaskStrict(input: unknown): string {
  const parsed = StrictInput.parse(input);
  return `processed task: ${parsed.taskId}`;
}
