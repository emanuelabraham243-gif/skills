export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      )}
      <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
