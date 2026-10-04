"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitHeading } from "@/components/core/SplitHeading";

type Line = string | { text: string; className?: string };

/**
 * Inner-page hero: serif title over a graded photo that slides open
 * from the right and drifts with scroll.
 */
export function PageHero({ label, lines, intro, image }: { label: string; lines: Line[]; intro?: string; image?: StaticImageData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48">
      {image && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.6, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-y-0 right-0 w-full lg:w-[52%]"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-10%_0]">
            <Image src={image} alt="" fill preload placeholder="blur" sizes="(min-width:1024px) 52vw, 100vw" className="img-grade object-cover" />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-onyx/10 lg:via-onyx/40" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-onyx to-transparent" />
        </motion.div>
      )}
      {!image && <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(212,175,55,0.12),transparent_50%)]" />}

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.p className="intro-fade mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-gold" style={{ "--d": "0ms" } as CSSProperties}
        >
          <span className="h-px w-10 bg-gold" aria-hidden />
          {label}
        </motion.p>
        <SplitHeading
          as="h1"
          immediate
          lines={lines}
          className="max-w-5xl font-serif text-[14vw] leading-[0.9] text-champagne md:text-[8.5vw] xl:text-[7.5rem]"
        />
        {intro && (
          <motion.p className="intro-fade mt-10 max-w-xl text-lg leading-relaxed text-sand md:text-xl" style={{ "--d": "600ms" } as CSSProperties}
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
