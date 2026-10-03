import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stats, investor, founder, faqs } from "@/content/site";
import { Counter } from "@/components/core/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";
import { SplitHeading } from "@/components/core/SplitHeading";
import { Accordion } from "@/components/core/Accordion";
import { CompanyCards } from "../CompanyCards";
import { SectionLabel } from "../SectionLabel";

export function PortfolioPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionLabel>Portafolio de compañías</SectionLabel>
          <SplitHeading
            lines={["Un grupo,", { text: "tres sectores.", className: "italic text-gold" }]}
            className="font-serif text-5xl leading-[0.95] text-champagne md:text-7xl lg:text-8xl"
          />
        </div>
        <Reveal>
          <p className="max-w-sm text-sand">
            Compañías operativas que buscan ser líderes de mercado de forma rentable, con sinergias que nos permiten trabajar como un verdadero grupo empresarial.
          </p>
        </Reveal>
      </div>
      <CompanyCards />
    </section>
  );
}

export function Stats() {
  return (
    <section className="border-y border-line bg-coal">
      <RevealGroup className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-line md:grid-cols-4">
        {stats.map((s) => (
          <RevealItem key={s.label} className="bg-coal px-6 py-14 md:px-10 md:py-20">
            <Counter to={s.value} suffix={s.suffix} className="block font-serif text-7xl leading-none text-champagne md:text-8xl" />
            <span className="mt-4 block max-w-[14rem] text-sm leading-relaxed text-sand">{s.label}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export function JourneyPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>La ruta del inversionista</SectionLabel>
          <SplitHeading
            lines={["Invertir con", { text: "claridad.", className: "italic text-gold" }]}
            className="font-serif text-5xl leading-[0.95] text-champagne md:text-7xl"
          />
          <Reveal>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-sand">{investor.profile}</p>
            <Link href="/invertir" className="group mt-8 inline-flex items-center gap-2 font-semibold text-gold">
              Ver cómo invertir <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
        <ol className="relative space-y-4">
          {investor.journey.map((j) => (
            <li key={j.step}>
              <Reveal>
                <div className="group flex gap-6 rounded-3xl border border-line bg-coal/60 p-7 transition-colors duration-500 hover:border-gold/50 md:gap-10 md:p-9">
                  <span className="font-serif text-5xl leading-none text-gold/80 md:text-6xl">{j.step}</span>
                  <div>
                    <h3 className="text-xl font-bold text-champagne md:text-2xl">{j.title}</h3>
                    <p className="mt-2 leading-relaxed text-sand">{j.text}</p>
                  </div>
                </div>
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
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-2">
        <Reveal>
          <figure>
            <blockquote className="font-serif text-4xl leading-[1.05] text-champagne md:text-6xl">
              “{founder.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 font-serif text-2xl text-gold">GV</span>
              <span>
                <span className="block font-semibold text-champagne">{founder.name}</span>
                <span className="text-sm text-stone">{founder.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div>
          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {founder.timeline.slice(1, 7).map((t) => (
              <RevealItem key={t.year} className="bg-onyx p-6">
                <span className="font-serif text-3xl text-gold">{t.year}</span>
                <span className="mt-2 block text-sm text-sand">{t.title}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <Link href="/fundador" className="group mt-8 inline-flex items-center gap-2 font-semibold text-gold">
              Conoce su historia <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
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
        <div>
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <SplitHeading
            lines={["Lo que más", { text: "nos preguntan.", className: "italic text-gold" }]}
            className="font-serif text-5xl leading-[0.95] text-champagne md:text-6xl"
          />
          <Reveal>
            <Link href="/invertir#preguntas" className="group mt-8 inline-flex items-center gap-2 font-semibold text-gold">
              Ver todas <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
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
