"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

/** Counts up from 0 to `to` the first time it scrolls into view. */
export function Counter({ to, duration = 2, prefix = "", suffix = "", className }: { to: number; duration?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
}
