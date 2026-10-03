import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/core/SmoothScroll";
import { Cursor } from "@/components/core/Cursor";
import { ScrollProgress } from "@/components/core/ScrollProgress";
import { WhatsAppButton } from "@/components/core/WhatsAppButton";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Fondo de inversión de capital privado`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fondo de inversión",
    "capital privado",
    "invertir en Colombia",
    "acciones",
    "dividendos",
    "Armenia Quindío",
    "GMVP",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  slogan: site.slogan,
  email: site.emails.management,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "CO",
  },
  founder: { "@type": "Person", name: "Gerberth Martín Vega Prada" },
  subOrganization: [{ "@type": "Organization", name: "GMVP Credifinanzas S.A.S.", url: "https://gmvpcredifinanzas.com" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO">
      <body className="grain min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-onyx"
        >
          Saltar al contenido
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <Preloader />
        <ScrollProgress />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton
          phone={site.whatsapp}
          message="Hola, me interesa conocer cómo invertir en GMVP Group Enterprise."
          teaser="¿Quieres invertir en tu futuro? Escríbenos."
        />
      </body>
    </html>
  );
}
