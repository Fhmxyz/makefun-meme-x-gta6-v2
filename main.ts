// Hand-off program for the gta6-meme-x-01 entry (v2).
//
// The actual entry lives on X (see POST.json). This tiny program's only
// job is to place a copy of POST.json where the grader expects it:
// from the bot directory into the output directory.

import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

async function run(): Promise<void> {
  const from = join(botDir, "POST.json");
  const to = join(outputDir, "POST.json");
  try {
    await mkdir(outputDir, { recursive: true });
    await copyFile(from, to);
    console.log(`Delivered POST.json to "${to}".`);
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(
      `Could not deliver POST.json from "${from}" to "${to}": ${detail}. ` +
        `Check that POST.json exists in the bot directory and that the output directory is writable.`,
    );
    process.exit(1);
  }
}

await run();
