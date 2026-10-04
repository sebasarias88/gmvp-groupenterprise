"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { pillars } from "@/content/site";
import { boardroom, chartsTablet, handshakeContract, handshakeDark, skylineBw } from "@/assets/images";
import { SectionLabel } from "../SectionLabel";
import { cn } from "@/lib/cn";

type Token = { text: string } | { img: StaticImageData; alt: string };

const manifesto: Token[] = [
  { text: "Estamos aquí" },
  { img: boardroom, alt: "Reunión de junta directiva" },
  { text: "para hacer realidad sus sueños y enseñarle a" },
  { img: chartsTablet, alt: "Análisis financiero en tableta" },
  { text: "invertir en su futuro. Cada persona llega hasta donde su mente se lo permite:" },
  { img: handshakeContract, alt: "Acuerdo de inversión" },
  { text: "ese es el motor de las grandes empresas." },
];

/** Big editorial manifesto whose words light up with scroll, with inline photo "pills". */
function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 50%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-pill]").forEach((pill) => {
        gsap.fromTo(
          pill,
          { width: 0, opacity: 0 },
          { width: "var(--pill-w)", opacity: 1, ease: "power3.out", scrollTrigger: { trigger: pill, start: "top 85%", end: "top 55%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className="font-serif text-[2.6rem] leading-[1.08] text-champagne md:text-6xl lg:text-[5.2rem]">
      {manifesto.map((t, i) =>
        "text" in t ? (
          t.text.split(" ").map((w, j) => (
            <span key={`${i}-${j}`} data-w className="opacity-15">
              {w}{" "}
            </span>
          ))
        ) : (
          <span
            key={i}
            data-pill
            className="relative mx-1 inline-block h-[0.82em] overflow-hidden rounded-full align-[-0.08em] [--pill-w:1.9em] md:[--pill-w:2.2em]"
            style={{ width: 0 }}
          >
            <Image src={t.img} alt={t.alt} fill sizes="200px" className="object-cover" />
          </span>
        ),
      )}
    </p>
  );
}

const panelImages = [boardroom, chartsTablet, handshakeDark];

/** Three photo panels; the hovered one expands (desktop), they stack on mobile. */
function PillarPanels() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-24 flex flex-col gap-3 lg:h-[560px] lg:flex-row">
      {pillars.map((p, i) => {
        const isActive = active === i;
        return (
          <motion.article
            key={p.title}
            layout
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "group relative min-h-[380px] overflow-hidden rounded-[28px] border border-line outline-none lg:min-h-0",
              isActive ? "lg:flex-[2.4]" : "lg:flex-1",
            )}
          >
            <Image src={panelImages[i]} alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className={cn("object-cover transition-all duration-1000", isActive ? "scale-105 img-grade" : "scale-100 grayscale brightness-[0.45]")} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <span className={cn("h-px bg-gold transition-all duration-700", isActive ? "w-24" : "w-8")} />
              </div>
              <div className="mt-40 lg:mt-0">
                <h3 className="font-serif text-4xl leading-none text-champagne md:text-5xl">{p.title}</h3>
                <p className={cn("mt-4 max-w-md leading-relaxed text-sand transition-all duration-700 lg:max-h-0 lg:opacity-0", isActive && "lg:max-h-40 lg:opacity-100")}>{p.text}</p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export function Pillars() {
  return (
    <section id="manifiesto" className="relative mx-auto max-w-[1400px] scroll-mt-24 px-6 py-28 md:px-10 md:py-40">
      <SectionLabel>Quiénes somos</SectionLabel>
      <Manifesto />
      <PillarPanels />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-40 hidden h-[520px] w-[380px] opacity-[0.07] xl:block">
        <Image src={skylineBw} alt="" fill sizes="380px" className="object-cover" />
      </div>
    </section>
  );
}
