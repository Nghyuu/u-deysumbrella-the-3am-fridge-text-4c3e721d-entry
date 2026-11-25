import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// The 3AM Fridge Text — one line a smart fridge would text its owner at 3am.
const line =
  "3am. I switched my light on for you. The leftovers you swore you'd eat have started paying rent.";

// Gate: UTF-8 text, 1 to 140 characters, not only whitespace, single line.
if (line.length < 1 || line.length > 140 || line.trim().length === 0) {
  throw new Error(`entry length ${line.length} is outside 1-140 characters`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  path.join(path.dirname(fileURLToPath(import.meta.url)), "output");

fs.mkdirSync(outDir, { recursive: true });
const entryPath = path.join(outDir, "entry.txt");
fs.writeFileSync(entryPath, line + "\n", "utf8");
// The grader collects /output as another user; the VM umask would leave
// the file at 660, so force world-readable mode before exiting.
fs.chmodSync(entryPath, 0o644);
