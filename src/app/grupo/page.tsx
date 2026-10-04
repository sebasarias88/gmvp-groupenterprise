import type { Metadata } from "next";
import { boardroom, officeMeeting } from "@/assets/images";
import { ParallaxImage } from "@/components/core/ParallaxImage";
import { about } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";
import { ScrubText } from "@/components/core/ScrubText";
import { SplitHeading } from "@/components/core/SplitHeading";
import { ValuesList } from "@/components/sections/about/ValuesList";

export const metadata: Metadata = {
  title: "El Grupo",
  description: "Historia, misión, visión, valores corporativos y objetivo estratégico de GMVP Group Enterprise S.A.S.",
  alternates: { canonical: "/grupo" },
};

export default function GroupPage() {
  return (
    <>
      <PageHero image={boardroom} label="Quiénes somos" lines={["Una matriz", { text: "que crea valor.", className: "italic text-gold" }]} intro={about.history} />

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-40">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {[
            { k: "Misión", v: about.mission },
            { k: "Visión", v: about.vision },
          ].map((b) => (
            <RevealItem key={b.k} className="rounded-[28px] border border-line bg-coal p-8 md:p-12">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{b.k}</span>
              <p className="mt-10 font-serif text-3xl leading-[1.15] text-champagne md:text-4xl">{b.v}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-40">
        <ParallaxImage src={officeMeeting} alt="Equipo de GMVP en sala de reuniones" className="frame-corners h-[60svh] min-h-[420px] rounded-[32px]" imageClassName="img-grade">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-transparent" />
          <p className="absolute bottom-8 left-8 right-8 max-w-2xl font-serif text-3xl leading-tight text-champagne md:bottom-12 md:left-12 md:text-5xl">
            Un portafolio dinámico, administrado con <em className="text-gold">gobierno corporativo.</em>
          </p>
        </ParallaxImage>
      </section>

      <section className="border-y border-line bg-coal py-28 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionLabel>Valores corporativos</SectionLabel>
          <ValuesList values={about.values} />
          <Reveal>
            <p className="mt-16 max-w-3xl text-lg leading-relaxed text-sand">{about.culture}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-14 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>Objetivo estratégico</SectionLabel>
          <SplitHeading
            lines={["Administración", { text: "basada en valor.", className: "italic text-gold" }]}
            className="font-serif text-5xl leading-[0.95] text-champagne md:text-7xl"
          />
        </div>
        <div className="space-y-14">
          {about.objective.map((p, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr] gap-6 border-t border-line pt-8">
              <span className="font-mono text-xs text-gold">0{i + 1}</span>
              <ScrubText text={p} className="text-xl leading-relaxed text-champagne md:text-2xl" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
