"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { pillars } from "@/content/site";
import { boardroom, chartsTablet, handshakeContract, handshakeDark } from "@/assets/images";
import { ParallaxImage } from "@/components/core/ParallaxImage";
import { SectionLabel } from "../SectionLabel";
import { cn } from "@/lib/cn";

type Segment = { text: string; em?: boolean };

const manifesto: Segment[] = [
  { text: "Estamos aquí para hacer realidad" },
  { text: "sus sueños", em: true },
  { text: "y enseñarle a" },
  { text: "invertir en su futuro.", em: true },
  { text: "Cada persona llega hasta donde su mente se lo permite: ese es el motor de las" },
  { text: "grandes empresas.", em: true },
];

const facts = [
  { value: "2012", label: "Nace el grupo" },
  { value: "3", label: "Compañías en portafolio" },
  { value: "10–100", label: "Acciones por inversionista" },
];

/**
 * Editorial manifesto: a framed photo on the left (sticky on desktop) and the
 * statement on the right, whose words light up with scroll; key phrases in gold.
 */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 55%", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ParallaxImage
          src={handshakeContract}
          alt="Acuerdo de inversión entre socios"
          className="frame-corners aspect-[4/3] rounded-[28px] lg:aspect-[4/5]"
          imageClassName="img-grade"
          sizes="(min-width:1024px) 40vw, 100vw"
        >
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/10 to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">GMVP Group · desde 2012</p>
            <span className="font-serif text-5xl leading-none text-champagne/30">“</span>
          </div>
        </ParallaxImage>
      </div>

      <div className="flex flex-col justify-center">
        <SectionLabel>Quiénes somos</SectionLabel>
        <p data-statement className="font-serif text-[2.1rem] leading-[1.15] text-champagne sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08]">
          {manifesto.map((seg, i) =>
            seg.text.split(" ").map((w, j) => (
              <span key={`${i}-${j}`} data-w className={cn("opacity-15", seg.em && "italic text-gold")}>
                {w}{" "}
              </span>
            )),
          )}
        </p>

        <div className="mt-12 flex items-center gap-4">
          <span className="h-px w-12 bg-gold" aria-hidden />
          <p className="text-sm text-sand">
            <span className="font-semibold text-champagne">GMVP Group Enterprise</span> · Fondo de inversión de capital privado
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse bg-onyx p-4 md:p-6">
              <dt className="mt-1 text-[11px] leading-snug text-stone md:text-xs">{f.label}</dt>
              <dd className="font-serif text-3xl text-gold md:text-4xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
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
      <Manifesto />
      <PillarPanels />
    </section>
  );
}
