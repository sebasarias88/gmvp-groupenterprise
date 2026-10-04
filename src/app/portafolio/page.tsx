import type { Metadata } from "next";
import { skylineBw } from "@/assets/images";
import { CompanyCards } from "@/components/sections/CompanyCards";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/sections/SectionLabel";
import { Reveal } from "@/components/core/Reveal";
import { Marquee } from "@/components/core/Marquee";

export const metadata: Metadata = {
  title: "Portafolio de compañías",
  description: "GMVP Credifinanzas, GMVP Construcciones e Inmobiliaria y GMVP Muebles: las compañías del grupo.",
  alternates: { canonical: "/portafolio" },
};

const sectors = ["Sector financiero", "Construcción", "Inmobiliario", "Madera", "Hogar", "Oficina", "Crédito rotativo"];

export default function PortfolioPage() {
  return (
    <>
      <PageHero image={skylineBw}
        label="Portafolio de compañías"
        lines={["Inversiones", { text: "en movimiento.", className: "italic text-gold" }]}
        intro="Gestionamos activamente un portafolio de compañías en Colombia. Cada una opera con autonomía y se fortalece con las sinergias del grupo."
      />
      <div className="border-y border-line py-6">
        <Marquee speed={30}>
          {sectors.map((s) => (
            <span key={s} className="mx-10 flex items-center gap-10 font-serif text-5xl italic text-champagne/80 md:text-7xl">
              {s}
              <span className="h-3 w-3 rotate-45 bg-gold" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <CompanyCards />
      </section>
      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="rounded-[32px] border border-line bg-coal p-8 md:p-16">
          <SectionLabel>Criterio de inversión</SectionLabel>
          <Reveal>
            <p className="max-w-4xl font-serif text-3xl leading-[1.15] text-champagne md:text-5xl">
              Antes de sumar una compañía al grupo analizamos su rentabilidad, operatividad, trayectoria y competitividad, su equipo gerencial y la calidad de sus productos y servicios.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
