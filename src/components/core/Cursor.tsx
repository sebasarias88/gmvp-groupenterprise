"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Custom cursor: a small dot plus a trailing ring that grows over
 * interactive elements. Elements can set data-cursor="Label" to show text.
 * Only rendered for fine pointers (mouse / trackpad).
 */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, textarea, select, label");
      setHover(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cursor)]"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--cursor)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--cursor-text)] transition-[width,height,background-color] duration-300"
        style={{
          x: rx,
          y: ry,
          width: label ? 96 : hover ? 56 : 32,
          height: label ? 96 : hover ? 56 : 32,
          backgroundColor: label ? "var(--cursor)" : "transparent",
        }}
      >
        {label}
      </motion.div>
    </>
  );
}
