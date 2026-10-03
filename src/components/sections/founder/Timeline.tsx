"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Item = { year: string; title: string; text: string };

/** Vertical timeline whose gold line is drawn as you scroll; each milestone lights up when reached. */
export function Timeline({ items }: { items: readonly Item[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-item]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: { trigger: el, start: "top 62%", toggleActions: "play none none reverse" },
          },
        );
        const dot = el.querySelector("[data-dot]");
        gsap.fromTo(
          dot,
          { scale: 0.4, backgroundColor: "#2a2519" },
          {
            scale: 1,
            backgroundColor: "#d4af37",
            duration: 0.5,
            scrollTrigger: { trigger: el, start: "top 62%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative mt-10 pl-10 md:pl-0">
      <span aria-hidden className="absolute bottom-0 left-3 top-0 w-px bg-line md:left-1/2" />
      <span aria-hidden data-line className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gold md:left-1/2" />
      {items.map((item, i) => (
        <li
          key={item.year + item.title}
          data-item
          className={`relative grid py-10 md:grid-cols-2 md:gap-20 md:py-16 ${i % 2 ? "md:[&>div]:col-start-2" : "md:text-right"}`}
        >
          <span
            aria-hidden
            data-dot
            className="absolute -left-[36px] top-12 h-4 w-4 rounded-full ring-8 ring-onyx md:left-1/2 md:top-[4.5rem] md:-translate-x-1/2"
          />
          <div>
            <span className="font-serif text-6xl leading-none text-gold md:text-8xl">{item.year}</span>
            <h3 className="mt-4 text-2xl font-bold text-champagne md:text-3xl">{item.title}</h3>
            <p className={`mt-3 max-w-md text-lg leading-relaxed text-sand ${i % 2 ? "" : "md:ml-auto"}`}>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
