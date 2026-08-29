import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import { formatDate } from "@/lib/format";
import { getApprovedReviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Approved reviews from customers who bought a car or booked a tour with us.",
};

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Reviews"
        title="What our customers say"
        description="Every review here comes from a verified customer and is manually approved before publishing."
      />

      {reviews.length > 0 && (
        <div className="mt-6 flex items-center gap-3">
          <Stars rating={Math.round(avgRating)} />
          <p className="text-sm text-ink-soft">
            <span className="font-medium text-ink">{avgRating.toFixed(1)} out of 5</span> — {reviews.length} reviews
          </p>
        </div>
      )}

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {reviews.map((review) => (
          <div key={review.id} className="mb-5 break-inside-avoid rounded-2xl border border-line bg-surface p-6">
            <Stars rating={review.rating} />
            <p className="mt-3 text-sm leading-relaxed text-ink">&ldquo;{review.body}&rdquo;</p>
            <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
              <span className="font-medium text-ink">
                {review.customerName}
                {review.itemLabel && <span className="font-normal text-ink-soft"> · {review.itemLabel}</span>}
              </span>
              <span>{formatDate(review.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
