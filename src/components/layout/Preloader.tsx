"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { markIntroDone } from "@/lib/intro";

/** Intro shown once per browser session: a counter, a gold line and a curtain lift. */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("gmvp-intro") === "1";
      sessionStorage.setItem("gmvp-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = requestAnimationFrame(() => {
        setVisible(false);
        markIntroDone();
      });
      return () => cancelAnimationFrame(skip);
    }

    window.__lenis?.stop();
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => {
        setVisible(false);
        window.__lenis?.start();
        markIntroDone();
      }, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-onyx p-6 md:p-10"
          aria-hidden
        >
          <div className="flex justify-between font-mono text-xs uppercase tracking-[0.3em] text-stone">
            <span>GMVP Group Enterprise</span>
            <span>Armenia · Colombia</span>
          </div>
          <div className="space-y-6">
            <p className="font-serif text-5xl text-champagne md:text-8xl">
              Sueña. Crea. Avanza. <em className="text-gold">Es posible.</em>
            </p>
            <div className="h-px w-full bg-line">
              <div className="h-px bg-gold transition-[width] duration-75" style={{ width: `${count}%` }} />
            </div>
          </div>
          <p className="self-end font-serif text-7xl tabular-nums text-gold md:text-9xl">{count}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
