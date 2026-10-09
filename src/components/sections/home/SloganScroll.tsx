"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { slogan } from "@/content/site";
import { skylineBw, officeMeeting, teamTable, towers } from "@/assets/images";
import { cn } from "@/lib/cn";

const images = [skylineBw, officeMeeting, teamTable, towers];

/**
 * Sticky "index" of the four slogan words. As the visitor scrolls, the active
 * word turns gold and its text + photo crossfade on the right.
 */
export function SloganScroll() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(slogan.length - 1, Math.floor(v * slogan.length)));
  });

  return (
    <section ref={ref} aria-label="Nuestro lema" className="relative h-[300svh] bg-coal lg:h-[340svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Phones/tablets: the active photo becomes a soft backdrop (the framed panel is desktop-only). */}
        <div aria-hidden className="absolute inset-0 lg:hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image src={images[active]} alt="" fill sizes="100vw" className="img-grade object-cover opacity-30" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-coal via-coal/60 to-coal" />
        </div>
        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden /> Nuestro lema
            </p>
            <ol className="relative space-y-1 pl-8 md:pl-10">
              <div aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-line">
                <motion.div style={{ scaleY: progress }} className="h-full w-px origin-top bg-gold" />
              </div>
              {slogan.map((s, i) => (
                <li key={s.word}>
                  <button
                    type="button"
                    onClick={() => {
                      const el = ref.current;
                      if (!el) return;
                      const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / slogan.length);
                      if (window.__lenis) window.__lenis.scrollTo(top);
                      else window.scrollTo({ top, behavior: "smooth" });
                    }}
                    className="group flex items-baseline gap-5 text-left"
                  >
                    <span className={cn("font-mono text-xs transition-colors duration-500", active === i ? "text-gold" : "text-stone")}>0{i + 1}</span>
                    <span
                      className={cn(
                        "font-serif text-5xl leading-[1.05] transition-all duration-700 md:text-6xl xl:text-7xl",
                        active === i ? "translate-x-2 italic text-gold" : "text-outline group-hover:text-champagne/50",
                      )}
                    >
                      {s.word}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-10 min-h-[140px] max-w-lg lg:hidden">
              <AnimatePresence mode="wait">
                <motion.p key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-lg leading-relaxed text-sand">
                  {slogan[active].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="frame-corners relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={images[active]} alt="" fill sizes="45vw" className="img-grade object-cover" />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-9">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">0{active + 1} — {slogan[active].word}</p>
                    <p className="mt-4 text-lg leading-relaxed text-champagne/90">{slogan[active].text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
