import type { Metadata } from "next";
import { chartsTablet } from "@/assets/images";
import { investor, faqs } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { SplitHeading } from "@/components/core/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";
import { InvestorSimulator } from "@/components/sections/invest/InvestorSimulator";
import { FaqSearch } from "@/components/sections/invest/FaqSearch";

export const metadata: Metadata = {
  title: "Invertir",
  description:
    "Conviértete en accionista de GMVP Group Enterprise: desde 10 hasta 100 acciones, de contado o por cuotas, con dividendos cada cuatro meses.",
  alternates: { canonical: "/invertir" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function InvestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero image={chartsTablet}
        label="Invertir"
        lines={["Sé dueño de", { text: "tu futuro.", className: "italic text-gold" }]}
        intro={investor.profile}
      />

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Simulador de ruta</SectionLabel>
            <SplitHeading
              lines={["Diseña tu", { text: "inversión.", className: "italic text-gold" }]}
              className="font-serif text-5xl leading-[0.95] text-champagne md:text-7xl"
            />
          </div>
          <Reveal>
            <p className="max-w-sm text-sand">Elige cuántas acciones y cómo pagarlas. Te mostramos cuándo recibes tu título, tus dividendos y la ventana de recompra.</p>
          </Reveal>
        </div>
        <Reveal>
          <InvestorSimulator />
        </Reveal>
      </section>

      <section className="border-y border-line bg-coal">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-2">
          <div>
            <SectionLabel>Accionistas</SectionLabel>
            <Reveal>
              <p className="font-serif text-3xl leading-[1.15] text-champagne md:text-5xl">{investor.shareholders}</p>
            </Reveal>
          </div>
          <div>
            <SectionLabel>Qué evaluamos antes de invertir</SectionLabel>
            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {investor.criteria.map((c, i) => (
                <RevealItem key={c} className="flex items-center gap-4 rounded-2xl border border-line bg-onyx px-5 py-5">
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <span className="font-semibold text-champagne">{c}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <SectionLabel>Paso a paso</SectionLabel>
        <RevealGroup className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
          {investor.journey.map((j) => (
            <RevealItem key={j.step} className="bg-onyx p-7">
              <span className="font-serif text-5xl text-gold">{j.step}</span>
              <h3 className="mt-8 text-lg font-bold text-champagne">{j.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand">{j.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="preguntas" className="mx-auto max-w-[1100px] scroll-mt-28 px-6 pb-28 md:px-10 md:pb-40">
        <SectionLabel>Preguntas frecuentes</SectionLabel>
        <SplitHeading
          lines={["Resolvemos", { text: "tus dudas.", className: "italic text-gold" }]}
          className="mb-14 font-serif text-5xl leading-[0.95] text-champagne md:text-7xl"
        />
        <FaqSearch />
      </section>
    </>
  );
}
