import { useEffect } from "react";
import config from "@/seo.config.json";

type PageKey = keyof typeof config.pages;

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", id: string, value: string) =>
  upsert(
    `meta[${key}="${id}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(key, id);
      return el;
    },
    "content",
    value
  );

/**
 * Updates the document head for the current route by editing the tags that
 * index.html already ships, so crawlers never see duplicates. The same values
 * are baked into static HTML at build time by scripts/prerender-meta.mjs.
 */
export default function Seo({ page }: { page: PageKey }) {
  useEffect(() => {
    const p = config.pages[page] as (typeof config.pages)[PageKey] & { noindex?: boolean };
    const url = `${config.siteUrl}${p.path}`;

    document.title = p.title;
    meta("name", "description", p.description);
    meta(
      "name",
      "robots",
      p.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    meta("property", "og:type", p.ogType);
    meta("property", "og:url", url);
    meta("property", "og:title", p.title);
    meta("property", "og:description", p.description);
    meta("name", "twitter:title", p.title);
    meta("name", "twitter:description", p.description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (p.noindex) {
      canonical?.remove();
    } else {
      upsert(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement("link");
          el.setAttribute("rel", "canonical");
          return el;
        },
        "href",
        url
      );
    }
  }, [page]);

  return null;
}
