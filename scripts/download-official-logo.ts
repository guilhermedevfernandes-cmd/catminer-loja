import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://catminer.com.br/";
const OUTPUT_PATH = path.join(process.cwd(), "public/brand/logo.png");

function extractLogoUrl(html: string): string | null {
  const branded = html.match(
    /data-framer-name="Identidade Visual - Cat Miner[^"]*"[\s\S]*?src="(https:\/\/framerusercontent\.com\/images\/[^"?]+)/,
  );
  if (branded?.[1]) return branded[1];

  const fallback = html.match(
    /src="(https:\/\/framerusercontent\.com\/images\/vc22NeJ9y5454eJHNeMT0vbC3M\.png)/,
  );
  return fallback?.[1] ?? null;
}

async function main() {
  console.log(`Fetching homepage ${SITE_URL}`);
  const pageResponse = await fetch(SITE_URL);
  if (!pageResponse.ok) {
    throw new Error(`Failed to fetch homepage (${pageResponse.status})`);
  }

  const html = await pageResponse.text();
  const logoUrl = extractLogoUrl(html);
  if (!logoUrl) {
    throw new Error("Official logo URL not found on catminer.com.br");
  }

  console.log(`Downloading logo ${logoUrl}`);
  const logoResponse = await fetch(logoUrl);
  if (!logoResponse.ok) {
    throw new Error(`Failed to download logo (${logoResponse.status})`);
  }

  const logoBuffer = Buffer.from(await logoResponse.arrayBuffer());
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, logoBuffer);

  console.log(`Saved official logo to ${OUTPUT_PATH} (${logoBuffer.length} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
