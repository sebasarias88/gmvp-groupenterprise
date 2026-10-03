"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { slogan } from "@/content/site";

/**
 * Pinned horizontal scroll through the four words of the slogan.
 * On small screens / reduced motion it falls back to a vertical stack.
 */
export function SloganScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          const word = panel.querySelector("[data-word]");
          gsap.fromTo(
            word,
            { yPercent: 40, opacity: 0.2 },
            {
              yPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 85%",
                end: "left 35%",
                scrub: true,
              },
            },
          );
        });
        return () => ScrollTrigger.refresh();
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-coal" aria-label="Nuestro lema">
      <div className="pointer-events-none absolute left-6 top-10 z-10 font-mono text-xs uppercase tracking-[0.3em] text-gold md:left-10">
        — Nuestro lema
      </div>
      <div ref={track} className="flex flex-col lg:h-[100svh] lg:w-max lg:flex-row">
        {slogan.map((s, i) => (
          <article
            key={s.word}
            data-panel
            className="relative flex min-h-[80svh] flex-col justify-center border-b border-line px-6 py-24 md:px-10 lg:h-full lg:w-[85vw] lg:border-b-0 lg:border-r lg:px-20"
          >
            <span className="font-mono text-sm text-stone">0{i + 1} / 0{slogan.length}</span>
            <h3
              data-word
              className={`mt-6 font-serif text-[22vw] leading-[0.85] lg:text-[15vw] ${i === slogan.length - 1 ? "italic text-gold-gradient" : "text-champagne"}`}
            >
              {s.word}
            </h3>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand md:text-xl">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
