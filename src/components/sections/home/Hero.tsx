"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SkylineCanvas } from "./SkylineCanvas";
import { MarketTicker } from "./MarketTicker";
import { SplitHeading } from "@/components/core/SplitHeading";
import { Magnetic } from "@/components/core/Magnetic";
import { hero, site } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={{ y: skyY, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,175,55,0.14),transparent_55%)]" />
        <SkylineCanvas className="absolute inset-x-0 bottom-0 h-[78%] w-full" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,10,8,0.92)_0%,rgba(11,10,8,0.55)_45%,rgba(11,10,8,0)_75%)]" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pb-12 pt-32 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.32em] text-gold md:text-xs"
        >
          <span className="h-px w-10 bg-gold" aria-hidden />
          {hero.eyebrow} · {site.address.city}, {site.address.region}
        </motion.p>

        <SplitHeading
          as="h1"
          immediate
          lines={[
            ...hero.lines,
            { text: hero.accent, className: "italic text-gold-gradient" },
          ]}
          className="font-serif text-[17vw] leading-[0.88] tracking-[-0.01em] text-champagne sm:text-[13vw] lg:text-[9vw] xl:text-[8.25rem]"
        />

        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-sand md:text-xl">{hero.intro}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                href="/invertir"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-bold text-onyx transition-colors hover:bg-gold-soft"
              >
                Invierte en tu futuro
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Link
              href="/grupo"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-champagne transition-colors hover:border-gold hover:text-gold"
            >
              Conoce el grupo
            </Link>
          </div>
        </div>
      </motion.div>

      <a
        href="#pilares"
        aria-label="Desplazarse al contenido"
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-stone md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="grid h-12 w-7 place-items-start justify-center rounded-full border border-white/20 pt-2">
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-2 w-1 rounded-full bg-gold"
          />
        </span>
        <ArrowDown className="sr-only" />
      </a>

      <div className="relative z-10">
        <MarketTicker />
      </div>
    </section>
  );
}
