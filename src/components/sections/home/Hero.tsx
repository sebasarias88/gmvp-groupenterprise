"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { MarketTicker } from "./MarketTicker";
import { SplitHeading } from "@/components/core/SplitHeading";
import { Magnetic } from "@/components/core/Magnetic";
import { RotatingBadge } from "@/components/core/RotatingBadge";
import { hero, site } from "@/content/site";
import { towers } from "@/assets/images";
import { onIntroDone } from "@/lib/intro";

/**
 * Cinematic hero: graded skyscraper photo that zooms out after the intro,
 * drifts with the pointer and sinks with scroll, framed by editorial details.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 50, damping: 20 });
  const py = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 50, damping: 20 });

  useEffect(() => onIntroDone(() => setReady(true)), []);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Photo */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.div
          style={{ x: px, y: py }}
          initial={{ scale: 1.35 }}
          animate={{ scale: ready ? 1.08 : 1.35 }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-[-4%]"
        >
          <Image src={towers} alt="" fill preload placeholder="blur" sizes="100vw" className="img-grade object-cover object-[50%_35%]" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(212,175,55,0.22),transparent_55%)] mix-blend-overlay" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,8,0.96)_0%,rgba(11,10,8,0.75)_38%,rgba(11,10,8,0.25)_70%,rgba(11,10,8,0.55)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-onyx via-onyx/70 to-transparent" />

      {/* Editorial grid lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1400px] px-10 lg:block">
        <div className="relative h-full">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: ready ? 1 : 0 }}
              transition={{ duration: 1.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 h-full w-px origin-top bg-white/[0.06]"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>
      </div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-6 pb-14 pt-36 md:px-10 md:pb-16">
        <div className="mb-10 flex items-center justify-between gap-6">
          <motion.p
            className="intro-fade flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.32em] text-gold md:text-xs"
          >
            <span className="h-px w-10 bg-gold" aria-hidden />
            {hero.eyebrow}
          </motion.p>
          <motion.p
            style={{ "--d": "300ms" } as CSSProperties}
            className="intro-fade hidden font-mono text-[11px] uppercase tracking-[0.32em] text-stone md:block"
          >
            {site.address.city} · CO
          </motion.p>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <SplitHeading
            as="h1"
            immediate
            lines={[...hero.lines, { text: hero.accent, className: "italic text-gold-gradient" }]}
            className="font-serif text-[15vw] leading-[0.9] tracking-[-0.015em] text-champagne sm:text-[11vw] lg:text-[7.4vw] 2xl:text-[8.5rem]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.6, rotate: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <Link href="/invertir" aria-label="Invertir con GMVP" data-cursor="Invertir" className="group block">
              <RotatingBadge text="Fondo de inversión · Capital privado · " className="h-40 w-40 text-gold" textClassName="font-mono">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-onyx transition-transform duration-500 group-hover:scale-110">
                  <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </RotatingBadge>
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ "--d": "500ms" } as CSSProperties}
          className="intro-fade mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[1.2fr_1fr] md:items-end"
        >
          <p className="max-w-xl text-base leading-relaxed text-sand md:text-lg">{hero.intro}</p>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Magnetic>
              <Link href="/invertir" className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-bold text-onyx transition-colors hover:bg-gold-soft">
                Invierte en tu futuro
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Link
              href="#manifiesto"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 font-semibold text-champagne backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              Descubrir
              <ArrowDownRight className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        <MarketTicker />
      </div>
    </section>
  );
}
