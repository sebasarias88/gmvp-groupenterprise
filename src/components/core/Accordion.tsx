"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

/** Accessible accordion with animated height. */
export function Accordion({ items, className, itemClassName }: { items: AccordionItem[]; className?: string; itemClassName?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-[var(--line)] border-y border-[var(--line)]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `acc-${i}`;
        return (
          <div key={item.q} className={itemClassName}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold md:text-xl"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] transition-all duration-500",
                    isOpen && "rotate-45 border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 text-base leading-relaxed text-[var(--muted)] md:text-lg">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
