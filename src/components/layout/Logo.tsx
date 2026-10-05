import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Official GMVP logo (vectorized from the company's artwork in /public/brand).
 * - "compact": the Gmvp mark plus a small "Group Enterprise" label, for the header.
 * - "full": the complete logo with tagline, light version for dark backgrounds.
 */
export function Logo({ className, variant = "compact" }: { className?: string; variant?: "compact" | "full" }) {
  if (variant === "full") {
    return (
      <Image
        src="/brand/gmvp-logo-light.svg"
        alt="GMVP Group Enterprise S.A.S"
        width={3060}
        height={1950}
        unoptimized
        className={cn("h-auto w-56", className)}
      />
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image src="/brand/gmvp-mark.svg" alt="GMVP" width={3060} height={1490} unoptimized preload className="h-9 w-auto md:h-10" />
      <span aria-hidden className="h-7 w-px bg-white/15" />
      <span className="flex flex-col font-mono text-[9px] uppercase leading-[1.35] tracking-[0.32em] text-sand">
        <span>Group</span>
        <span>Enterprise</span>
      </span>
    </span>
  );
}
