"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site, disclaimer, companies } from "@/content/site";
import { Logo } from "./Logo";
import { Magnetic } from "@/components/core/Magnetic";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-coal">
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-24 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-serif text-5xl leading-[0.95] text-champagne md:text-7xl">
            ¿Listo para invertir en <em className="text-gold-gradient">tu futuro?</em>
          </h2>
          <Magnetic>
            <Link
              href="/contacto"
              data-cursor="Hablemos"
              className="group grid h-40 w-40 place-items-center rounded-full bg-gold text-center font-bold text-onyx transition-colors hover:bg-gold-soft"
            >
              <span className="flex flex-col items-center gap-1">
                Hablemos
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-4">
          <div className="space-y-4">
            <Logo className="text-champagne" />
            <p className="max-w-xs text-sm leading-relaxed text-sand">{site.slogan}</p>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-stone">Navegación</p>
            <ul className="space-y-2 text-sm">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sand transition-colors hover:text-gold">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-stone">Compañías</p>
            <ul className="space-y-2 text-sm">
              {companies.map((c) => (
                <li key={c.slug}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sand transition-colors hover:text-gold"
                  >
                    {c.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-stone">Oficina</p>
            <address className="space-y-2 text-sm not-italic text-sand">
              <p>{site.address.street}<br />{site.address.city}, {site.address.region}</p>
              <a href={site.phoneHref} className="block hover:text-gold">{site.phone}</a>
              <a href={`mailto:${site.emails.management}`} className="block break-all hover:text-gold">{site.emails.management}</a>
            </address>
          </div>
        </div>

        <p className="mt-14 max-w-4xl text-xs leading-relaxed text-stone">{disclaimer}</p>
        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-stone md:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.</p>
          <Link href="/privacidad" className="hover:text-gold">Política de tratamiento de datos</Link>
        </div>
      </div>

      <motion.div style={{ y }} aria-hidden className="pointer-events-none select-none px-4 pb-4">
        <p className="text-center font-serif text-[27vw] leading-[0.75] text-white/[0.04]">GMVP</p>
      </motion.div>
    </footer>
  );
}
