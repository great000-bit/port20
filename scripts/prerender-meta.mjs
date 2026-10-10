// Runs after `vite build`. Writes a static copy of index.html for each real
// route with that route's own title, description, canonical and social tags,
// so crawlers and link previews that do not run JavaScript still see them.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const config = JSON.parse(readFileSync(join(root, "src/seo.config.json"), "utf8"));
const base = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: could not find ${label} in dist/index.html`);
  return html.replace(pattern, () => replacement);
}

function build(page) {
  const url = `${config.siteUrl}${page.path}`;
  let html = base;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, "title");
  html = swap(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(page.description)}" />`, "description");
  html = swap(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = swap(html, /<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${page.ogType}" />`, "og:type");
  html = swap(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = swap(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(page.title)}" />`, "og:title");
  html = swap(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(page.description)}" />`, "og:description");
  html = swap(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(page.title)}" />`, "twitter:title");
  html = swap(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(page.description)}" />`, "twitter:description");
  return html;
}

const graphicsLd = (page) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${config.siteUrl}${page.path}#page`,
      url: `${config.siteUrl}${page.path}`,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${config.siteUrl}/#website` },
      about: { "@id": `${config.siteUrl}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${config.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Graphics", item: `${config.siteUrl}${page.path}` },
      ],
    },
  ],
});

for (const [key, page] of Object.entries(config.pages)) {
  if (page.noindex || page.path === "/") continue;
  let html = build(page);
  const ld = `<script type="application/ld+json">\n    ${JSON.stringify(graphicsLd(page))}\n    </script>`;
  html = swap(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld, "JSON-LD");
  const dir = join(dist, page.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`prerender-meta: wrote ${page.path}/index.html (${key})`);
}
