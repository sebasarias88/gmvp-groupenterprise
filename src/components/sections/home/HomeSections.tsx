"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Quote } from "lucide-react";
import { stats, investor, founder, faqs, about } from "@/content/site";
import { handshakeDark, skylineBw } from "@/assets/images";
import { Counter } from "@/components/core/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";
import { SplitHeading } from "@/components/core/SplitHeading";
import { Accordion } from "@/components/core/Accordion";
import { Marquee } from "@/components/core/Marquee";
import { ParallaxImage } from "@/components/core/ParallaxImage";
import { CompanyCards } from "../CompanyCards";
import { SectionLabel } from "../SectionLabel";

export function PortfolioPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-16 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div>
          <SectionLabel>Portafolio de compañías</SectionLabel>
          <SplitHeading
            lines={["Un grupo,", { text: "tres sectores.", className: "italic text-gold" }]}
            className="font-serif text-5xl leading-[0.95] text-champagne md:text-7xl"
          />
        </div>
        <Reveal>
          <p className="max-w-sm text-sand md:ml-auto">
            Compañías operativas que buscan ser líderes de mercado de forma rentable, con sinergias que nos permiten trabajar como un verdadero grupo empresarial.
          </p>
        </Reveal>
      </div>
      <CompanyCards />
    </section>
  );
}

export function ValuesMarquee() {
  return (
    <section aria-label="Valores corporativos" className="overflow-hidden border-y border-line py-10">
      <Marquee speed={55}>
        {about.values.map((v) => (
          <span key={v} className="mx-6 inline-flex items-center gap-12 font-serif text-5xl italic text-outline md:text-7xl">
            {v}
            <span className="h-2.5 w-2.5 rotate-45 bg-gold" aria-hidden />
          </span>
        ))}
      </Marquee>
      <Marquee speed={65} reverse className="mt-4">
        {about.values.map((v) => (
          <span key={v} className="mx-6 inline-flex items-center gap-12 font-serif text-5xl text-champagne/80 md:text-7xl">
            {v}
            <span className="h-2.5 w-2.5 rounded-full border border-gold" aria-hidden />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
        {stats.map((s, i) => (
          <RevealItem key={s.label} className="group relative">
            <span className="font-mono text-[11px] text-stone">0{i + 1}</span>
            <Counter to={s.value} suffix={s.suffix} className="text-gold-gradient mt-2 block font-serif text-8xl leading-none md:text-[8.5rem]" />
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 block h-px origin-left bg-gradient-to-r from-gold to-transparent"
            />
            <span className="mt-4 block max-w-[14rem] text-sm leading-relaxed text-sand">{s.label}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/** Full-bleed parallax photo with the group's guiding phrase. */
export function QuoteBand() {
  return (
    <ParallaxImage src={handshakeDark} alt="" strength={14} className="h-[80svh] min-h-[520px]" imageClassName="img-grade">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-onyx/90 via-onyx/50 to-onyx/20" />
      <div className="absolute inset-0 mx-auto flex max-w-[1400px] flex-col justify-center px-6 md:px-10">
        <Quote className="mb-8 h-10 w-10 text-gold" strokeWidth={1} />
        <SplitHeading
          lines={["Respeto, transparencia", "y reciprocidad,", { text: "siempre primero.", className: "italic text-gold" }]}
          className="max-w-4xl font-serif text-5xl leading-[0.98] text-champagne md:text-7xl lg:text-8xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-lg text-lg text-sand">Formamos asociaciones de largo plazo donde todos ganan.</p>
        </Reveal>
      </div>
    </ParallaxImage>
  );
}

export function JourneyPreview() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>La ruta del inversionista</SectionLabel>
          <SplitHeading lines={["Invertir con", { text: "claridad.", className: "italic text-gold" }]} className="font-serif text-5xl leading-[0.95] text-champagne md:text-7xl" />
          <Reveal>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-sand">{investor.profile}</p>
            <Link href="/invertir" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-gold/40 px-6 py-3 font-semibold text-gold transition-colors hover:bg-gold hover:text-onyx">
              Simular mi inversión <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
        <ol ref={ref} className="relative pl-14 md:pl-20">
          <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px bg-line md:left-7" />
          <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-6 left-5 top-6 w-px origin-top bg-gold md:left-7" />
          {investor.journey.map((j) => (
            <li key={j.step} className="relative pb-14 last:pb-0">
              <span className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-onyx font-mono text-xs text-gold md:-left-20 md:h-14 md:w-14">
                {j.step}
              </span>
              <Reveal>
                <h3 className="font-serif text-3xl text-champagne md:text-4xl">{j.title}</h3>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-sand">{j.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FounderTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-coal">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-[1fr_1.1fr]">
        <ParallaxImage src={skylineBw} alt="Ejecutivos observando la ciudad desde un rascacielos" className="frame-corners aspect-[4/5] rounded-[28px] lg:aspect-[5/6]" sizes="(min-width:1024px) 45vw, 100vw" imageClassName="grayscale brightness-75" />
        <div>
          <SectionLabel>El fundador</SectionLabel>
          <Reveal>
            <blockquote className="font-serif text-4xl leading-[1.05] text-champagne md:text-6xl">“{founder.quote}”</blockquote>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand">{founder.intro}</p>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {founder.timeline.slice(1, 7).map((t) => (
              <RevealItem key={t.year} className="bg-onyx p-5 transition-colors hover:bg-ash">
                <span className="font-serif text-3xl text-gold">{t.year}</span>
                <span className="mt-1 block text-xs text-sand">{t.title}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <Link href="/fundador" className="group mt-10 inline-flex items-center gap-3 font-semibold text-gold">
              <span className="relative">
                Conoce la historia de {founder.name.split(" ")[0]}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FaqPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <SplitHeading lines={["Lo que más", { text: "nos preguntan.", className: "italic text-gold" }]} className="font-serif text-5xl leading-[0.95] text-champagne md:text-6xl" />
          <Reveal>
            <Link href="/invertir#preguntas" className="group mt-8 inline-flex items-center gap-2 font-semibold text-gold">
              Ver todas las preguntas <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
        <Reveal>
          <Accordion items={faqs.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}

/** Decorative full-width image strip used between sections. */
export function ImageStrip({ src }: { src: typeof skylineBw }) {
  return (
    <div className="relative h-40 overflow-hidden md:h-56">
      <Image src={src} alt="" fill sizes="100vw" className="img-grade object-cover" />
      <div className="absolute inset-0 bg-onyx/50" />
    </div>
  );
}
