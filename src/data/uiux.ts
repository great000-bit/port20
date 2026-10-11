import data from "./uiux.json";

export type UiUxProject = {
  slug: string;
  title: string;
  type: string;
  cover: string;
  alt: string;
  canvas: string;
  year: string;
  role: string;
  client: string;
  tools: string[];
  fields: string[];
  tags: string[];
  brief: string;
  story: { title: string; body: string }[];
  results: string[];
  liveUrl?: string;
};

export const profile = data.profile;
export const projects = data.projects as UiUxProject[];

/**
 * Mockups are picked up automatically from src/assets/uiux/<slug>/ in filename
 * order, so adding a project's screens never needs a code change.
 */
const mockupFiles = import.meta.glob("/src/assets/uiux/*/*.{webp,png,jpg,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const mockupsFor = (slug: string): string[] =>
  Object.entries(mockupFiles)
    .filter(([path]) => path.includes(`/uiux/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);

/** Pick readable text colours for a canvas background colour. */
export function canvasTone(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  const n = m ? parseInt(m[1], 16) : 0x000000;
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.5
    ? { fg: "#ffffff", muted: "rgba(255,255,255,.68)", line: "rgba(255,255,255,.16)" }
    : { fg: "#111111", muted: "rgba(17,17,17,.66)", line: "rgba(17,17,17,.14)" };
}
