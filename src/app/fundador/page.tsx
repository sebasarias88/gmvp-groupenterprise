import type { Metadata } from "next";
import { skylineBw, teamTable } from "@/assets/images";
import { ParallaxImage } from "@/components/core/ParallaxImage";
import { founder } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Timeline } from "@/components/sections/founder/Timeline";
import { Reveal } from "@/components/core/Reveal";
import { SectionLabel } from "@/components/sections/SectionLabel";

export const metadata: Metadata = {
  title: "Fundador y equipo",
  description: `La historia de ${founder.name}, fundador de GMVP Group Enterprise, y el equipo que lo acompaña.`,
  alternates: { canonical: "/fundador" },
};

export default function FounderPage() {
  return (
    <>
      <PageHero image={skylineBw} label="Fundador" lines={["Gerberth Martín", { text: "Vega Prada.", className: "italic text-gold" }]} intro={founder.intro} />

      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10">
        <SectionLabel>Una vida construyendo empresa</SectionLabel>
        <Timeline items={founder.timeline} />
      </section>

      <section className="border-y border-line bg-coal">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-2">
          <div>
            <Reveal>
              <blockquote className="font-serif text-5xl leading-[1.02] text-champagne md:text-7xl">
                “{founder.quote}”
              </blockquote>
            </Reveal>
            <ParallaxImage src={teamTable} alt="Equipo de asesores en reunión" className="frame-corners mt-12 aspect-[16/10] rounded-[28px]" sizes="(min-width:1024px) 45vw, 100vw" imageClassName="img-grade" />
          </div>
          <Reveal delay={0.1}>
            <SectionLabel>Equipo</SectionLabel>
            <p className="text-xl leading-relaxed text-sand">{founder.team}</p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {["Asesores económicos", "Asesores administrativos", "Asesores jurídicos"].map((t) => (
                <li key={t} className="rounded-2xl border border-line px-5 py-4 text-sm font-semibold text-champagne">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
