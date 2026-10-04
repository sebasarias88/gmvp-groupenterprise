"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { companies } from "@/content/site";
import { chartsTablet, officeMeeting, skylineBw } from "@/assets/images";
import { TiltCard } from "@/components/core/TiltCard";

const photos = { credifinanzas: chartsTablet, construcciones: skylineBw, muebles: officeMeeting } as const;

/** Tall photo cards for the group's companies, revealed with a staggered wipe. */
export function CompanyCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {companies.map((c, i) => (
        <motion.div
          key={c.slug}
          initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.2, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
          className={i === 1 ? "md:mt-16" : ""}
        >
          <a
            id={c.slug}
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            data-cursor={c.external ? "Visitar" : "Ver"}
            className="group block scroll-mt-32"
          >
            <TiltCard max={5} className="rounded-[28px]">
              <div className="relative h-[520px] overflow-hidden rounded-[28px] border border-line md:h-[580px]">
                <Image
                  src={photos[c.slug]}
                  alt=""
                  fill
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="img-grade img-grade-hover object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/55 to-onyx/10" />
                <span aria-hidden className="absolute inset-3 rounded-[22px] border border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />
                <div className="relative flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-white/15 bg-onyx/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur">
                      {c.sector}
                    </span>
                    <span className="font-serif text-5xl leading-none text-white/20">0{i + 1}</span>
                  </div>
                  <div className="transition-transform duration-700 md:translate-y-6 md:group-hover:translate-y-0">
                    <h3 className="font-serif text-5xl leading-none text-champagne">{c.short}</h3>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone">{c.name}</p>
                    <p className="mt-5 leading-relaxed text-sand">{c.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                      {c.external ? "Visitar sitio" : "Conocer más"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
