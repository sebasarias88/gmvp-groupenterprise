import type { Metadata } from "next";
import Image from "next/image";
import { officeMeeting, skylineBw } from "@/assets/images";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/core/ContactForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Habla con un asesor de GMVP Group Enterprise. Bogotá, Colombia.",
  alternates: { canonical: "/contacto" },
};

/** Renders a link when there is a destination, a plain card otherwise. */
function CardTag({ href, className, children }: { href?: string; className: string; children: React.ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function ContactPage() {
  const cards = [
    { icon: Phone, label: "Llámanos", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Escríbenos", value: site.emails.management, href: `mailto:${site.emails.management}` },
    { icon: MapPin, label: "Ubicación", value: `${site.address.city}, ${site.address.country}`, href: undefined },
  ];

  return (
    <>
      <PageHero image={officeMeeting}
        label="Contacto"
        lines={["Comencemos a", { text: "invertir.", className: "italic text-gold" }]}
        intro="Gracias por visitarnos. Envíanos tu mensaje y un asesor te orientará hacia la inversión más acorde para ti."
      />

      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10">
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <RevealItem key={label}>
              <CardTag
                href={href}
                className="group flex h-full items-start gap-5 rounded-3xl border border-line bg-coal p-7 transition-colors hover:border-gold/60"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-onyx">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-stone">{label}</span>
                  <span className="mt-2 block break-all font-semibold text-champagne">{value}</span>
                </span>
              </CardTag>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 pb-28 md:px-10 md:pb-40 lg:grid-cols-[1.2fr_1fr] [&>*]:min-w-0">
        <Reveal className="rounded-[32px] border border-line bg-coal p-7 md:p-12">
          <h2 className="mb-8 font-serif text-4xl text-champagne md:text-5xl">Ponte en contacto</h2>
          <ContactForm whatsapp={site.whatsapp} />
        </Reveal>
        <Reveal delay={0.1} className="frame-corners relative min-h-[420px] overflow-hidden rounded-[32px] border border-line">
          <Image src={skylineBw} alt="Panorámica de la ciudad" fill sizes="(min-width:1024px) 40vw, 100vw" placeholder="blur" className="img-grade object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
          <div className="absolute inset-x-7 bottom-7 md:inset-x-10 md:bottom-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">{site.address.city} · {site.address.country}</p>
            <p className="mt-3 max-w-sm font-serif text-3xl leading-tight text-champagne md:text-4xl">Un asesor te acompaña en cada paso de tu inversión.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
