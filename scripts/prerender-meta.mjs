// Runs after `vite build`. Writes a static copy of index.html for each real
// route with that route's own title, description, canonical, social tags and
// structured data, so crawlers and link previews that do not run JavaScript
// still see them. Also generates the sitemap and the homepage FAQ schema.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const read = (file) => JSON.parse(readFileSync(join(root, file), "utf8"));
const config = read("src/seo.config.json");
const projects = read("src/data/projects.json");
const faq = read("src/faq.json");
const base = readFileSync(join(dist, "index.html"), "utf8");
const site = config.siteUrl;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ld = (data) =>
  `<script type="application/ld+json">\n    ${JSON.stringify(data).replace(/</g, "\\u003c")}\n    </script>`;

// Must match trim() in src/pages/CaseStudy.tsx so runtime and static agree.
const trim = (text, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
};

function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: could not find ${label} in dist/index.html`);
  return html.replace(pattern, () => replacement);
}

const metaTag = (attr, id) => new RegExp(`<meta ${attr}="${id}" content="[^"]*"\\s*\\/?>`);

function build(page, structuredData) {
  const url = `${site}${page.path}`;
  const image = page.image ?? config.image;
  const imageAlt = page.imageAlt ?? config.imageAlt;
  let html = base;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, "title");
  html = swap(html, metaTag("name", "description"), `<meta name="description" content="${esc(page.description)}" />`, "description");
  html = swap(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = swap(html, metaTag("property", "og:type"), `<meta property="og:type" content="${page.ogType}" />`, "og:type");
  html = swap(html, metaTag("property", "og:url"), `<meta property="og:url" content="${url}" />`, "og:url");
  html = swap(html, metaTag("property", "og:title"), `<meta property="og:title" content="${esc(page.title)}" />`, "og:title");
  html = swap(html, metaTag("property", "og:description"), `<meta property="og:description" content="${esc(page.description)}" />`, "og:description");
  html = swap(html, metaTag("property", "og:image"), `<meta property="og:image" content="${image}" />`, "og:image");
  html = swap(html, metaTag("property", "og:image:alt"), `<meta property="og:image:alt" content="${esc(imageAlt)}" />`, "og:image:alt");
  html = swap(html, metaTag("name", "twitter:title"), `<meta name="twitter:title" content="${esc(page.title)}" />`, "twitter:title");
  html = swap(html, metaTag("name", "twitter:description"), `<meta name="twitter:description" content="${esc(page.description)}" />`, "twitter:description");
  html = swap(html, metaTag("name", "twitter:image"), `<meta name="twitter:image" content="${image}" />`, "twitter:image");
  html = swap(html, metaTag("name", "twitter:image:alt"), `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`, "twitter:image:alt");
  html = swap(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld(structuredData), "JSON-LD");
  return html;
}

function write(path, html) {
  const dir = join(dist, path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`prerender-meta: wrote ${path}/index.html`);
}

const breadcrumbs = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${site}${path}`,
  })),
});

// Static routes defined in seo.config.json (the homepage and 404 are handled separately)
for (const page of Object.values(config.pages)) {
  if (page.noindex || page.path === "/") continue;
  write(
    page.path,
    build(page, {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${site}${page.path}#page`,
          url: `${site}${page.path}`,
          name: page.title,
          description: page.description,
          isPartOf: { "@id": `${site}/#website` },
          about: { "@id": `${site}/#person` },
          inLanguage: "en-US",
        },
        breadcrumbs([["Home", "/"], ["Graphics", page.path]]),
      ],
    })
  );
}

// One static page per case study
for (const p of projects) {
  const path = `/work/${p.slug}`;
  const page = {
    path,
    title: `${p.name} Case Study | Great Emman-Wori`,
    description: trim(p.desc),
    ogType: "article",
    image: `${site}${p.img}`,
    imageAlt: p.alt,
  };
  write(
    path,
    build(page, {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          "@id": `${site}${path}#work`,
          url: `${site}${path}`,
          name: p.name,
          description: p.desc,
          image: `${site}${p.img}`,
          keywords: p.tags.join(", "),
          creator: { "@id": `${site}/#person` },
          mainEntityOfPage: `${site}${path}`,
          isPartOf: { "@id": `${site}/#projects` },
          inLanguage: "en-US",
        },
        breadcrumbs([["Home", "/"], ["Projects", "/#portfolio"], [p.name, path]]),
      ],
    })
  );
}

// Homepage: keep the static head, add FAQPage schema from the visible FAQ data
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site}/#faq`,
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
writeFileSync(join(dist, "index.html"), swap(base, /<\/head>/, `    ${ld(faqLd)}\n  </head>`, "</head>"));
console.log("prerender-meta: added FAQPage schema to /index.html");

// Sitemap generated from the same route data
const today = new Date().toISOString().slice(0, 10);
const urls = [
  ["/", "1.0"],
  ["/graphics", "0.8"],
  ...projects.map((p) => [`/work/${p.slug}`, "0.7"]),
  ["/documents/great-emman-wori-cv.pdf", "0.4"],
];
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(([path, priority]) => `  <url>\n    <loc>${site}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`)
      .join("\n") +
    `\n</urlset>\n`
);
console.log(`prerender-meta: wrote sitemap.xml (${urls.length} urls)`);
