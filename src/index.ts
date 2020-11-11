import findHerokuToken from "./find-heroku-token.ts";
import parseFile from "./parse-file.ts";
import updateDataclip from "./update-dataclip.ts";

function write(message: string) {
  const text = new TextEncoder().encode(message);
  Deno.writeAll(Deno.stdout, text);
}

async function run() {
  const herokuToken = await findHerokuToken();

  const fileNames = Deno.args;

  if (fileNames.length < 1) {
    throw new Error(`Usage: index.ts <filename> <filename> ...`);
  }

  for (const file of fileNames) {
    const { clipSlug, title, query } = await parseFile(file);
    write(`Updating dataclip ${clipSlug}... `);
    await updateDataclip({ clipSlug, title, query, authToken: herokuToken });
  }

  console.log("OK");
}

try {
  await run();
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  Deno.exit(1);
}
