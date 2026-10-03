import { cn } from "@/lib/cn";

/**
 * Provisional typographic mark for GMVP Group.
 * To use the official logo, drop it in /public/brand and swap this component's SVG for <Image />.
 */
export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <path
          d="M27.5 15.2A9 9 0 1 0 29 21h-8.2"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="29" cy="11" r="1.8" fill="#C8102E" />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-[0.28em]">GMVP</span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.42em] text-[var(--muted)]">Group Enterprise</span>
        </span>
      )}
    </span>
  );
}
