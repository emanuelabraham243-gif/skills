// Generates minimal, valid single-page PDF spec sheets for each demo car so
// the "download spec sheet" CTA on the car detail page is fully functional
// in preview, ahead of real spec sheets being uploaded to Supabase storage.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { mockCars } from "../lib/mock-data.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "spec-sheets");
mkdirSync(outDir, { recursive: true });

function esc(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(lines) {
  const contentLines = lines
    .map((line, i) => {
      const size = i === 0 ? 20 : 12;
      const y = 740 - i * (i === 0 ? 34 : 26);
      return `BT /F1 ${size} Tf 50 ${y} Td (${esc(line)}) Tj ET`;
    })
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    null, // stream object, built below
  ];

  const streamBody = contentLines;
  const streamObj = `<< /Length ${Buffer.byteLength(streamBody, "utf8")} >>\nstream\n${streamBody}\nendstream`;
  objects[4] = streamObj;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return pdf;
}

mockCars.forEach((car) => {
  const lines = [
    `${car.year} ${car.make} ${car.model}${car.trim ? " " + car.trim : ""}`,
    " ",
    `Price: ${car.currency} ${car.price.toLocaleString("en-US")}`,
    `Mileage: ${car.mileageKm.toLocaleString("en-US")} km`,
    `Fuel type: ${car.fuelType}`,
    `Transmission: ${car.transmission}`,
    `Body type: ${car.bodyType}`,
    `Drivetrain: ${car.drivetrain ?? "-"}`,
    `Engine: ${car.engine ?? "-"}`,
    `Exterior color: ${car.exteriorColor}`,
    `Interior color: ${car.interiorColor ?? "-"}`,
    `Seats: ${car.seats ?? "-"}  Doors: ${car.doors ?? "-"}`,
    " ",
    "Condition summary:",
    ...wrap(car.conditionSummary, 90),
  ];
  const pdf = buildPdf(lines);
  writeFileSync(path.join(outDir, `${car.slug}.pdf`), pdf, "latin1");
});

function wrap(text, width) {
  const words = text.split(" ");
  const out = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > width) {
      out.push(line.trim());
      line = word;
    } else {
      line += " " + word;
    }
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

console.log(`Generated ${mockCars.length} spec sheet PDFs.`);
