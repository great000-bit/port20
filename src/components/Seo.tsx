import { useEffect } from "react";
import config from "@/seo.config.json";

type PageKey = keyof typeof config.pages;

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  ogType: string;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
};

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
 * Pass `page` for a route defined in seo.config.json, or `custom` for a
 * dynamic route such as a case study.
 */
export default function Seo({ page, custom }: { page?: PageKey; custom?: SeoPage }) {
  const key = custom ? custom.path : page;

  useEffect(() => {
    const p: SeoPage = custom ?? (config.pages[page as PageKey] as SeoPage);
    const url = `${config.siteUrl}${p.path}`;
    const image = p.image ?? config.image;
    const imageAlt = p.imageAlt ?? config.imageAlt;

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
    meta("property", "og:image", image);
    meta("property", "og:image:alt", imageAlt);
    meta("name", "twitter:title", p.title);
    meta("name", "twitter:description", p.description);
    meta("name", "twitter:image", image);
    meta("name", "twitter:image:alt", imageAlt);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
