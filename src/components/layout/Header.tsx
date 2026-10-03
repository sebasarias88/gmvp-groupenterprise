"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/core/Magnetic";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 300 && !open);
  });

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-8"
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-6",
            scrolled || open ? "border border-white/10 bg-onyx/70 backdrop-blur-xl" : "border border-transparent",
          )}
        >
          <Link href="/" aria-label="GMVP Group Enterprise — inicio" className="text-champagne">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium text-sand transition-colors hover:text-champagne",
                    active && "text-champagne",
                  )}
                >
                  {active && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-flex">
              <Link
                href="/invertir"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-onyx transition-colors hover:bg-gold-soft"
              >
                Quiero invertir
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span className={cn("absolute h-px w-5 bg-champagne transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
              <span className={cn("absolute h-px w-5 bg-champagne transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-coal px-6 pb-10 pt-32"
          >
            <nav aria-label="Móvil" className="flex flex-col gap-2">
              {[{ href: "/", label: "Inicio" }, ...site.nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} className="flex items-baseline gap-4 font-serif text-5xl text-champagne">
                    <span className="font-mono text-xs text-gold">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-2 text-sm text-sand">
              <a href={site.phoneHref} className="block">{site.phone}</a>
              <a href={`mailto:${site.emails.management}`} className="block">{site.emails.management}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
