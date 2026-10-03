"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** A paragraph whose words light up one by one as the user scrolls through it. */
export function ScrubText({ text, className, dimClassName = "opacity-15" }: { text: string; className?: string; dimClassName?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll("[data-w]");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className={dimClassName}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
