import { pillars, manifesto } from "@/content/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";
import { ScrubText } from "@/components/core/ScrubText";

export function Pillars() {
  return (
    <section id="pilares" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">— Quiénes somos</p>
      </Reveal>
      <ScrubText
        text={manifesto}
        className="max-w-6xl font-serif text-4xl leading-[1.08] text-champagne md:text-6xl lg:text-7xl"
      />

      <RevealGroup className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {pillars.map((p, i) => (
          <RevealItem key={p.title} className="group relative bg-onyx p-8 transition-colors duration-500 hover:bg-coal md:p-10">
            <span className="font-mono text-xs text-gold">0{i + 1}</span>
            <h3 className="mt-16 font-serif text-3xl text-champagne md:text-4xl">{p.title}</h3>
            <p className="mt-4 leading-relaxed text-sand">{p.text}</p>
            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
