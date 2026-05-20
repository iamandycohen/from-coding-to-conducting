import pc from "picocolors";

const WIDTH = 56;
const BAR = "━".repeat(WIDTH);

function blank(): void {
  console.log("");
}

export function section(title: string): void {
  blank();
  console.log(pc.cyan(BAR));
  console.log(pc.cyan("  " + title));
  console.log(pc.cyan(BAR));
  blank();
}

export function info(line: string): void {
  console.log(pc.dim("  " + line));
}

export function warn(line: string): void {
  console.log(pc.yellow("  ⚠ " + line));
}

export function fail(line: string): void {
  console.log(pc.red("  ✗ " + line));
}

export function success(line: string): void {
  console.log(pc.green("  ✓ " + line));
}

export function lesson(text: string): void {
  blank();
  console.log(pc.bold(pc.magenta(BAR)));
  console.log(pc.bold(pc.magenta("  THE LESSON")));
  console.log(pc.bold(pc.magenta(BAR)));
  blank();
  for (const line of text.split("\n")) {
    console.log(pc.bold("  " + line));
  }
  blank();
}

export function raw(line: string): void {
  console.log("  " + line);
}

export function diffMinus(line: string): void {
  console.log(pc.red("  - " + line));
}

export function diffPlus(line: string): void {
  console.log(pc.green("  + " + line));
}

export function code(line: string): void {
  console.log(pc.cyan("  │ ") + line);
}

export function pause(ms: number = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
