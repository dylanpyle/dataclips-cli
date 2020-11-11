interface ParsedFile {
  clipSlug: string;
  title: string;
  query: string;
}

export default async function parseFile(fileName: string): Promise<ParsedFile> {
  let content: string;
  try {
    content = await Deno.readTextFile(fileName);
  } catch (err) {
    throw new Error(`Could not read file ${fileName}`);
  }

  const clipSlugMatch = content.match(/\-\- clip_slug: ([^\r\n]+)[\r\n]/);
  const titleMatch = content.match(/\-\- title: ([^\r\n]+)[\r\n]/);

  if (
    !clipSlugMatch || !clipSlugMatch[1] || !titleMatch || !titleMatch[1]) {
    throw new Error(`File ${fileName} is missing a Dataclip ID or title. Please add a block like this at the beginning of the file:

-- clip_slug: vgntjcbwfakfsxhdmrmzmliwftts
-- title: A Test Dataclip`);
  }

  const clipSlug = clipSlugMatch[1];
  const title = titleMatch[1];

  return {
    clipSlug,
    title,
    query: content
  };
}
