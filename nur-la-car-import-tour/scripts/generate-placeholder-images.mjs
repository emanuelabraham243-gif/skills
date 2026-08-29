// Generates elegant duotone placeholder photography (SVG) for each demo car
// until real photography is uploaded to Supabase storage. Deliberately
// abstract line-art rather than stock photography, so the site never reads
// as populated with generic stock images.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "..", "public", "cars");

const palettes = [
  ["#0d2f2a", "#7cbdb0"], // deep teal -> soft teal
  ["#12262a", "#4fbfae"], // ink teal -> bright teal
  ["#2b2410", "#c1892c"], // espresso -> gold
  ["#182b2e", "#8fb3ac"], // slate teal -> sage teal
  ["#241f2c", "#b78bc9"], // aubergine -> lilac
  ["#22271f", "#a8b47a"], // olive dark -> olive light
];

const angles = [
  "Front Three-Quarter",
  "Side Profile",
  "Rear",
  "Interior — Front Seats",
  "Interior — Dashboard",
  "Detail",
];

function carSilhouette(stroke) {
  return `
  <g fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    <path d="M120 300 C 130 260, 165 235, 210 232 L 255 195 C 270 182, 292 174, 315 174 L 430 174 C 452 174, 472 183, 486 199 L 520 232 C 560 236, 592 258, 602 300" />
    <line x1="120" y1="300" x2="602" y2="300" />
    <circle cx="215" cy="300" r="34" />
    <circle cx="505" cy="300" r="34" />
    <line x1="255" y1="232" x2="480" y2="232" />
  </g>`;
}

function svgFor(angle, [c1, c2], seed) {
  const id = `g${seed}`;
  // Deliberately no make/model/year text baked into the image — the
  // surrounding UI (card title, status badges) already shows that.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="800" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="720" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${c1}" />
      <stop offset="1" stop-color="${c2}" />
    </linearGradient>
  </defs>
  <rect width="720" height="480" fill="url(#${id})" />
  ${carSilhouette("#f5f7f6")}
  <text x="40" y="440" font-family="Helvetica, Arial, sans-serif" font-size="14" letter-spacing="3" fill="#f5f7f6" opacity="0.65">${angle.toUpperCase()}</text>
</svg>`;
}

export const demoCars = [
  { slug: "toyota-rav4-2022" },
  { slug: "toyota-corolla-2021" },
  { slug: "toyota-land-cruiser-prado-2020" },
  { slug: "hyundai-tucson-2023" },
  { slug: "suzuki-vitara-2022" },
  { slug: "nissan-xtrail-2020" },
  { slug: "mitsubishi-pajero-2019" },
  { slug: "kia-sportage-2022" },
];

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  demoCars.forEach((car, carIdx) => {
    const dir = path.join(outRoot, car.slug);
    mkdirSync(dir, { recursive: true });
    const palette = palettes[carIdx % palettes.length];
    angles.forEach((angle, i) => {
      const svg = svgFor(angle, palette, carIdx * 10 + i);
      writeFileSync(path.join(dir, `${i}.svg`), svg, "utf8");
    });
  });
  console.log(`Generated ${demoCars.length * angles.length} placeholder car images.`);
}
