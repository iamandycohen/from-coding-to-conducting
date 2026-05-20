import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// The real tool surface. Inline registry so the lint stays readable on stage.
const TOOL_REGISTRY: Record<string, string[]> = {
  "migration-work-decide": ["kind", "key", "payload", "expect"],
};

type LintError = {
  file: string;
  line: number;
  tool: string;
  unknownKey: string;
};

function lint(filePath: string): LintError[] {
  const text = readFileSync(filePath, "utf8");
  const lines = text.split("\n");
  const errors: LintError[] = [];

  // Walk the file. When we see `migration-work-decide` followed by a json
  // fence within the next few lines, parse it and check its keys.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const toolMatch = /`(migration-work-[a-z]+)`/.exec(line);
    if (!toolMatch) continue;
    const tool = toolMatch[1]!;
    const allowed = TOOL_REGISTRY[tool];
    if (!allowed) continue;

    // Find the next ```json ... ``` block.
    let openIdx = -1;
    for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
      if (/^```json\s*$/.test(lines[j] ?? "")) {
        openIdx = j;
        break;
      }
    }
    if (openIdx === -1) continue;
    let closeIdx = -1;
    for (let j = openIdx + 1; j < lines.length; j++) {
      if (/^```\s*$/.test(lines[j] ?? "")) {
        closeIdx = j;
        break;
      }
    }
    if (closeIdx === -1) continue;

    const blockText = lines.slice(openIdx + 1, closeIdx).join("\n");
    let parsed: unknown;
    try {
      parsed = JSON.parse(blockText);
    } catch {
      continue;
    }
    if (!parsed || typeof parsed !== "object") continue;

    const blockLines = lines.slice(openIdx + 1, closeIdx);
    for (const key of Object.keys(parsed as Record<string, unknown>)) {
      if (allowed.includes(key)) continue;
      // Find the line within the block that contains this key.
      let lineNo = openIdx + 1; // 0-based; we'll convert at the end
      for (let k = 0; k < blockLines.length; k++) {
        const re = new RegExp(`"${key}"\\s*:`);
        if (re.test(blockLines[k] ?? "")) {
          lineNo = openIdx + 1 + k;
          break;
        }
      }
      errors.push({
        file: filePath,
        line: lineNo + 1, // 1-based
        tool,
        unknownKey: key,
      });
    }
  }

  return errors;
}

function main(): void {
  const target = process.argv[2] ?? resolve(import.meta.dirname, "demo-agent.md");
  const errors = lint(target);

  if (errors.length === 0) {
    console.log(`✓ ${target}: ok`);
    process.exit(0);
  }

  for (const err of errors) {
    console.error(
      `✗ ${err.file}:${err.line}  ${err.tool}: unknown argument '${err.unknownKey}'`,
    );
  }
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}

main();
