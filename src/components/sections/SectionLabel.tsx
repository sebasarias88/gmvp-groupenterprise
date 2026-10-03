import type { ReactNode } from "react";
import { Reveal } from "@/components/core/Reveal";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal y={16}>
      <p className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
        <span className="h-px w-8 bg-gold" aria-hidden />
        {children}
      </p>
    </Reveal>
  );
}
