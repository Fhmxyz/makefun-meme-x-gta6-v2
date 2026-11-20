// The entry itself is a post on X, not code in this repo.
// This little program just carries POST.json — the file that points
// at that post — from the bot folder into the folder the grader
// looks in, untouched, so the submission can be checked.

import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const destination = join(outputDir, "POST.json");

try {
  await mkdir(outputDir, { recursive: true });
  await copyFile(source, destination);
  console.log(`Delivered POST.json to ${destination}`);
} catch (error) {
  console.error(`Could not deliver POST.json from ${source} to ${destination}: ${error}`);
  console.error("Make sure POST.json is present in the bot directory and the output directory can be written to.");
  process.exit(1);
}
