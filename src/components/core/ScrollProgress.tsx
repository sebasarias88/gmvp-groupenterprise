"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin progress bar fixed at the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-[var(--accent)]"
      style={{ scaleX }}
    />
  );
}
