"use client";

import { ArrowUpRight, Building2, Landmark, Sofa } from "lucide-react";
import { companies } from "@/content/site";
import { TiltCard } from "@/components/core/TiltCard";
import { RevealGroup, RevealItem } from "@/components/core/Reveal";

const icons = { credifinanzas: Landmark, construcciones: Building2, muebles: Sofa } as const;

export function CompanyCards() {
  return (
    <RevealGroup className="grid gap-6 md:grid-cols-3">
      {companies.map((c, i) => {
        const Icon = icons[c.slug];
        return (
          <RevealItem key={c.slug}>
            <a
              id={c.slug}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-cursor={c.external ? "Visitar" : "Ver"}
              className="group block scroll-mt-32"
            >
              <TiltCard className="h-full rounded-[28px]">
                <div className="relative flex h-[460px] flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-coal p-8 md:h-[520px]">
                  <div
                    aria-hidden
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                    style={{ background: c.tone }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(212,175,55,1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,1)_1px,transparent_1px)] [background-size:44px_44px]"
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-gold">{c.sector}</span>
                    <span className="font-mono text-xs text-stone">0{i + 1}</span>
                  </div>
                  <div className="relative">
                    <Icon className="mb-8 h-16 w-16 text-gold transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-110" strokeWidth={1} />
                    <h3 className="font-serif text-4xl leading-none text-champagne md:text-5xl">{c.short}</h3>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-stone">{c.name}</p>
                    <p className="mt-5 leading-relaxed text-sand">{c.text}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-champagne">
                      {c.external ? "Visitar sitio" : "Conocer más"}
                      <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            </a>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
