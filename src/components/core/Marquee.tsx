import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Infinite horizontal marquee. Content is duplicated for a seamless loop. */
export function Marquee({ children, className, speed = 40, reverse = false }: { children: ReactNode; className?: string; speed?: number; reverse?: boolean }) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="marquee-track flex shrink-0 items-center group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
