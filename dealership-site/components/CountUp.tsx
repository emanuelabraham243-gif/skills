"use client";

// Adapted from React Bits (reactbits.dev) — animates a number counting up
// once it scrolls into view, used for the homepage trust-stats strip.
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  separator = "",
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatValue = useCallback(
    (latest: number) => {
      const formatted = Intl.NumberFormat("en-US", {
        useGrouping: !!separator,
        maximumFractionDigits: 0,
      }).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [separator],
  );

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(from);
  }, [from, formatValue]);

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, motionValue, to]);

  // The underlying spring approaches `to` asymptotically and can stop
  // emitting "change" events a little short of it (e.g. 498 instead of
  // 500) once its internal rest threshold is satisfied — fine for a
  // decorative animation, not for a stat a visitor might actually read.
  // Force the exact target once the animation should be done, and stop
  // listening so a late, still-settling spring tick can't undo it.
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    if (!isInView) return () => unsubscribe();
    const settle = window.setTimeout(() => {
      unsubscribe();
      if (ref.current) ref.current.textContent = formatValue(to);
    }, duration * 1000 + 150);
    return () => {
      window.clearTimeout(settle);
      unsubscribe();
    };
  }, [springValue, formatValue, isInView, to, duration]);

  return <span className={className} ref={ref} />;
}
