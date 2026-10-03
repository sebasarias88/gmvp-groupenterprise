import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/core/ContactForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/core/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Habla con un asesor de GMVP Group Enterprise. Oficina en Armenia, Quindío.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const cards = [
    { icon: Phone, label: "Llámanos", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Escríbenos", value: site.emails.management, href: `mailto:${site.emails.management}` },
    {
      icon: MapPin,
      label: "Visítanos",
      value: `${site.address.street}, ${site.address.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`,
    },
  ];

  return (
    <>
      <PageHero
        label="Contacto"
        lines={["Comencemos a", { text: "invertir.", className: "italic text-gold" }]}
        intro="Gracias por visitarnos. Envíanos tu mensaje y un asesor te orientará hacia la inversión más acorde para ti."
      />

      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10">
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <RevealItem key={label}>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-start gap-5 rounded-3xl border border-line bg-coal p-7 transition-colors hover:border-gold/60"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-onyx">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-stone">{label}</span>
                  <span className="mt-2 block break-words font-semibold text-champagne">{value}</span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 pb-28 md:px-10 md:pb-40 lg:grid-cols-[1.2fr_1fr] [&>*]:min-w-0">
        <Reveal className="rounded-[32px] border border-line bg-coal p-7 md:p-12">
          <h2 className="mb-8 font-serif text-4xl text-champagne md:text-5xl">Ponte en contacto</h2>
          <ContactForm whatsapp={site.whatsapp} />
        </Reveal>
        <Reveal delay={0.1} className="min-h-[420px] overflow-hidden rounded-[32px] border border-line">
          <iframe
            title="Mapa de la oficina de GMVP Group Enterprise"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&z=16&output=embed`}
            className="h-full min-h-[420px] w-full grayscale invert-[0.92] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>
    </>
  );
}
