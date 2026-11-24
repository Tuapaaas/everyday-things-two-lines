// Everyday Things, Two Lines, Longer Run — make.fun bounty entry.
//
// The entry is two lines explaining one everyday thing (a toaster) to a
// 10-year-old. Line 1 is one vivid sentence built on an analogy; line 2
// says in one sentence why that analogy works: what it maps and what it
// leaves out. The program writes exactly those two lines to entry.txt
// under MAKEFUN_OUTPUT_DIR (or ./output when run locally).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A toaster is a tiny sun that lives in a box on the kitchen counter and tans your bread brown.";
const LINE_2 =
  "It maps the heat turning pale bread golden, but leaves out that no real sun dings and pops your breakfast up when it is done.";

const ENTRY = `${LINE_1}\n${LINE_2}\n`;

function main(): void {
  // Gate: the sealed scorer wants UTF-8 text of 1 to 400 characters,
  // not only white space, in exactly two lines.
  const body = ENTRY.replace(/\n$/, "");
  const lines = body.split("\n");
  if (body.length < 1 || body.length > 400) {
    throw new Error(`entry is ${body.length} chars, outside the 1-400 gate`);
  }
  if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
    throw new Error("entry must be exactly two non-blank lines");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
