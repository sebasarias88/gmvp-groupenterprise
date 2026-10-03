import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  alternates: { canonical: "/privacidad" },
};

// NOTE: base text aligned with Ley 1581 de 2012; have it reviewed by the client's legal team.
export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-40 text-sand md:pt-52">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
      <h1 className="font-serif text-5xl leading-none text-champagne md:text-7xl">Política de tratamiento de datos personales</h1>
      <div className="mt-12 space-y-8 leading-relaxed [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-champagne">
        <section>
          <h2>Responsable</h2>
          <p>
            {site.legalName}, con domicilio en {site.address.street}, {site.address.city}, {site.address.region}. Correo: {site.emails.management}. Teléfono: {site.phone}.
          </p>
        </section>
        <section>
          <h2>Finalidad</h2>
          <p>
            Los datos que nos suministras a través de este sitio se usan para atender tus solicitudes, brindarte asesoría sobre nuestras alternativas de inversión, enviarte información relacionada y cumplir obligaciones legales.
          </p>
        </section>
        <section>
          <h2>Derechos del titular</h2>
          <p>
            Conforme a la Ley 1581 de 2012 y sus decretos reglamentarios, puedes conocer, actualizar, rectificar y suprimir tus datos, solicitar prueba de la autorización otorgada y revocarla, y presentar quejas ante la Superintendencia de Industria y Comercio.
          </p>
        </section>
        <section>
          <h2>Cómo ejercerlos</h2>
          <p>Escríbenos a {site.emails.management} indicando tu nombre, documento y la solicitud. Responderemos dentro de los términos legales.</p>
        </section>
      </div>
    </article>
  );
}
