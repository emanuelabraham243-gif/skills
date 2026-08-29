import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { photoCredits } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Attribution for reference photography used on this site.",
};

export default function CreditsPage() {
  const unverified = photoCredits.filter((c) => !c.licenseVerified);

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Attribution"
        title="Photo credits"
        description="Car cards on this site currently use reference photography from Wikimedia Commons while real inventory photos are being prepared. Trim and color may differ slightly from the listed vehicle. Full-gallery images remain placeholder art. Credit is listed below as required by each photo's license."
      />

      {unverified.length > 0 && (
        <div className="mt-8 max-w-3xl rounded-2xl border border-accent/40 bg-accent-soft/15 p-5 text-sm text-ink">
          <strong className="font-medium">Note:</strong> the license on {unverified.length} of these photos
          was unconfirmed at sourcing time and should be verified on the source page below before any real
          production use: {unverified.map((c, i) => (
            <span key={c.slug}>
              {i > 0 && ", "}
              <a href={c.sourcePageUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {c.fileTitle}
              </a>
            </span>
          ))}
          .
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-dim text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Source file</th>
              <th className="px-4 py-3">License</th>
            </tr>
          </thead>
          <tbody>
            {photoCredits.map((c) => (
              <tr key={c.slug} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/cars/${c.slug}`} className="text-ink hover:text-accent">
                    {c.slug}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <a href={c.sourcePageUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {c.fileTitle}
                  </a>
                  <span className="block text-xs text-ink-soft">Source: Wikimedia Commons</span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{c.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
