"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { onIntroDone } from "@/lib/intro";

type Line = string | { text: string; className?: string };

type SplitHeadingProps = {
  as?: ElementType;
  lines: Line[];
  className?: string;
  /** Animate on mount (hero) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
  children?: ReactNode;
};

/**
 * Heading whose words rise from a mask, line by line.
 * Words are kept intact so wrapping stays natural on mobile.
 */
export function SplitHeading({ as: Tag = "h2", lines, className, immediate, delay = 0 }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!words?.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }
      const tween = gsap.fromTo(
        words,
        { yPercent: 115, rotate: 4, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          delay,
          paused: immediate,
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 85%" },
        },
      );
      if (immediate) return onIntroDone(() => tween.play());
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const lineClass = typeof line === "string" ? undefined : line.className;
        return (
          <span key={i} className="block">
            {text.split(" ").map((word, j) => (
              <span key={j} className="inline-block overflow-hidden pb-[0.12em] align-top">
                <span data-word className={cn("inline-block will-change-transform", lineClass)} style={{ opacity: 0 }}>
                  {word}
                  {j < text.split(" ").length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
