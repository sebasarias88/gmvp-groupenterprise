"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Line = string | { text: string; className?: string };

type SplitHeadingProps = {
  as?: ElementType;
  lines: Line[];
  className?: string;
  /**
   * Hero mode: words rise with a pure-CSS animation that starts on first paint
   * (no JavaScript needed), so the heading is never blocked by hydration (better LCP).
   * It waits for `html[data-intro="done"]`, which an inline script sets right away
   * unless the desktop intro is playing.
   */
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
      if (immediate) return;
      const words = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!words?.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.fromTo(
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
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        },
      );
    },
    { scope: ref },
  );

  let index = 0;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const lineClass = typeof line === "string" ? undefined : line.className;
        const words = text.split(" ");
        return (
          <span key={i} className="block">
            {words.map((word, j) => {
              const n = index++;
              return (
                <span key={j} className="inline-block overflow-hidden pb-[0.12em] align-top">
                  {immediate ? (
                    <span
                      data-word
                      className={cn("split-word inline-block", lineClass)}
                      style={{ "--i": n, "--d": `${delay * 1000}ms` } as CSSProperties}
                    >
                      {word}
                      {j < words.length - 1 ? " " : ""}
                    </span>
                  ) : (
                    <span data-word className={cn("inline-block will-change-transform", lineClass)} style={{ opacity: 0 }}>
                      {word}
                      {j < words.length - 1 ? " " : ""}
                    </span>
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
