"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitHeading } from "@/components/core/SplitHeading";

type Line = string | { text: string; className?: string };

/** Hero for inner pages: big serif title, label and intro with a parallax fade. */
export function PageHero({ label, lines, intro }: { label: string; lines: Line[]; intro?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-52">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(212,175,55,0.12),transparent_50%)]" />
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-gold"
        >
          <span className="h-px w-10 bg-gold" aria-hidden />
          {label}
        </motion.p>
        <SplitHeading
          as="h1"
          immediate
          lines={lines}
          className="font-serif text-[15vw] leading-[0.88] text-champagne md:text-[10vw] xl:text-[9rem]"
        />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-sand md:text-xl"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
