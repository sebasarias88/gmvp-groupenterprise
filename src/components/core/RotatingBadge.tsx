import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Circular text that spins slowly around a centered icon. */
export function RotatingBadge({ text, children, className, textClassName }: { text: string; children?: ReactNode; className?: string; textClassName?: string }) {
  const id = `circle-${text.length}`;
  return (
    <span className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className={cn("fill-current text-[13px] uppercase tracking-[0.32em]", textClassName)}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}
