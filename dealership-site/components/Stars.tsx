export default function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 text-accent ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.2}>
          <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1-5.5-3.2-5.5 3.2 1.4-6.1L1.2 7.8l6.2-.6L10 1.5z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}
