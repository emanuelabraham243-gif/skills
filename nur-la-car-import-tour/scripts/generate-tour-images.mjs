// Generates elegant duotone placeholder photography (SVG) for each demo tour
// package until real photography is uploaded to Supabase storage.
// Deliberately abstract line-art (mountain/landscape silhouette) rather than
// stock photography, so the site never reads as populated with generic
// stock images.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "..", "public", "tours");

const palettes = [
  ["#0d2f2a", "#7cbdb0"], // deep teal -> soft teal
  ["#2b2410", "#c1892c"], // espresso -> gold
  ["#241f2c", "#b78bc9"], // aubergine -> lilac
  ["#22271f", "#a8b47a"], // olive dark -> olive light
  ["#182b2e", "#8fb3ac"], // slate teal -> sage teal
  ["#2f1d16", "#d99a6c"], // umber -> terracotta
];

const angles = ["Cover", "Landscape", "Group Highlight", "Detail"];

function landscapeSilhouette(stroke) {
  return `
  <g fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    <path d="M60 340 L 220 180 L 300 260 L 400 120 L 520 300 L 600 220 L 660 340" />
    <circle cx="540" cy="140" r="30" />
    <path d="M60 340 L 660 340" />
  </g>`;
}

function svgFor(angle, [c1, c2], seed) {
  const id = `t${seed}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="800" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="720" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${c1}" />
      <stop offset="1" stop-color="${c2}" />
    </linearGradient>
  </defs>
  <rect width="720" height="480" fill="url(#${id})" />
  ${landscapeSilhouette("#f5f7f6")}
  <text x="40" y="440" font-family="Helvetica, Arial, sans-serif" font-size="14" letter-spacing="3" fill="#f5f7f6" opacity="0.65">${angle.toUpperCase()}</text>
</svg>`;
}

export const demoTours = [
  { slug: "simien-mountains-trek" },
  { slug: "lalibela-rock-churches" },
  { slug: "danakil-depression-expedition" },
  { slug: "omo-valley-cultural-tour" },
  { slug: "bale-mountains-wildlife-safari" },
  { slug: "axum-gondar-historical-route" },
];

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  demoTours.forEach((tour, tourIdx) => {
    const dir = path.join(outRoot, tour.slug);
    mkdirSync(dir, { recursive: true });
    const palette = palettes[tourIdx % palettes.length];
    angles.forEach((angle, i) => {
      const svg = svgFor(angle, palette, tourIdx * 10 + i);
      writeFileSync(path.join(dir, `${i}.svg`), svg, "utf8");
    });
  });
  console.log(`Generated ${demoTours.length * angles.length} placeholder tour images.`);
}
