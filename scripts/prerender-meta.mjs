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
const uiux = read("src/data/uiux.json");
const faq = read("src/faq.json");
const rates = read("src/data/rates.json");
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

function build(page, structuredData, body) {
  const url = `${site}${page.path}`;
  const image = page.image ?? config.image;
  const imageAlt = page.imageAlt ?? config.imageAlt;
  let html = base;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, "title");
  html = swap(html, metaTag("name", "description"), `<meta name="description" content="${esc(page.description)}" />`, "description");
  html = swap(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = swap(html, /<link rel="alternate" hreflang="en-ng" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-ng" href="${url}" />`, "hreflang en-ng");
  html = swap(html, /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${url}" />`, "hreflang x-default");
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
  return body ? withBody(html, body) : html;
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


// Static, crawlable body copy placed inside #root. React replaces it on mount,
// but crawlers that do not run JavaScript (most AI answer engines) read it.
const li = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
function withBody(html, body) {
  return swap(html, /<div id="root"><\/div>/, `<div id="root"><main style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0">${body}</main></div>`, "root");
}
const pageBody = (title, description, extra = "") =>
  `<h1>${esc(title)}</h1><p>${esc(description)}</p>${extra}<p><a href="/">Great Emman-Wori home</a> | <a href="/uiux">UI/UX portfolio</a> | <a href="/graphics">Graphics portfolio</a></p>`;


// Page-specific crawlable copy and structured data for the two portfolio hubs
const num = (s) => Number(s.replace(/[^0-9.]/g, ""));
const graphicsBody = () =>
  `<h2>Graphic design rates</h2>${li(rates.map((r) => `${esc(r.name)}: ${esc(r.price.NGN)} (about ${esc(r.price.USD)}). ${esc(r.tagline)}. Includes: ${r.features.map(esc).join(", ")}.`))}`;
const graphicsSchema = () => ({
  "@type": "OfferCatalog",
  "@id": `${site}/graphics#rates`,
  name: "Graphic design and brand identity services by Great Emman-Wori",
  provider: { "@id": `${site}/#person` },
  areaServed: [{ "@type": "Country", name: "Nigeria" }, "Worldwide"],
  itemListElement: rates.map((r) => ({
    "@type": "Offer",
    priceCurrency: "NGN",
    price: num(r.price.NGN),
    availability: "https://schema.org/InStock",
    itemOffered: { "@type": "Service", name: `${r.name} design`, description: `${r.tagline}. ${r.features.join(", ")}.`, provider: { "@id": `${site}/#person` } },
  })),
});
const uiuxBody = () =>
  `<h2>UI/UX case studies</h2>${li(uiux.projects.map((p) => `<a href="/uiux/${p.slug}">${esc(p.title)}</a> (${esc(p.type)}): ${esc(trim(p.brief, 160))}`))}` +
  `<h2>What I design</h2>${li((uiux.profile.services ?? []).map(esc))}<h2>Tools</h2><p>${(uiux.profile.tools ?? []).map(esc).join(", ")}</p>`;
const uiuxSchema = () => ({
  "@type": "ItemList",
  "@id": `${site}/uiux#projects`,
  name: "UI/UX case studies by Great Emman-Wori",
  itemListElement: uiux.projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${site}/uiux/${p.slug}`, name: p.title })),
});
const hubExtra = { "/graphics": [graphicsSchema, graphicsBody], "/uiux": [uiuxSchema, uiuxBody] };

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
          inLanguage: "en-NG",
        },
        breadcrumbs([["Home", "/"], [page.crumb ?? "Page", page.path]]),
        ...(hubExtra[page.path] ? [hubExtra[page.path][0]()] : []),
      ],
    }, pageBody(page.title, page.description, hubExtra[page.path] ? hubExtra[page.path][1]() : ""))
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
          inLanguage: "en-NG",
        },
        breadcrumbs([["Home", "/"], ["Projects", "/#portfolio"], [p.name, path]]),
      ],
    }, pageBody(p.name, p.desc, li((p.tags ?? []).map(esc))))
  );
}

// One static page per UI/UX case study
for (const p of uiux.projects) {
  const path = `/uiux/${p.slug}`;
  const page = {
    path,
    title: `${p.title} | UI/UX Case Study | Great Emman-Wori`,
    description: trim(p.brief),
    ogType: "article",
    image: `${site}${p.cover}`,
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
          name: p.title,
          description: p.brief,
          image: `${site}${p.cover}`,
          keywords: (p.tags ?? []).join(", "),
          creator: { "@id": `${site}/#person` },
          mainEntityOfPage: `${site}${path}`,
          inLanguage: "en-NG",
        },
        breadcrumbs([["Home", "/"], ["UI/UX", "/uiux"], [p.title, path]]),
      ],
    }, pageBody(p.title, p.brief,
      `<p>Client: ${esc(p.client ?? "")}. Role: ${esc(p.role ?? "")}. Year: ${esc(String(p.year ?? ""))}. Tools: ${(p.tools ?? []).map(esc).join(", ")}.</p>` +
      (p.story ?? []).map((s) => `<h2>${esc(s.title)}</h2><p>${esc(s.body)}</p>`).join("") +
      `<h2>Results</h2>${li((p.results ?? []).map(esc))}`))
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
const homeBody =
  `<h1>Great Emman-Wori: Full-Stack Software Developer, UI/UX Designer and Graphic Designer in Nigeria</h1>` +
  `<p>${esc(config.pages.home.description)} He is the founder of Creative Emman Limited, a digital design, development and branding company in Port Harcourt, Rivers State, Nigeria, with more than three years of experience.</p>` +
  `<nav><a href="/uiux">UI/UX design portfolio</a> | <a href="/graphics">Graphics and brand identity portfolio, with rates</a> | <a href="/documents/great-emman-wori-cv.pdf">CV (PDF)</a></nav>` +
  `<h2>Services</h2>${li(["Full-stack web development (React, TypeScript, Node.js, Laravel, Supabase, WordPress)", "UI/UX design in Figma and Framer", "Graphic design: logos, flyers, cover photos and brand identity", "Technical SEO, accessibility and performance"])}` +
  `<h2>Selected projects</h2>${li(projects.map((p) => `<a href="/work/${p.slug}">${esc(p.name)}</a>: ${esc(trim(p.desc, 140))}`))}` +
  `<h2>UI/UX case studies</h2>${li(uiux.projects.map((p) => `<a href="/uiux/${p.slug}">${esc(p.title)}</a>`))}` +
  `<h2>Frequently asked questions</h2>${faq.map((i) => `<h3>${esc(i.q)}</h3><p>${esc(i.a)}</p>`).join("")}` +
  `<h2>Contact</h2><p>Email greatemmanwori@gmail.com. Based in Port Harcourt, Rivers State, Nigeria. Available for freelance, contract and remote work.</p>`;
writeFileSync(join(dist, "index.html"), withBody(swap(base, /<\/head>/, `    ${ld(faqLd)}\n  </head>`, "</head>"), homeBody));
console.log("prerender-meta: added FAQPage schema to /index.html");

// Sitemap generated from the same route data
const today = new Date().toISOString().slice(0, 10);
const imageFor = {
  "/": "/great-emman-wori-2026.png",
  ...Object.fromEntries(uiux.projects.map((p) => [`/uiux/${p.slug}`, p.cover])),
  ...Object.fromEntries(projects.map((p) => [`/work/${p.slug}`, p.img])),
};
const urls = [
  ["/", "1.0"],
  ["/graphics", "0.8"],
  ["/uiux", "0.8"],
  ...uiux.projects.map((p) => [`/uiux/${p.slug}`, "0.7"]),
  ...projects.map((p) => [`/work/${p.slug}`, "0.7"]),
  ["/documents/great-emman-wori-cv.pdf", "0.4"],
];
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls
      .map(([path, priority]) => {
        const img = imageFor[path];
        const image = img ? `\n    <image:image>\n      <image:loc>${site}${img}</image:loc>\n    </image:image>` : "";
        return `  <url>\n    <loc>${site}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>${image}\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>\n`
);
console.log(`prerender-meta: wrote sitemap.xml (${urls.length} urls)`);

// llms-full.txt: the whole portfolio as plain text for answer engines
const full = [
  "# Great Emman-Wori: full portfolio",
  "",
  `${config.pages.home.description} Founder of Creative Emman Limited. Contact: greatemmanwori@gmail.com. Site: ${site}/`,
  "",
  "## Graphic design rates (starting prices per project)",
  ...rates.map((r) => `- ${r.name}: ${r.price.NGN} / ${r.price.USD}. ${r.tagline}. Includes: ${r.features.join("; ")}.`),
  "",
  "## Web projects",
  ...projects.map((p) => `- ${p.name} (${site}/work/${p.slug}): ${p.desc}`),
  "",
  "## UI/UX case studies",
  ...uiux.projects.map((p) => `- ${p.title} (${site}/uiux/${p.slug}): ${p.brief}`),
  "",
  "## Frequently asked questions",
  ...faq.flatMap((i) => [`Q: ${i.q}`, `A: ${i.a}`, ""]),
].join("\n");
writeFileSync(join(dist, "llms-full.txt"), full + "\n");
console.log("prerender-meta: wrote llms-full.txt");
